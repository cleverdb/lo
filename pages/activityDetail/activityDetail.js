// pages/activityDetail/activityDetail.js
var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "2018华夏幸福北京马拉松竞赛规程",
    picture: "/images/act.jpg",
    content: '<p style="font-family:微软雅黑;font-size:14px;text-align:justify;text-indent:2em;"><strong><span style="font-family:微软雅黑, &quot;">一、&nbsp;主办单位</span></strong></p><p style="font-family:微软雅黑;font-size:14px;text-align:justify;text-indent:2em;"><span style="font-family:微软雅黑, &quot;">中国田径协会</span></p><p style="font-family:微软雅黑;font-size:14px;text-align:justify;text-indent:2em;"><span style="font-family:微软雅黑, &quot;">北京市体育局</span></p><p style="font-family:微软雅黑;font-size:14px;text-align:justify;text-indent:2em;"> <span style="font-family:微软雅黑, &quot;"> 二、联合主办单位</span ></p> <p style="font-family:微软雅黑;font-size:14px;text-align:justify;text-indent:2em;" > <span style="font-family:微软雅黑, &quot;" > 中央电视台</span></p> <p style="font-family:微软雅黑;font-size:14px;text-align:justify;text-indent:2em;" > <strong><span style="font-family:微软雅黑, &quot;" > 三、承办单位 </span></strong ></p><p style="font-family:微软雅黑;font-size:14px;text-align:justify;text-indent:2em;"><span style="font-family:微软雅黑, &quot;">中奥路跑（北京）体育管理有限公司</span > </p><p style="font-family:微软雅黑;font-size:14px;text-align:justify;text-indent:2em;"><span style="font-family:微软雅黑, &quot;">北京市体育竞赛管理中心</span > </p><p style="font-family:微软雅黑;font-size:14px;text-align:justify;text-indent:2em;"><strong><span style="font-family:微软雅黑, &quot;">四、&nbsp;协办单位</span > </strong></p > <p style="font-family:微软雅黑;font-size:14px;text-align:justify;text-indent:2em;" > <span style="font-family:微软雅黑, &quot;" > 北京市委宣传部、北京市公安局（北京市公安局治安管理总队、北京市公安局公安交通管理局）、北京市卫生和计划生育委员会、北京市环保局、北京市城市管理委员会、北京市交通委员会、天安门地区管理委员会、北京市气象局、共青团北京市委员会、北京市无线电管理局、北京奥林匹克公园管理委员会、北京市城市道路养护管理中心、北京公共交通控股（集团）有限公司、北京市地铁运营有限公司、北京市电力公司、北京城市副中心投资建设集团、北京体育大学 </span></p > <p style="font-family:微软雅黑;font-size:14px;text-align:justify;text-indent:2em;" > <strong><span style="font-family:微软雅黑, &quot;" > 五、 备案单位 </span></strong > </p><p style="font-family:微软雅黑;font-size:14px;text-align:justify;text-indent:2em;"><span style="font-family:微软雅黑, &quot;">国际田径联合会</span > </p><p style="font-family:微软雅黑;font-size:14px;text-align:justify;text-indent:2em;"><span style="font-family:微软雅黑, &quot;">国际马拉松和公路跑协会</span ></p><p style="font-family:微软雅黑;font-size:14px;text-align:justify;text-indent:2em;"><strong><span style="font-family:微软雅黑, &quot;">六、&nbsp;比赛日期与时间</span> </strong></p > <p style="font-family:微软雅黑;font-size:14px;text-align:justify;text-indent:2em;" > <span style="font-family:微软雅黑, &quot;" > 2018年9月16日星期日上午7: 30 </span></p > <p style="font-family:微软雅黑;font-size:14px;text-align:justify;text-indent:2em;" > <strong><span style="font-family:微软雅黑, &quot;" > 七、& nbsp; 比赛项目及规模 </span></strong > </p><p style="font-family:微软雅黑;font-size:14px;text-align:justify;text-indent:2em;"><span style="font-family:微软雅黑, &quot;">马拉松（42.195公里）</span > </p><p style="font-family:微软雅黑;font-size:14px;text-align:justify;text-indent:2em;"><span style="font-family:微软雅黑, &quot;">参赛规模30000人</span > </p>',
    latitude: 39.88273,
    longitude: 116.346163,
    markers: [{
      iconPath: "/images/icon/address-ok.png",
      id: 0,
      latitude: 39.88273,
      longitude: 116.346163,
      width: 50,
      height: 50
    }],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    WxParse.wxParse('article', 'html', that.data.content, that, 5);
    // wx.request({
    //   url: 'https://api.it120.cc/34vu54u7vuiuvc546d/cms/news/detail?id=656',
    //   success: function(res) {
    //     var data = res.data.data;
    //     console.log(res);
    //     //that.setData({
    //       //title: data.title,
    //      // picture: data.pic,
    //      // content: data.content
    //     //});
        
    //   }
    // });
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
  markerTap: function(e) {
    var _this = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(e) {
        const latitude = _this.data.latitude
        const longitude = _this.data.longitude
        wx.openLocation({
          latitude,
          longitude,
          name: "力偶健身",
          scale: 18
        })
      }
    })
  },
  joinActivity: function() {
    wx.showModal({
      title: '',
      content: '您确定参加该活动？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})