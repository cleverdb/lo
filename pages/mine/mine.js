// pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bindAccount: false,
    userInfo: {},
    items: [
      {
        icon: '../../images/icon/address.png',
        text: '附近门店',
        path: '/pages/stores/stores'
      },
      {
        icon: '../../images/icon/ka.png',
        text: '我的会员卡',
        path: '/pages/mineCard/mineCard'
      },
      {
        icon: '../../images/icon/yuyue.png',
        text: '我的活动',
        path: '/pages/mineActivity/mineActivity'
      },
      {
        icon: '../../images/icon/baogao.png',
        text: '健身报告',
        path: '/pages/mineReport/mineReport'
      },
      {
        icon: '../../images/icon/quanbao.png',
        text: '我的券包',
        path: '/pages/mineTicket/mineTicket'
      },
      {
        icon: '../../images/icon/mine.png',
        text: '个人中心',
        path: '/pages/mineInfo/mineInfo'
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    if (app.globalData.userInfo == null) {
      setTimeout(() => {
        console.log("dadasd")
        _this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
      }, 500)
    } else {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
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
    if (app.globalData.userInfo) {
      console.log(app.globalData.userInfo)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
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
  getUserInfoHandler: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getPhoneNumberHandler: function(e) {
    console.log(e);
  }
})