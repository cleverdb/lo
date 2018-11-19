// pages/buyCourse/buyCourse.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "card": [{
      "id": "0001",
      "cardType": "季卡/年卡",
      "cardDesc": "有限期：2018-10-15至2019-04-15"
    },
    {
      "id": "0002",
      "cardType": "自定义卡",
      "cardDesc": "剩余课时：10课时"
    }
    ]
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
  navigateTo: function (e) {
    const cardId = e.currentTarget.dataset.id;
    const path = e.currentTarget.dataset.path;
    wx.navigateTo({
      url: path + "?cardId=" + cardId
    });

  },
})