// pages/mineAppointment/mineAppointment.js
import Utils from '../../utils/util.js'
const app = getApp()
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
    array_time: ['12:00-13:00', '12:00-13:00', '12:00-13:00', '12:00-13:00'],
    timeDataSelected:-1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let nowDay = Utils.formatDate(new Date())
    this.dateInit();
    this.setData({
      year: year,
      month: month,
      selectedDay: nowDay,
      isToday: nowDay
    })
    this.initData({
      userId: app.globalData.userInfo.userId,
      startDate: nowDay,
      endDate: Utils.plusDate(nowDay, 1)
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

  dateTap: function (e) {
    const { selectedDay } = this.data;
    console.log(selectedDay);
    let selectDate = e.currentTarget.dataset.date;
    if (selectDate == undefined) {
      return;
    }
    this.setData({
      selectedDay: selectDate,
    })
    this.initData({
      userId: app.globalData.userInfo.userId,
      startDate: selectDate,
      endDate: Utils.plusDate(selectDate, 1)
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
      month: (month + 1)
    })
    this.dateInit(year, month);
  },
  nextMonth: function () {
    let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    let month = this.data.month > 11 ? 0 : this.data.month;
    this.setData({
      year: year,
      month: (month + 1)
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
      method: 'GET',
      url: app.globalData.host + '/rest/s1/Goods/appointment/getAppointment',
      success: function (res) {
        let result = res.data.data
        result.forEach(item => {
          item.startTime = item.startTime.substr(11, 5)
          item.endTime = item.endTime.substr(11, 5)
        })
        _this.setData({
          appointmentList: result
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
    console.log(item);
  },
  // 立即预约的点击事件
  reserveTap: function () {
    wx.showModal({
      title: '请确认预约信息',
      content: '2012.10.12 周2\r\n12:00-13:00\r\n常规课-刘石磊\r\n在“我的-我的课程”中查看',
      confirmColor: '#FCC800',
      success(res) {
        console.log(res);
      }
    })
  }
  
})