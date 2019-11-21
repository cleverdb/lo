// pages/mine/mine.js
import Utils from '../../utils/util.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: app.globalData.host,
    user:{},
    wUser: {},
    bodyItems: [{
        icon: '../../images/icon/ka.png',
        text: '我的卡包',
        path: '/pages/mineCard/mineCard'
      },
      {
        icon: '../../images/icon/kc.png',
        text: '我的课程',
        path: '/pages/mineCourse/mineCourse'
      },
      {
        icon: '../../images/icon/yuyue.png',
        text: '我的预约',
        path: '/pages/mineAppointment/mineAppointment'
      },
      {
        icon: '../../images/icon/quanbao.png',
        text: '我的券包',
        path: '/pages/mineTicket/mineTicket'
      },
      {
        icon: '../../images/icon/baogao.png',
        text: '健身报告',
        path: '/pages/mineReport/mineReport'
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      user: app.globalData.userInfo,
      wUser: app.globalData.wUserInfo,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(e) {
    this.setData({
      user: app.globalData.userInfo
    })
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
  onGotUserInfo:function(res){
    if (res.detail.rawData){
      app.globalData.wUserInfo = res.detail.userInfo
      this.setData({
        wUser: app.globalData.wUserInfo
      })
    }
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  initData: function (params) {
    const _this = this
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      data: params,
      method: 'GET',
      url: app.globalData.host + '/rest/s1/Goods/mine/getInfo',
      success: function (res) {
        let result = res.data.data
        app.globalData.userInfo = result
        _this.setData({
          user: result
        })
      },
      fail: function (res) {

      },
      complete: function () {
        wx.hideLoading()
      }
    })
  }
})