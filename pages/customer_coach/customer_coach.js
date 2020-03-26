// pages/customer_coach/customer_coach.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{
      type: 'radio',
      label: 'Updated',
      value: 'updated',
      checked: true,
      children: [{
        label: 'Recently updated',
        value: 'desc',
        checked: true, // 默认选中
      },
      {
        label: 'Least recently updated',
        value: 'asc',
      },
      ],
      groups: ['001'],
    },{
        type: 'sort',
        label: 'Stars',
        value: 'stars',
        groups: ['003'],
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

  }
})