// pages/practiceCourses/practiceCourses.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    host: app.globalData.host,
    address: "",
    storeName: "",
    phone:"",
    courseName: "",
    courseBg: "",
    joinType: "",
    bmiLevel: 3,
    sharePicUrl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { courseId } = options;
    this.initData({
      courseId
    })
  
  },
  initData:function(param){
    const _this = this;
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: `${app.globalData.host}/rest/s1/Goods/course/public/detail`,
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
          const dat = res.data.data;
          const { latitude, longitude, storeName, address} =dat;
          app.globalData.selectStore = [{
            latitude,
            longitude,
            storeName,
            address
          }]
          _this.setData({
            ...dat,
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
  onshare: function () {
    
  },
  hideModalTap: function () {
    this.setData({
      isShow:false
    })
  },
  showModalTap:function(){
    this.setData({
      isShow:true,
    })
  },
  // 地图
  storeAddressTap: function () {
    wx.navigateTo({
      url: '/pages/stores/stores'
    });
  },
  // 电话
  phoneTap: function () {
    const { phone } = this.data;
    wx.makePhoneCall({
      phoneNumber: phone ,
    })
  },
  // 支付 或 预约
  payTap:function(){
    const { userId } = app.globalData.userInfo;
    const { courseId, unitPrice} = this.data;
    const _this = this;
    wx.request({
      url: `${app.globalData.host}/rest/s1/Goods/appointment/public`,
      method: 'POST',
      data: {
        courseId,
        realPay: unitPrice > 0 ? unitPrice : 0,
        openId: app.globalData.openId,
        vipId: userId
      },
      success(res) {
        const { errorCode = undefined, messages, errors } = res.data;
        if (errorCode) {
          wx.showToast({
            title: errors,
            duration: 2000,
            icon: 'none'
          })
          return
        }
        if (unitPrice > 0) {
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
                title: '报名成功',
                showCancel: false,
                confirmText: '确定',
                confirmColor: '#FCC800',
              });
            },
            fail(res) {
              wx.request({
                url: `${app.globalData.host}/rest/s1/Goods/appointment/group/disabled`,
                data: {
                  orderId: orderid,
                }
              })
            }
          })
        } else {
          wx.showToast({
            title:'报名成功',
            icon: 'success',
            duration: 2000
          });
        }

      }
    })
  },
  // 保存图片
  loadImg:function(){
    const _this = this;
    //获取相册授权
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              console.log('授权成功');
              _this.downLoadImg();
            }
          })
        }else{
          _this.downLoadImg();
        }
      }
    })
  },
  downLoadImg:function(){
    const { host, sharePicUrl} = this.data;
    wx.downloadFile({
      url: `${host}${sharePicUrl}`,
      success: function (res) {
        console.log(res);
        //图片保存到本地
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function (err) {
            console.log(err);
            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              console.log("当初用户拒绝，再次发起授权")
              wx.openSetting({
                success(settingdata) {
                  console.log(settingdata)
                  if (settingdata.authSetting['scope.writePhotosAlbum']) {
                    console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                  } else {
                    console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                  }
                }
              })
            }
          },
          complete(res) {
            console.log(res);
          }
        })
      }
    })
  }
})