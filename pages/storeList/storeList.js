// pages/storeDetail/storeDetail.js
const app = getApp();
console.log(app.globalData);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageSize: 10,
    pageIndex: 0,
    host: app.globalData.host,
    storeId: app.globalData.storeId,
    storeList: [],
    moreFlag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData();
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
    const { pageSize, moreFlag } = this.data;
    let { pageIndex } = this.data;
    if (moreFlag) {
      return;
    }
    this.setData({
      pageIndex: ++pageIndex
    });
    const param = {
      pageIndex: ++pageIndex,
      pageSize,
    }
    this.loadMoreData(param);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  initData: function () {
    let _this = this;
    const { pageIndex, pageSize } = this.data;
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: `${app.globalData.host}/rest/s1/Goods/store/getStoreArea`,
      data: {
        storeId: app.globalData.storeId,
        pageIndex,
        pageSize
      },
      success: function (res) {
        if (res.statusCode != 200) {
          _this.setData({
            pageState: {
              message: '加载失败，请重新加载~',
              state: 'error'
            }
          })
        } else {
          const { data } = res;
          console.log('data', data);
          const { data: storeList } = data;
          _this.setData({
            storeList,
            pageState: {}
          })
        }
      },
      fail: function () {
        _this.setData({
          pageState: {
            message: '请检查您的网络连接~',
            state: 'error'
          }
        })
      },
      complete: function (res) {
        wx.hideLoading()
      }
    })
  },
  loadMoreData: function (param) {
    var _this = this;
    const { storeList } = this.data;
    wx.request({
      url: `${app.globalData.host}/rest/s1/Goods/store/getStoreArea`,
      data: {
        storeId: app.globalData.storeId,
        ...param
      },
      success: function (res) {
        let result = res.data.data
        if (result.length == 0) {
          _this.setData({
            moreFlag: true,
          })
          return
        }
        if (result.length == 10) {
          _this.setData({
            storeList: [...storeList, ...result],
          })
          return
        }
        if (0 < result.length < 10) {
          _this.setData({
            storeList: [...storeList, ...result],
            moreFlag: true,
          })
          return
        }
      }
    })
  }
})