// pages/privateCoursesBuy2/privateCoursesBuy2.js
import Utils from '../../utils/util.js';
import { _apis } from '../../utils/urlConfig.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    beselcoupon: {},
    total: "",
    isShowCoupon: false,
    teacherslist: [],
    sales: [],
    coupon: {
      usable: [
        {
          id: "1",
          voucherName: "满1000减100",
          threshold: "1000",
          parValue: "100",
          useNote: "阿萨斯",
          activeDate: "2019/10/1",
          expireDate: "2019/09/10",
          status: "未使用",
          cause: "不满住使用条件",
          scope: "通用"
        },
        {
          id: "2",
          voucherName: "满1000减100",
          threshold: "1000",
          parValue: "100",
          useNote: "阿萨斯",
          activeDate: "2019/10/1",
          expireDate: "2019/09/10",
          status: "未使用",
          cause: "不满住使用条件",
          scope: "通用"
        }
      ],
      unusable: [
        {
          id: "3",
          voucherName: "满1000减100",
          threshold: "1000",
          parValue: "100",
          useNote: "阿萨斯",
          activeDate: "2019/10/1",
          expireDate: "2019/09/10",
          status: "未使用",
          cause: "不满住使用条件",
          scope: "通用"
        },
        {
          id: '4',
          voucherName: "满1000减100",
          threshold: "1000",
          parValue: "100",
          useNote: "阿萨斯",
          activeDate: "2019/10/1",
          expireDate: "2019/09/10",
          status: "未使用",
          cause: "不满住使用条件",
          scope: "通用"
        }
      ]
    },
    beSelSale: {},
    isShowsalesList: false,
    data: {
      "appCardName": "",
      "cardId": "",
      "unitPrice": "",
      "cardLogoUrl": "",
      "description": "",
      "buyNote": "",
      "appCourseName": "",
      "courseId": "",
      "coachName": "",
      "cardTypeId": ""
    },
    num: 1,
    teacherSel: false,
    beSelTeacher: {

    },
    host: app.globalData.host,
    host_j: app.globalData.host_j,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('61', options);
    let { cardId } = options;
    this.initData(false, cardId);
    this.initSales(cardId);
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
  onUnload: function (options) {

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
  onCouponCancel: function () {
    let { isShowCoupon } = this.data;
    this.setData({
      isShowCoupon: false
    })
  },
  onSelCoupon: function () {
    let { isShowCoupon } = this.data;
    this.setData({
      isShowCoupon: !isShowCoupon
    })
  },
  onSaleCancel: function () {
    this.setData({
      isShowsalesList: false
    })

  },
  onselcoupon: function (e) {
    let { id } = e.target.dataset.item;
    let { coupon } = this.data;
    let json = {};
    let data = coupon.usable.map((item) => {
      if (item.id == id) {
        if (!item.besel) {
          json = item;
          item.besel = true
        } else {
          json = {}
          item.besel = false
        }

      } else {
        item.besel = false
      }
      return item;
    })
    this.setData({
      beselcoupon: json,
      coupon: {
        ...this.data.coupon,
        usable: data,
      }
    })
    if (coupon.usable) {

    }
  },
  onSelSaler: function (e) {
    let { currentTarget: { dataset: id } } = e;
    let { sales } = this.data;
    let newSales = sales.map((item) => {
      if (item.id == id.id) {
        item.besel = true;
      } else {
        item.besel = false;
      }
      return item
    });
    let besel = sales.find((item) => {
      return item.id == id.id
    });
    this.setData({
      sales: newSales,
      beSelSale: besel
    })


  },
  initSales: function (id) {
    let _this = this;
    wx.request({
      url: app.globalData.host_j + _apis.card_sales(id),
      method: 'GET',
      success: function (res) {
        if (res.statusCode != 200) {
          _this.setData({
            pageState: {
              message: '加载失败，请重新加载~',
              state: 'error'
            }
          })
        } else {

          _this.setData({
            sales: [
              ...res.data.data
            ],
            disabledBg: true
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
  onSelSale: function () {
    this.setData({
      isShowsalesList: true
    })

  },
  ondel: function () {
    let { num, data: { unitPrice } } = this.data;
    num = num - 1
    if (num > 0) {
      this.setData({
        num: num,
        total: Utils.times(unitPrice, num)
      })
    }
  },
  onadd: function () {
    let { num, data: { unitPrice } } = this.data;
    num = num + 1
    this.setData({
      num: num,
      total: Utils.times(unitPrice, num)
    })
  },
  onItemSelTeacher: function (e) {
    let { id } = e.currentTarget.dataset;
    let { teacherslist } = this.data;

    this.setData({
      teacherslist: teacherslist.map((item) => {
        if (id == item.id) {
          item.besel = true
        } else {
          item.besel = false
        }
        return item;
      })
    })
  },
  onSelectTeacher: function () {
    this.setData({
      teacherSel: !this.data.teacherSel
    })
  },
  ensureTeacher: function () {
    let { teacherslist } = this.data;
    let data = teacherslist.find((item) => {
      return item.besel == true;
    });
    this.setData({
      beSelTeacher: data,
      teacherSel: false
    })
    // this.setData({
    //   teacherSel: !this.data.teacherSel
    // })
  },
  initData: function (down, id) {
    var _this = this
    wx.showLoading({
      title: '加载中...',
    })
    let params = _this.data.queryParams
    if (down) {
      params = {
        pageIndex: params.pageIndex + 1,
        ...params
      }
    }
    wx.request({
      url: app.globalData.host + _apis.card_getCardDetail(id),
      data: params,
      method: 'GET',
      success: function (res) {

        if (res.statusCode != 200) {
          _this.setData({
            pageState: {
              message: '加载失败，请重新加载~',
              state: 'error'
            }
          })
        } else {
          _this.setData({
            'data': {
              ...res.data.data
            },
            total: Utils.times(res.data.data.unitPrice || 0, _this.data.num),
            disabledBg: true
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



  }
})