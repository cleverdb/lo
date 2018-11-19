// pages/activityDetail/activityDetail.js
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    picture: "",
    content: "",
    latitude: 39.88273,
    longitude: 116.346163,
    markers: [{
      iconPath: "/images/icon/address.png",
      id: 0,
      latitude: 39.88273,
      longitude: 116.346163,
      width: 50,
      height: 50
    }],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: 'https://api.it120.cc/34vu54u7vuiuvc546d/cms/news/detail?id=656',
      success: function(res) {
        var data = res.data.data;
        console.log(res);
        that.setData({
          title: data.title,
          picture: data.pic,
         // content: data.content
        });
        WxParse.wxParse('article', 'html', that.data.content, that, 5);
      }
    });
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
  markerTap: function(e) {
    var _this = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(e) {
        const latitude = _this.data.latitude
        const longitude = _this.data.longitude
        wx.openLocation({
          latitude,
          longitude,
          name: "力偶健身",
          scale: 18
        })
      }
    })
  },
  joinActivity: function() {
    wx.showModal({
      title: '',
      content: '您确定参加该活动？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})