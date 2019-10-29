// pages/publicCourses/publicCourses.js
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
        besel: true
      }, {
        "id": "2",
        title: "已结束",
        besel: false
      }
    ],
    runningList: [
      {
        imgSrc: "../../images/activity.png",
        title: "野蛮人障碍赛",
        currentNum: '20',
        totalNum: '50',
        date: "2019.10.09 周一 10:30-11:20",
        content: "从1kg至50kg,提升肌肉控制能力，矫正萨迪克江安河肯德基安环科送达回单卡建行卡号数据库的"
      },
      {
        imgSrc: "../../images/activity.png",
        title: "野蛮人障碍赛",
        currentNum: '20',
        totalNum: '50',
        date: "2019.10.09 周一 10:30-11:20",
        content: "从1kg至50kg,提升肌肉控制能力，矫正ji'xing"
      }
    ],
    doneList: [
      {
        imgSrc: "../../images/activity.png",
        title: "野蛮人障碍赛",
        currentNum: '20',
        totalNum: '50',
        date: "2019.10.09 周一 10:30-11:20",
        content: "从1kg至50kg,提升肌肉控制能力，矫正ji'xing"
      },
      {
        imgSrc: "../../images/activity.png",
        title: "野蛮人障碍赛",
        currentNum: '20',
        totalNum: '50',
        date: "2019.10.09 周一 10:30-11:20",
        content: "从1kg至50kg,提升肌肉控制能力，矫正ji'xing"
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
  tabsChange: function (e) {
    let { id } = e.currentTarget.dataset;
    console.log('78', id)
    let { tabsList } = this.data;
    let data = tabsList.map((item) => {
      if (item.id == id) {
        item.besel = true
      } else {
        item.besel = false
      }
      return item;
    })
    console.log('125', id)
    this.setData({
      tabsList: data,
      besel: id
    })
  }
})