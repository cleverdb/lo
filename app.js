//app.js
App({
  onLaunch: function () {
    let _this = this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: _this.globalData.host + '/rest/s1/Goods/mine/autologin',
          data: { code: res.code},
          method: 'POST',
          success: function (res) {
            if (res.statusCode != 200 ) {
              return
            }
            if (res.data.data.openId) _this.globalData.openId = res.data.data.openId
            if (res.data.data.sessionKey) _this.globalData.sessionKey = res.data.data.sessionKey
            if (res.data.data.userInfo){
              _this.globalData.userInfo = res.data.data.userInfo
              _this.globalData.hasLogin = true       
            }
          },
          fail: function (res) {
          }
          })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res.authSetting['scope.userInfo'])
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.wUserInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    app_id: 'wx687f20a8752f6364',//wx7564b8b90db5388b
    sessionKey:'',
    openId:'',
    hasLogin:false,
    userInfo: {},
    wUserInfo:{},
    host:"https://liouwellness.com"
    //host: "http://192.168.1.104:8080"
  }
})