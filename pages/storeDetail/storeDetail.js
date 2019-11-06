// pages/storeDetail/storeDetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 0,
    pageSize: 10,
    storeAreaId: '',
    host: app.globalData.host,
    storeDetailList: [],
    moreFlag:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { storeAreaId } = options;
    const { pageIndex, pageSize} = this.data;
    let _this = this;
    wx.showLoading({
      title: '加载中...',
    });
    wx.request({
      url: `${app.globalData.host}/rest/s1/Goods/store/getStoreEnv`,
      data: {
        pageIndex,
        pageSize,
        storeAreaId
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
          const { data: storeDetailList } = data;
          const dat = storeDetailList.map((v) => {
            const { keywords } = v;
            return {
              ...v,
              keywords: keywords.split('/')
            }
          });
          _this.setData({
            storeDetailList: dat,
            pageState: {},
            storeAreaId
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
  loadMoreData: function (param) {
    var _this = this;
    const { storeDetailList, storeAreaId} = this.data;
    wx.request({
      url: `${app.globalData.host}/rest/s1/Goods/store/getStoreEnv`,
      data: {
        storeAreaId,
        ...param
      },
      success: function (res) {
        const dat = res.data.data
        const result = dat.map((v) => {
          const { keywords } = v;
          return {
            ...v,
            keywords: keywords.split('/')
          }
        });
        if (result.length == 0) {
          _this.setData({
            moreFlag: true,
          })
          return
        }
        if (result.length == 10) {
          _this.setData({
            storeDetailList: [...storeDetailList, ...result],
          })
          return
        }
        if (0 < result.length < 10) {
          _this.setData({
            storeDetailList: [...storeDetailList, ...result],
            moreFlag: true,
          })
          return
        }
      }
    })
  }
})