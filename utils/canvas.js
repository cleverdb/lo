export default {
  data: {
    bg_ctx: "",//背景圆
    arc_ctx:'',//圆弧
    step_ctx: '',//圆弧
    percentage: '', //百分比
    animTime: '', // 动画执行时间
  },
  options: {
    // 绘制圆形进度条方法
    run(c, w, h) {
      let that = this;
      var num = (1.5 * Math.PI / 100 * c);
      var arcCtx = that.data.arc_ctx;
      var step = 1.5 * Math.PI / 10;
      var start = 3 * Math.PI / 4;
      for (; ; ){
        if (num - step > 0 ){
          arcCtx.beginPath();
          arcCtx.arc(w, h, w - 3, start, start + 1.5 * Math.PI / 10, false); //每个间隔绘制的弧度
          arcCtx.setStrokeStyle("#fcc700");
          arcCtx.setLineWidth("6");
          arcCtx.setLineCap("butt");
          arcCtx.stroke();
        }else{
          arcCtx.beginPath();
          arcCtx.arc(w, h, w - 3, start, start + num, false); //每个间隔绘制的弧度
          arcCtx.setStrokeStyle("#fcc700");
          arcCtx.setLineWidth("6");
          arcCtx.setLineCap("butt");
          arcCtx.stroke();
          break;
        }
        num -= step;
        start = start + 1.5 * Math.PI / 10 + 1.5 * Math.PI / 100
      }
      that.drawNumber(arcCtx,c,w,h)
    },
    drawNumber(ctx,c,w,h){
      ctx.beginPath();
      ctx.setFontSize(50); //注意不要加引号
      ctx.setFillStyle("#fcc700");
      ctx.setTextAlign("center");
      ctx.setTextBaseline("middle");
      //arcCtx.fillText(c + "分", w, h);
      ctx.fillText(c, w, h);
      ctx.draw();
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
      bgCtx.setLineWidth(6);
      bgCtx.setStrokeStyle('#333333');
      bgCtx.setLineCap('butt');
      bgCtx.beginPath();
      bgCtx.arc(w, h, w - 3, 3 * Math.PI / 4,  Math.PI / 4, false);
      bgCtx.stroke();
      bgCtx.draw();
    },
    /**
     * 间隔弧
     */
    drawStepCircle(w, h) {
      var bgCtx = this.data.step_ctx;
      var all = 1.5 * Math.PI / 100;
      var fullStep = 1.5 * Math.PI / 10;
      var len = 1.5 * Math.PI / 100;
      for(var i = 1; i < 10 ; i++ ){
        var start = i * 1.5 * Math.PI / 10;
        var end = i * 1.5 * Math.PI / 10 + len;
        if (start == all) break;
        bgCtx.beginPath();  
        bgCtx.setLineWidth(6);
        bgCtx.setStrokeStyle('#3e3e3e');
        bgCtx.setLineCap('butt');
        bgCtx.beginPath();
        bgCtx.arc(w, h, w - 3, 3 * Math.PI / 4 + start, 3 * Math.PI / 4 + end, false);
        bgCtx.stroke();
      }
      bgCtx.draw();
    },
    /**
     * arcId----------------canvas圆弧画板id
     * bgId------------canvas背景圆画板id
     * stepId------------canvas间隔弧画板id
     * percent-----------进度条百分比
     * time--------------画图动画执行的时间  
     */
    draw: function (arcId,bgId,stepId,percent, animTime) {
      var that = this;
      const arc_ctx = wx.createCanvasContext(arcId);
      const bg_ctx = wx.createCanvasContext(bgId);
      const step_ctx = wx.createCanvasContext(stepId);
      that.setData({
        arc_ctx: arc_ctx,
        bg_ctx:bg_ctx,
        step_ctx: step_ctx,
        percentage: percent,
        animTime: animTime
      });
      var time = that.data.percentage == 0? 0: that.data.animTime / that.data.percentage;
      wx.createSelectorQuery().select('#' + arcId).boundingClientRect(function (rect) { //监听canvas的宽高
        var w = parseInt(rect.width / 2); //获取canvas宽的的一半
        var h = parseInt(rect.height / 2); //获取canvas高的一半，
        that.drawBgCircle(w,h)
        if (time == 0){
          that.drawNumber(that.data.arc_ctx , 0 , w, h)
        }else{
          that.canvasTap(0, that.data.percentage, time, w, h)
        }
        
        that.drawStepCircle(w, h)
      }).exec();
    },
  }
}