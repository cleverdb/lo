// pages/buyCourse/buyCourse.js
const app = getApp()
import Utils from '../../utils/util.js'
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
  onLoad: function(options) {
    this.initData()
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
  initData: function() {
    let _this = this;
    let userId = app.globalData.userInfo.userId
    if (!userId) {
      this.setData({
        pageState: {
          message: '暂无会员卡～',
          state: 'empty'
        }
      })
      return
    }
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: _this.data.host + '/rest/s1/Goods/card/getMineCard',
      method: 'GET',
      data: {
        userId: userId
      },
      success: function(res) {
        if (res.statusCode != 200) {
          _this.setData({
            pageState: {
              message: '加载失败，请重新加载~',
              state: 'error'
            }
          })
        } else {
          let result = res.data.data
          if (result.length == 0) {
            _this.setData({
              pageState: {
                message: '暂无会员卡~',
                state: 'empty'
              }
            })
          } else {
            result.forEach(item => {
              item.activateDate = Utils.formatTimestampToDate(item.activateDate)
              item.expireDate = Utils.formatTimestampToDate(item.expireDate)
            })
            _this.setData({
              cardList: result
            })
          }

        }
      },
      fail: function() {
        _this.setData({
          pageState: {
            message: '请检查您的网络连接~',
            state: 'error'
          }
        })
      },
      complete: function(res) {
        wx.hideLoading()
        wx.hideNavigationBarLoading()
      }

    })
  },
  reloadTap: function () {
    this.initData()
  },
  loginTap: function (res) {
    let userInfo = res.detail.userInfo;
    if (userInfo) {
      app.globalData.wUserInfo = userInfo
    }
    wx.navigateTo({
      url: '/pages/login/login',
    })
  }
})