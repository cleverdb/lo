// pages/stores/stores.js
const app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 39.903175,
    longitude: 116.401889,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    _this.initData()
    wx.getLocation({
      success: function(res) {
        console.log(res)
        _this.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
      },
      fail: function(res) {
        wx.showToast({
          title: '获取位置失败',
        })
      }
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
  calloutTap: function(res) {
    console.log(res);
    var marker = this.data.markers[res["markerId"]];
    wx.openLocation({
      latitude: marker.latitude,
      longitude: marker.longitude,
      name: marker.name,
      address: marker.address,
    })
  },
  dataHandler: function(data) {
    let markers = []
    let includePoints = []
    let index = 0
    data.forEach(item => {
      markers.push({
        iconPath: "/images/icon/address-ok.png",
        id: index++,
        latitude: item.latitude,
        longitude: item.longitude,
        width: 30,
        height: 30,
        address: item.address,
        name: item.storeName,
        callout: {
          content: item.storeName + "\n地址：" + item.address,
          color: "#ffffff",
          fontSize: 11,
          borderRadius: 10,
          borderWidth: 1,
          bgColor: "#fcc700",
          padding: 10,
          textAlign: "center",
          borderColor: "#fcc700",
          display: "ALWAYS"
        }
      })
      includePoints.push({
        latitude: item.latitude,
        longitude: item.longitude,
      })
    })
    this.setData({
      markers: markers,
      includePoints: includePoints
    })
  },
  initData: function () {
    const _this = this
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      method: 'GET',
      url: app.globalData.host + '/rest/s1/Goods/store/getStore',
      success: function (res) {
        let result = res.data.data
        _this.dataHandler(result)
      },
      fail: function (res) {

      },
      complete: function () {
        wx.hideLoading()
      }
    })
  },
})