// pages/mineReport/mineReport.js
import Utils from '../../utils/util.js'
const app = getApp();
const textPosition = {
  one: {
    left: 60,
    top:180
  },
  two: {
    left: 196,
    top: 180
  },
  there: {
    left: 356,
    top: 180
  }
}
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
    isShow: false,
    canWidth: 520,
    canHeight: 830,
    bgImgPath: '',
    qrCode: '',
    qrCodePath: '',
    weakDat: '',
    endDate: '',
    startDate:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getReport();
    this.getData();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getCode();
  },
  getData: function (params) {
    const nowDate = Utils.nowDate();
    const weakDat = Utils.plusDate(nowDate, -7);
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    let startDate = '';
    let endDate = '';
    if (params == 0) {
      startDate = nowDate;
      endDate = nowDate;
    } else if (params === 1) {
      startDate = `${year}.${month}`;
      endDate = `${year}.${month}`;
    } else {
      startDate = nowDate;
      endDate = nowDate;
    }
    this.setData({
      nowDate: nowDate,
      endDate: nowDate,
      startDate: weakDat,
      year,
      month
    });
    this.initData({
      userId: app.globalData.userInfo.userId,
      startDate,
      endDate,
    })
  },
  /**
     * 生命周期函数--监听页面显示
     */
  onReady: function () {
    const _this = this;
    wx.getSystemInfo({
      success: function(res) {
        const byclear = res.screenWidth / 375;
        _this.setData({
          byclear
        })
      }
    })
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
      url: `${app.globalData.host}/rest/s1/Goods/mine/fitnessLog`,
      success: function (res) {
        let result = res.data.data;
        _this.setData({
          report: result
        })
      },
      fail: function (res) {

      },
      complete: function () {
        wx.hideLoading()
      }
    })
  },
  nextTap: function () {
    const {
      choose,
      nowDate,
      endDate: end,
      year,
      month,
    } = this.data;
    let startDate = '';
    let endDate = '';
    if (choose === 0) { // 后一天
      const oldDate = Utils.nowDate();
      if (nowDate === oldDate) return '';
      const nextDate = Utils.plusDate(nowDate, 1);
      startDate = nextDate;
      endDate = nextDate;
      this.setData({
        nowDate: nextDate
      });
    } else if (choose == 1) { //后一个星期
      const oldDate = Utils.nowDate();
      if (end === oldDate) return '';
      const startDataNow = Utils.plusDate(end, 1);
      const endDataNow = Utils.plusDate(startDataNow, 7);
      startDate = startDataNow;
      endDate = endDataNow;
      this.setData({
        startDate: startDataNow,
        endDate: endDataNow
      });
    } else { // 后一个月
      const moth = new Date().getMonth() + 1;
      if (month == moth) return;
      const y = month > 11 ? year + 1 : year;
      const m = month > 11 ? 0 : month;
      startDate = `${y}-${m+1}`;
      endDate = `${y}-${m+1}`;
      this.setData({
        year: y,
        month: (m + 1)
      });
    }
    this.initData({
      userId: app.globalData.userInfo.userId,
      startDate,
      endDate
    })
  },
  beforeTap: function () {
    const {
      choose,
      nowDate,
      startDate: start, 
      year,
      month,
    } = this.data;
    let startDate = '';
    let endDate = '';
    if (choose===0) { // 前一天
      const nextDate = Utils.plusDate(nowDate, -1);
      startDate = nextDate;
      endDate = nextDate;
      this.setData({
        nowDate: nextDate
      });
    } else if (choose == 1) { //前一个星期
      const endDataNow = Utils.plusDate(start, -1);
      const startDataNow = Utils.plusDate(endDataNow, -7);
      startDate = startDataNow;
      endDate = endDataNow;
      this.setData({
        startDate: startDataNow,
        endDate: endDataNow
      });
    } else { // 前一个月
      const y = month - 2 < 0 ? year - 1 : year;
      const m = month - 2 < 0 ? 11 : month - 2;
      startDate = `${y}-${m + 1}`;
      endDate = `${y}-${m + 1}`;
      this.setData({
        year: y,
        month: (m + 1)
      });
    }
    this.initData({
      userId: app.globalData.userInfo.userId,
      startDate,
      endDate
    })
  },
  // tabs change 
  tabsChange:function(e){
    const { index } = e.currentTarget.dataset;
    this.setData({
      choose: index,
      report: []
    });
    this.getData(index);
  },
  shareTap: function () {
    const _this = this;
    wx.showLoading({
      title: '图片生成中...',
    })
    const promise1 = new Promise((resove, reject) => {
      wx.downloadFile({
        url: app.globalData.wUserInfo.avatarUrl,
        success: function (res) {
          //背景图
          _this.setData({
            bgImgPath: res.tempFilePath
          })
          resove();
        }
      })
    });
    const promise2 = new Promise((resove, reject) => {
      const { qrCode } = _this.data;
      wx.downloadFile({
        url: `${app.globalData.host}${qrCode}`,
        success: function (res) {
          //背景图
          _this.setData({
            qrCodePath: res.tempFilePath
          })
          resove();
        }
      });
    });
    Promise.all([promise1, promise2]).then((res) => {
      _this.drawReport();
    })
  },
  addByclear:function(params){
    const { byclear} = this.data;
    return byclear*params;
  },
  drawReport:function(){
    const _this = this;
    const { byclear, canWidth, canHeight, bgImgPath, qrCodePath } = this.data;
    const w = canWidth / 2;
    const h = canHeight / 2;
    const ctx = wx.createCanvasContext('myCanvas', this);
    const textOneLeft = this.addByclear((textPosition.one.left / 2));
    const textTwoLeft = this.addByclear((textPosition.two.left / 2));
    const textThereLeft = this.addByclear((textPosition.there.left / 2));
    const textOneTop = this.addByclear((textPosition.one.top / 2));
    ctx.save();
    ctx.beginPath();
    ctx.drawImage('/images/icon/log_min.png', 0, 0, this.addByclear(w),this.addByclear(h));
    ctx.setFontSize(this.addByclear(20));
    ctx.fillStyle = '#000';
    ctx.fillText("190", textOneLeft, textOneTop);
    ctx.fillText("100", textTwoLeft, textOneTop);
    ctx.fillText("2671", textThereLeft, textOneTop);
    const txtWidth = ctx.measureText('100').width;
    const txtWidth7 = ctx.measureText('2671').width;
    const txtWidth8 = ctx.measureText('190').width;
    ctx.setFontSize(15 * byclear);
    ctx.fillText("min", textTwoLeft + txtWidth, textOneTop);
    ctx.fillText("kcal", textThereLeft + txtWidth7, textOneTop);
    ctx.fillText("LIOU健身俱乐部", (152 / 2) * byclear, (800 / 2) * byclear);
    const txtWidth2 = ctx.measureText('2671min').width;
    const txtWidth3 = ctx.measureText('2671kcal').width;
    ctx.setFontSize(10 * byclear);
    const txtWidth4 = ctx.measureText('锻炼总时长').width;
    const txtWidth5 = ctx.measureText('累计总消耗').width;
    const txtWidth9 = ctx.measureText('月排名').width;
    ctx.fillText("月排名", textOneLeft + (txtWidth8 - txtWidth9) / 2, textOneTop + 20);
    ctx.fillText("锻炼总时长", textTwoLeft + (txtWidth2 - txtWidth4) / 2, textOneTop + 20);
    ctx.fillText("累计总消耗", textThereLeft + (txtWidth3 - txtWidth5) / 2, textOneTop + 20);
    ctx.fillText("刘石磊", this.addByclear(50+20), this.addByclear(30));
    ctx.fillText("2019.9", this.addByclear(50+20), this.addByclear(30+20));
    ctx.stroke();
    ctx.restore();

    ctx.beginPath();
    ctx.setStrokeStyle('#727171');
    ctx.setLineWidth("7"); //圆环的粗细
    ctx.arc(this.addByclear((w / 2)+10),this.addByclear((h - 55) / 2),this.addByclear(30), 0.7 * Math.PI, 2.3 * Math.PI);
    ctx.stroke();
    ctx.restore();

    ctx.beginPath();
    ctx.arc(this.addByclear((w / 2) + 10), this.addByclear((h - 55) / 2), this.addByclear(30), 0.7 * Math.PI, 1 * Math.PI);
    ctx.setStrokeStyle("#FBC700"); //圆环线条的颜色
    ctx.setLineWidth("7"); //圆环的粗细
    ctx.setLineCap("round"); //圆环结束断点的样式 butt为平直边缘 round为圆形线帽 square为正方
    ctx.stroke();
    ctx.restore();

    //开始绘制百分比数字
    ctx.beginPath();
    ctx.setFillStyle("#FBC700"); // 字体颜色
    ctx.setTextAlign("center"); // 字体位置
    ctx.setTextBaseline("middle"); // 字体对齐方式
    ctx.setFontSize(this.addByclear(20)); // 字体大小 注意不要加引号
    ctx.fillText("40", this.addByclear((w / 2) + 10), this.addByclear((h - 80) / 2)); // 文字内容和文字坐标

    ctx.setFontSize(this.addByclear(8)); // 字体大小 注意不要加引号
    ctx.fillText("运动等级:B", this.addByclear((w / 2) + 10), this.addByclear((h - 40) / 2)); // 文字内容和文字坐标

    ctx.beginPath();
    ctx.setFillStyle('#FBC700');
    ctx.setLineWidth("1"); //圆环的粗细
    ctx.strokeRect(this.addByclear((w / 2) - 6), this.addByclear((h / 2)+4), this.addByclear(36),this.addByclear(16));
    ctx.fillRect(this.addByclear((w / 2) - 6), this.addByclear((h / 2) + 4), this.addByclear(36), this.addByclear(16));
    ctx.beginPath();
    ctx.setFillStyle("#000"); // 字体颜色
    ctx.setTextAlign("center"); // 字体位置
    ctx.fillText('运动值', this.addByclear((w / 2)+12), this.addByclear((h / 2)+12));
    ctx.stroke();
    ctx.restore();

    ctx.beginPath();
    ctx.setStrokeStyle("#FBC700"); //圆环线条的颜色
    ctx.setLineWidth("1"); //圆环的粗细
    ctx.arc(_this.addByclear(35), _this.addByclear(35), _this.addByclear(25), 0, 2 * Math.PI);
    ctx.drawImage(qrCodePath, _this.addByclear(w-60), _this.addByclear(10), _this.addByclear(50), _this.addByclear(50));
    ctx.stroke();
    ctx.restore();

    ctx.beginPath();
    ctx.setStrokeStyle("#fff"); //圆环线条的颜色
    ctx.setLineWidth("1"); //圆环的粗细
    ctx.arc(_this.addByclear(35), _this.addByclear(35), _this.addByclear(25), 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(bgImgPath, _this.addByclear(10), _this.addByclear(10), _this.addByclear(50), _this.addByclear(50));
    ctx.stroke();
    ctx.restore();
    ctx.draw();
    wx.hideLoading();
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
    const { canWidth, canHeight } = this.data;
    wx.canvasToTempFilePath({
      width: canWidth /2,
      height: canHeight /2,
      destWidth:canWidth,
      destHeight: canHeight,
      fileType: 'jpg',
      canvasId: 'myCanvas',
      success: function (res) {
        let shareImg = res.tempFilePath;
        _this.setData({
          navPicUrl: shareImg
        });
        //获取相册授权
        wx.getSetting({
          success(res) {
            if (!res.authSetting['scope.writePhotosAlbum']) {
              wx.authorize({
                scope: 'scope.writePhotosAlbum',
                success() {
                  _this.downLoadImg();
                }
              })
            } else {
              _this.downLoadImg();
            }
          }
        })
      },
      fail: function (res) {
      }
    })
  },
  downLoadImg: function () {
    const { navPicUrl } = this.data;
    const _this = this;
    //图片保存到本地
    wx.saveImageToPhotosAlbum({
      filePath: navPicUrl,
      success: function (data) {
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 2000
        });
        _this.setData({
          isShow:false
        })
      },
      fail: function (err) {
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
      }
    })
  },
  getCode: function () {
    const _this = this;
    const url = `${app.globalData.host}/rest/s1/Goods/qrCode`;
    wx.request({
      url,
      success(res){
        console.log(res);
        const { qrCode } = res.data;
        _this.setData({
          qrCode
        })
      }
    })
  },
  getReport:function(){
      const ctx = wx.createCanvasContext('runCanvas');
      wx.createSelectorQuery().select('#runCanvas').boundingClientRect(function (rect) { //监听canvas的宽高
        const w = parseInt(rect.width / 2); //获取canvas宽的的一半
        const h = parseInt(rect.height / 2); //获取canvas高的一半，
        ctx.beginPath();
        ctx.setStrokeStyle('#727171');
        ctx.setLineWidth("7"); //圆环的粗细
        ctx.arc(w, h, w - 4, 0.7 * Math.PI, 2.3 * Math.PI);
        ctx.stroke();
        ctx.restore();

        ctx.beginPath();
        ctx.setStrokeStyle("#FBC700"); //圆环线条的颜色
        ctx.setLineWidth("7"); //圆环的粗细
        ctx.setLineCap("round"); //圆环结束断点的样式 butt为平直边缘 round为圆形线帽 square为正方
        ctx.arc(w, h, w - 4, 0.7 * Math.PI, 1 * Math.PI);
        ctx.stroke();
        ctx.restore();
        //开始绘制百分比数字
        ctx.beginPath();
        ctx.setFillStyle("#FBC700"); // 字体颜色
        ctx.setTextAlign("center"); // 字体位置
        ctx.setTextBaseline("middle"); // 字体对齐方式
        ctx.setFontSize(40); // 字体大小 注意不要加引号
        ctx.fillText("40", w, h - 20); // 文字内容和文字坐标
        ctx.setFontSize(14); // 字体大小 注意不要加引号
        ctx.fillText("运动等级:B", w, h + 20); // 文字内容和文字坐标
        ctx.draw();
      }).exec();
  }
})