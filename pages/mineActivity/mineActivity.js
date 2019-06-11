// pages/activity/activity.js
import Utils from '../../utils/util.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: "",
    loadMore: true,
    host: app.globalData.host,
    statusType: ["进行中", "历史活动"],
    showloading: false,
    navbarActiveIndex: 0,
    navbarPage: [{
        pageIndex: 0,
        pageSize: 10,
        moreFlag: false,
        init: false,
      },
      {
        pageIndex: 0,
        pageSize: 10,
        moreFlag: false,
        init: false,
      }
    ],
    activityArr: [
      [],
      []
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.initDoingData(true)
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
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function(res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 100;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
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
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 点击导航栏
   */
  onNavBarTap: function(event) {
    // 获取点击的navbar的index
    var navbarTapIndex = event.currentTarget.dataset.navbarIndex;
    // 设置data属性中的navbarActiveIndex为当前点击的navbar
    this.setData({
      navbarActiveIndex: navbarTapIndex
    })
  },

  /**
   * tab切换触发
   */
  onBindChange: function(e) {
    let _this = this;
    let navbarIndex = e.detail.current
    // 设置data属性中的navbarActiveIndex为当前点击的navbar
    this.setData({
      navbarActiveIndex: navbarIndex
    })
    if (_this.data.navbarPage[navbarIndex].init) return
    if (navbarIndex == 0) {
      _this.initDoingData(true)
    } else {
      _this.initDidData(true)
    }
  },
  loadMore: function() {
    if (!this.data.loadMore) {
      return
    } else {
      this.setData({
        loadMore: false
      })
    }
    const navbarActiveIndex = this.data.navbarActiveIndex
    if (this.data.navbarPage[navbarActiveIndex].moreFlag) {
      return
    }
    let currentPageIndex = this.data.navbarPage[navbarActiveIndex].pageIndex
    if (navbarActiveIndex == 0) {
      this.setData({
        "navbarPage[0].pageIndex": ++currentPageIndex
      })
      this.initDoingData()
    } else {
      this.setData({
        "navbarPage[1].pageIndex": ++currentPageIndex
      })
      this.initDidData()
    }
    this.setData({
      loadMore: true
    })
  },
  initDoingData: function(showLoading) {
    const _this = this
    let pageParam = this.data.navbarPage[0]
    const params = {
      pageSize: pageParam.pageSize,
      pageIndex: pageParam.pageIndex,
      userId: app.globalData.userInfo.userId
    }
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: _this.data.host + '/rest/s1/Goods/activity/getMineDoing',
      data: params,
      method: 'GET',
      success: function(res) {
        let result = res.data.data
        if (result.length == 0) {
          _this.setData({
            'navbarPage[0].moreFlag': true
          })
          return
        }
        let perfect_result = _this.dataHandler(result)
        let activity = _this.data.activityArr[0].concat(perfect_result)
        _this.setData({
          'activityArr[0]': activity,
          'navbarPage[0].init': true
        })

      },
      fail: function(res) {

      },
      complete: function() {
        wx.hideLoading()
      }
    })
  },
  initDidData: function() {
    const _this = this
    let pageParam = this.data.navbarPage[1]
    const params = {
      pageSize: pageParam.pageSize,
      pageIndex: pageParam.pageIndex,
      userId: app.globalData.userInfo.userId
    }
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: _this.data.host + '/rest/s1/Goods/activity/getMineDid',
      data: params,
      method: 'GET',
      success: function(res) {
        let result = res.data.data
        if (result.length == 0) {
          _this.setData({
            'navbarPage[1].moreFlag': true
          })
          return
        }
        let perfect_result = _this.dataHandler(result)
        let activity = _this.data.activityArr[1].concat(perfect_result)
        _this.setData({
          'activityArr[1]': activity,
          'navbarPage[1].init': true
        })

      },
      fail: function(res) {

      },
      complete: function() {
        wx.hideLoading()
      }
    })
  },
  goActivity: function(e) {
    var activityId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/activityDetail/activityDetail?activityId=' + activityId,
    })
  },
  dataHandler: function(data) {
    data.forEach(item => {
      item.date = Utils.formatTimestampToDate(item.startTime)
      item.startTime = Utils.formatTimestampToTime(item.startTime)
      item.endTime = Utils.formatTimestampToTime(item.endTime)
    })
    return data
  }
})