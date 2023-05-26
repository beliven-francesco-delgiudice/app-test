import {
  createRouter,
  createWebHashHistory,
  createWebHistory
} from '@ionic/vue-router'
import { isPlatform } from '@ionic/vue'

import HomeLayout from '../layouts/Home.vue'
import Home from '../pages/Home'


const routes = [
  {
    path: '/home',
    component: HomeLayout,
    meta: { refreshAction: ['getHome', 'loginWithToken'] },
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      }
    ]
  },


  // 404 to home
  { path: '/:catchAll(.*)', redirect: '/home' }
]

const router = createRouter({
  history: isPlatform('capacitor')
    ? createWebHistory(process.env.BASE_URL || '/')
    : createWebHashHistory(),
  routes
})

export default router
