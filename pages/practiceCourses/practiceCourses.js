// pages/practiceCourses/practiceCourses.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    titleList: {
      typename: "常规课",
      price: "4/5",
      name: "LIOU健身俱乐部动感单车厅",
      startTime: "10月12日 19:30-20:30",
      imgSrc1: "../../images/icon/address-ok.png",
      imgSrc2: "../../images/icon/address-ok.png",
      imgSrc3: "../../images/icon/address-ok.png",

    },
    activeList: [
      {
        title: "报名类型",
        content: "精英选手：达到2017年”北京马拉松星级评定“九星标准和八星标准（男女前十名）的选手。选手名单以北京马拉松官网公布为准。\n直通选手完成报名后，须在规定时间内进行缴费"
      }, {
        title: "活动背景",
        content: "精英选手：达到2017年”北京马拉松星级评定“九星标准和八星标准（男女前十名）的选手。选手名单以北京马拉松官网公布为准。\n直通选手完成报名后，须在规定时间内进行缴费"
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
  onshare: function () {
    this.setData({
      isShow: true
    })
  }
})