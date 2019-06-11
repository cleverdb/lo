// pages/buyCourse/buyCourse.js
import Utils from '../../utils/util.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusType: [{
      status: 'usable',
      name: "可用券"
    }, {
      status: 'unusable',
      name: "不可用券"
    }],
    navbarActiveIndex: 0,
    hideModal: true,
    ticketDesc: "查看",
    courseNum: 1,
    minusStatus: 'disabled',
    realPay: 0,
    totalCoursePrice: 0,
    price: 0,
    courseName: '',
    coachName: '',
    courseId: '',
    selectTicket: {},
    tickets: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      price: options.price,
      courseName: options.courseName,
      coachName: options.coachName,
      courseId: options.courseId,
      totalCoursePrice: options.price,
      realPay: options.price
    })
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
    if (app.globalData.userInfo.userId) {
      this.setData({
        pageState: {}
      })
    }
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
  buyCourse:function(){
    const _this = this
    if(!app.globalData.userInfo.userId){
      _this.setData({
        pageState: {
          message: '请先登陆/注册哟~',
          state: 'unlogin'
        }
      })
      return
    }
    this.payOrder()
  },
  bindMinus: function() {
    var num = this.data.courseNum;
    if (num > 1) {
      num--;
    }
    var minusStatus = num <= 1 ? 'disabled' : 'ok';
    var totalCoursePrice = this.data.price * num
    this.setData({
      courseNum: num,
      minusStatus: minusStatus,
      totalCoursePrice: totalCoursePrice,
      realPay: totalCoursePrice
    });
    this.loadVoucher({
      userId: app.globalData.userInfo.userId,
      countPrice: totalCoursePrice
    })
  },
  bindPlus: function() {
    var num = this.data.courseNum;
    num++;
    var totalCoursePrice = this.data.price * num
    let realPay = totalCoursePrice
    this.setData({
      courseNum: num,
      minusStatus: 'ok',
      totalCoursePrice: totalCoursePrice,
      realPay: realPay
    });
    this.loadVoucher({
      userId: app.globalData.userInfo.userId,
      countPrice: totalCoursePrice
    })
  },
  /**
   * 数量输入框改变事件
   */
  bindChange: function(e) {
    var num = e.detail.value;
    var totalCoursePrice = this.data.price * num
    this.setData({
      courseNum: num,
      totalCoursePrice: totalCoursePrice,
      realPay: totalCoursePrice
    });
    this.loadVoucher({
      userId: app.globalData.userInfo.userId,
      countPrice: totalCoursePrice
    })
  },
  /**
   * 点击导航栏
   */
  onNavBarTap: function(event) {
    // 获取点击的navbar的index
    let navbarTapIndex = event.currentTarget.dataset.navbarIndex
    // 设置data属性中的navbarActiveIndex为当前点击的navbar
    this.setData({
      navbarActiveIndex: navbarTapIndex
    })
  },
  /**
   * 
   */
  onBindChange: function(e) {
    // 设置data属性中的navbarActiveIndex为当前点击的navbar
    this.setData({
      navbarActiveIndex: e.detail.current
    })
  },
  //点击加载优惠券
  ticketTap: function(e) {
    const _this = this
    let status = e.currentTarget.dataset.status
    let selectItem = e.currentTarget.dataset.item
    if (status == "unusable") return
    if (selectItem.voucherUuid == this.data.selectTicket.voucherUuid) {
      this.setData({
        selectTicket: {},
        realPay: _this.data.totalCoursePrice
      })
      return
    }
    this.setData({
      selectTicket: selectItem,
      realPay: this.data.totalCoursePrice - selectItem.parValue
    })
  },
  //显示对话框
  showModal: function() {
    this.loadVoucher({
      userId: app.globalData.userInfo.userId,
      countPrice: this.data.realPay
    })
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function() {
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
  loadVoucher: function(param) {
    var _this = this
    let paramsStr = Utils.concatParams(param)
    wx.request({
      url: app.globalData.host + '/rest/s1/Goods/voucher/getVoucher' + paramsStr,
      success: function(res) {
        let usableTicket = res.data.data.usable
        if (usableTicket.length > 0) {
          let select = usableTicket[0]
          _this.setData({
            tickets: res.data.data,
            selectTicket: select,
            ticketDesc: select.voucherName,
            realPay: _this.data.totalCoursePrice - select.parValue
          })
        } else {
          _this.setData({
            tickets: res.data.data,
            selectTicket: {},
            ticketDesc: '暂无可用优惠券',
            realPay: _this.data.totalCoursePrice
          })
        }  
      },
      fail: function(res) {
     
      }
    })
  },
  loginTap: function (res) {
    let userInfo = res.detail.userInfo;
    if (userInfo) {
      app.globalData.wUserInfo = userInfo
    }
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  payOrder: function () {
    let _this = this
    let params = {
      voucherUuid: _this.data.selectTicket.voucherUuid,
      courseId: _this.data.courseId,
      userId: app.globalData.userInfo.userId,
      num: _this.data.courseNum,
      realPay: _this.data.realPay,
      type:2,
      openId: app.globalData.openId
    }
    wx.request({
      url: app.globalData.host + '/rest/s1/Goods/buy',
      data: params,
      method: 'POST',
      success: function (res) {
        if (res.statusCode != 200 || !res.data.data) {
          wx.showToast({
            title: '支付出现问题，稍后再试',
            duration:2000,
            icon:'none'
          })
          return
        }
        const result = res.data.data
        wx.requestPayment({
          timeStamp: result.timeStamp,
          nonceStr: result.nonceStr,
          package: result.package,
          signType: result.signType,
          paySign: result.paySign,
          success(res) {
            wx.navigateBack({
              delta: 1
            }) },
          fail(res) { }
        })
      },
      fail: function (res) { }
    })
  }
})