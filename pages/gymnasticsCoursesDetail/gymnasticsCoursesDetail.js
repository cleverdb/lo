// pages/gymnasticsCoursesDetail/gymnasticsCoursesDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    year: 2019,
    month: 12,
    columns: [
      {
        title: "日/01",
        key: "01",
      }, {
        title: "六/02",
        key: "02",
      }, {
        title: "五/03",
        key: "03",
      }, {
        title: "四/04",
        key: "04",
      }, {
        title: "三/05",
        key: "05",
      }, {
        title: "二/06",
        key: "06",
      }, {
        title: "一/06",
        key: "07",
      }
    ],
    data: [
      {
        "01": "11:00-12:00有课程",
        "02": "",
        "03": "11:00-12:00有课程",
        "04": "",
        "05": "",
        "06": "",
        "07": "",
        "08": "",
      },
      {
        "01": "11:00-12:00有课程",
        "02": "",
        "03": "11:00-12:00有课程",
        "04": "",
        "05": "",
        "06": "",
        "07": "",
        "08": "",
      },
      {
        "01": "11:00-12:00有课程",
        "02": "",
        "03": "11:00-12:00有课程",
        "04": "",
        "05": "",
        "06": "",
        "07": "",
        "08": "",
      },
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
  onbefore: function () {
    let { year, month } = this.data;
    if (month == 1) {
      this.setData({
        year: year - 1,
        month: 12
      })
    } else {
      this.setData({
        year: year,
        month: month - 1
      })
    }
  },
  onafter: function () {
    let { year, month } = this.data;
    if (month == 12) {
      this.setData({
        year: year + 1,
        month: 1
      })
    } else {
      this.setData({
        year: year,
        month: month + 1
      })
    }
  }
})