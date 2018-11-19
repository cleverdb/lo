// pages/mineCard/mineCard.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: [{ //假数据
      avatar: "../../images/na/0.jpg",
        courseName: "格斗健身课",
        tag: "中级，团操",
        coachName: "王教练",
        courseNum: 105,
        studentNum: 205
      },
      { //假数据
        avatar: "../../images/na/1.jpg",
        courseName: "踏板",
        tag: "初级，私教",
        coachName: "李教练",
        courseNum: 80,
        studentNum: 150
      },
      { //假数据
        avatar: "../../images/na/1.jpg",
        courseName: "动感单车",
        tag: "初级，团操",
        coachName: "李教练",
        courseNum: 150,
        studentNum: 300
      },
      { //假数据
        avatar: "../../images/na/2.jpg",
        courseName: "拳击",
        tag: "高级，私教",
        coachName: "陈教练",
        courseNum: 150,
        studentNum: 205
      },
      { //假数据
        avatar: "../../images/na/0.jpg",
        courseName: "体操",
        tag: "中级，团操",
        coachName: "王教练",
        courseNum: 150,
        studentNum: 205
      },
      { //假数据
        avatar: "../../images/na/3.jpg",
        courseName: "舞蹈",
        tag: "初级，团操",
        coachName: "马教练",
        courseNum: 150,
        studentNum: 300
      },
      { //假数据
        avatar: "../../images/na/5.jpg",
        courseName: "瑜伽",
        tag: "初级，团操",
        coachName: "刘教练",
        courseNum: 134,
        studentNum: 223
      },
      { //假数据
        avatar: "../../images/na/5.jpg",
        courseName: "瑜伽",
        tag: "中级，私教",
        coachName: "刘教练",
        courseNum: 134,
        studentNum: 223
      },
      { //假数据
        avatar: "../../images/na/6.jpg",
        courseName: "柔道",
        tag: "初级，团操",
        coachName: "赵教练",
        courseNum: 100,
        studentNum: 150
      },
      { //假数据
        avatar: "../../images/na/0.jpg",
        courseName: "摔跤",
        tag: "高级，私教",
        coachName: "王教练",
        courseNum: 150,
        studentNum: 205
      },
      { //假数据
        avatar: "../../images/na/3.jpg",
        courseName: "舞蹈",
        tag: "高级，私教",
        coachName: "马教练",
        courseNum: 134,
        studentNum: 2234
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  // 滚动切换标签样式
  switchTab: function(e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function(e) {
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
  checkCor: function() {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  }
})