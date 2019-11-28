// pages/privateCoursesBuy2/privateCoursesBuy2.js
import Utils from '../../utils/util.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total: "",
    sales: [],
    ticketDesc: '暂无优惠券',
    showModalStatus: false,
    isShowsalesList: false,
    oldTotal: 0,
    total: 0,
    data: {
      "cardId": "",
      "unitPrice": "",
      "cardLogoUrl": "",
      "buyNote": "",
    },
    selectTicket:{},
    num: 1,
    teacherSel: false,
    storeObj:{},
    selectSale:{},
    host: app.globalData.host,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { cardId } = options;
    this.initData(false, cardId);
    this.initSales();
    this.getSelectData();
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
  onUnload: function (options) {

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
  onCouponCancel: function () {
    let { isShowCoupon } = this.data;
    this.setData({
      isShowCoupon: false
    })
  },
  onSelCoupon: function () {
    let { isShowCoupon } = this.data;
    this.setData({
      isShowCoupon: !isShowCoupon
    })
  },
  onselcoupon: function (e) {
    let { id } = e.target.dataset.item;
    let { coupon } = this.data;
    let json = {};
    let data = coupon.usable.map((item) => {
      if (item.id == id) {
        if (!item.besel) {
          json = item;
          item.besel = true
        } else {
          json = {}
          item.besel = false
        }

      } else {
        item.besel = false
      }
      return item;
    })
    this.setData({
      beselcoupon: json,
      coupon: {
        ...this.data.coupon,
        usable: data,
      }
    })
    if (coupon.usable) {

    }
  },
  onSelSaler: function (e) {
    let { currentTarget: { dataset: item } } = e;
    if (this.data.selectSale && this.data.selectSale.userId == item.item.userId){
      this.setData({
        selectSale: null
      })
      return
    }
    this.setData({
      selectSale: item.item
    })
  },
  initSales: function () {
    let _this = this;
    wx.request({
      url: `${app.globalData.host}/rest/s1/Goods/employee`,
      method: 'GET',
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
            sales: [
              ...res.data.data
            ],
            disabledBg: true
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
  radioTap: function (e) {
    const { radioChecked } = this.data;
    console.log('家具啊啊', radioChecked);
    this.setData({
      radioChecked: !radioChecked
    })
  },
  onSelSale: function () {
    const animation2 = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    });
    animation2.translateY(800).step();
    this.setData({
      isShowsalesList: true,
      animation2: animation2.export()
    });
    setTimeout(() => {
      animation2.translateY(0).step()
      this.setData({
        animation2: animation2.export()
      })
    }, 200)
  },
  ondel: function () {
    let { num, data: { unitPrice } } = this.data;
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
    let { num, data: { unitPrice } } = this.data;
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
    let { id } = e.currentTarget.dataset;
    let { teacherslist } = this.data;

    this.setData({
      teacherslist: teacherslist.map((item) => {
        if (id == item.id) {
          item.besel = true
        } else {
          item.besel = false
        }
        return item;
      })
    })
  },
  onSelectTeacher: function () {
    this.setData({
      teacherSel: !this.data.teacherSel
    })
  },
  ensureTeacher: function () {
    let { teacherslist } = this.data;
    let data = teacherslist.find((item) => {
      return item.besel == true;
    });
    this.setData({
      beSelTeacher: data,
      teacherSel: false
    })
    // this.setData({
    //   teacherSel: !this.data.teacherSel
    // })
  },
  initData: function (down, id) {
    var _this = this
    wx.showLoading({
      title: '加载中...',
    })
    let params = { cardId: id}
    if (down) {
      params = {
        pageIndex: params.pageIndex + 1,
        ...params
      }
    }
    wx.request({
      url: `${app.globalData.host}/rest/s1/Goods/card/getCardDetail`,
      data: params,
      method: 'GET',
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
            'data': {
              ...res.data.data
            },
            total: Utils.times(res.data.data.unitPrice || 0, _this.data.num),
            disabledBg: true
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
  // 查询优惠卷
  getVoucher: function (param) {
    const { userId } = app.globalData.userInfo;
    console.log(app.globalData);
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
          ticketDesc: '查看',
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
        animation2: animation.export(),
        showModalStatus: false,
        isShowsalesList: false,
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
  getSelectData: function (e) {
    const _this = this;
    wx.request({
      url: app.globalData.host + '/rest/s1/Goods/store/getStore',
      success: function (res) {
        const { data = {} } = res || {};
        if (res.statusCode != 200) {
          _this.setData({
            pageState: {
              message: '加载失败，请重新加载~',
              state: 'error'
            }
          })
        } else {
          const { data: dat = [] } = data;
          _this.setData({
            selectArray: dat,
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
  bindPickerChange: function (e) {
    const { value } = e.detail;
    const { selectArray } = this.data;
    const storeObj = selectArray[value];
    this.setData({
      storeObj,
    })
  },
  // 点击 支付
  tapnPay: function () {
    var _this = this;
    const {
      radioChecked,
      data,
      num,
      total,
      selectTicket,
      storeObj,
      selectSale
    } = this.data;
    const { cardId } = data;
    const { storeId } = storeObj;
    const { userId: sales} =selectSale;
    const { voucherUuid = "" } = selectTicket;
    const { userId } = app.globalData.userInfo;
    if (radioChecked) {
      const data = {
        type: 1,
        voucherUuid,
        cardId,
        userId,
        num,
        openId: app.globalData.openId,
        realPay: total,
        storeId,
        sales,
      }
      wx.request({
        url: `${app.globalData.host}/rest/s1/Goods/buy`,
        data,
        method: "POST",
        success: function (res) {
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
                showCancel: false,
                confirmText: '确定',
                confirmColor: '#FCC800',
              })
            },
            fail(res) { }
          })
        },
      })
    }
  },
})