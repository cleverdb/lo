// pages/gymnasticsCoursesDetail/gymnasticsCoursesDetail.js
import Utils from '../../utils/util.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    year: 2019,
    month: 12,
    host: app.globalData.host,
    personDetail: {
      name: "宋亚如",
      goods: "擅长：减脂，增肌",
      detail: "拳在英文当中为KWON，意为以拳头打击：而道的英文发音是Do,是指代表道行、礼仪修行的艺术。跆拳道是现代奥运会正式而道的英文发音为Do"
    },
    descript: {
      title: "身心平衡",
      subheading: "燃脂指数",
      mark1: "4",
      mark2: "5",
      details: "拳在英文当中为KWON,意为拳头打击:而道的英文发音为Do,是指代表道行、礼仪修炼的艺术。跆拳道是现代运动会正式而道的英文发音为Do,是指代表道行、礼仪修炼的艺术。"
    },
    data: [
      {
        title: "日/01",
        data: [
          [{
            "courseId": "100004",
            "courseName": "跆拳道",
            "coachName": "李美丽",
            "startTime": "18:50",
            "endTime": "12:45",
            "coursePlanId": "100055",
          }, {
            "courseId": "100005",
            "courseName": "跆拳道",
            "coachName": "李美丽",
            "startTime": "18:50",
            "endTime": "12:45",
            "coursePlanId": "100059",
          }],
          [],
          [{
            "courseId": "100006",
            "courseName": "跆拳道",
            "coachName": "李美丽",
            "startTime": "18:50",
            "endTime": "12:45",
            "coursePlanId": "100055",
          }, {
            "courseId": "100007",
            "courseName": "跆拳道",
            "coachName": "李美丽",
            "startTime": "18:50",
            "endTime": "12:45",
            "coursePlanId": "100055",
          }],
          []
        ],
      }, {
        title: "六/02",
        data: [
          [{
            "courseId": "150011",
            "courseName": "跆拳道",
            "coachName": "李美丽",
            "startTime": "18:50",
            "endTime": "12:45",
            "coursePlanId": "100055",
          }, {
            "courseId": "140012",
            "courseName": "跆拳道",
            "coachName": "李美丽",
            "startTime": "18:50",
            "endTime": "12:45",
            "coursePlanId": "100059",
          }],
          [],
          [{
            "courseId": "130012",
            "courseName": "跆拳道",
            "coachName": "李美丽",
            "startTime": "18:50",
            "endTime": "12:45",
            "coursePlanId": "100055",
          }, {
            "courseId": "120034",
            "courseName": "跆拳道",
            "coachName": "李美丽",
            "startTime": "18:50",
            "endTime": "12:45",
            "coursePlanId": "100055",
          }],
          []
        ]
      }, {
        title: "五/03",
        data: [
          [{
            "courseId": "100061",
            "courseName": "跆拳道",
            "coachName": "李美丽",
            "startTime": "18:50",
            "endTime": "12:45",
            "coursePlanId": "100055",
          }, {
            "courseId": "100052",
            "courseName": "跆拳道",
            "coachName": "李美丽",
            "startTime": "18:50",
            "endTime": "12:45",
            "coursePlanId": "100059",
          }],
          [],
          [{
            "courseId": "100042",
            "courseName": "跆拳道",
            "coachName": "李美丽",
            "startTime": "18:50",
            "endTime": "12:45",
            "coursePlanId": "100055",
          }, {
            "courseId": "100044",
            "courseName": "跆拳道",
            "coachName": "李美丽",
            "startTime": "18:50",
            "endTime": "12:45",
            "coursePlanId": "100055",
          }],
          []
        ],
      }, {
        title: "四/04",
        data: [
          [{
            "courseId": "100811",
            "courseName": "跆拳道",
            "coachName": "李美丽",
            "startTime": "18:50",
            "endTime": "12:45",
            "coursePlanId": "100055",
          }, {
            "courseId": "100712",
            "courseName": "跆拳道",
            "coachName": "李美丽",
            "startTime": "18:50",
            "endTime": "12:45",
            "coursePlanId": "100059",
          }],
          [],
          [{
            "courseId": "100612",
            "courseName": "跆拳道",
            "coachName": "李美丽",
            "startTime": "18:50",
            "endTime": "12:45",
            "coursePlanId": "100055",
          }, {
            "courseId": "100534",
            "courseName": "跆拳道",
            "coachName": "李美丽",
            "startTime": "18:50",
            "endTime": "12:45",
            "coursePlanId": "100055",
          }],
          []
        ],
      }, {
        title: "三/05",
        data: [
          [{
            "courseId": "100411",
            "courseName": "跆拳道",
            "coachName": "李美丽",
            "startTime": "18:50",
            "endTime": "12:45",
            "coursePlanId": "100055",
          }, {
            "courseId": "100312",
            "courseName": "跆拳道",
            "coachName": "李美丽",
            "startTime": "18:50",
            "endTime": "12:45",
            "coursePlanId": "100059",
          }],
          [],
          [{
            "courseId": "100212",
            "courseName": "跆拳道",
            "coachName": "李美丽",
            "startTime": "18:50",
            "endTime": "12:45",
            "coursePlanId": "100055",
          }, {
            "courseId": "100134",
            "courseName": "跆拳道",
            "coachName": "李美丽",
            "startTime": "18:50",
            "endTime": "12:45",
            "coursePlanId": "100055",
          }],
          []
        ],
      }, {
        title: "二/06",
        data: [
          [],
          [],
          [],
          []
        ],
      }, {
        title: "一/07",
        data: [
          [],
          [],
          [],
          []
        ],
      }

    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { courseAreaId} = options;
    const nowDay = Utils.formatDate(new Date());
    this.initData({ courseAreaId, startDate: nowDay});
  },
  initData:function(param){
    var _this = this;
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: `${app.globalData.host}/rest/s1/Goods/course/group`,
      data:param,
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
            data:res.data.data
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
  },
  onnext: function () {

  }
})