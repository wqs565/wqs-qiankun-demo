/*
 * @Author: wangqs 
 * @Date: 2020-11-10 18:11:33 
 * @Last Modified by: wangqs
 * @Last Modified time: 2020-11-19 14:01:56
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: window.__POWERED_BY_QIANKUN__
    ? process.env.VUE_APP_BASE_PATH
    : '/',
  routes
})

export default router
