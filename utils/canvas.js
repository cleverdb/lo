export default {
  data: {
    bg_ctx: "",//背景圆
    arc_ctx:'',//圆弧
    percentage: '', //百分比
    animTime: '', // 动画执行时间
  },
  options: {
    // 绘制圆形进度条方法
    run(c, w, h) {
      let that = this;
      var num = (2 * Math.PI / 100 * c) - 0.5 * Math.PI;
      var arcCtx = that.data.arc_ctx;
      arcCtx.arc(w, h, w - 4, -0.5 * Math.PI, num); //每个间隔绘制的弧度
      arcCtx.setStrokeStyle("#F2873B");
      arcCtx.setLineWidth("8");
      arcCtx.setLineCap("butt");
      arcCtx.stroke();
      arcCtx.beginPath();
      arcCtx.setFontSize(40); //注意不要加引号
      arcCtx.setFillStyle("#F2873B");
      arcCtx.setTextAlign("center");
      arcCtx.setTextBaseline("middle");
      //arcCtx.fillText(c + "分", w, h);
      arcCtx.fillText(c, w, h);
      arcCtx.draw();
    },
    /**
     * start 起始百分比
     * end 结束百分比
     * w,h 其实就是圆心横纵坐标
     */
    // 动画效果实现
    canvasTap(start, end, time, w, h) {
      var that = this;
      start++;
      if (start > end) {
        return false;
      }
      that.run(start, w, h);
      setTimeout(function () {
        that.canvasTap(start, end, time, w, h);
      }, time);
    },
    /**
     * 背景圆
     */
    drawBgCircle(w, h){
      var bgCtx = this.data.bg_ctx;
      bgCtx.setLineWidth(8);
      bgCtx.setStrokeStyle('#cccccc');
      bgCtx.setLineCap('butt');
      bgCtx.beginPath();
      bgCtx.arc(w, h, w - 4, 0, 2 * Math.PI,false);
      bgCtx.stroke();
      bgCtx.draw();
    },
    /**
     * arcId----------------canvas圆弧画板id
     * bgId------------canvas背景圆画板id
     * percent-----------进度条百分比
     * time--------------画图动画执行的时间  
     */
    draw: function (arcId,bgId,percent, animTime) {
      var that = this;
      const arc_ctx = wx.createCanvasContext(arcId);
      const bg_ctx = wx.createCanvasContext(bgId);
      that.setData({
        arc_ctx: arc_ctx,
        bg_ctx:bg_ctx,
        percentage: percent,
        animTime: animTime
      });
      var time = that.data.animTime / that.data.percentage;
      wx.createSelectorQuery().select('#' + arcId).boundingClientRect(function (rect) { //监听canvas的宽高
        var w = parseInt(rect.width / 2); //获取canvas宽的的一半
        var h = parseInt(rect.height / 2); //获取canvas高的一半，
        that.drawBgCircle(w,h)
        that.canvasTap(0, that.data.percentage, time, w, h)
      }).exec();
    },
  }
}