import Vue from 'vue'
import App from './App.vue'

import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'

// 进行登录后台验证
import axios from './api/axios.js'
// 注册全局组件
// import Mybread from '@/components/my-bread'
// Vue.component('my-bread', Mybread)
import plugin from '@/components'
// 引入全局less文件
import '@/styles/index.less'
Vue.use(plugin)
// 进行全局挂载
Vue.prototype.$http = axios

Vue.use(ElementUi)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
// 1人的肤色的
// main.js 职责入口文件
