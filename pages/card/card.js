// pages/buyCourse/buyCourse.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: app.globalData.host,
    cardList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData();
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
  initData: function (params) {
    var _this = this
    wx.showLoading({
      title: '加载中...',
    })
    wx.showNavigationBarLoading()
    wx.request({
      url: _this.data.host + '/rest/s1/Goods/card/getCard',
      data: params,
      method: 'GET',
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
            'cardList': res.data.data,
            disabledBg: true
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
        wx.hideNavigationBarLoading()
        wx.hideLoading()
      }

    })
  },
  navigateTo: function (e) {
    const cardId = e.currentTarget.dataset.id;
    const data = e.currentTarget.dataset.type;
    data.type = "1";
    let urlMap = {
      '1': "/pages/cardDetail/cardDetail",
      "2": "/pages/tryCard/tryCard"
    }
    wx.navigateTo({
      url: urlMap[data.type] + "?cardId=" + cardId
    });


  },
})