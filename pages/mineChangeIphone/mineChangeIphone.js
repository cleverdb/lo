// pages/mineChangeIphone/mineChangeIphone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_success:false,
    visible:false,
    disabled:true,
    disabled1:true,
    disabled2: true,
    time:60,
    showTime:false,
    value:''
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
  // 关闭modal
  handleClose:function(){
    this.setData({
        visible:false
    })
  },
  // input 
  inputChange: function (event){
    const {value} = event.detail.detail;
    console.log('value', value);
    const reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
    const value_str = value.toString();
    this.setData({
      value,
      disabled1: !reg.test(value_str),
      disabled2: !reg.test(value_str)
    })
    
  },
  //获取验证码
  getCode:function(){
    const that = this;
    setInterval(function(){
      let {time} = that.data;
      const new_time = time-1;
      if(new_time==0){
        that.setData({
          disabled1: false,
          showTime: false
        });
      }
      that.setData({
        time: new_time
      });
    },1000);
    this.setData({
      disabled1:true,
      showTime:true
    })
  }
})