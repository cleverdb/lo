const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible1: false,
    infoSource:[[
      { name: "内购", id: "1" },
      { name: "团购", id: "2" },
      { name: "DM(外展)", id: "3" }
    ],[
      { name: "TI(电话咨询)", id: "4" },
      { name: "DI(拉访)", id: "5" },
      { name: "BR(会员介绍)", id: "6" },
    ],[
      { name: "APP", id: "7" },
      { name: "WI(访客)", id: "8" },
      { name: "其他", id: "9" }
    ]
    ],
    chooseSource:'',
    chooseSourceName:""
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
  onChooseSource:function(){
    console.log("请选择数据来源");
  },
  handleOpen1() {
    this.setData({
      visible1: true
    });
  },
  handleCancle1() {
    this.setData({
      visible1: false
    });
  },
  chooseToPush(e){
    var id = e.currentTarget.dataset.id;
    var name=e.currentTarget.dataset.name;
    this.setData({
      chooseSource:id,
      chooseSourceName: name
    });
  },
  handleClick(){
    this.setData({
      visible1: false
    });
  }
})