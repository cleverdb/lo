// pages/mineTicket/mineTicket.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: app.globalData.host,
    statusType: [{
      status: 'usable',
      name: "未使用"
    }, {
      status: 'unusable',
      name: "已过期"
    }],
    navbarActiveIndex: 0,
    selectTicketId: 0,
    winHeight: "",
    tickets: {},
    voucherCode: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.initData()
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
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function(res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 200;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
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
  initData: function(parm) {
    var _this = this
    wx.showLoading({
      title: '加载中...',
    })
    const params ={
      userId: app.globalData.userInfo.userId
    }
    wx.request({
      url: _this.data.host + '/rest/s1/Goods/voucher/getMineVoucher',
      data: params,
      method: 'GET',
      success: function(res) {
        const result = res.data
        _this.setData({
          tickets: result
        })
      },
      fail: function(res) {

      },
      complete: function() {
        wx.hideLoading()
      }
    })
  },
  voucherCodeInput: function(e) {
    if (e.detail.value.length == 16) {
      this.setData({
        voucherCode: e.detail.value
      })
    }
  },
  voucherCodeTap: function() {
    var _this = this
    const voucherCode = _this.data.voucherCode
    if (voucherCode.length == 0) {
      return
    }
    if (voucherCode.length < 16) {
      wx.showToast({
        title: '兑换码不符合规则',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.showLoading({
      title: '加载中...',
    })
    let params = {
      userId: app.globalData.userInfo.userId,
      voucherCode: voucherCode,
    }
    wx.request({
      url: _this.data.host + '/rest/s1/Goods/voucher/activate',
      data: params,
      method: 'POST',
      success: function(res) {
        const result = res.data.data
        if (res.statusCode != 200) {
          wx.showToast({
            title: '兑换失败，稍后再试',
            icon: 'none',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: result.messages,
            icon: 'none',
            duration: 2000
          })
          if (result.success) _this.initData()
        }
      },
      fail: function(res) {

      },
      complete: function() {
        wx.hideLoading()
      }
    })
  }
})