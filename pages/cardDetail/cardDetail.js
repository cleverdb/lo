// pages/cardDetail/cardDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardType: "季卡/年卡",
    hideModal: true,
    countPrice: "----",
    cardDesc: "",
    storeIndex:0,
    selectStoreId:"",
    selectCardTypeId: "",
    storeList: [{
      id: "001",
      name: '力偶1店'
    }, {
      id: "002",
      name: '力偶2店'
    }, {
      id: "003",
      name: '力偶3店'
    }, {
      id: "004",
      name: '力偶4店'
    }],
    validIndex: "",
    validDateList: [{
      id: "0001",
      name: "1季度",
      price: 2000
    }, {
      id: "0002",
      name: "2季度",
      price: 4000
    }, {
      id: "0003",
      name: "3季度",
      price: 6000
    }, {
      id: "0004",
      name: "1年卡",
      price: 7500
    }, {
      id: "0005",
      name: "2年卡",
      price: 14000,
    }, {
      id: "0006",
      name: "3年卡",
      price: 20000,
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var cardTypeId = options.cardId;
    switch (cardTypeId) {
      case "0001":
        this.setData({
          cardType: "季卡/年卡"
        })
        break;
      case "0002":
        this.setData({
          cardType: "自定义卡"
        })
        break;
      case "0003":
        this.setData({
          cardType: "无限私教课卡"
        })
        break;
    }
    this.setData({
      selectCardTypeId: cardTypeId
    })
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
  bindValidDate: function(e) {
    var selected = e.target.dataset.item;
    this.setData({
      validIndex: selected.id,
      countPrice: selected.price
    })
  },
  bindPickerChange: function(e) {
    debugger;
    this.setData({
      storeIndex: e.detail.value,
      selectStoreId: storeList[e.detail.value]["id"]
    })
  },
  buyCard: function() {
    if (this.data.validIndex == ""){
      wx.showModal({
        title: '',
        content: '请选择课时！',
        showCancel:false,
        success(res) {
        }
      })
      return;
    }
    if (this.data.storeIndex === ""){
      wx.showModal({
        title: '',
        content: '请选择开卡场馆！',
        showCancel: false,
        success(res) {
        }
      })
      return;
    }
    this.data.selectStoreId = this.data.storeList[this.data.storeIndex]["id"]
    this.setData({
      hideModal: false
    })
  },
  confirmCard: function () {
    this.setData({
      hideModal: true,
    })
  },
  cancelCard: function () {
    this.setData({
      hideModal: true,
    })
  },
})