// pages/fitnessCoachDetail/fitnessCoachDetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [1, 2, 3, 4, 5],
    host: app.globalData.host,
    serviceLevel: 0,
    honor:'',
    userFullName:'',
    pageSize: 10,
    pageIndex: 0,
    userId: '',
    workLong:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { userId } = options;
    const { pageSize, pageIndex} = this.data;
    const _this = this;
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: `${app.globalData.host}/rest/s1/Goods/coach/getCoachDetail`,
      data: {
        userId,
        pageSize,
        pageIndex
      },
      success: function (res) {
        if (res.statusCode != 200) {
          _this.setData({
            pageState: {
              message: '加载失败，请重新加载~',
              state: 'error'
            }
          })
        } else {
          const { data } = res;
          const { serviceLevel, honor, userId, userFullName, workLong, iconUrl } = data.data;
          _this.setData({
            serviceLevel,
            honor,
            userFullName,
            userId,
            workLong,
            iconUrl,
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
  bindPickerChange:function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value,e.detail);
    // 跳转到正式课程
    wx.navigateTo({
      url: `/pages/privateCoursesBuy2/privateCoursesBuy2`,
    })
  }
})