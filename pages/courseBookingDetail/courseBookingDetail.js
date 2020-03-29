import { $wuxDialog } from '../../dist/wux/index'
import { $wuxToast } from '../../dist/wux/index'
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
    chosedTime:"",
    chosedTimeShow:"",
    shadow1:false,
    shadow2:false,
    shadow3:false,
    isPlan:false,
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
      ['01月19日 周日', '01月19日 周日', '01月19日 周日','01月19日 周日'],
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
      multis:f,
      multisChosed:[f[0][0],f[1][0],f[2][0]]
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
  handleCancle3() {
    this.setData({
      shadow3: false,
      chosedTime: this.data.chosedTimeShow
    });
  },
  handleClick3() {
    let t =this.data.multisChosed;
    console.log(t);
    if(t.length>0){
      this.data.chosedTime=t[0]+t[1]+t[2];
    }
    this.setData({
      shadow3: false,
      chosedTimeShow: this.data.chosedTime
    });
  },
  chooseTime() {
    this.setData({
      shadow3: true
    });
  },
  isToPlan(){
    this.setData({
      isPlan:true
    });
  },
  canclePlan(){
    this.setData({
      isPlan: false
    });
  },
  modifyPlan(){
    this.setData({
      isPlan: false
    });
  },
  confirm() {
    if (this.data.chosedCourseShow==""){
      this.showToastText("选择上课信息");
    } else if (this.data.chosedStoreShow == "") {
      this.showToastText("选择门店");
    } else if (this.data.chosedTimeShow == "") {
      this.showToastText("选择时间");
    }else{
      let content = this.data.bookingCourse.user + ' ' + this.data.chosedCourseShow + this.data.chosedTimeShow;
      let that = this;
      $wuxDialog().confirm({
        resetOnClose: true,
        closable: true,
        title: '信息核对',
        content: content,
        confirmText: '确认',
        cancelText: '修改',
        onConfirm(e) {
          that.isToPlan();
        },
        onCancel(e) {
          console.log('谢谢你不吃之恩！')
        },
      })
    }
  },
  showToastText(msg) {
    $wuxToast().show({
      type: 'text',
      duration: 1500,
      color: '#fff',
      text: msg,
      success: () => console.log(msg)
    })
  },
  onValueChange(e) {
    console.log("this is sha?")
    this.setData({ multisChosed: e.detail.value })
    console.log('onValueChange', e.detail)
  },
})
