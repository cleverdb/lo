// pages/practiceCourses/practiceCourses.js
const dat = {
  address: "北京市朝阳区奥林匹克公园",
  courseBg: "活动背景：这部分内容应根据策划书的特点在以下项目中选取内容重点阐述，具体项目有：基本情况简介、主要执行对象、近期状况、组织部门、活动开展原因、社会影响、以及相关目的动机。其次应说明问题的环境特征，主要考虑环境的内在优势、弱点、机会及威胁等因素，对其作好全面的分析（SWOT分析），将内容重点放在环境分析的各项因素上，对过去现在的情况进行详细的描述，并通过对情况的预测制定计划。如环境不明，则应该通过调查研究等方式进行分析加以补充。",
  courseId: "100051",
  courseName: "野蛮人障碍赛",
  createDate: 1572625308102,
  createUser: "John Doe",
  currentNum: 2,
  endTime: 1573536600000,
  joinType: "报名类型：作为策划的正文部分，表现方式要简洁明了，使人容易理解，但表述方面要力求详尽，写出每一点能设想到的东西，没有遗漏。在此部分中，不仅仅局限于用文字表述，也可适当加入统计图表等。对策划的各工作项目，应按照时间的先后顺序排列，绘制实施时间表有助于方案核查。人员的组织配置、活动对象、相应权责及时间地点也应在这部分加以说明，执行的应变程序也应该在这部分加以考虑。",
  lastUpdatedStamp: 1573659694070,
  latitude: 39.882765,
  longitude: 116.398981,
  maxNum: 30,
  navPicUrl: "/static/images/course/course_pulic_1572625308302.png",
  picUrl: "/static/images/course/course_pulic_1572625308649.png",
  place: "力偶健身俱乐部",
  startTime: 1576123200000,
  status: "Y",
  storeId: "100000",
  storeName: "力偶健身乐城店",
  unitPrice: 100,
  updateDate: 1572625308119,
  updateUser: "John Doe",
}
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
    address: "北京市朝阳区奥林匹克公园",
    storeName: "力偶健身乐城店",
    storePhone:'18515111012',
    host: app.globalData.host,
    courseName: "野蛮人障碍赛",
    navPicUrl: "/static/images/course/course_pulic_1572625308302.png",
    courseBg: "活动背景：这部分内容应根据策划书的特点在以下项目中选取内容重点阐述，具体项目有：基本情况简介、主要执行对象、近期状况、组织部门、活动开展原因、社会影响、以及相关目的动机。其次应说明问题的环境特征，主要考虑环境的内在优势、弱点、机会及威胁等因素，对其作好全面的分析（SWOT分析），将内容重点放在环境分析的各项因素上，对过去现在的情况进行详细的描述，并通过对情况的预测制定计划。如环境不明，则应该通过调查研究等方式进行分析加以补充。",
    joinType: "报名类型：作为策划的正文部分，表现方式要简洁明了，使人容易理解，但表述方面要力求详尽，写出每一点能设想到的东西，没有遗漏。在此部分中，不仅仅局限于用文字表述，也可适当加入统计图表等。对策划的各工作项目，应按照时间的先后顺序排列，绘制实施时间表有助于方案核查。人员的组织配置、活动对象、相应权责及时间地点也应在这部分加以说明，执行的应变程序也应该在这部分加以考虑。",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { storeName,address } = this.data;
    app.globalData.selectStore = [{
      latitude: 39.882765,
      longitude: 116.398981,
      storeName,
      address
    }]
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
    
  },
  hideModalTap: function () {
    this.setData({
      isShow:false
    })
  },
  // 地图
  storeAddressTap: function () {
    wx.navigateTo({
      url: '/pages/stores/stores'
    });
  },
  // 电话
  phoneTap: function () {
    wx.makePhoneCall({
      phoneNumber: storePhone,
    })
  }
})