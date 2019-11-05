import Utils from '../../utils/util.js';
import { _apis } from '../../utils/urlConfig.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curriculum: {
      "1": "privateCourses",
      "2": "publicCourses",
      "3": "gymnasticsCourses",
    },
    disabledBg: false,
    host: app.globalData.host,
    moreFlag: false,
    courseList: [],
    queryParams: {
      pageIndex: 0,
      pageSize: 10,
    },

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    _this.initData()
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
  onDetailPage: function (e) {
    console.log('57', e)
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let currentPageIndex = this.data.queryParams.pageIndex
    this.setData({
      courseList: [],
      moreFlag: false
    })
    this.setData({
      "queryParams.pageIndex": 0
    })
    this.initData(this.data.queryParams)
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.moreFlag) {
      return;
    }
    let currentPageIndex = this.data.queryParams.pageIndex
    this.setData({
      "queryParams.pageIndex": ++currentPageIndex
    })
    this.loadMoreData(this.data.queryParams)

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  courseTap: function (e) {

    let { type } = e.currentTarget.dataset;
    let { curriculum } = this.data
    wx.navigateTo({
      url: `/pages/gymnasticsCoursesDetail/gymnasticsCoursesDetail`,
    });
  },
  initData: function () {
    var _this = this
    wx.showLoading({
      title: '加载中...',
    })
    let params = _this.data.queryParams
    wx.request({
      url: app.globalData.host + _apis.Goods_getCourse,
      data: params,
      method: 'GET',
      success: function (res) {
        if (true) {
          res.data.data = [
            {
              iconUrl: "http://localhost:8091/static/a.png",
              courseName: "动态操厅",
              courseType: "1",

              tags: [
                {
                  id: "1",
                  title: "增肌减脂"
                }, {
                  id: "2",
                  title: "强健体质"
                }
              ],
              id: '1'
            }, {
              iconUrl: "http://localhost:8091/static/a.png",
              courseName: "瑜伽厅",
              courseType: "3",
              tags: [
                {
                  id: "1",
                  title: "增肌减脂"
                }, {
                  id: "2",
                  title: "强健体质"
                }
              ],
              id: '1'
            }, {
              iconUrl: "http://localhost:8091/static/a.png",
              courseName: "单车厅",
              courseType: "2",
              tags: [
                {
                  id: "11",
                  title: "增肌减脂"
                }, {
                  id: "21",
                  title: "强健体质"
                }
              ],
              id: '2'

            }
          ]
        }
        // res.statusCode != 200
        if (false) {
          _this.setData({
            pageState: {
              message: '加载失败，请重新加载~',
              state: 'error'
            }
          })
        } else {
          _this.setData({
            'courseList': res.data.data,
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
  },
  loadMoreData: function (param) {
    var _this = this
    wx.request({
      url: app.globalData.host + '/rest/s1/Goods/course/getCourse',
      data: param,
      method: 'POST',
      success: function (res) {
        let result = res.data.data
        if (result.length == 0) {
          _this.setData({
            moreFlag: true,
          })
          return
        }
        if (result.length == 10) {
          _this.setData({
            'courseList': _this.data.courseList.concat(result),
          })
          return
        }
        if (0 < result.length < 10) {
          _this.setData({
            'courseList': _this.data.courseList.concat(result),
            moreFlag: true,
          })
          return
        }
      },
      fail: function (res) {

      },
      complete: function () { }
    })
  }
})