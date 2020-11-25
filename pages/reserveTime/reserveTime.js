// pages/mineAppointment/mineAppointment.js
import Utils from '../../utils/util.js'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModalStatus: true,
    year: 0,
    month: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    isToday: 0,
    selectedDay: 0,
    appointmentList: [],
    selectItem: {},
    hideAlert: true,
    showModalStatus: false,
    array_time: [],
    timeDataSelected: -1,
    coachName: '',
    courseName:'',
    orderId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { courseId, coachName, courseName, orderId=undefined,id=undefined } = options;
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let nowDay = Utils.formatDate(new Date())
    this.dateInit();
    this.setData({
      year: year,
      month: month,
      selectedDay: nowDay,
      isToday: nowDay,
      coachName,
      courseName,
      courseId,
      orderId,
      id
    });
    this.initData({
      courseId,
      storeId: app.globalData.storeId,
      date: nowDay
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
    if (app.globalData.userInfo.userId) {
      this.setData({
        pageState: {}
      })
    } else {
      _this.setData({
        pageState: {
          message: '请先登陆/注册哟~',
          state: 'unlogin'
        }
      })
    }
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

  dateTap: function (e) {
    const { selectedDay, courseId } = this.data;
    console.log(selectedDay);
    let selectDate = e.currentTarget.dataset.date;
    if (selectDate == undefined) {
      return;
    }
    this.setData({
      selectedDay: selectDate,
      timeDataSelected:-1
    })
    this.initData({
      courseId,
      storeId: app.globalData.storeId,
      date: selectDate
    })
  },

  dateInit: function (setYear, setMonth) {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let dateArr = []; //需要遍历的日历数组数据
    let arrLen = 0; //dateArr的数组长度
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth(); //没有+1方便后面计算当月总天数
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    let startWeek = new Date(year + '/' + (month + 1) + '/' + 1).getDay(); //目标月1号对应的星期
    let dayNums = new Date(year, nextMonth, 0).getDate(); //获取目标月有多少天
    let obj = {};
    let num = 0;

    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    arrLen = startWeek + dayNums;
    for (let i = 0; i < arrLen; i++) {
      if (i >= startWeek) {
        num = i - startWeek + 1;
        obj = {
          isToday: [year, month + 1, num].map(Utils.formatNumber).join('-'),
          dateNum: num > 9 ? num : '0' + num
        }
      } else {
        obj = {};
      }
      dateArr[i] = obj;
    }
    this.setData({
      dateArr: dateArr
    })
  },
  lastMonth: function () {
    let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
    let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
    this.setData({
      year: year,
      month: (month + 1),
      timeDataSelected:-1
    })
    this.dateInit(year, month);
  },
  nextMonth: function () {
    let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    let month = this.data.month > 11 ? 0 : this.data.month;
    this.setData({
      year: year,
      month: (month + 1),
      timeDataSelected:-1
    })
    this.dateInit(year, month);
  },
  /**
   * 关闭提示框
   */
  closeAlert: function () {
    this.setData({
      showModalStatus: false,
      hideAlert: true
    })
  },
  initData: function (params) {
    const _this = this
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      data: params,
      url: `${app.globalData.host}/rest/s1/Goods/appointment/private/planlist`,
      success: function (res) {
        let result = res.data.data;
        _this.setData({
          array_time: result
        })
      },
      fail: function (res) {

      },
      complete: function () {
        wx.hideLoading()
      }
    })
  },
  /**
   * 点击取消按钮
   */
  cancelTap: function (e) {
    var _this = this
    let item = e.currentTarget.dataset.item
    this.setData({
      hideAlert: false,
      showModalStatus: true,
      selectItem: item
    })
  },
  // 选时间段的 点击事件
  timeClick: function (e) {
    const { id } = e.currentTarget.dataset;
    const { timeDataSelected } = this.data;
    this.setData({
      timeDataSelected: id == timeDataSelected ? -1 : id,
    })
  },
  // 立即预约的点击事件
  reserveTap: function () {
    const {
      courseName,
      coachName,
      timeDataSelected,
      array_time,
      selectedDay,
      orderId,
      id
    } = this.data;
    const { startTime, endTime, coursePlanId } = array_time[timeDataSelected];
    let startWeek = new Date(selectedDay).getDay(); //目标月1号对应的星期
    console.log(startWeek);
    const { userId } = app.globalData.userInfo;
    const data = orderId != undefined ? { orderId } : { id };
    wx.showModal({
      title: '请确认预约信息',
      content: `${selectedDay} 周${Utils.weekObj[startWeek]}\r\n${startTime}-${endTime}\r\n${courseName}-${coachName}\r\n在“我的-我的课程”中查看`,
      confirmColor: '#FCC800',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: `${app.globalData.host}/rest/s1/Goods/appointment/private`,
            method:'POST',
            data: {
              userId,
              appiontmentType: 'course_appointment',
              coursePlanId,
              ...data
            },
            success: function (res) {
              const { errorCode = '', messages, errors } = res.data;
              if (errorCode) {
                wx.showToast({
                  title: errors,
                  duration: 2000,
                  icon: 'none'
                })
                return
              }
              wx.showToast({
                title: messages,
                duration: 2000,
                icon: 'none'
              })
            }
          })
        }
      }
    })
    
  
  }
  
})