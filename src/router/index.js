import {
  createRouter,
  createWebHashHistory,
  createWebHistory
} from '@ionic/vue-router'
import { isPlatform } from '@ionic/vue'

import MainLayout from '../layouts/Main'
import NoHeaderLayout from '../layouts/NoHeader'

import Home from '../pages/Home'
import Menu from '../pages/Menu'

// import masterStore from '../store'

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  // {
  //   path: '/',
  //   component: CleanLayout,
  //   children: [
  //     {
  //       name: 'login',
  //       path: '',
  //       redirect: 'login'
  //     },
  //     {
  //       path: 'login',
  //       name: 'Login',
  //       meta: { noAuth: true, backAction: 'exit' },
  //       component: Login
  //     }
  //   ]
  // },
  {
    path: '/home',
    component: NoHeaderLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      }
    ]
  },
  {
    path: '/menu',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'LimApp',
        component: Menu
      }
    ]
  }
]

const router = createRouter({
  history: isPlatform('capacitor')
    ? createWebHistory(process.env.BASE_URL || '/')
    : createWebHashHistory(),
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.meta.noAuth === true) return next()

//   if (!masterStore.getters.loggedIn) return next('/login')

//   next()
// })

export default router
