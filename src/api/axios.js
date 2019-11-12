import axios from 'axios'
import local from '@/utils/local'
import router from '@/router'
import jsonBig from 'json-bigint'
// import { promised } from 'q'
// axios的基本配置
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

axios.defaults.transformResponse = [(data) => {
  try {
    const result = jsonBig.parse(data)
    return result
  } catch (e) {
    return data
  }
}]
// 设置默认请求头
// 请求拦截器
axios.interceptors.request.use((config) => {
  const user = local.getUser() || {}
  config.headers.Authorization = `Bearer ${user.token}`
  return config
}, (err) => {
  return Promise.reject(err)
})
// 响应拦截器
axios.interceptors.response.use(res => res, err => {
  // 获取相应状态吗 err.response 相应对象 err.response.status 状态码
  if (err.response.status === 401) {
    // 太麻烦 window.location.href='http://localhost:8080/#/login'
    // 不推荐 window.location.hash = '#/login'
    return router.push('/login')
  }
  return Promise.reject(err)
  // 如果是401跳转登录
})
// if (local.getUser()) {
//   axios.defaults.headers.Authorization = `Bearer ${local.getUser().token}`
// }
export default axios
