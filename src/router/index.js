import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/web-test',
    name: 'WebTest',
    component: () => import('../views/web/WebTest.vue')
  },
  {
    path: '/mobile-test',
    name: 'MobileTest',
    component: () => import('../views/mobile/MobileTest.vue')
  },

  // web端
  {
    path: '/web/ai-picture',
    name: 'WebAIPicture',
    component: () => import('./../views/web/ai-picture/AIPicture.vue'),
  },

  {
    path: '/web/picture-result',
    name: 'MobileTest',
    component: () => import('./../views/web/ai-picture/PictureResult.vue')
  },

  // 手机端
  // { 
  //   path: 'mobile', 
  //   name: 'Mobile',
  //   children: [
  //     {
  //       path: 'ai-picture',
  //       name: 'MobileAIPicture',
  //       component: () => import('./../views/mobile/AIPicture.vue'),
  //     } 
  //   ]
  // },
  {
    path: '/mobile/ai-picture',
    name: 'MobileAIPicture',
    component: () => import('./../views/mobile/AIPicture.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
