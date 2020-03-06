// pages/mineReserve/mineReserve.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:1,
    winHeight:0,
    showDelete:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    const that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        const clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        const calc = clientHeight * rpxR - 84;
        that.setData({
          winHeight: calc
        });
      }
    });
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
  // tab change
  handleChange: function ({ detail }){
      this.setData({
        current: detail.key
      });
  },
  deleteTap:function(){
    console.log('dssdsd');
    this.setData({
      showDelete:true
    })
  }
})