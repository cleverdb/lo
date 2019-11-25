// pages/mineInfo/mineInfo.js
import Utils from '../../utils/util.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{},
    wUser:{},
    sexArr:[],
    targetArr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let userInfo = app.globalData.userInfo
    if(userInfo.birthDate){
      userInfo.birthDate = Utils.formatTimestampToDate(userInfo.birthDate)
    }
    this.setData({
      user:userInfo,
      wUser: app.globalData.wUserInfo
    })
    this.loadSex()//加载健身目标
    this.loadTarget()//加载性别
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
  bindDateChange: function(e) {
    this.setData({
      birthDate: e.detail.value
    })
  },
  calculateBmi:function(){
    let weight = this.data.user.weight
    let height = this.data.user.height
    if (weight && height){
      let bmi = (weight / Math.pow(height / 100, 2)).toFixed(2)
      this.setData({
        'user.bmi': bmi
      })
    }
  },
  changPhoto: function() {},
  initData: function (params) {
    const _this = this
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      data: params,
      method: 'GET',
      url: app.globalData.host + '/rest/s1/Goods/mine/getInfo',
      success: function (res) {
        let result = res.data.data
        result.birthDate = Utils.formatTimestampToDate(result.birthDate)
        _this.setData({
          user: result
        })
      },
      fail: function (res) {

      },
      complete: function () {
        wx.hideLoading()
      }
    })
  },
  loadSex:function(){ // 健身目标
    let _this = this
    wx.request({
      data: { enumTypeId: 'ExerciseTarget'},
      method: 'GET',
      url: app.globalData.host + '/rest/s1/Goods/enum/getEnum',
      complete: function (res) {
        let result = res.data.data
        _this.setData({
          sexArr: result
        })
      }
    })
  },
  loadTarget:function(){
    let _this = this
    wx.request({
      data: { enumTypeId: 'SexEnum' },
      method: 'GET',
      url: app.globalData.host + '/rest/s1/Goods/enum/getEnum',
      complete: function (res) {
        let result = res.data.data
        _this.setData({
          targetArr: result
        })
      }
    })
  },
  nickNameEven:function(e){
    let value = e.detail.value
    this.setData({
      'user.nickName': value
    })
  },
  heightEven: function (e) {
    let value = e.detail.value
    this.setData({
      'user.height': value
    })
    this.calculateBmi()
  },
  weightEven: function (e) {
    let value = e.detail.value
    this.setData({
      'user.weight': value
    })
    this.calculateBmi()
  }, 
  bmiEven: function (e) {
    let value = e.detail.value
    this.setData({
      'user.bmi': value
    })
  },
  cellphoneEven: function (e) {
    let value = e.detail.value
    this.setData({
      'user.cellphone': value
    })
  },
  // 这是 健身目标
  sexChange: function (e) {
    let value = e.detail.value;
    console.log(value);
    let slect = this.data.sexArr[value];
    console.log(this.data.sexArr,slect);
    this.setData({
      'user.sex': slect.enumId,
      'user.sexName': slect.description
    })
  },
  birthDateChange: function (e) {
    let value = e.detail.value
    this.setData({
      'user.birthDate': value
    })
  },
  // 这是 性别
  targetChange: function (e) {
    let value = e.detail.value;
    let slect = this.data.targetArr[value];
    console.log(this.data.targetArr);
    this.setData({
      'user.targetEnumId': slect.enumId,
      'user.targetEnumName': slect.description
    })
  },
  saveTap:function(){
    const _this = this
    wx.request({
      data: _this.data.user,
      method: 'PUT',
      url: app.globalData.host + '/rest/s1/Goods/mine/updateInfo',
      complete: function (res) {
        var title = '更新成功'
        var icon = 'success'
        if (res.statusCode != 200){
          title = '更新失败'
          icon = 'error'
        }else{
          app.globalData.userInfo = _this.data.user
        }
        wx.showToast({
          title: title,
          icon: 'none',
          duration: 2000,  
        })      
      }
    })
  }
})