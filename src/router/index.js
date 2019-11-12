// 跳转错误页面
const NotFound = () => import('@/views/404')
const VueRouter = () => import('vue-router')
const Vue = () => import('vue')
const local = () => import('@/utils/local')
const login = () => import('../views/login/login.vue')
const Home = () => import('@/views/home')
const Welcome = () => import('@/views/welcome')
const Article = () => import('@/views/article/article')
const Image = () => import('@/views/image')
const Publish = () => import('@/views/publish/')
const Comment = () => import('@/views/comment/')
const Setting = () => import('@/views/setting')
const Fans = () => import('@/views/fans')
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
          path: '/article',
          component: Article
        },
        {
          path: '/image',
          component: Image
        },
        {
          path: '/publish',
          component: Publish
        },
        {
          path: '/comment',
          component: Comment
        },
        {
          path: '/setting',
          component: Setting
        },
        {
          path: '/fans',
          component: Fans
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
