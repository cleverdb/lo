const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

const formatTimeNoSecond = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
}


const stepDates = step => {
  const now = new Date()
  const result = []
  let i = 0
  while (i < step) {
    const next = new Date(now.getTime() + i * 24 * 60 * 60 * 1000)
    const year = next.getFullYear()
    const month = next.getMonth() + 1
    const day = next.getDate()
    result.push([year, month, day].map(formatNumber).join('-'))
    i++
  }
  return result
}

const plusDate = (now, days) => {
  const next = new Date(new Date(now).getTime() + days * 24 * 60 * 60 * 1000)
  const year = next.getFullYear()
  const month = next.getMonth() + 1
  const day = next.getDate()
  return [year, month, day].map(formatNumber).join('-')
}


const concatParams = params => {
  let result = "?"
  for (let key in params) {
    let str = key + "=" + params[key] + "&"
    result += str
  }
  return result
}

const formatTimestampToDate = long => {
  let date = new Date(long)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}

const formatTimestampToTime = long => {
  let date = new Date(long)
  const hour = date.getHours()
  const minute = date.getMinutes()
  return [hour, minute].map(formatNumber).join(':')
}

const nowDate = () => {
  let date = new Date()
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}
function digitLength(num) {
  // Get digit length of e
  var eSplit = num.toString().split(/[eE]/);
  var len = (eSplit[0].split('.')[1] || '').length - (+(eSplit[1] || 0));
  return len > 0 ? len : 0;
}
var _boundaryCheckingState = true;
function checkBoundary(num) {
  if (_boundaryCheckingState) {
    if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
      console.warn(num + " is beyond boundary when transfer to integer, the results may not be accurate");
    }
  }
}
function float2Fixed(num) {
  if (num.toString().indexOf('e') === -1) {
    return Number(num.toString().replace('.', ''));
  }
  var dLen = digitLength(num);
  return dLen > 0 ? strip(num * Math.pow(10, dLen)) : num;
}
function times(num1, num2) {
  var others = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    others[_i - 2] = arguments[_i];
  }
  if (others.length > 0) {
    return times.apply(void 0, [times(num1, num2), others[0]].concat(others.slice(1)));
  }
  var num1Changed = float2Fixed(num1);
  var num2Changed = float2Fixed(num2);
  var baseNum = digitLength(num1) + digitLength(num2);
  var leftValue = num1Changed * num2Changed;
  checkBoundary(leftValue);
  return leftValue / Math.pow(10, baseNum);
}
module.exports = {
  formatNumber: formatNumber,
  formatTime: formatTime,
  formatDate: formatDate,
  plusDate: plusDate,
  stepDates: stepDates,
  formatTimeNoSecond: formatTimeNoSecond,
  concatParams: concatParams,
  formatTimestampToDate: formatTimestampToDate,
  nowDate: nowDate,
  formatTimestampToTime,
  times
}