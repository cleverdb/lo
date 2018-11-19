// pages/mineTicket/mineTicket.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusType: ["已使用", "未使用", "已过期"],
    navbarActiveIndex:0,
    winHeight:"",
    ticketList:[
      {
        "name":"新手见面礼",
        "price":50,
        "endDate":"2018-12-12",
        "holdStore":"通用"
      },
      {
        "name": "新手见面礼",
        "price": 80,
        "endDate": "2018-12-12",
        "holdStore": "通用"
      },
      {
        "name": "新手见面礼",
        "price": 100,
        "endDate": "2018-12-12",
        "holdStore": "通用"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 330;
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
  /**
   * 点击导航栏
   */
  onNavBarTap: function (event) {
    // 获取点击的navbar的index
    let navbarTapIndex = event.currentTarget.dataset.navbarIndex
    // 设置data属性中的navbarActiveIndex为当前点击的navbar
    this.setData({
      navbarActiveIndex: navbarTapIndex
    })
  },
  /**
   * 
   */
  onBindChange: function (e) {
    // 设置data属性中的navbarActiveIndex为当前点击的navbar
    this.setData({
      navbarActiveIndex: e.detail.current
    })
  },
  footerTap: app.footerTap
})