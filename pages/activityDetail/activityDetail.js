// pages/activityDetail/activityDetail.js
var Utils = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: app.globalData.host,
    hideModal: true,
    markers: [{
      iconPath: "/images/icon/address-ok.png",
      id: 0,
      latitude: 39.88273,
      longitude: 116.346163,
      width: 50,
      height: 50
    }],
    activityId: '',
    activity: {},
    activityDeduct: [],
    deductItem: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let _this = this;
    let activityId = options.activityId;
    _this.setData({
      activityId: activityId
    })
    _this.initData()
    if (app.globalData.userInfo.userId) {
      _this.initActivityDeductData();
    } else {
      this.joinActivity();
    }
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
    var _this = this
    if (_this.data.pageState) {
      _this.setData({
        pageState: {}
      })
      _this.initData({
        activityId: _this.data.activityId
      })
    }

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
  lineNavTap: function(e) {
    var _this = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(e) {
        const latitude = _this.data.activity.latitude
        const longitude = _this.data.activity.longitude
        const name = _this.data.activity.place
        const address = _this.data.activity.address
        wx.openLocation({
          latitude,
          longitude,
          name: name,
          address: address,
          scale: 18
        })
      }
    })
  },
  confirmActivity: function() {
    const _this = this
    this.setData({
      hideModal: true,
    })
    let params = _this.data.deductItem
    params['activityId'] = _this.data.activityId
    wx.request({
      url: _this.data.host + '/rest/s1/Goods/activity/joinActivity',
      data: params,
      method: 'POST',
      success: function(res) {},
      fail: function(res) {

      },
      complete: function(res) {
        wx.showToast({
          title: res.data.messages,
          icon: 'none',
          duration: 2000,
        })
      }
    })
  },
  cancelActivity: function() {
    this.setData({
      hideModal: true,
    })
  },
  joinActivity: function() {
    let _this = this
    let userId = app.globalData.userInfo.userId
    if (!userId) {
      _this.setData({
        pageState: {
          message: '请先登陆/注册哟~',
          state: 'unlogin'
        }
      })
      return
    }
    if (this.data.activityDeduct.length == 0) {
      this.initActivityDeductData(() => {
        if (this.data.activityDeduct.length > 0) {
          this.setData({
            hideModal: false
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '参加活动需要扣除课时/会员卡时长，请先购买会员卡/课程',
            showCancel: false
          })
        }
      });
    }else{
      this.setData({
        hideModal: false
      })
    }
  },
  initData: function() {
    const _this = this
    wx.showLoading({
      title: '加载中...',
    })
    let params = {
      activityId: _this.data.activityId
    }
    if (app.globalData.userInfo.userId) {
      params['userId'] = app.globalData.userInfo.userId
    }
    wx.request({
      url: _this.data.host + '/rest/s1/Goods/activity/getActivityDetail',
      data: params,
      method: 'GET',
      success: function(res) {
        if (res.statusCode != 200) {
          _this.setData({
            pageState: {
              message: '加载失败，请重新加载~',
              state: 'error'
            }
          })
        } else {
          let activity = res.data.data.activity
          let hasJoin = res.data.data.hasJoin ? res.data.data.hasJoin : 0
          let startTime = activity.startTime
          if (startTime > new Date().getTime()) {
            activity['ok'] = true
          } else {
            activity['ok'] = false
          }
          activity['date'] = Utils.formatTimestampToDate(startTime)
          activity['startTime'] = Utils.formatTimestampToTime(startTime)
          activity['endTime'] = Utils.formatTimestampToTime(activity.endTime)
          _this.setData({
            activity: activity,
            hasJoin: hasJoin
          })
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
      }
    })
  },
  initActivityDeductData: function(callback) {
    const _this = this
    let params = {
      userId: app.globalData.userInfo.userId
    }
    wx.request({
      url: _this.data.host + '/rest/s1/Goods/activity/getActivityDeduct',
      data: params,
      method: 'GET',
      success: function(res) {
        let result = res.data.data
        _this.setData({
          activityDeduct: result
        })
      },
      fail: function(res) {

      },
      complete: function() {
        if (callback) {
          callback()
        }
      }
    })
  },
  radioChange: function(e) {
    let value = e.detail.value
    let selectItem = this.data.activityDeduct.filter((item, index, arr) => item.id == value)
    this.setData({
      deductItem: selectItem[0]
    })
  },
  reloadTap: function() {
    this.initData()
  },
  loginTap: function(res) {
    let userInfo = res.detail.userInfo;
    if (userInfo) {
      app.globalData.wUserInfo = userInfo
    }
    wx.navigateTo({
      url: '/pages/login/login',
    })
  }
})