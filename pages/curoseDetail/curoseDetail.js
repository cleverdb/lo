// pages/curoseDetail/curoseDetail.js
const app = getApp()
Page({

  data: {
    hideModal:true,
    host: app.globalData.host,
    courseNum: 1,
    minusStatus: 'disabled',
    totalCoursePrice:500,
    coursePrice:500,
    course:{},
    animationData: "",
    showModalStatus: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      courseId: options.courseId
    })
    this.initData()
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

  buyCourse:function(e){
    let course = this.data.course
    let params = '?courseId=' + course.courseId + '&courseName=' + course.courseName + '&price=' + course.price + "&coachName=" + course.coachName
    wx.navigateTo({
      url: '/pages/buyCourse/buyCourse' + params,
    })
  },
  confirmCourse:function(){
    console.log("确定购买课时。");
    this.setData({
      hideModal: true,
    })
    this.hideModal();
  },
  cancelCourse: function () {
    console.log("放弃购买。");
    this.setData({
      hideModal: true,
    })
  },
  //显示对话框
  showModal: function () {
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
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
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
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  bindMinus: function () {
    var num = this.data.courseNum;
    if (num > 1) {
      num--;
    }
    var minusStatus = num <= 1 ? 'disabled' : 'ok';
    var totalCoursePrice = this.data.coursePrice * num
    // 将数值与状态写回
    this.setData({
      courseNum: num,
      minusStatus: minusStatus,
      totalCoursePrice: totalCoursePrice
    });
  },
  bindPlus: function () {
    var num = this.data.courseNum;  
    num++;
    var totalCoursePrice = this.data.coursePrice * num
    this.setData({
      courseNum: num,
      minusStatus: 'ok',
      totalCoursePrice: totalCoursePrice
    });
  },
  bindChange: function (e) {
    var num = e.detail.value;
    var totalCoursePrice = this.data.coursePrice * num
    this.setData({
      courseNum: num,
      totalCoursePrice: totalCoursePrice
    });
  },
  initData:function(){
    let _this = this;
    wx.showLoading({
      title: '加载中...',
    })
    let params = { courseId:this.data.courseId}
    wx.request({
      url: _this.data.host + '/rest/s1/Goods/course/getCourseDetail',
      data: params,
      method:'GET',
      success: function (res) {
        if (res.statusCode == 400) {
          _this.setData({
            pageState: {
              message: '加载失败，请重新加载~',
              state: 'error'
            }
          })
        } else {
          _this.setData({
            'course': res.data.data
          })
        }
        
      },
      fail: function (res) {
        _this.setData({
          pageState: {
            message: '请检查您的网络连接~',
            state: 'error'
          }
        })
      },
      complete:function(){
        wx.hideLoading()
      }
    })
  }
})