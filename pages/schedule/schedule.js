// pages/mineCard/mineCard.js
import Utils from '../../utils/util.js'
// const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    year: 0,
    month: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    // host: app.globalData.host,
    selectedDay: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let nowDay = Utils.formatDate(new Date());
    this.dateInit();
    this.setData({
      year: year,
      month: month,
      selectedDay: nowDay,
      isToday: nowDay
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
    // 
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.hideModal()
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
    // let { besel, runningPageIndex, donePageIndex } = this.data;
    // const param = besel === '1' ? {
    //   pageIndex: ++runningPageIndex
    // } : {
    //     pageIndex: ++donePageIndex
    //   };
    // const dataParam = besel === '1' ? {
    //   runningPageIndex
    // } : {
    //     donePageIndex
    //   };
    // this.setData(dataParam)
    // this.loadMoreData({
    //   ...param,
    // });
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
  tapChange: function (e) {
    const { id } = e.currentTarget.dataset;
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    this.setData({
      tabsIndex: id,
      year,
      month,
      selectedDay: Utils.formatDate(new Date()),
      showData: false
    });
    this.dateInit();
  },
  
  // 展示全部的日期
  showDataTap: function () {
    const { showData } = this.data;
    this.setData({
      showData: !showData
    })
  },
  // 课程预约的点击事件
  
  
  // 选时间段的 点击事件
  timeClick: function (e) {
    const { id, timeitem } = e.currentTarget.dataset;
    const { timeDataSelected } = this.data;
    this.setData({
      timeDataSelected: id == timeDataSelected ? -1 : id,
      timeitem: id == timeDataSelected ? {} : timeitem
    })
  },
  
})