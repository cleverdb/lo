// pages/fitnessCoachDetail/fitnessCoachDetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [1, 2, 3, 4, 5],
    host: app.globalData.host,
    serviceLevel: 0,
    honor:'',
    userFullName:'',
    pageSize: 10,
    pageIndex: 0,
    userId: '',
    workLong:'',
    selectArray:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { userId } = options;
    const _this = this;
    if (!userId) {
      _this.setData({
        pageState: {
          message: '请先登陆/注册哟~',
          state: 'unlogin'
        }
      });
      return;
    }
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: `${app.globalData.host}/rest/s1/Goods/coach/getCoachDetail`,
      data: {
        userId,
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
          const { data } = res;
          const { 
            serviceLevel, 
            honor, 
            userId, 
            userFullName, 
            workLong, 
            iconUrl =""
          } = data.data;
          _this.setData({
            serviceLevel,
            honor,
            userFullName,
            userId,
            workLong,
            iconUrl,
            pageState: {}
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
    this.getDataSelect(userId);
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
    const _this = this;
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
  bindPickerChange:function(e){
    const { selectArray, iconUrl,userId } = this.data;
    const { value } = e.detail;
    console.log('picker发送选择改变，携带值为', e.detail.value, selectArray[value],selectArray);
    const data = {
      ...selectArray[value],
      iconUrl,
      coachId: userId
    }
    app.globalData.coachSelectData = data;
    wx.request({
      url: `${app.globalData.host}/rest/s1/Goods/course/private`,
      data:{
        storeId: app.globalData.storeId,
        courseId:selectArray[value].courseId,
        coachId:userId,
      },
      success:function(res){
        if(Object.keys(res.data).length > 0){
          wx.navigateTo({
            url: `/pages/courseDetail/courseDetail`,
          })
        }else{
          wx.showModal({
            title: '温馨提示',
            content: "非常抱歉，教练暂无相关课程",
            showCancel: false,
            confirmText: '确定',
            confirmColor: '#FCC800',
          });
        }
      }
    })
  },
  getDataSelect:function(userId){
    const _this = this;
    wx.request({
      url: `${app.globalData.host}/rest/s1/Goods/course/coachClasses`,
      data:{
        storeId: app.globalData.storeId,
        coachId: userId,
      },
      success:function(res){
        console.log(res);
        const data = res.data.data;
        _this.setData({
           selectArray:data
        })
      }
    })
  },
  gotoLearnCourse:function(){
    const {userId } = this.data;
    wx.request({
      url: `${app.globalData.host}/rest/s1/Goods/course/private/experience`,
      data: {
        coachId:userId,
        storeId:app.globalData.storeId,
      },
      success:function(res){
        if(Object.keys(res.data).length > 0){
          wx.navigateTo({
            url: `/pages/privateCoursesBuy1/privateCoursesBuy1?coachId=`+userId,
          })
        }else{
          wx.showModal({
            title: '温馨提示',
            content: "非常抱歉，教练暂无相关课程",
            showCancel: false,
            confirmText: '确定',
            confirmColor: '#FCC800',
          });
        }
      }
    })
    
  }
})