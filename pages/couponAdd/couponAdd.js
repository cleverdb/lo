const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    plus:0,
    minus:0,
    shadow1:false,
    shadow2:false,
    value1:"",
    value2:"",
    chosedStore: "",
    chosedStoreShow: "",
    options:[
      ['01月20日周一', '01月21日周二', '01月22日周三', '01月23日周四', '01月24日周五', '01月25日周六']
    ],
    stores: [
      { name: "LIOU健身乐城店" },
      { name: "LIOU STUDIO健身工作室" }
    ],
  },
  onValueChange1:function(e){
    this.setData({ value1: e.detail.value })
  },
  onValueChange2: function (e) {
    this.setData({ value2: e.detail.value })
  },
  handleClick3:function(){
    this.setData({
      shadow1:false
    });
  },
  handleRadio2(e) {
    var name = e.currentTarget.dataset.name;
    if (this.chosedStore != name) {
      this.setData({
        chosedStore: name
      });
    }
  },
  handleClick2() {
    this.setData({
      shadow2: false,
      chosedStoreShow: this.data.chosedStore
    });
  },
  chooseStore() {
    this.setData({
      shadow2: true
    });
  },
  chooseTime(){
    this.setData({
      shadow1:true
    });
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

  }
})