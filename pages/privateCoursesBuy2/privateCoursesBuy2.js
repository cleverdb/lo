// pages/privateCoursesBuy2/privateCoursesBuy2.js
import Utils from '../../utils/util.js';
import { _apis } from '../../utils/urlConfig.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ensure_buy: true,
    type: "1",
    courseId: "",
    total: "",
    teacherslist: [],
    data: {
      imgSrc: "",
      courseType: "",
      coursePrice: "",
      courseUnit: "",
      notice: []
    },
    num: 1,
    teacherSel: false,
    beSelTeacher: {

    },
    host: app.globalData.host,
    courseName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { courseName } = options;
    this.setData({
      courseName
    })
    // this.initData();
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
  ondel: function () {
    let { num, data: { coursePrice } } = this.data;
    num = num - 1
    if (num > 0) {
      this.setData({
        num: num,
        total: Utils.times(coursePrice, num)
      })
    }
  },
  onadd: function () {
    let { num, data: { coursePrice } } = this.data;
    num = num + 1
    this.setData({
      num: num,
      total: Utils.times(coursePrice, num)
    })
  },
  onItemSelTeacher: function (e) {
    let { id } = e.currentTarget.dataset;
    let { teacherslist } = this.data;

    this.setData({
      teacherslist: teacherslist.map((item) => {
        if (id == item.id) {
          item.besel = true
        } else {
          item.besel = false
        }
        return item;
      })
    })
  },
  onSelectTeacher: function () {
    this.setData({
      teacherSel: !this.data.teacherSel
    })
  },
  ensureTeacher: function () {
    let { teacherslist } = this.data;
    let data = teacherslist.find((item) => {
      return item.besel == true;
    });
    this.setData({
      beSelTeacher: data,
      teacherSel: false
    })
    // this.setData({
    //   teacherSel: !this.data.teacherSel
    // })
  },
  initData: function (down) {
    let pages = getCurrentPages();
    //数组中最后一个即当前路由，options是参数
    let { options } = pages.pop();
    this.setData({
      type: options.type,
      courseId: options.courseId
    })
    var _this = this
    wx.showLoading({
      title: '加载中...',
    })
    let params = _this.data.queryParams
    if (down) {
      params = {
        pageIndex: params.pageIndex + 1,
        ...params,
        ...options

      }
    }
    wx.request({
      url: app.globalData.host_j + _apis.private_Buy_sel_teachers,
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
            teacherslist: [
              ...res.data.data
            ],
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