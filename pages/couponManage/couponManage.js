// pages/couponManage/couponManage.js
import { $wuxToast } from '../../dist/wux/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coupons:[
      { fullReduction: "满1000减50", exchange: "2人已兑换", buyScope: "仅限于购买课程", activeLife: "2019.01.20 当日有效", exchangecode:"兑换码 : LIOU01063389991",isVaild:"yes"},
      { fullReduction: "满1000减50", exchange: "2人已兑换", buyScope: "仅限于购买课程", activeLife: "2019.01.20 当日有效", exchangecode: "兑换码 : LIOU01063389991", isVaild: "no" },
      { fullReduction: "满1000减50", exchange: "2人已兑换", buyScope: "仅限于购买课程", activeLife: "2019.01.20 当日有效", exchangecode: "兑换码 : LIOU01063389991", isVaild: "yes" },
      { fullReduction: "满1000减50", exchange: "2人已兑换", buyScope: "仅限于购买课程", activeLife: "2019.01.20 当日有效", exchangecode: "兑换码 : LIOU01063389991", isVaild: "yes" },
    ]
  },
  delete:function(){

  },
  add:function(){

  },
  copy:function(e){
    console.log(e);
    $wuxToast().show({
      type: 'text',
      duration: 1500,
      color: '#fff',
      text: '兑换码复制成功',
      success: () => console.log(e.currentTarget.dataset.exchangecode)
    })
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