// pages/mineReport/mineReport.js
import Canvas from '../../utils/canvas.js'
Page({
  ...Canvas.options,
  /**
   * 页面的初始数据
   */
  data: {
    ...Canvas.data,
    howLong:"120分钟",
    projectRecords:[
      {
        projectName:"动感单车",
        startTime:"11月18日 12:12:00",
        endTime: "11月18日 13:12:00",
        long:"60分钟"
      },{
        projectName: "搏击",
        startTime: "11月18日 15:00:00",
        endTime: "11月18日 15:40:00",
        long: "40分钟"
    },{
        projectName: "瑜伽",
        startTime: "11月18日 18:20:00",
        endTime: "11月18日 18:50:00",
        long: "30分钟"
    }
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.draw('arcCanvas','bgCanvas', 80, 1000);
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

  }
})