// pages/mineReport/mineReport.js
import Canvas from '../../utils/canvas.js'
import Utils from '../../utils/util.js'
const app = getApp()
Page({
  ...Canvas.options,
  /**
   * 页面的初始数据
   */
  data: {
    ...Canvas.data,
    host:app.globalData.host,
    report: {},
    nowDate: Utils.nowDate(),
    dateArr:[{
      text:'日'
    },{
      text:'周'
    },{
      text:'月'
    }],
    choose:0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const nowDate = Utils.nowDate()
    // this.setData({
    //   nowDate: nowDate
    // })
    // this.initData({
    //   userId:app.globalData.userInfo.userId,
    //   reportDate: nowDate
    // })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  /**
     * 生命周期函数--监听页面显示
     */
  onReady: function () {
    
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
  initData: function (params) {
    const _this = this
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      data: params,
      method: 'GET',
      url: app.globalData.host + '/rest/s1/Goods/mine/fitnessReport',
      success: function (res) {
        let result = res.data.data
        _this.setData({
          report: result
        })
        _this.draw('arcCanvas', 'bgCanvas', 'stepCanvas', result.score, 1000);
      },
      fail: function (res) {

      },
      complete: function () {
        wx.hideLoading()
      }
    })
  },
  nextTap:function(){
    if (this.data.nowDate == Utils.nowDate()){
      return;
    }
    let nextDate = Utils.plusDate(this.data.nowDate,1)
    this.setData({
      nowDate: nextDate
    })
    this.initData({
      userId: app.globalData.userInfo.userId,
      reportDate: nextDate
    })
  },
  beforeTap: function () {
    let nextDate = Utils.plusDate(this.data.nowDate, -1)
    this.setData({
      nowDate: nextDate
    })
    this.initData({
      userId: app.globalData.userInfo.userId,
      reportDate: nextDate
    })
  },
  // tabs change 
  tabsChange:function(e){
    const { index } = e.currentTarget.dataset;
    this.setData({
      choose:index
    })
  }

})