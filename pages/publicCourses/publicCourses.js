// pages/publicCourses/publicCourses.js
import Utils from '../../utils/util.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    besel: "1",
    tabsList: [
      {
        "id": "1",
        title: "进行中",
      }, {
        "id": "2",
        title: "已结束",
      }
    ],
    runningList: [],
    doneList: [],
    host: app.globalData.host,
    runningPageIndex: 0,
    donePageIndex: 0,
    moreFlag:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      donePageIndex,
      runningPageIndex,
    } = this.data;
    this.getDoingData({
      pageIndex:runningPageIndex,
    });
    this.getDoneData({
      pageIndex:donePageIndex,
    });
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
    let { besel, runningPageIndex, donePageIndex } = this.data;
    const param = besel === '1' ? {
      pageIndex: ++runningPageIndex
    } : {
        pageIndex: ++donePageIndex
      };
    const dataParam = besel === '1' ? {
      runningPageIndex
    } : {
        donePageIndex
    };
    this.setData(dataParam)
    this.loadMoreData({
      ...param,
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  ondetail: function (e) {
    const { courseid } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/practiceCourses/practiceCourses?courseId=${courseid}`,
    })
  },
  tabsChange: function (e) {
    let { id } = e.currentTarget.dataset;
    this.setData({
      besel: id,
      moreFlag: false,
      runningPageIndex: 0,
      donePageIndex: 0,
      runningList: [],
      doneList: [],
    });
    id === '1' ? this.getDoingData({ pageIndex: 0 }) : this.getDoneData({ pageIndex: 0 });
  },
  getDoingData: function (param) {
    const { runningList } = this.data;
    const _this = this;
    wx.showLoading({
      title: '加载中...',
    })
      wx.request({
        url: `${app.globalData.host}/rest/s1/Goods/course/public/doing`,
        data: {
          ...param,
          pageSize:10,
        },
        success: function (res) {
          if (res.statusCode != 200) {
            _this.setData({
              pageState: {
                message: '加载失败，请重新加载~',
                state: 'error'
              }
            })
          } else {
            const dat = res.data.data.reduce((ex,current) => {
              const { courseDate } = current;
              const weaknum = new Date(courseDate).getDay();
              const dat2 = `周${Utils.weekObj[weaknum]}`
              return [...ex, {
                ...current,
                weakData: dat2
              }]
            },[])
            _this.setData({
              runningList: [...runningList, ...dat] 
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
  getDoneData: function (param) {
    const { doneList } = this.data;
    const _this = this;
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: `${app.globalData.host}/rest/s1/Goods/course/public/did`,
      data: {
        ...param,
        pageSize: 10,
      },
      success: function (res) {
        if (res.statusCode != 200) {
          _this.setData({
            pageState: {
              message: '加载失败，请重新加载~',
              state: 'error'
            }
          })
        } else {
          const dat = res.data.data.reduce((ex, current) => {
            const { courseDate } = current;
            const weaknum = new Date(courseDate).getDay();
            const dat2 = `周${Utils.weekObj[weaknum]}`;
            console.log(weaknum, Utils.weekObj[weaknum]);
            return [...ex, {
              ...current,
              weakData: dat2
            }]
          }, [])
          _this.setData({
            doneList: [...doneList, ...dat]
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
  loadMoreData: function (param) {
    const _this = this;
    const { besel, runningList, doneList} = this.data;
    const url = `/rest/s1/Goods/course/public/${besel == '1' ? 'doing' : 'did'}`;
    wx.request({
      url: `${app.globalData.host}${url}`,
      data: param,
      success: function (res) {
        let result = res.data.data;
        const data = besel == '1' ? {
          runningList: [...runningList, ...res.data.data]
        } : {
            doneList: [...doneList, ...res.data.data]
        }
        if (result.length == 10) {
          _this.setData(data)
          return
        }
        _this.setData({
          ...data,
          moreFlag: true,
        })
      },
      fail: function (res) {

      },
      //   complete: function () { }
      // })
    });
  },
  // 报名
  payTap:function(e){
    const { item } = e.currentTarget.dataset;
    const { courseId, unitPrice=0,} = item;
    const { userId } = app.globalData.userInfo;
    wx.request({
      url: `${app.globalData.host}/rest/s1/Goods/appointment/public`,
      method: 'POST',
      data: {
        courseId,
        realPay: unitPrice > 0 ? unitPrice : 0,
        openId: app.globalData.openId,
        vipId: userId
      },
      success(res) {
        const { errorCode = undefined, messages, errors } = res.data;
        if (errorCode) {
          wx.showModal({
            title: '预约提示',
            content: errors,
            showCancel: false,
            confirmText: '确定',
            confirmColor: '#FCC800',
          });
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
                title: '预约提示',
                content: messages,
                showCancel: false,
                confirmText: '确定',
                confirmColor: '#FCC800',
              });
            },
            fail(res) {
              wx.request({
                url: `${app.globalData.host}/rest/s1/Goods/appointment/public/disabled`,
                data: {
                  orderId: orderid,
                }
              })
            }
          })
        } else {
          wx.showModal({
            title: '预约提示',
            content: messages,
            showCancel: false,
            confirmText: '确定',
            confirmColor: '#FCC800',
          });
        }

      }
    })
  }
})