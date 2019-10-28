// 提供 存储用户信息的相关API
// 约定 key=hm-toutiao-ye-key
const KEY = 'hm-toutiao-ye-key'
const local = {
  // 存储
  //   把user对象转换成json字符串
  setUser (user) {
    // 转换成json字符串
    const jsonStr = JSON.stringify(user)
    window.sessionStorage.setItem(KEY, jsonStr)
  },
  // 获取
  getUser () {
    const jsonStr = window.sessionStorage.getItem(KEY)
    return JSON.parse(jsonStr)
  },
  // 清楚
  delUser () {
    window.sessionStorage.removeItem(KEY)
  }
}
export default local
