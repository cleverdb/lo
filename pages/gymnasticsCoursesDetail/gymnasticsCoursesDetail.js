// pages/gymnasticsCoursesDetail/gymnasticsCoursesDetail.js
import Utils from '../../utils/util.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: app.globalData.host,
    data: [],
    courseDetail: {},
    isDetail: false,
    courseData: {},
    weekObj: Utils.weekObj,
    hours: new Date().getHours(),
    startWeek: new Date().getDay()
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { courseAreaId} = options;
    const nowDay = Utils.formatDate(new Date());
    this.initData({ courseAreaId, startDate: nowDay});
  },
  initData:function(param){
    var _this = this;
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: `${app.globalData.host}/rest/s1/Goods/course/group`,
      data:param,
      success: function (res) {
        if (res.statusCode != 200) {
          _this.setData({
            pageState: {
              message: '加载失败，请重新加载~',
              state: 'error'
            }
          })
        } else {
          const dayNum  = res.data.data.reduce((nex, current) => {
            const { title } = current;
            const titleArray = title.split('/');
            return [...nex, {
              ...current,
              dayNum: titleArray[0]
            }] 
          }, []);
          console.log(_this.data.startWeek);
          console.log(dayNum);
          
          _this.setData({
            data: dayNum
          })
        }
      },
      fail: function () {
        _this.setData({
          pageState: {
            message: '请检查您的网络连接~',
            state: 'error'
          }
        })
      },
      complete: function (res) {
        wx.hideLoading()
      }

    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.userInfo.userId) {
      this.setData({
        pageState: {}
      })
    } else {
      _this.setData({
        pageState: {
          message: '请先登陆/注册哟~',
          state: 'unlogin'
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onnext: function () {

  },
  colTap: function (e) {
    const { coursedata, disabled } = e.currentTarget.dataset;
    if (disabled) {
      wx.showToast({
        title: '已过期,请选择其他课',
        duration: 2000,
        icon: 'none'
      });
      return;
    }
    const { coursePlanId } = this.data;
    const { coursePlanId: courseplanid, courseId: courseid } = coursedata;
    const courseId = coursePlanId == courseplanid ? "" : courseid;
    const courseData = coursePlanId == courseplanid ? {} : coursedata;
    this.getDetail(courseId);
    this.setData({
      coursePlanId: coursePlanId == courseplanid ? "" : courseplanid,
      courseId,
      courseData
    });
  },
  getDetail: function (param) {
    const _this = this;
    console.log(param);
    if (param!=='') {
      wx.showLoading({
        title: '加载中...',
      })
      wx.request({
        url: `${app.globalData.host}/rest/s1/Goods/course/group/detail`,
        data: {
          courseId: param
        },
        success: function (res) {
          if (res.statusCode != 200) {
            wx.showToast({
              title: '加载失败',
              icon: 'fail',
              duration: 2000
            });
            _this.setData({
              coursePlanId: "",
              courseId: "",
            });
          } else {
            _this.setData({
              courseDetail: res.data.data,
              isDetail:true
            })
          }
        },
        fail: function () {
          _this.setData({
            coursePlanId: "",
            courseId: "",
          });
          wx.showToast({
            title: '请检查您的网络连接~',
            icon: 'fail',
            duration: 2000
          })
        },
        complete: function (res) {
          wx.hideLoading()
        }
      })
    } else {
      this.setData({
        isDetail:false
      })
    }
  },
  buyTap: function () {
    const { courseData,courseDetail } = this.data;
    const { coursePlanId, courseId } = courseData;
    const { unitPrice } = courseDetail;
    const { userId } = app.globalData.userInfo;
    wx.request({
      url: `${app.globalData.host}/rest/s1/Goods/appointment/group`,
      method: 'POST',
      data: {
        courseId,
        coursePlanId,
        realPay: unitPrice || 0,
        openId: app.globalData.openId,
        vipId: userId
      },
      success(res) {
        const { errorCode = undefined, messages, errors } = res.data;
        if (errorCode) {
          wx.showToast({
            title: errors,
            duration: 2000,
            icon: 'none'
          })
          return
        }
        if (unitPrice > 0) {
          const result = res.data.data;
          const { orderid } = result;
          wx.requestPayment({
            timeStamp: result.timeStamp,
            nonceStr: result.nonceStr,
            package: result.package,
            signType: result.signType,
            paySign: result.paySign,
            success(res) {
              wx.showModal({
                title: '预约成功',
                showCancel: false,
                confirmText: '确定',
                confirmColor: '#FCC800',
              });
            },
            fail(res) {
              wx.request({
                url: `${app.globalData.host}/rest/s1/Goods/appointment/group/disabled`,
                data: {
                  orderId: orderid,
                }
              })
            }
          })
        } else {
          wx.showToast({
            title: messages,
            duration: 2000,
            icon: 'none'
          })
        }

      }
    })
  }
})