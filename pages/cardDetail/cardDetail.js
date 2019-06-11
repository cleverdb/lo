// pages/cardDetail/cardDetail.js
import Utils from '../../utils/util.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusType: [{
      status: 'usable',
      name: "可用券"
    }, {
      status: 'unusable',
      name: "不可用券"
    }],
    cardNum: 0,
    defaultNum: 1,
    selectDefault: false,
    cardUnit: '课时',
    minusStatus: 'disabled',
    navbarActiveIndex: 0,
    hideModal: true,
    totalPrice: 0,
    ticketDesc: "查看",
    tickets: {},
    selectTicket: {},
    realPay: 0,
    showModalStatus: false,
    selectStoreId: "",
    card: {},
    host: app.globalData.host,
    storeIndex: 0,
    storeList: [],
    sale: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var cardId = options.cardId;
    this.setData({
      'cardId': cardId
    })
    this.initData()
    this.loadStore();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (this.data.pageState) {
      this.initData()
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 课时加减
   */
  numChange: function(e) {
    var num = e.detail.value;
    var totalPrice = this.data.card.unitPrice * num
    this.setData({
      cardNum: num,
      totalPrice: totalPrice
    });
  },
  bindMinus: function() {
    var num = this.data.cardNum;
    if (num > 0) {
      num--;
    }
    var minusStatus = num <= 0 ? 'disabled' : 'ok';
    var totalPrice = this.data.card.unitPrice * num
    this.setData({
      cardNum: num,
      minusStatus: minusStatus,
      totalPrice: totalPrice
    });
    this.loadVoucher({
      userId: app.globalData.userInfo.userId,
      countPrice: totalPrice
    })
  },
  bindPlus: function() {
    var num = this.data.cardNum;
    num++;
    var totalPrice = this.data.card.unitPrice * num
    this.setData({
      selectDefault: false,
      cardNum: num,
      minusStatus: 'ok',
      totalPrice: totalPrice
    });
    this.loadVoucher({
      userId: app.globalData.userInfo.userId,
      countPrice: totalPrice
    })
  },
  /**
   * 点击导航栏
   */
  onNavBarTap: function(event) {
    // 获取点击的navbar的index
    let navbarTapIndex = event.currentTarget.dataset.navbarIndex
    // 设置data属性中的navbarActiveIndex为当前点击的navbar
    this.setData({
      navbarActiveIndex: navbarTapIndex
    })
  },
  /**
   * 
   */
  onBindChange: function(e) {
    // 设置data属性中的navbarActiveIndex为当前点击的navbar
    this.setData({
      navbarActiveIndex: e.detail.current
    })
  },
  ticketTap: function(e) {
    const _this = this
    let status = e.currentTarget.dataset.status
    let selectItem = e.currentTarget.dataset.item
    if (status == "unusable") return
    if (selectItem.voucherUuid == this.data.selectTicket.voucherUuid) {
      this.setData({
        selectTicket: {},
        realPay: _this.data.totalPrice
      })
      return
    }
    this.setData({
      selectTicket: selectItem,
      realPay: this.data.totalPrice - selectItem.parValue
    })
  },
  bindStoreChange: function(e) {
    this.setData({
      storeIndex: e.detail.value,
    })
  },
  selectDefaultTap: function() {
    var _this = this;
    let num = _this.data.defaultNum
    if (_this.data.selectDefault) {
      num = 0
    }
    let totalPrice = num * _this.data.card.unitPrice
    _this.setData({
      totalPrice: totalPrice,
      realPay: totalPrice,
      cardNum: num,
      selectDefault: !_this.data.selectDefault
    })
    this.loadVoucher({
      userId: app.globalData.userInfo.userId,
      countPrice: totalPrice
    })

  },
  buyCard: function() {
    if (!app.globalData.userInfo.userId) {
      this.setData({
        pageState: {
          message: '请先登陆/注册哟~',
          state: 'unlogin'
        }
      })
      return
    }
    if (this.data.storeIndex === "") {
      wx.showToast({
        title: '请选择开卡场馆',
        icon: 'none',
        duration: 2000,
      })
      return
      }
    if (this.data.cardNum == 0) {
      wx.showToast({
        title: '请选择购买数量',
        icon: 'none',
        duration: 2000,
      })
      return
    }
    this.data.selectStoreId = this.data.storeList[this.data.storeIndex]["id"]
    this.payOrder()
  },
  //显示对话框
  showVoucherModal: function() {
    this.loadVoucher({
      userId: app.globalData.userInfo.userId,
      countPrice: this.data.realPay
    })
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideVoucherModal: function() {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  touchmove: function(res) {
    return;
  },
  bindSale: function(e) {
    this.setData({
      sale: e.detail.value
    })
  },
  initData: function(param) {
    var _this = this
    let params = { cardId: _this.data.cardId}
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: _this.data.host + '/rest/s1/Goods/card/getCardDetail',
      data: params,
      method: 'GET',
      success: function(res) {
        if (res.statusCode != 200) {
          _this.setData({
            pageState: {
              message: '加载失败，请重新加载~',
              state: 'error'
            }
          })
        } else {
          const result = res.data.data
          _this.setData({
            card: result,
            //realPay: result.unitPrice,
            pageState:{}
          })
          _this.selectUint(result.cardTypeId)
        }
      },
      fail: function() {
        _this.setData({
          pageState: {
            message: '请检查您的网络连接~',
            state: 'error'
          }
        })
      },
      complete: function() {
        wx.hideLoading()
      }
    })
  },
  loadVoucher: function(param) {
    var _this = this
    wx.request({
      url: app.globalData.host + '/rest/s1/Goods/voucher/getVoucher',
      data: param,
      method: 'GET',
      success: function(res) {
        let usableTicket = res.data.data.usable
        if (usableTicket.length > 0) {
          let select = usableTicket[0]
          _this.setData({
            tickets: res.data.data,
            selectTicket: select,
            ticketDesc: select.voucherName,
            realPay: _this.data.totalPrice - select.parValue
          })
        } else {
          _this.setData({
            tickets: res.data.data,
            selectTicket: {},
            ticketDesc: '暂无可用优惠券',
            realPay: _this.data.totalPrice
          })
        }
      },
      fail: function(res) {}
    })
  },
  loadStore: function() {
    var _this = this
    wx.request({
      url: app.globalData.host + '/rest/s1/Goods/store/getStore',
      method: 'GET',
      success: function(res) {
        _this.setData({
          storeList: res.data.data
        })
      },
    })
  },
  selectUint: function(param) {
    let _this = this
    switch (param) {
      case 'week_card':
        _this.setData({
          defaultNum: 1,
          cardUnit: '周卡'
        })
        break;
      case 'month_card':
        _this.setData({
          cardUnit: '月卡'
        })
        break;
      case 'year_card':
        _this.setData({
          cardUnit: '年卡'
        })
        break;
      case 'custom_card':
        _this.setData({
          cardUnit: '天'
        })
        break;
      case 'private_card':
      case 'special_card':
        _this.setData({
          defaultNum: 30,
          cardUnit: '课时'
        })
        break;
    }
  },
  reloadTap:function(){
    this.initData()
  },
  loginTap: function (res) {
    let userInfo = res.detail.userInfo;
    if (userInfo) {
      app.globalData.wUserInfo = userInfo 
    }
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  payOrder:function(){
    let _this = this
    let params ={
      voucherUuid: _this.data.selectTicket.voucherUuid, 
      cardId: _this.data.cardId,
      userId: app.globalData.userInfo.userId,
      num: _this.data.cardNum,
      realPay: _this.data.realPay,
      storeId: _this.data.selectStoreId,
      openId: app.globalData.openId,
      type:1,
    }
    wx.request({
      url: app.globalData.host + '/rest/s1/Goods/buy',
      data: params,
      method: 'POST',
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
        wx.requestPayment({
          timeStamp: result.timeStamp,
          nonceStr: result.nonceStr,
          package: result.package,
          signType: result.signType,
          paySign: result.paySign,
          success(res) { 
            wx.navigateBack({
              delta:1
            })
            },
          fail(res) { }
        })
      },
      fail: function (res) { }
    })
  }
})