// pages/membershipManagement/membershipManagement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filterChildren: [{
      key: 1,
      value: '最近联系',
    }, {
      key: 2,
      value: '最近上课'
    }, {
      key: 3,
      value: '剩余课时'
    }],
    active: {
      key: 1,
      value: '最近联系',
    },
    threeShow: false,
    activeKey: 1,
    show: false,

    inputfocus:false,
    isBlur:false
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
  inputFocus:function(){
    this.setData({
      inputfocus:true
    })
  },
  inputFocusTow: function () {
    const that = this;
    setTimeout(() => {
        console.log('isBlur');
        that.setData({
          isBlur: true,
        })
    },100)
  },
  bindblur:function(){
    const { isBlur } = this.data;
    console.log('isBlur', isBlur);
    if (isBlur){
      this.setData({
        inputfocus: false,
        isBlur:false
      })
    }
    
  },
  /**
   * 筛选条件
   */
  click: function (e) {
    const { dataset } = e.currentTarget;
    const { activekey } = dataset;
    this.setData({
      activeKey: activekey,
      threeShow: activekey == 3,
      show: activekey == 1,
    })
    console.log('e', e);
  },
  showModal: function () {
    const { show } = this.data;
    this.setData({
      show: !show,
      activeKey: 1,
      threeShow: false
    })
  },
  clickActive: function (e) {
    const { dataset } = e.currentTarget;
    const { modalitem } = dataset;
    this.setData({
      active: modalitem,
      show: false
    })
  },
  // 关闭modal
  hideModal: function () {
    this.setData({
      threeShow: false,
      show: false
    })
  },
  catchtapModal: function () { }
})