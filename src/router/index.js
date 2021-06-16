import {
  createRouter,
  createWebHashHistory,
  createWebHistory
} from '@ionic/vue-router'
import { isPlatform } from '@ionic/vue'

import MainLayout from '../layouts/Main'
import HomeLayout from '../layouts/Home.vue'
// import NoHeaderLayout from '../layouts/NoHeader'

import Home from '../pages/Home'
import Menu from '../pages/Menu'

import ProductsIndex from '../pages/products/ProductsIndex.vue'
import ProductsSegment from '../pages/products/ProductsSegment.vue'
import ProductsCategory from '../pages/products/ProductsCategory.vue'
import ProductsDetail from '../pages/products/ProductsDetail.vue'

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
    component: HomeLayout,
    children: [
      {
        path: '',
        name: 'Home',
        meta: { refreshAction: 'getHome', backAction: 'exit' },
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
        component: Menu,
        meta: {
          showWizard: true
        }
      }
    ]
  },
  {
    path: '/products',
    component: MainLayout,
    children: [
      {
        path: '/products/detail/:id',
        name: 'ProductsDetail',
        component: ProductsDetail,
        meta: {
          showBack: true
        }
      },
      {
        path: '/products/category/:category',
        name: 'ProductCategory',
        component: ProductsCategory,
        meta: {
          showBack: true
        }
      },
      {
        path: '/products/:segment',
        name: 'ProductSegment',
        component: ProductsSegment,
        meta: {
          showBack: true
        }
      },
      {
        path: '',
        name: 'Products',
        component: ProductsIndex
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

router.beforeEach((to, from, next) => {
  // if (to.meta.noAuth === true) return next()

  // if (!masterStore.getters.loggedIn) return next('/login')
  console.log('from: ', from, ' to: ', to)
  next()
})

export default router
