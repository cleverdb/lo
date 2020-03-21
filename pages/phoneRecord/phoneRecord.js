const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneRecordInfos: [
      { prTime: "2019.12.12 15:12", prClient: "袁小明", prContent: "已通知2019年营业时间，祝会员元旦快乐。", nextTime: "2019.05.28", prStatus: true },
      { prTime: "2019.12.12 15:12", prClient: "袁小明", prContent: "已通知2019年营业时间，祝会员元旦快乐快乐快乐快乐快乐快乐快乐快乐快乐快乐快乐快乐快乐快乐快乐快乐。", nextTime: "2019.05.28", prStatus: true },
      { prTime: "2019.12.12 15:12", prClient: "袁小明", prContent: "客户电话没有没有人接听。。", nextTime: "", prStatus: false },
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
    getRecords();
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
  getRecords:function(){
  
  },
  goPhoneRecordAdd:function(){
    wx.showToast({
      title: 'goPhoneRecordAdd',
    });
  }
})