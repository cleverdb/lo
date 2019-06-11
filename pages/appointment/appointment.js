// pages/mineCard/mineCard.js
import Utils from '../../utils/util.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    host: app.globalData.host,
    courseList: [],
    coursePlan: [],
    times: [],
    pickerDates: [],
    selectPlanId: "",
    selectPlan: '',
    selectDate: "请选择",
    selectStore: "请选择",
    selectCourse: "",
    dateIndex: "0",
    animationData: "",
    stores: ["力偶一店", "力偶二店"],
    showModalStatus: false,
    hideAlert: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.initData()
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
    if (this.data.pageState) {
      this.setData({
        pageState: {}
      })
      this.initData()
    }
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
  //选择时间
  timeTap: function(e) {
    this.setData({
      selectPlanId: e.currentTarget.dataset.id,
      selectPlan: e.currentTarget.dataset.item
    })
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
  initData: function() {
    let _this = this;
    let userId = app.globalData.userInfo.userId
    if (!userId) {
      this.setData({
        pageState: {
          message: '请先登陆/注册哟~',
          state: 'unlogin'
        }
      })
      return
    }
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: _this.data.host + '/rest/s1/Goods/appointment/getAppointmentCourse',
      method: 'GET',
      data: {
        userId: userId
      },
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
              'courseList': result,
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
  }
})