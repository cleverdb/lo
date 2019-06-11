
const error = (that, message) => {
  return (message = '请检查您的网络连接') => {
    that.setData({
      pageState: {
        state: 'error',
        message
      }
    })
  }
}

const empty = (that, message) => {
  return (message = '空空如也～') => {
    that.setData({
      pageState: {
        state: 'empty',
        message
      }
    })
  }
}
const _login = (that,message) => {
  return (message = '请先登陆哟') => {
    that.setData({
      pageState: {
        state: 'unlogin',
        message
      }
    })
  }
}

export default (that) => {
  return {
    error: error(that),
    empty: empty(that),
    _login: _login(that)
  }
}