// pages/vipStatus/vipStatus.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      vipTopData:[{
          num:'01',
          text:'今日生日',
          id:'0'
        }, {
          num:'01',
          text:'近期未进店',
          id:'1'
        }, {
          num:'01',
          text:'会籍即将过期',
          id:'2'
      }],
      activeIndex:0,
      showNoText:[{
        img:'/images/icon/subscribe_private_course.png',
        text:'今日暂无生日会员'
      }, {
          img: '/images/icon/subscribe_private_course.png',
          text: '暂无即将过期会员'
        }, {
          img: '/images/icon/subscribe_private_course.png',
          text: '近期暂无未进店会员记录'
        }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  vipTopClick:function(e){
    console.log('e', e);
    const { dataset } = e.currentTarget;
    const { id } = dataset;
    this.setData({
      activeIndex: id
    })
  }
})