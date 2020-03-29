// pages/appointmentClient/appointmentClient.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: 'old', value: '老会员' },
      { name: 'new', value: '新客户'}
      ],
    storeArr :[{
      key:1,
      value:'LIOU健身乐城店'
    },{
      key: 2,
      value: '健身乐城店'
    },{
      key: 3,
      value: '乐城店'
    }],
    storeIndex: -1,
    visible:false,
    popContent:[{
      key:1,
      value:'内购'
    }, {
        key: 2,
        value: '团购'
      }, {
        key: 3,
        value: 'DM(外展)'
      }, {
        key: 4,
        value: 'TI(电话咨询)'
      }, {
        key: 5,
        value: 'DI(拉访)'
      }, {
        key: 6,
        value: 'BR(会员介绍)'
      }, {
        key: 7,
        value: 'APP'
      },{
        key: 8,
        value: 'WI(访客)'
      },{
        key: 9,
        value: '其他'
      }],
    popActive:{},
    displayValue1:'请选择时间',
    value1:[],
    okShow:true
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
  bindPickerChange:function(e){
    const { value } = e.detail;
    this.setData({
      storeIndex: value
    })
  },
  showNewMessage:function(){
      this.setData({
        visible: true
      })
  },
  onClose:function(){
    this.setData({
      visible: false
    })
  },
  popItemClick:function(e){
    const { item } = e.currentTarget.dataset;
    console.log('item', item);
    this.setData({
      popActive: item 
    })
  },
  onOk:function(){
    console.log('saassaas');
    this.setData({
      okShow:false
    })
  }
})