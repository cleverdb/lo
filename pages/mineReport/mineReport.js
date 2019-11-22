// pages/mineReport/mineReport.js
import Utils from '../../utils/util.js'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    host:app.globalData.host,
    report: {},
    nowDate: Utils.nowDate(),
    dateArr:[{
      text:'日'
    },{
      text:'周'
    },{
      text:'月'
      }],
    dataObj: {
      0: '天',
      1: '周',
      2: '个月'
    },
    choose: 0,
    isShow:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const nowDate = Utils.nowDate();
    const weakDat = Utils.plusDate(this.data.nowDate, -7);
    console.log(nowDate, weakDat);
    const ctx = wx.createCanvasContext('runCanvas');
    wx.createSelectorQuery().select('#runCanvas').boundingClientRect(function (rect) { //监听canvas的宽高
      const w = parseInt(rect.width / 2); //获取canvas宽的的一半
      const h = parseInt(rect.height / 2); //获取canvas高的一半，
      ctx.arc(w, h, w - 4, -0.5 * Math.PI, 1 * Math.PI);
      ctx.setStrokeStyle("#FBC700"); //圆环线条的颜色
      ctx.setLineWidth("7"); //圆环的粗细
      ctx.setLineCap("round"); //圆环结束断点的样式 butt为平直边缘 round为圆形线帽 square为正方
      ctx.stroke();
      //开始绘制百分比数字
      ctx.beginPath();
      ctx.setFillStyle("#FBC700"); // 字体颜色
      ctx.setTextAlign("center"); // 字体位置
      ctx.setTextBaseline("middle"); // 字体对齐方式
      ctx.setFontSize(40); // 字体大小 注意不要加引号
      ctx.fillText("40", w, h-20); // 文字内容和文字坐标
      ctx.setFontSize(14); // 字体大小 注意不要加引号
      ctx.fillText("运动等级:B", w, h+20); // 文字内容和文字坐标
      ctx.draw();
    }).exec();
    this.setData({
      nowDate: nowDate
    })
    // this.initData({
    //   userId:app.globalData.userInfo.userId,
    //   reportDate: nowDate
    // })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  /**
     * 生命周期函数--监听页面显示
     */
  onReady: function () {
    
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
  initData: function (params) {
    const _this = this
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      data: params,
      method: 'GET',
      url: app.globalData.host + '/rest/s1/Goods/mine/fitnessReport',
      success: function (res) {
        let result = res.data.data
        _this.setData({
          report: result
        })
        _this.draw('arcCanvas', 'bgCanvas', 'stepCanvas', result.score, 1000);
      },
      fail: function (res) {

      },
      complete: function () {
        wx.hideLoading()
      }
    })
  },
  nextTap: function () {
    const { choose, nowDate} = this.data;
    if (nowDate == Utils.nowDate()){
      return;
    }
    let nextDate = Utils.plusDate(nowDate, 1);
    this.setData({
      nowDate: nextDate
    });
    // this.initData({
    //   userId: app.globalData.userInfo.userId,
    //   reportDate: nextDate
    // })
  },
  beforeTap: function () {
    let nextDate = Utils.plusDate(this.data.nowDate, -1)
    this.setData({
      nowDate: nextDate
    })
    // this.initData({
    //   userId: app.globalData.userInfo.userId,
    //   reportDate: nextDate
    // })
  },
  // tabs change 
  tabsChange:function(e){
    const { index } = e.currentTarget.dataset;
    let nextDate = '';
    if (index == 0) {
      nextDate = Utils.nowDate();
    } else if (index == 1) {
      nextDate = Utils.plusDate(this.data.nowDate, 1)
    } else {

    }
    this.setData({
      choose:index
    })
  },
  shareTap: function () {
    this.setData({
      isShow:true
    })
  },
  hideModalTap: function () {
    this.setData({
      isShow: false,
    })
  },
  // 保存图片
  loadImg: function () {
    const _this = this;
    //获取相册授权
    _this.downLoadImg();
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
        } else {
          _this.downLoadImg();
        }
      }
    })
  },
  downLoadImg: function () {
    const { host, navPicUrl } = this.data;
    wx.downloadFile({
      url: `${host}${navPicUrl}`,
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