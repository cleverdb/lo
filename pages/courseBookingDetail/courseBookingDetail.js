const app = getApp();
Page({
  data: {
    bookingCourse:{
      user:"张珂洋",
      userImg:"",
      courseMoney:"1",
      courseLength:"1",
      coursePerson:"01"
    },
    chosedCourse:"",
    chosedCourseShow:"",
    chosedStore:"",
    chosedStoreShow:"",
    shadow1:false,
    shadow2:true,
    stores:[
      { name:"LIOU健身乐城店"},
      { name:"LIOU STUDIO健身工作室"}
    ],
    courses:[
      { name: "常规课", money: "300", surplus: "30", total: "50", expire: "2020.09.09" },
      { name: "拉伸课", money: "320", surplus: "20", total: "30", expire: "2020.09.09" },
      { name: "拳击课", money: "320", surplus: "10", total: "50", expire: "2020.09.09" }
    ],
    multis:[
      ['<i style="color:red;">01</i>月19日 周日', '01月19日 周日', '01月19日 周日','01月19日 周日'],
      ['00','01','02'],
      ['00','30']
    ],
    multisChosed:[]
  }
  ,
  formatDate(myDate){
    var year = myDate.getFullYear(); //年
    var month = myDate.getMonth() + 1; //月
    var day = myDate.getDate(); //日
    var days = myDate.getDay();
    switch (days) {
      case 1:
        days = '周一';
        break;
      case 2:
        days = '周二';
        break;
      case 3:
        days = '周三';
        break;
      case 4:
        days = '周四';
        break;
      case 5:
        days = '周五';
        break;
      case 6:
        days = '周六';
        break;
      case 0:
        days = '周日';
        break;
    }
    var t1 = (month < 10 ? "0" + month : month) + "月" + (day < 10 ? "0" + day : day)+"日"+" "+days;
    return t1;
  },
  forDates(){
    var r=[];
    var f=[];
    var myDate = new Date();
    var t = myDate.getDate();
    for(var i=0;i<7;i++){
      myDate.setDate(t + i);
      r.push(this.formatDate(myDate));
    }
    f.push(r);
    f.push(['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']);
    f.push(['00','10','20','30','40','50']);
    this.setData({
      multis:f
    });
  },
  onReady() {
    this.forDates();
  }
  ,
  handleRadio(e){
    var name = e.currentTarget.dataset.name;
    if (this.chosedCourse != name){
      this.setData({
        chosedCourse:name
      });
    }
  },
  handleCancle1(){
    this.setData({
      shadow1:false,
      chosedCourse: this.data.chosedCourseShow
    });
  },
  handleClick(){
    this.setData({
      shadow1: false,
      chosedCourseShow: this.data.chosedCourse
    });
  },
  chooseCourse(){
    this.setData({
      shadow1:true
    });
  },
  handleRadio2(e) {
    var name = e.currentTarget.dataset.name;
    if (this.chosedStore != name) {
      this.setData({
        chosedStore: name
      });
    }
  },
  handleCancle2() {
    this.setData({
      shadow2: false,
      chosedStore: this.data.chosedStoreShow
    });
  },
  handleClick2() {
    this.setData({
      shadow2: false,
      chosedStoreShow: this.data.chosedStore
    });
  },
  chooseStore() {
    this.setData({
      shadow2: true
    });
  },
})
