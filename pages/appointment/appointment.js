// pages/mineCard/mineCard.js
import Utils from '../../utils/util.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    year: 0,
    month: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    tabArray: [{
        title: '私教',
        key:0
    }, {
        title: '操课',
        key:1
      }, {
        title: '活动',
        key:2
      }],
    tabsIndex: 0,
    showData:false,
    host: app.globalData.host,
    winHeight: "",
    modalVisible: false,
    timeDataSelected: -1,
    array_time: [],
    courseList: [],
    activeitem: {},
    groupArr: [], 
    isShow:false,
    selectedDay:'',
    besel: "1",
    tabsList: [
      {
        "id": "1",
        title: "进行中",
      }, {
        "id": "2",
        title: "已结束",
      }
    ],
    runningList: [],
    doneList: [],
    runningPageIndex: 0,
    donePageIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let nowDay = Utils.formatDate(new Date());
    const {
      donePageIndex,
      runningPageIndex,
    } = this.data;
    this.dateInit();
    this.setData({
      year: year,
      month: month,
      selectedDay: nowDay,
      isToday: nowDay
    })
    this.initData({
      userId: '100000',
    });
    this.getGroup({
      date: nowDay,
      storeId: '100000'
    });
    this.getDoingData({
      pageIndex: runningPageIndex,
    });
    this.getDoneData({
      pageIndex: donePageIndex,
    });
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
    const that = this;
    const { selectedDay} = this.data;
    if (this.data.pageState) {
      this.setData({
        pageState: {}
      })
      this.initData(),
      this.getGroup({
        date: selectedDay,
        storeId: '100000'
      })
    }
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 98;
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
  onHide: function() {
    this.hideModal()
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
    let { besel, runningPageIndex, donePageIndex } = this.data;
    const param = besel === '1' ? {
      pageIndex: ++runningPageIndex
    } : {
        pageIndex: ++donePageIndex
      };
    const dataParam = besel === '1' ? {
      runningPageIndex
    } : {
        donePageIndex
      };
    this.setData(dataParam)
    this.loadMoreData({
      ...param,
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  bindStoreChange: function(e) {
    let _this = this
    _this.setData({
      selectStore: _this.data.stores[e.detail.value]
    })
    _this.filtePlanDate()
  },
  bindDateChange: function(e) {
    let _this = this
    _this.setData({
      selectDate: _this.data.pickerDates[e.detail.value]
    })
    _this.filtePlanTime()
  },
  //预约
  appointmentTap: function(e) {
    var _this = this;
    this.setData({
      hideAlert: false,
      showModalStatus: false
    })
  },
  //显示对话框
  showModal: function(e) {
    var _this = this
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    _this.animation = animation
    animation.translateY(300).step()
    _this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function() {
      animation.translateY(0).step()
      _this.setData({
        animationData: animation.export()
      })
    }.bind(_this), 200)
  },
  //隐藏对话框
  hideModal: function() {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  /**
   * 关闭提示框
   */
  closeAlert: function() {
    this.setData({
      showModalStatus: false,
      hideAlert: true
    })
  },
  initData: function(param) {
    let _this = this;
    let userId = app.globalData.userInfo.userId
    // if (!userId) {
    //   this.setData({
    //     pageState: {
    //       message: '请先登陆/注册哟~',
    //       state: 'unlogin'
    //     }
    //   })
    //   return
    // }
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: `${app.globalData.host}/rest/s1/Goods/appointment/private`,
      data: param|| { userId },
      success: function(res) {
        if (res.statusCode != 200) {
          _this.setData({
            pageState: {
              message: '加载失败，请重新加载~',
              state: 'error'
            }
          })
        } else {
          let result = res.data.data
          if (result.length == 0) {
            _this.setData({
              pageState: {
                message: '暂无课程预约哟~',
                state: 'empty'
              }
            })
          } else {
            _this.setData({
              courseList: result,
              pageState: {}
            })
          }

        }
      },
      fail: function() {
        _this.setData({
          pageState: {
            message: '请检查您的网络连接~',
            state: 'error'
          }
        })
      },
      complete: function(res) {
        wx.hideLoading()
      }
    })
  },
  loadPlanTap: function(e) {
    let _this = this
    let courseId = e.currentTarget.dataset.id
    if (_this.data.selectCourse.courseId == courseId) {
      if (this.data.coursePlan.length == 0) {
        wx.showToast({
          title: "暂时无课程安排",
          duration: 2000,
          icon: 'none'
        })
        return
      }
      _this.showModal()
      return;
    }
    _this.setData({
      selectCourse: e.currentTarget.dataset.item,
      coursePlan: [],
      times: [],
      pickerDates: [],
      selectPlanId: "",
      selectPlan: '',
      selectDate: "请选择",
      selectStore: "请选择",
    })
    wx.request({
      url: _this.data.host + '/rest/s1/Goods/appointment/coursePlan',
      method: 'GET',
      data: {
        courseId: courseId
      },
      success: function(res) {
        let result = res.data.data
        if (result.length > 0) {
          _this.showModal()
          _this.setData({
            'coursePlan': result
          })
          _this.filtePlanStore()
        } else {
          wx.showToast({
            title: "暂时无课程安排",
            duration: 2000,
            icon: 'none'
          })
        }
      },
      fail: function(res) {

      },
      complete: function(res) {}
    })
  },
  filtePlanTime: function() {
    let _this = this
    let times = []
    _this.data.coursePlan.forEach(item => {
      if (item.storeName == _this.data.selectStore && item.courseDate == _this.data.selectDate) {
        times.push(item)
      }
    })
    _this.setData({
      times: times
    })
    console.log(times)
  },
  filtePlanStore: function() {
    let _this = this
    let stores = []
    let stores_str = ""
    _this.data.coursePlan.forEach(item => {
      let storeName = item.storeName
      if (stores_str.indexOf(storeName) < 0) {
        stores_str += item.storeName + "#"
      }
    })
    stores = stores_str.substr(0, stores_str.length - 1).split('#')
    _this.setData({
      stores: stores
    })
  },
  filtePlanDate: function() {
    let _this = this
    let pickerDates = []
    let pickerDates_str = []
    _this.data.coursePlan.forEach(item => {
      if (item.storeName == _this.data.selectStore) {
        let courseDate = item.courseDate
        if (pickerDates_str.indexOf(courseDate) < 0) {
          pickerDates_str += courseDate + '#'
        }
      }
    })
    pickerDates = pickerDates_str.substr(0, pickerDates_str.length - 1).split('#')
    _this.setData({
      pickerDates: pickerDates
    })
  },
  confirmAppointment: function() {
    const _this = this
    _this.setData({
      hideAlert: true,
      showModalStatus: false,
    })

    let params = {
      userId: app.globalData.userInfo.userId,
      coursePlanId: this.data.selectPlan.coursePlanId,
      appointmentType: this.data.selectCourse.appiontmentType,
      id: this.data.selectCourse.id
    }
    wx.request({
      data: params,
      method: 'post',
      url: app.globalData.host + '/rest/s1/Goods/appointment/confirmAppointment',
      complete: function(res) {
        wx.showModal({
          title: '提示',
          content: res.data.messages,
          showCancel: false,
          success(res) {
            _this.initData({
              userId: app.globalData.userInfo.userId,
              startDate: _this.data.selectedDay,
              endDate: Utils.plusDate(_this.data.selectedDay, 1)
            })
          }
        })
      }
    })
  },
  reloadTap: function() {
    this.initData()
  },
  loginTap: function(res) {
    let userInfo = res.detail.userInfo;
    if (userInfo) {
      app.globalData.wUserInfo = userInfo
    }
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },




  dateTap: function (e) {
    const { selectedDay } = this.data;
    console.log(selectedDay);
    let selectDate = e.currentTarget.dataset.date;
    if (selectDate == undefined) {
      return;
    }
    this.getGroup({
      date: selectDate,
      storeId: app.globalData.storeId
    })
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



  tapChange:function (e) {
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
  // tabs 
  onBindChange: function (e) {
    const { current } = e.detail;
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    this.setData({
      tabsIndex: current,
      year,
      month,
      selectedDay: Utils.formatDate(new Date()),
      showData:false
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
  classTap: function (e) {
    const { plans } = e.currentTarget.dataset;
    console.log(plans);
    const { selectedDay} = this.data;
    const { userId} = app.globalData.userInfo;
    const { 
      coachName, 
      courseName, 
      startTime, 
      endTime, 
      unitPrice,
      courseId,
      coursePlanId,
    }=plans;
    const startWeek = new Date(selectedDay).getDay(); //目标月1号对应的星期
    wx.showModal({
      title: '请确认预约信息',
      content: `${selectedDay} 周${Utils.weekObj[startWeek]}\r\n${startTime}-${endTime}\r\n${courseName}${coachName}`,
      confirmColor: '#FCC800',
      success(res) {
        wx.request({
          url: `${app.globalData.host}/rest/s1/Goods/appointment/group`,
          method: 'POST',
          data: {
            courseId,
            coursePlanId,
            realPay: unitPrice > 0 ? unitPrice : 0 ,
            openId: app.globalData.openId,
            vipId: userId
          },
          success(res) {
            const { errorCode = '', messages, errors } = res.data;
            if (errorCode) {
              wx.showToast({
                title: errors,
                duration: 2000,
                icon: 'none'
              })
              return
            }
            if (unitPrice>0){
              const result = res.data.data;
              const { orderid } = result;
              wx.requestPayment({
                timeStamp: result.timeStamp,
                nonceStr: result.nonceStr,
                package: result.package,
                signType: result.signType,
                paySign: result.paySign,
                success(res) {
                  wx.showModal({
                    title: '预约成功',
                    showCancel: false,
                    confirmText: '确定',
                    confirmColor: '#FCC800',
                  });
                },
                fail(res) {
                   wx.request({
                     url: `${app.globalData.host}/rest/s1/Goods/appointment/group/disabled`,
                     data:{
                       orderId: orderid,
                     }
                   })
                 }
              })
            }else{
              wx.showToast({
                title: messages,
                duration: 2000,
                icon: 'none'
              })
            }
            
          }
        })
      }
    })
  },
  // 预约的点击事件
  reserveTap: function (e) {
    const { activeitem } = e.currentTarget.dataset;
    const { courseId } = activeitem;
    const { selectedDay } = this.data;
    const _this = this;
    wx.request({
      url: `${app.globalData.host}/rest/s1/Goods/appointment/private/planlist`,
      data: {
        courseId,
        storeId: app.globalData.storeId,
        data: selectedDay
      },
      success: function (res) {
        const resurl = res.data.data;
        _this.setData({
          modalVisible: true,
          array_time: resurl,
          activeitem
        })
        // wx.showModal({
        //   title: '请确认预约信息',
        //   content: `${selectedDay} 周${startWeek}\r\n${startTime}-${endTime}\r\n${courseName}-${coachName}\r\n在“我的-我的课程”中查看`,
        //   confirmColor: '#FCC800',
        //   success(res) {
        //     console.log(res);
        //   }
        // })
      }
    })
  },
  hideModal: function () {
    this.setData({
      modalVisible: false
    })
  },
   // 选时间段的 点击事件
  timeClick: function (e) {
    const { id, timeitem } = e.currentTarget.dataset;
    const { timeDataSelected } = this.data;
    this.setData({
      timeDataSelected: id == timeDataSelected ? -1 : id,
      timeitem: id == timeDataSelected ? {} : timeitem
    })
  },
  // 点击预约
  setDataTap: function () {
    const { timeitem, activeitem } = this.data;
    const { coursePlanId } = timeitem;
    const { id, appiontmentType } = activeitem;
    const { userId } = app.globalData.userInfo;
    wx.request({
      url: `${app.globalData.host}/rest/s1/Goods/appointment/private`,
      method: "POST",
      data: {
        id,
        coursePlanId,
        appiontmentType,
        userId
      },
      success(res) {
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
  },
  getGroup: function (param) {
    console.log(param);
    const _this = this;
    wx.request({
      url: `${app.globalData.host}/rest/s1/Goods/appointment/group`,
      data: param,
      success: function(res) {
        const groupArr = res.data.data;
        const isShow = groupArr.reduce((nex,current)=>{
          const { plans} = current;
          return [...nex, ...plans]
        },[]);
        _this.setData({
          groupArr,
          isShow: isShow.length===0
        })
      }
    })
  },
  // 以下是活动
  ondetail: function (e) {
    const { courseid } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/practiceCourses/practiceCourses?courseId=${courseid}`,
    })
  },
  tabsChange: function (e) {
    let { id } = e.currentTarget.dataset;
    this.setData({
      besel: id,
      moreFlag: false,
      runningPageIndex: 0,
      donePageIndex: 0,
      runningList: [],
      doneList: [],
    });
    id === '1' ? this.getDoingData({ pageIndex: 0 }) : this.getDoneData({ pageIndex: 0 });
  },
  getDoingData: function (param) {
    const { runningList } = this.data;
    const _this = this;
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: `${app.globalData.host}/rest/s1/Goods/course/public/doing`,
      data: {
        ...param,
        pageSize: 10,
      },
      success: function (res) {
        if (res.statusCode != 200) {
          _this.setData({
            pageState: {
              message: '加载失败，请重新加载~',
              state: 'error'
            }
          })
        } else {
          const dat = res.data.data.reduce((ex, current) => {
            const { courseDate } = current;
            const weaknum = new Date(courseDate).getDay();
            const dat2 = `周${Utils.weekObj[weaknum]}`
            return [...ex, {
              ...current,
              weakData: dat2
            }]
          }, [])
          _this.setData({
            runningList: [...runningList, ...dat]
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
  getDoneData: function (param) {
    const { doneList } = this.data;
    const _this = this;
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: `${app.globalData.host}/rest/s1/Goods/course/public/did`,
      data: {
        ...param,
        pageSize: 10,
      },
      success: function (res) {
        if (res.statusCode != 200) {
          _this.setData({
            pageState: {
              message: '加载失败，请重新加载~',
              state: 'error'
            }
          })
        } else {
          const dat = res.data.data.reduce((ex, current) => {
            const { courseDate } = current;
            const weaknum = new Date(courseDate).getDay();
            const dat2 = `周${Utils.weekObj[weaknum]}`;
            console.log(weaknum, Utils.weekObj[weaknum]);
            return [...ex, {
              ...current,
              weakData: dat2
            }]
          }, [])
          _this.setData({
            doneList: [...doneList, ...dat]
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
})