// pages/stores/stores.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 39.903175,
    longitude: 116.401889,
    markers: [{
      iconPath: "/images/icon/address-ok.png",
      id: 0,
      latitude: 39.88273,
      longitude: 116.346163,
      width: 30,
      height: 30,
      address:"",
      name:"力偶总店",
      callout:{
        content:"力偶总店",
        color:"#ffffff",
        fontSize:11,
        borderRadius:10,
        borderWidth:1,
        bgColor:"#f2873b",
        padding:10,
        textAlign:"center",
        borderColor:"#f2873b",
        display:"ALWAYS"
      }

    },
    {
      iconPath: "/images/icon/address-ok.png",
      id: 1,
      latitude: 39.887287,
      longitude: 116.395034,
      width: 30,
      height: 30,
      address: "",
      name: "力偶1店",
      callout: {
        content: "力偶1店",
        color: "#ffffff",
        fontSize: 11,
        borderRadius: 10,
        borderWidth: 1,
        bgColor: "#f2873b",
        padding: 10,
        textAlign: "center",
        borderColor: "#f2873b",
        display: "ALWAYS"
      }
    },
    {
      iconPath: "/images/icon/address-ok.png",
      id: 2,
      latitude: 39.966465,
      longitude: 116.373475, 
      width: 30,
      height: 30,
      address: "北京市西城区",
      name: "力偶2店",
      callout: {
        content: "店名：力偶2店\n地址：北京市西城区",
        color: "#ffffff",
        fontSize: 11,
        borderRadius: 10,
        borderWidth: 1,
        bgColor: "#f2873b",
        padding: 10,
        textAlign: "center",
        borderColor: "#f2873b",
        display: "ALWAYS"
      }
    },
    {
      iconPath: "/images/icon/address-ok.png",
      id: 3,
      latitude: 39.893515,
      longitude: 116.480229,
      width: 30,
      height: 30,
      address: "北京市西城区",
      name: "力偶2店",
      callout: {
        content: "力偶3店",
        color: "#ffffff",
        fontSize: 11,
        borderRadius: 10,
        borderWidth: 1,
        bgColor: "#f2873b",
        padding: 10,
        textAlign: "center",
        borderColor: "#f2873b",
        display: "ALWAYS"
      }
    }
    ],
    includePoints:[
      {
        latitude: 39.88273,
        longitude: 116.346163,
      }, {
        latitude: 39.887287,
        longitude: 116.395034,
      }, {
        latitude: 39.966465,
        longitude: 116.373475, 
      }, {
        latitude: 39.893515,
        longitude: 116.480229,
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.getLocation({
      success: function(res) {
        console.log(res)
        _this.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
      },
      fail:function(res){
        wx.showToast({
          title: '获取位置失败',
        })
      }
    })
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
  calloutTap:function(res){
    console.log(res);
    var marker = this.data.markers[res["markerId"]];
    wx.openLocation({
      latitude: marker.latitude,
      longitude: marker.longitude,
      name: marker.name,
      address: marker.address,
    })
  }
})