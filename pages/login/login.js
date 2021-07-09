// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: app.globalData.host,
    account: false,
    tel: true,
    time: '',
    suffix: '获取验证码',
    currentTime: 60,
    disabled: false,
    cellphone: '',
    code: '',
    message: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
  telTap: function() {
    this.setData({
      account: false,
      tel: true,
    })
  },
  accountTap: function() {
    this.setData({
      account: true,
      tel: false,
    })
  },
  cellphoneInput: function(e) {
    if (e.detail.value.length == 11) {
      this.setData({
        cellphone: e.detail.value
      })
    }
    
  },
  codeInput: function(e) {
    if (e.detail.value.length == 6) {
      this.setData({
        code: e.detail.value
      })
    }
  },
  wechatLogin: function(e) {
    let _this = this
    let errMsg = e.detail.errMsg
    let params = {
      iv: e.detail.iv,
      encryptedData: e.detail.encryptedData,
      appId: app.globalData.app_id,
      openId: app.globalData.openId,
    }
    wx.checkSession({
      success() {
        // session_key 未过期，
        params['sessionKey'] = app.globalData.sessionKey
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        wx.login({
          success: function(res) {
            if (res.code) {
              params['code'] = res.code
            }   
          }
        })
      },
      complete(){
        _this.wechatLoginRequest(params)
      }
    })
  },
  wechatLoginRequest: function (params){
    let _this =  this
    wx.request({
      url: _this.data.host + '/rest/s1/Goods/mine/wlogin',
      data: params,
      method: 'POST',
      success: function (res) {
        if (res.data.data.success) {
          app.globalData.userInfo = res.data.data.userInfo
          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.showToast({
            title: "微信登陆失败",
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: function (res) {

      },
    })
  },
  submit: function(e) {
    const _this = this
    let cellphone = this.data.cellphone
    let code = this.data.code
    if (cellphone == '' || code == '') {
      wx.showToast({
        title: '手机号或验证码有误',
        icon: 'none',
        duration: 2000
      })
      return
    }
    let params = {
      cellphone: cellphone,
      code: code,
      openId:app.globalData.openId
    }
    wx.request({
      url: _this.data.host + '/rest/s1/Goods/mine/login',
      data: params,
      method: 'POST',
      success: function(res) {
        if (res.statusCode != 200) {
          wx.showToast({
            title: '网络异常，请稍后再试',
            icon: 'none',
            duration: 2000
          })
          return
        }
        if (!res.data.data.success) {
          wx.showToast({
            title: res.data.data.messages,
            icon: 'none',
            duration: 2000
          })
          return
        }
        wx.showToast({
          title: "登陆成功",
          icon: 'success',
          duration: 2000
        })
        app.globalData.userInfo = res.data.data.userInfo
        wx.navigateBack({
          delta:1
        })
      },
      fail: function(res) {

      },
    })
  },
  vcodeTap: function() {
    const _this = this
    let cellphone = _this.data.cellphone
    if (cellphone == '' || cellphone.length != 11){
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 2000
      })
      return
    } 
    if (this.data.disabled) return
    let currentTime = _this.data.currentTime;
    _this.setData({
      time: currentTime,
      suffix: '秒后重发'
    })
    let interval = setInterval(function() {
      currentTime--;
      _this.setData({
        time: currentTime,
        suffix: '秒后重发'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        _this.setData({
          time: '重新发送',
          suffix: '',
          currentTime: 61,
          disabled: false
        })
      }
    }, 1000)
    wx.request({
      url: _this.data.host + '/rest/s1/Goods/mine/getCode',
      data: {
        cellphone: cellphone
      },
      method: 'get',
      success: function(res) {
        if (res.statusCode != 200) {
          wx.showToast({
            title: '网络异常，请稍后再试',
            icon: 'none',
            duration: 2000
          })
          return
        }
        wx.showToast({
          title: res.data.messages,
          icon: 'none',
          duration: 2000
        })
      },
      fail: function(res) {

      },
    })
  }
})