// pages/mineCourse/mineCourse.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    wx.showLoading({
      title: '加载中...',
    });
    if (app.globalData.userInfo.userId) {
      this.setData({
        pageState: {}
      })
    } else {
      _this.setData({
        pageState: {
          message: '请先登陆/注册哟~',
          state: 'unlogin'
        }
      });
      return;
    }
    wx.request({
      url: `${app.globalData.host}/rest/s1/Goods/mine/course`,
      data: {
        userId: app.globalData.userInfo.userId
      },
      success: function (res) {
        let result = res.data.data;
        if (res.statusCode != 200) {
          _this.setData({
            pageState: {
              message: '加载失败，请重新加载~',
              state: 'error'
            }
          })
        } else {
          console.log(result);
          _this.setData({
            data: result
          })
        }
      },
      fail: function (res) {
        _this.setData({
          pageState: {
            message: '请检查您的网络连接~',
            state: 'error'
          }
        })
      },
      complete: function () {
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
  // 点击 查看详情 还是 预约
  courseTap: function (e) {
    const { item } = e.currentTarget.dataset;
    const { id, remaining, courseId, coachName, courseName, orderid } = item;
    const url = remaining > 0 ?
      `/pages/reserveTime/reserveTime?courseId=${courseId}&coachName=${coachName}&courseName=${courseName}&id=${id}` :
      `/pages/mineCouresDetail/mineCouresDetail?id=${id}`;
    wx.navigateTo({
      url
    });
  }
})