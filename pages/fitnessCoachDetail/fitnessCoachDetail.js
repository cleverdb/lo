// pages/fitnessCoachDetail/fitnessCoachDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [1, 2, 3, 4, 5],
    sort:3.5,
    array:[{
      id:0,
      name:'拳击课',
    },{
      id:1,
      name:'常规课',
    },{
      id:2,
      name:'曾拉伸课'
    }]
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
  bindPickerChange:function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value,e.detail);
    // 跳转到正式课程
    wx.navigateTo({
      url: `/pages/privateCoursesBuy2/privateCoursesBuy2`,
    })
  }
})