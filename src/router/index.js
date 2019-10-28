import VueRouter from 'vue-router'
import Vue from 'vue'
import local from '@/utils/local'
import login from '../views/login/login.vue'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
// 跳转错误页面
import NotFound from '@/views/404'
// import local from '@/utils/local'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/login', component: login },
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/',
          component: Welcome
        },
        {
          path: '*',
          component: NotFound
        }
      ]
    }
  ]
})
// 添加 导航守卫  前置导航路由方法
router.beforeEach((to, from, next) => {
  // 每次跳转的时候触发
  // to 跳转到目标 路由对象
  // from 从哪里跳转过来  路由对象
  // next 下一步方法 next()不传参数就是放行  next('/login')有参数就是拦截
  const user = local.getUser()
  if (user && user.token) {
    next()
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
