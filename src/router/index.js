import {
  createRouter,
  createWebHashHistory,
  createWebHistory
} from '@ionic/vue-router'
import { isPlatform } from '@ionic/vue'

import MainLayout from '../layouts/Main'
import HomeLayout from '../layouts/Home.vue'
import CleanLayout from '../layouts/Clean.vue'

import Home from '../pages/Home'
import Menu from '../pages/Menu'
import Search from '../pages/Search'
import Login from '../pages/Login'
import UsefulLinks from '../pages/UsefulLinks'
import OnBoarding from '../pages/OnBoarding'

import WhatsNew from '../pages/whatsnew/WhatsNew'
import UpdateWizard from '../pages/whatsnew/UpdateWizard'

import Multimedia from '../pages/Multimedia.vue'

import Privacy from '../pages/Privacy.vue'

import Contacts from '../pages/Contact.vue'

import News from '../pages/news/News'
import NewsDetail from '../pages/news/NewsDetail'

import ProductsIndex from '../pages/products/ProductsIndex.vue'
import ProductsSegment from '../pages/products/ProductsSegment.vue'
import ProductsCategory from '../pages/products/ProductsCategory.vue'
import ProductsDetail from '../pages/products/ProductsDetail.vue'
import ComponentDetail from '../pages/products/ComponentDetail.vue'

import CongressesIndex from '../pages/congresses/Congresses.vue'
import CongressDetail from '../pages/congresses/CongressDetail.vue'
import ActivityDetail from '../pages/congresses/ActivityDetail.vue'
import masterStore from '../store'

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  // login
  {
    path: '/login',
    component: CleanLayout,
    children: [
      {
        path: '',
        name: 'Login',
        component: Login
      }
    ]
  },
  // home
  {
    path: '/home',
    component: HomeLayout,
    meta: { refreshAction: 'getHome' },
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      }
    ]
  },
  // onboarding
  {
    path: '/onboarding',
    component: CleanLayout,
    children: [
      {
        path: '',
        name: 'OnBoarding',
        component: OnBoarding
      }
    ]
  },
  // useful
  {
    path: '/useful',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Useful Links',
        component: UsefulLinks,
        meta: {
          showBack: true
        }
      }
    ]
  },
  // news
  {
    path: '/news',
    component: MainLayout,
    children: [
      {
        path: '/news/:id',
        name: 'News Detail',
        component: NewsDetail,
        meta: {
          showBack: true
        }
      },
      {
        path: '',
        name: 'News',
        component: News,
        meta: {
          showBack: true
        }
      }
    ]
  },
  // multimedia
  {
    path: '/multimedia',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Multimedia',
        component: Multimedia
      }
    ]
  },
  // new
  {
    path: '/new',
    component: MainLayout,
    children: [
      {
        path: '/new/update/:id',
        name: 'Update',
        component: UpdateWizard,
        meta: {}
      },
      {
        path: '',
        name: "What's New",
        component: WhatsNew,
        meta: {
          showBack: true
        }
      }
    ]
  },
  // menu
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
  // search
  {
    path: '/search',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Search',
        component: Search
      }
    ]
  },
  // privacy
  {
    path: '/privacy',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Privacy',
        component: Privacy
      }
    ]
  },
  // contacts
  {
    path: '/contacts',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'Contacts',
        component: Contacts
      }
    ]
  },
  // products
  {
    path: '/products',
    component: MainLayout,
    children: [
      // products detail (details, components, documents)
      {
        path: '/products/detail/:id/components',
        name: 'ProductsDetailComponents',
        component: ProductsDetail,
        meta: {
          showBack: true,
          section: 'components'
        }
      },
      {
        path: '/products/detail/:id/documents',
        name: 'ProductsDetailDocuments',
        component: ProductsDetail,
        meta: {
          showBack: true,
          section: 'documents'
        }
      },
      {
        path: '/products/detail/:id',
        name: 'ProductsDetail',
        component: ProductsDetail,
        meta: {
          showBack: true
        }
      },
      // component detail
      {
        path: '/products/detail/component/:id',
        name: 'ComponentDetail',
        component: ComponentDetail,
        meta: {
          showBack: true
        }
      },
      // products category (products list)
      {
        path: '/products/category/:category',
        name: 'ProductCategory',
        component: ProductsCategory,
        meta: {
          showBack: true
        }
      },
      // products segment (categories/products list)
      {
        path: '/products/:segment',
        name: 'ProductSegment',
        component: ProductsSegment,
        meta: {
          showBack: true
        }
      },
      // products (segments list)
      {
        path: '',
        name: 'Products',
        component: ProductsIndex
      }
    ]
  },
  // congresses
  {
    path: '/congresses',
    component: MainLayout,
    children: [
      // activity detail
      {
        path: '/congresses/activities/:id',
        name: 'Activity Detail',
        component: ActivityDetail,
        meta: {
          showBack: true
        }
      },
      // congress detail
      {
        path: '/congresses/:id/',
        name: 'CongressDetail',
        component: CongressDetail,
        meta: {
          showBack: true
        }
      },
      // congresses list
      {
        path: '',
        name: 'Congresses',
        component: CongressesIndex
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
  if (
    to.path !== '/login' &&
    to.path !== '/privacy' &&
    !masterStore.getters.loggedIn
  ) {
    masterStore.dispatch('logout')
  }
  next()
})

export default router
