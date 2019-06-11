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
}