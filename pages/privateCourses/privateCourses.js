// pages/privateCourses/privateCourses.js
import Utils from '../../utils/util.js';
import { _apis } from '../../utils/urlConfig.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

    courseList: [],
    curriculum: {
      "1": "privateCoursesBuy1",
      "2": "privateCoursesBuy2",
    },
    host: app.globalData.host,
    host_j: app.globalData.host_j,
    queryParams: {
      pageIndex: 0,
      pageSize: 10,
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData()
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
    this.initData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.initData(true)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  courseTap: function (e) {
    let { buytype, id } = e.currentTarget.dataset;
    let { curriculum } = this.data;
    wx.navigateTo({
      url: `/pages/${curriculum['2']}/${curriculum['2']}?type=${buytype}&courseId=${id}`,
    })
    // switch (buytype) {
    //   case '1':
    //     wx.navigateTo({
    //       url: `/pages/${curriculum[buytype]}/${curriculum[buytype]}`,
    //     })
    //     break;
    //   case '2':
    //     wx.navigateTo({
    //       url: `/pages/${curriculum[buytype]}/${curriculum[buytype]}`,
    //     })
    //     break;
    // }
  },
  initData: function (down) {
    var _this = this
    wx.showLoading({
      title: '加载中...',
    })
    let params = _this.data.queryParams
    if (down) {
      params = {
        pageIndex: params.pageIndex + 1,
        ...params
      }
    }
    wx.request({
      url: app.globalData.host + _apis.private_Courses,
      // data: params,
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
            'courseList': res.data.data.map((item) => {
              return {
                id: item.courseId,
                hot: item.hot,
                buyType: item.experience == "1" ? "1" : "2",
                title: item.courseName,
                imgSrc: app.globalData.host + item.courseNavPic
              }
            }),
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
        wx.hideLoading()
      }
    })
  }
})