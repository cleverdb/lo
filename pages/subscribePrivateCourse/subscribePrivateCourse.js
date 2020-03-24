const app = getApp();
Page({
  data: {
    value: '',
    lessSev:[
      { avatar: "", name: "东方月初", phone: "13565211234", coursetime: "01.02上课", classhour: "剩余课时：20节" },
      { avatar: "", name: "王权富贵", phone: "13565211234", coursetime: "01.01上课", classhour: "剩余课时：20节" },
      { avatar: "", name: "诸葛翠花", phone: "13565211234", coursetime: "12.30上课", classhour: "剩余课时：20节" },
      { avatar: "", name: "轩辕铁柱", phone: "13565211234", coursetime: "12.28购买课程", classhour: "剩余课时：20节" },
      { avatar: "", name: "百里秀儿", phone: "13565211234", coursetime: "12.20上课", classhour: "剩余课时：20节" },
    ],
    largeSev:[
      { avatar: "", name: "公孙铁蛋", phone: "13565211234", coursetime: "12.28购买课程", classhour: "剩余课时：20节" },
      { avatar: "", name: "端木秀儿", phone: "13565211234", coursetime: "12.20上课", classhour: "剩余课时：20节" },
      { avatar: "", name: "欧阳秀儿", phone: "13565211234", coursetime: "12.20上课", classhour: "剩余课时：20节" },
      { avatar: "", name: "太史铲儿", phone: "13565211234", coursetime: "12.20上课", classhour: "剩余课时：20节" },
      { avatar: "", name: "司徒铁锤", phone: "13565211234", coursetime: "12.20上课", classhour: "剩余课时：20节" },
    ],
    searchRes:[

    ],
    msg2: {
      icon: '../../../images/icon/subscribe_private_course.png',
      title: '暂无相关信息',
      text: '请重新输入查询的关键字',
    },
  },
  onChange(e) {
    console.log('onChange', e)
    this.setData({
      value: e.detail.value,
    })
  },
  onFocus(e) {
    console.log('onFocus', e)
  },
  onBlur(e) {
    console.log('onBlur', e)
  },
  onConfirm(e) {
    var search1=e.detail.value;
    this.setData({
      value:search1,
      searchRes:[]
    });
    var tArray1 = [
      { avatar: "", name: "东方月初", phone: "13565211234", coursetime: "01.02上课", classhour: "剩余课时：20节" },
      { avatar: "", name: "王权富贵", phone: "13565211234", coursetime: "01.01上课", classhour: "剩余课时：20节" },
      { avatar: "", name: "诸葛翠花", phone: "13565211234", coursetime: "12.30上课", classhour: "剩余课时：20节" },
      { avatar: "", name: "轩辕铁柱", phone: "13565211234", coursetime: "12.28购买课程", classhour: "剩余课时：20节" },
      { avatar: "", name: "百里秀儿", phone: "13565211234", coursetime: "12.20上课", classhour: "剩余课时：20节" },
    ];
    var tArray2 = [
      { avatar: "", name: "公孙铁蛋", phone: "13565211234", coursetime: "12.28购买课程", classhour: "剩余课时：20节" },
      { avatar: "", name: "端木秀儿", phone: "13565211234", coursetime: "12.20上课", classhour: "剩余课时：20节" },
      { avatar: "", name: "欧阳秀儿", phone: "13565211234", coursetime: "12.20上课", classhour: "剩余课时：20节" },
      { avatar: "", name: "太史铲儿", phone: "13565211234", coursetime: "12.20上课", classhour: "剩余课时：20节" },
      { avatar: "", name: "司徒铁锤", phone: "13565211234", coursetime: "12.20上课", classhour: "剩余课时：20节" },
    ];
    var tLess=[];
    var tLarge = [];
    if(search1==""){
      tLess=tArray1;
      tLarge=tArray2;
    }else{
      tLess=this.handleName(search1,tArray1);
      tLarge = this.handleName(search1,tArray2);
    }
    var tsearchRes=tLess.concat(tLarge);
    console.log("tsearchRes="+tsearchRes);
    this.setData({
      searchRes: tsearchRes
    });
  },
  handleName(searchtext,array){
    var resultArray=[];
    var len=array.length;
    for (var i = 0; i < len; i++) {
      var t1 = array[i].name;
      var t2 = array[i].phone;
      var tindex = t1.indexOf(searchtext);
      var tindex2 = t2.indexOf(searchtext);
      if (tindex > -1) {
        var obj = this.handleNameChildMethod(t1, tindex, searchtext,array[i],"name");
        resultArray.push(obj);
      } else if (tindex2 > -1) {
        var obj = this.handleNameChildMethod(t2, tindex2, searchtext, array[i],"phone");
        resultArray.push(obj);
      }
    }
    return resultArray;
  },
  handleNameChildMethod(content,index,searchtext,currentObj,pre){
    var ta = content.replace(searchtext, "");
    var tm = searchtext;
    var ts = ta.substring(0, index);
    var te = ta.substring(index);
    var keys = pre + "start";
    var keym = pre + "middle";
    var keye = pre + "end";
    var tobj={};
    tobj[keys] = ts;
    tobj[keym] = tm;
    tobj[keye] = te;
    var obj = Object.assign({}, currentObj, tobj);
    console.log(obj);
    return obj;
  },
  onClear(e) {
    console.log('onClear', e)
    this.setData({
      value: '',
    })
  },
  onCancel(e) {
    this.setData({
      value:''
    });
  },
})
