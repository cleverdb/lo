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
    canWidth: '520',
    canHeight:'830',
    bgImgPath:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const nowDate = Utils.nowDate();
    const weakDat = Utils.plusDate(this.data.nowDate, -7);
    console.log(nowDate, weakDat);
    this.getReport();
    this.setData({
      nowDate: nowDate
    })
    this.initData({
      userId:app.globalData.userInfo.userId,
      startDate: '2019-11-05',
      endDate: '2019-11-05',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.getCode();
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
        console.log(result,'haha')
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
    const _this = this;
    _this.setData({
      isShow: true
    });
    // wx.downloadFile({
    //   url: app.globalData.wUserInfo.avatarUrl,
    //   success: function (res) {
    //     _this.drawReport(res.tempFilePath);
    //   }
    // })
  },
  addByclear:function(params){
    const { byclear} = this.data;
    return byclear*params;
  },
  checkwh: function (e) {
    const _this = this;
    wx.downloadFile({
      url: app.globalData.wUserInfo.avatarUrl,
      success: function (res) {
        //背景图
        _this.setData({
          bgImgPath: res.tempFilePath
        })
        _this.drawReport();
      }
    })
  },
  drawReport:function(){
    const _this = this;
    const { byclear, canWidth, canHeight, bgImgPath } = this.data;
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
    ctx.setStrokeStyle("#fff"); //圆环线条的颜色
    ctx.setLineWidth("1"); //圆环的粗细
    ctx.arc(_this.addByclear(35), _this.addByclear(35), _this.addByclear(25), 0, 2 * Math.PI);
    ctx.clip();
    ctx.drawImage(bgImgPath, _this.addByclear(10), _this.addByclear(10), _this.addByclear(50), _this.addByclear(50));
    ctx.stroke();
    ctx.restore();

   

   
    ctx.draw();
  
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
  },
  getCode:function(){
    const data = '27_9HndK55MduIlUBuSyFnx7CRRLtIcCHy_c7S-wGsVU5ho3w0b5qvBxUvNRuvtiFyh35KnD5vemeyY8iBV869lvHgSodbwzuH5AAduD8GrF-7tbfRh8MyE-49seMxuxhgv890OoFA28NHtfTD8WTEgAEABYJ';
    const url = `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${data}`;
    wx.request({
      url,
      data:{
        page:'home/home',
      },
      success(res){
        console.log(res);
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