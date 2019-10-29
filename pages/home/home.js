// pages/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '/images/card1.png',
      '/images/act.jpg',
      '/images/card.png'
    ],
    value:2,
    index:2,
    host: app.globalData.host,
    banner: [],
    sliberBanner:[{
      picUrl:'/images/sliber_test.png'
    }, {
        picUrl: '/images/sliber_test.png'
      }, {
        picUrl: '/images/sliber_test.png'
      }, {
        picUrl: '/images/sliber_test.png'
      }, {
        picUrl: '/images/sliber_test.png'
      }],
    menu: [],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.initData()
    
    app.userInfoReadyCallback = res => {
      app.globalData.wUserInfo = res.userInfo
    };
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
  initData:function(){
    let _this = this;
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.host + '/rest/s1/Wechat/home/getHome',
      success: function (res) {
        if (res.statusCode != 200) {
          _this.setData({
            pageState: {
              message: '加载失败，请重新加载~',
              state: 'error'
            }
          })
        } else {
          _this.setData({
            banner: res.data.banner,
            menu: res.data.menu,
            pageState: {}
          })
        }
      },
      fail: function () {
        _this.setData({
          pageState: {
            message: '请检查您的网络连接~',
            state: 'error'
          }
        })
      },
      complete: function (res) {
        wx.hideLoading()
      }
    })
  },
  bannerTap: function(e) {
    let item = e.currentTarget.dataset.item;
    let skipUrl = item.skipParam ? item.pageUrl + "?" + item.paramKey + "=" + item.skipParam : item.pageUrl
    if (item.tab == 'Y') {
      wx.switchTab({
        url: skipUrl,
      })
    } else {
      wx.navigateTo({
        url: skipUrl,
      })
    }
  },
  menuTap: function(e) {
    let item = e.currentTarget.dataset.item;
    let skipUrl = item.skipParam ? item.pageUrl + "?" + item.paramKey + "=" + item.skipParam : item.pageUrl
    if (item.tab == 'Y') {
      wx.switchTab({
        url: skipUrl,
      })
    } else {
      wx.navigateTo({
        url: skipUrl,
      })
    }
  },
  reloadTap: function () {
    this.initData()
   
  },
  loginTap: function (res) {
  }
})