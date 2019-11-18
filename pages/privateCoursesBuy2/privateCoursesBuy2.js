// pages/privateCoursesBuy2/privateCoursesBuy2.js
import Utils from '../../utils/util.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ensure_buy: true,
    type: "1",
    courseId: "",
    total: "",
    oldTotal: 0,
    teacherslist: [],
    unitPrice:'',
    num: 1,
    teacherSel: false,
    beSelTeacher: {},
    host: app.globalData.host,
    courseData: {},
    teacherDisabled:true,
    radioChecked:false,
    ticketDesc: '暂无优惠券',
    selectTicket:{},
    unusable: [],
    usable: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { courseName, courseId } = options;
    console.log(courseId);
    this.initData(courseId);
    this.getCoach(courseId);
    this.setData({
      courseName,
      courseId
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
  ondel: function () {
    let { num, unitPrice, selectTicket, oldTotal } = this.data;
    num = num - 1
    if (num > 0) {
      const data = Utils.times(unitPrice, num);
      this.getVoucher(data);
      this.setData({
        num: num,
        total: data,
        oldTotal: data,
      })
    }
  },
  onadd: function () {
    let { num, unitPrice } = this.data;
    num = num + 1;
    const data = Utils.times(unitPrice, num);
    this.getVoucher(data);
    this.setData({
      num: num,
      total: data,
      oldTotal: data,

    })
  },
  onItemSelTeacher: function (e) {
    let { coachname } = e.currentTarget.dataset;
    let { coachData } = this.data;
    this.setData({
      coachData: coachData.map((item) => {
        if (coachname == item.coachName) {
          item.besel = true
        } else {
          item.besel = false
        }
        return item;
      }),
      teacherDisabled:false,
    })
  },
  onSelectTeacher: function () {
    this.setData({
      teacherSel: !this.data.teacherSel
    })
  },
  ensureTeacher: function () {
    const { coachData, num } = this.data;
    const data = coachData.find((item) => {
      return item.besel == true;
    });
    const { unitPrice} =data;
    const total = Utils.times(unitPrice, num);
    this.setData({
      beSelTeacher: data,
      teacherSel: false,
      unitPrice,
      total,
      oldTotal: total,
      selectTicket:{},
      ticketDesc:'暂无优惠券'
    })
    // this.setData({
    //   teacherSel: !this.data.teacherSel
    // })
  },
  initData: function (param) {
    const _this = this;
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: `${app.globalData.host}/rest/s1/Goods/course/private/detail`,
      data: {
        courseId:param
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
          _this.setData({
            courseData:res.data.data
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
  getCoach: function (param) {
    const _this = this;
    wx.request({
      url: `${app.globalData.host}/rest/s1/Goods/course/private`,
      data: {
        courseId: param
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
          const coachData = res.data.data.reduce((nex, current) => {
            const { forte = '' } = current;
            return [...nex, {
              ...current,
              tags: forte ? forte.split('、'):[]
              }]
          }, []);
          _this.setData({
            coachData
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
      
      }
    })
  },
  // 点击同意协议
  radioTap: function (e) {
    const { radioChecked, beSelTeacher } = this.data;
    const dat = !radioChecked;
    this.setData({
      radioChecked: dat,
      ensure_buy: !(dat && beSelTeacher.coachName)
    });
  },
  // 查询优惠卷
  getVoucher: function (param) {
    const { userId } = app.globalData.userInfo;
    const _this = this;
    wx.request({
      url: `${app.globalData.host}/rest/s1/Goods/voucher/getVoucher`,
      data: {
        countPrice: param,
        userId
      },
      success: function (res) {
        const data = res.data.data;
        const { usable, unusable } = data;
        _this.setData({
          ticketDesc: usable.length > 0 ? '查看' : '暂无优惠券',
          usable,
          unusable,
          selectTicket: {}
        })
      }
    })
  },
  // 点击 优惠券
  ticketTap: function (e) {
    const { parvalue, vouchername, voucheruuid } = e.currentTarget.dataset;
    const { selectTicket, oldTotal } = this.data;
    const data = {
      parValue: parvalue,
      voucherName: vouchername,
      voucherUuid: voucheruuid
    };
    const selectTicketData = voucheruuid == selectTicket.voucherUuid ? {} : data;
    this.setData({
      selectTicket: selectTicketData,
      total: Object.keys(selectTicketData).length == 0 ? oldTotal : (oldTotal - parvalue)
    });

  },
  showModal: function () {
    // 显示遮罩层
    const { ticketDesc } = this.data;
    if (ticketDesc == '暂无优惠券') return;
    const animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    });
    animation.translateY(800).step();
    this.setData({
      showModalStatus: true,
      animationData: animation.export(),
    });
    setTimeout(() => {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }, 200)
  },
  hideModal: function () {
    // 显示遮罩层
    const animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    });
    animation.translateY(300).step();
    setTimeout(() => {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false,
      }, 200)
    })

  },
  LiouTap: function () {
    const _this = this;
    wx.request({
      url: `${app.globalData.host}/rest/s1/Goods/protocol`,
      success: function (res) {
        const data = res.data.data;
        const { protocolName, summary } = data;
        wx.showModal({
          title: protocolName,
          content: summary,
          showCancel: false,
          confirmText: '同意',
          confirmColor: '#FCC700',
          success: function () {
            _this.setData({
              radioChecked: true
            })
          }
        })
      }

    })

  },
  // 点击 支付按钮
  tapnPay: function () {
    const {
      radioChecked,
      num,
      total,
      selectTicket,
      courseName,
      beSelTeacher
    } = this.data;
    const { voucherUuid = "" } = selectTicket;
    const { userId } = app.globalData.userInfo;
    const { courseId, coachName} = beSelTeacher;
    if (radioChecked) {
      const data = {
        type: 2,
        realPay: total,
        voucherUuid,
        num,
        courseId,
        openId: app.globalData.openId,
        userId
      }
      wx.request({
        url: `${app.globalData.host}/rest/s1/Goods/buy`,
        data,
        method: "POST",
        success: function (res) {
          console.log(res);
          if (res.statusCode != 200 || !res.data.data) {
            wx.showToast({
              title: '支付出现问题，稍后再试',
              duration: 2000,
              icon: 'none'
            })
            return
          }
          const result = res.data.data
          const { orderid } = result;
          _this.setData({
            orderid
          })
          wx.requestPayment({
            timeStamp: result.timeStamp,
            nonceStr: result.nonceStr,
            package: result.package,
            signType: result.signType,
            paySign: result.paySign,
            success(res) {
              wx.showModal({
                title: '购买成功',
                content: `成功购买${num}节课\r\n在“我的-我的课程”中查看`,
                showCancel: false,
                confirmText: '预约时间',
                confirmColor: '#FCC800',
                success(res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: `/pages/reserveTime/reserveTime?courseId=${courseId}&coachName=${coachName}&courseName=${courseName}&orderid=${orderid}`
                    })
                  }
                }
              })
            },
            fail(res) { }
          })
        },
      })
    }

  },
})