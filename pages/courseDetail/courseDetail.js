// pages/privateCoursesBuy2/privateCoursesBuy2.js
import Utils from '../../utils/util.js';
import { _apis } from '../../utils/urlConfig.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total: "",
    teacherslist: [],
    data: {
      imgSrc: "",
      courseType: "",
      coursePrice: "",
      courseUnit: "",
      notice: []
    },
    radioChecked:false,
    num: 1,
    teacherSel: false,
    beSelTeacher: {

    },
    host: app.globalData.host,
    courseName: '',
    iconUrl: '',
    coachName: '',
    buyNote: '',
    unitPrice: '',
    isVoucher:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    const {
      iconUrl,
      buyNote,
      courseId,
      coachId
    } = app.globalData.coachSelectData;
    console.log(app.globalData);
    wx.request({
      url: `${app.globalData.host}/rest/s1/Goods/course/private`,
      data: {
        courseId,
        coachId
      },
      success: function(res) {
        const data = res.data.data;
        const { unitPrice, coachName, courseName } = data;
        const { num } = _this.data;
        const total = Utils.times(unitPrice, num);
        _this.setData({
          iconUrl,
          coachName,
          courseName,
          buyNote,
          unitPrice,
          total
        })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  ondel: function () {
    let { num, unitPrice } = this.data;
    num = num - 1
    if (num > 0) {
      const data = Utils.times(unitPrice, num);
      this.getVoucher(data);
      this.setData({
        num: num,
        total: data
      })
    }
  },
  onadd: function () {
    let { num, unitPrice } = this.data;
    num = num + 1;
    const data = Utils.times(unitPrice, num);
    this.getVoucher(data);
    this.setData({
      num: num,
      total: data
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
  initData: function (down) {
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
      url: app.globalData.host_j + _apis.private_Buy_sel_teachers,
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
              ...res.data.data.info
            },
            teacherslist: [
              ...res.data.data.teachers
            ],
            total: Utils.times(res.data.data.info.coursePrice, _this.data.num),
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
  radioTap: function(e){
    const { radioChecked } = this.data;
    console.log('家具啊啊', radioChecked);
    this.setData({
      radioChecked: !radioChecked
    })
  },
  // 点击 支付按钮
  tapnPay: function () {
    const { radioChecked } = this.data;
    radioChecked? wx.showModal({
      title: '购买成功',
      content: '成功购买50节课\r\n在“我的-我的课程”中查看',
      showCancel: false,
      confirmText: '预约时间',
      confirmColor: '#FCC800',
      success(res) {
        if (res.confirm) {
          wx.navigateTo({
            url:'/pages/reserveTime/reserveTime'
            })
          }
      }
    }): ''
  },
  // 查询优惠卷
  getVoucher: function (param) {
    const { userId } = app.globalData.userInfo;
    const _this = this;
    wx.request({
      url: `${app.globalData.host}/rest/s1/Goods/voucher/getVoucher`,
      data: {
        countPrice: param,
        userId
      },
      success: function (res) {
        const data = res.data.data;
        const { usable } = data;
        console.log(usable);
        _this.setData({
          isVoucher: usable.length > 0
        })
      } 
    })
  }
})