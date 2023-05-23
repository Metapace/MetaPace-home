import Vue from 'vue'
import VueRouter from 'vue-router'
import PrivacyPolicy from '../views/PrivacyPolicy.vue'
Vue.use(VueRouter)

//安装vue-router
const routes = [
  {
    path: '/',
    // redirect重定向（设定默认首页）
    redirect: '/home'
  },
  {
    path: '/PrivacyPolicy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy
  }
]

//分配url与组件
const router = new VueRouter({
  routes
})

//生成router
export default router
