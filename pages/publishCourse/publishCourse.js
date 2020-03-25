// pages/publishCourse/publishCoures.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: "1",
    index:0,
    visible:false,
    inputValue: null,
    right: [{
      text: '删除',
      style: 'background-color: #E93560; color: white; font-size: 28rpx; width: 150rpx',
    }],
    banner: [
      '/images/activity.png',
      '/images/activity.png',
      '/images/activity.png'
    ],
    activityIndex: -1,
    classArr:[{
        key:1,
        value:'常规课',
    },{
        key: 2,
        value: '拉伸课',
    },{
        key: 3,
        value: '核心课',
    },{
        key: 4,
        value: '恢复课',
    },{
        key: 5,
        value: '拳击课',
      }, {
        key: 5,
        value: '拳击课',
      }, {
        key: 5,
        value: '拳击课',
      }, {
        key: 5,
        value: '拳击课',
      }, {
        key: 5,
        value: '拳击课',
      }, {
        key: 5,
        value: '拳击课',
      }, {
        key: 5,
        value: '拳击课',
      }, {
        key: 5,
        value: '拳击课',
      }],
    array: ['美国', '中国', '巴西', '日本'],
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
  onChange:function(e){
    const { key } = e.detail;
    this.setData({
      current: key
    })
  },
  classItemClick:function(e) {
    const { item } = e.currentTarget.dataset;
    const { key } = item;
    this.setData({
      activityIndex:key
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  inputChange: function(e){
    const { value } = e.detail.detail;
    this.setData({
      inputValue: value
    })
  },
  sumbit: function(){
    this.setData({
      visible:true
    })
  },
  modalCancel: function(){
    this.setData({
      visible: false
    })
  },
  modalOk: function() {
    this.setData({
      visible: false
    })
  }
})