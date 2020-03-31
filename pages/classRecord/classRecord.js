// pages/classRecord/classRecord.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:1,
    tabs:[{
      key:1,
      title:'全部'
    },
    {
      key: 2,
      title: '待上课'
    }, {
      key: 3,
      title: '已完成'
    }, {
      key: 4,
      title: '已取消'
    }],
    classStatus:{
      2:{
        color: '#E13A67',
        text: '待上课'
      },
      3: {
        color: '#3DBEDB',
        text: '已完成'
      },
      4: {
        color: '#FBC806',
        text: '已取消'
      }
    }
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
  // tabs change
  onTabsChange(e) {
    console.log('onTabsChange', e)
    const { key } = e.detail
    const index = this.data.tabs.map((n) => n.key).indexOf(key)

    this.setData({
      current:key,
    })
  },
  onSwiperChange:function(e){
      console.log('e', e);
      const { current } = e.detail;
      this.setData({
        current:current + 1
      })
  }
})