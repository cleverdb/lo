// pages/publicCourses/publicCourses.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    besel: "1",
    tabsList: [
      {
        "id": "1",
        title: "进行中",
      }, {
        "id": "2",
        title: "已结束",
      }
    ],
    runningList: [],
    doneList: [],
    host: app.globalData.host,
    runningPageIndex: 0,
    runningPageSize:10,
    donePageIndex: 0,
    donePageSize: 10,
    besel:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      donePageIndex,
      donePageSize,
      runningPageIndex,
      runningPageSize,
    } = this.data;
    this.getDoingData({
      pageIndex:runningPageIndex,
      pageSize:runningPageSize
    });
    this.getDoneData({
      pageIndex:donePageIndex,
      pageSize:donePageSize
    });
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
  ondetail: function () {
    wx.navigateTo({
      url: `/pages/practiceCourses/practiceCourses`,
    })
  },
  tabsChange: function (e) {
    let { id } = e.currentTarget.dataset;
    this.setData({
      besel: id
    })
  },
  getDoingData: function (param) {
    const { runningList } = this.data;
    const _this = this;
    wx.showLoading({
      title: '加载中...',
    })
      wx.request({
        url: `${app.globalData.host}/rest/s1/Goods/course/public/doing`,
        data: param,
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
              runningList: [...runningList, ...res.data.data] 
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
  getDoneData: function (param) {
    const { doneList } = this.data;
    const _this = this;
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: `${app.globalData.host}/rest/s1/Goods/course/public/did`,
      data: param,
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
            doneList: [...doneList, ...res.data.data]
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
  }
})