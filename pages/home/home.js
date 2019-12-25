// pages/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '/images/card1.png',
      '/images/act.jpg',
      '/images/card.png'
    ],
    value:2,
    index:2,
    host: app.globalData.host,
    banner: [],
    sliberBanner:[],
    selectArray: [],
    storeName:'',
    storeAddress:'',
    menu: [],
    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 5000,
    duration: 1000,
    storeId: '',
    pageIndex: 0,
    pageSize: 5,
    storePhone: '',
    coachList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.initData()
    // this.getSelectData();
    // this.getCoach();
    // app.userInfoReadyCallback = res => {
    //   app.globalData.wUserInfo = res.userInfo
    // };
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('asdsadsadsa');
    this.initData()
    this.getSelectData();
    this.getCoach();
    app.userInfoReadyCallback = res => {
      app.globalData.wUserInfo = res.userInfo
    };
    const _title = app.globalData.selectStore[0] || { storeName:"力偶健身俱乐部"};
    wx.setNavigationBarTitle({
      title: _title.storeName
    });
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
  initData:function(){
    let _this = this;
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: app.globalData.host + '/rest/s1/Wechat/home/getHome',
      success: function (res) {
        if (res.statusCode != 200) {
          _this.setData({
            pageState: {
              message: '加载失败，请重新加载~',
              state: 'error'
            }
          })
        } else {
          const {data} = res;
          const { banner } = data;
          _this.setData({
            banner,
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
  bannerTap: function(e) {
    let item = e.currentTarget.dataset.item;
    let skipUrl = item.skipParam ? item.pageUrl + "?" + item.paramKey + "=" + item.skipParam : item.pageUrl
    if (item.tab == 'Y') {
      wx.switchTab({
        url: skipUrl,
      })
    } else {
      wx.navigateTo({
        url: skipUrl,
      })
    }
  },
  reloadTap: function () {
    this.initData()
   
  },
  loginTap: function (res) {
  },
  getSelectData:function(e){
    const _this = this;
    wx.request({
      url: app.globalData.host + '/rest/s1/Goods/store/getStore',
      success: function (res) {
        const { data = {} } = res || {};
        if (res.statusCode != 200) {
          _this.setData({
            pageState: {
              message: '加载失败，请重新加载~',
              state: 'error'
            }
          })
        } else {
          const { data: dat = [] } = data;
          console.log(app.globalData.selectStore);
          const dat2 = app.globalData.selectStore.length > 0 ? app.globalData.selectStore[0] : dat[0];
          const { storeName, address, storeId, storePhone } = dat2;
          app.globalData.selectStore = [dat2];
          app.globalData.storeId = storeId;
          _this.getStoreArea(storeId);
          wx.setNavigationBarTitle({
            title: dat2.storeName
          });
          _this.setData({
            selectArray: dat,
            storeName,
            storeAddress: address,
            storeId,
            storePhone
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
  bindPickerChange:function (e) {
    const { value } = e.detail;
    const { selectArray } = this.data;
    const { storeName, address, storeId, storePhone } = selectArray[value];
    app.globalData.storeId = storeId;
    app.globalData.selectStore = [selectArray[value]];
    console.log(app.globalData.selectStore);
    this.getStoreArea(storeId);
    wx.setNavigationBarTitle({
      title: storeName
    });
    this.setData({
      storeName,
      storeAddress: address,
      storeId,
      storePhone
    })
  },
  // 点击 电话 打电话
  phoneTap: function () {
    const { storePhone } = this.data;
    wx.makePhoneCall({
      phoneNumber: storePhone,
    })
  },
  // 点击门店 
  storeAddressTap: function () {
    wx.navigateTo({
      url: '/pages/stores/stores'
    });
  },
  // 教练的banner
  getCoach: function () {
    const _this = this;
    const { pageIndex, pageSize } = this.data;
    wx.request({
      url: `${app.globalData.host}/rest/s1/Goods/coach/getCoach`,
      data: {
        pageIndex,
        pageSize
      },
      success: function(res) {
        const { data } = res.data;
        _this.setData({
          coachList: data
        })
      }
    })
  },
  getStoreArea: function (storeId){
    const {pageIndex,pageSize}= this.data;
    const _this = this;
    wx.request({
      url: app.globalData.host + '/rest/s1/Goods/store/getStoreArea',
      data: {
        storeId,
        pageIndex,
        pageSize
      },
      success: function (res) {
        const { data } = res;
        const { data: sliberBanner } = data;
        _this.setData({
          sliberBanner,
        })
      }
    })
  }
})