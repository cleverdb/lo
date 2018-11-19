// pages/activity/activity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: "",
    statusType: ["全部活动","进行中", "历史活动"],
    navbarActiveIndex: 0,
    activityList:[[
      {
        activityId:'001',
        activityPhoto:'/images/act/1.jpg',
        activityName:"即时 JISHI",
        description:"即时即刻，集合运动，健康生活需求的社区平台,carpe diem! Make your life extraordinary",
        activityDate:"",
        activityAdress:"",
        activitySotre:"",
        activityStatus:0
      },
      {
        activityId: '002',
        activityPhoto: '/images/act/2.jpg',
        activityName: "福利课程 单车和瑜伽",
        // description: "",
        activityDate: "10月15日 周二 19:00-20:00",
        activityAdress: "",
        activitySotre: "Space Sycle 国贸店",
        activityStatus: 1
      }, 
      {
        activityId: '003',
        activityPhoto: '/images/act/1.jpg',
        activityName: "即时 JISHI",
        description: "即时即刻，集合运动，健康生活需求的社区平台,carpe diem! Make your life extraordinary,即时即刻，集合运动，健康生活需求的社区平台,carpe diem! Make your life extraordinary,即时即刻，集合运动，健康生活需求的社区平台,carpe diem! Make your life extraordinary",
        activityDate:"12月25日 周六 19:00-20:00",
        activityAdress: "",
        activitySotre: "Space Sycle 国贸店",
        activityStatus: 0
      }, {
        activityId: '004',
        activityPhoto: '/images/act/2.jpg',
        activityName: "福利课程 单车和瑜伽",
        description: "即时即刻，集合运动，健康生活需求的社区平台,单车运动，简单暴力,carpe diem! Make your life extraordinary",
        activityDate: "10月15日 周二 19:00-20:00",
        activityAdress: "",
        activitySotre: "Space Sycle 国贸店",
        activityStatus: 1
      }, {
        activityId: '005',
        activityPhoto: '/images/act/2.jpg',
        activityName: "福利课程 单车和瑜伽",
        description: "即时即刻，集合运动，健康生活需求的社区平台,单车运动，简单暴力,carpe diem! Make your life extraordinary",
        activityDate: "10月15日 周二 19:00-20:00",
        activityAdress: "",
        activitySotre: "Space Sycle 国贸店",
        activityStatus: 1
      }, 
    ], [{
      activityId: '001',
      activityPhoto: '/images/act/1.jpg',
      activityName: "即时 JISHI",
      description: "即时即刻，集合运动，健康生活需求的社区平台,carpe diem! Make your life extraordinary",
      // activityDate:"12月25日 周六 19:00-20:00",
      activityAdress: "",
      activitySotre: "",
      activityStatus: 0
      },
      {
          activityId: '003',
          activityPhoto: '/images/act/1.jpg',
          activityName: "即时 JISHI",
          description: "即时即刻，集合运动",
          activityDate: "12月25日 周六 19:00-20:00",
          activityAdress: "",
          activitySotre: "Space Sycle 国贸店",
          activityStatus: 0
        }],[
        ]]
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
        var calc = clientHeight * rpxR - 180;
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
  goActivity:function(e){
    var activityId= e.currentTarget.id
    wx.navigateTo({
      url: '/pages/activityDetail/activityDetail?activityId=' + activityId,
    })
  }
})