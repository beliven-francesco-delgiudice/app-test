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
import TermsAndConditions from '../pages/TermsAndConditions'

import WhatsNew from '../pages/whatsnew/WhatsNew'
import UpdateWizard from '../pages/whatsnew/UpdateWizard'

import Multimedia from '../pages/Multimedia.vue'

import Privacy from '../pages/Privacy.vue'

import Contacts from '../pages/Contact.vue'

import News from '../pages/news/News'
import NewsDetail from '../pages/news/NewsDetail'

import Documents from '../pages/documents/Documents'
import FolderDetail from '../pages/documents/FolderDetail'

import ProductsIndex from '../pages/products/ProductsIndex.vue'
import ProductsSegment from '../pages/products/ProductsSegment.vue'
import ProductsCategory from '../pages/products/ProductsCategory.vue'
import ProductsDetail from '../pages/products/ProductsDetail.vue'
import ComponentDetail from '../pages/products/ComponentDetail.vue'

import CongressesIndex from '../pages/congresses/Congresses.vue'
import CongressDetail from '../pages/congresses/CongressDetail.vue'
import ActivityDetail from '../pages/congresses/ActivityDetail.vue'

import SalesTrainingIndex from '../pages/training/SalesTraining.vue'
import SalesTrainingDetail from '../pages/training/SalesTrainingDetail.vue'

import Learn from '../pages/learn/LearnIndex.vue'
import CoursesList from '../pages/learn/CoursesList.vue'
import CourseDetail from '../pages/learn/CourseDetail.vue'

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
    meta: { refreshAction: ['getHome', 'loginWithToken'] },
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      }
    ]
  },
  // terms and conditions
  {
    path: '/terms',
    component: CleanLayout,
    children: [
      {
        path: '',
        name: 'Terms And Conditions',
        component: TermsAndConditions
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
    path: '/new/update/:id',
    component: CleanLayout,
    children: [
      {
        path: '',
        name: 'Update',
        component: UpdateWizard,
        meta: {}
      }
    ]
  },
  {
    path: '/new',
    component: MainLayout,
    children: [
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
        name: 'Menu',
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
  // documents
  {
    path: '/documents',
    component: MainLayout,
    children: [
      {
        path: '/documents/folder/:id',
        name: 'Folder',
        component: FolderDetail,
        meta: {
          showBack: true
        }
      },
      {
        path: '',
        name: 'Documents',
        component: Documents,
        meta: {
          showBack: true
        }
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
        name: 'Products Detail Components',
        component: ProductsDetail,
        meta: {
          showBack: true,
          section: 'components'
        }
      },
      {
        path: '/products/detail/:id/documents',
        name: 'Products Detail Documents',
        component: ProductsDetail,
        meta: {
          showBack: true,
          section: 'documents'
        }
      },
      {
        path: '/products/detail/:id',
        name: 'Products Detail',
        component: ProductsDetail,
        meta: {
          showBack: true
        }
      },
      // component detail
      {
        path: '/products/detail/component/:id',
        name: 'Component Detail',
        component: ComponentDetail,
        meta: {
          showBack: true
        }
      },
      // products category (products list)
      {
        path: '/products/category/:category',
        name: 'Product Category',
        component: ProductsCategory,
        meta: {
          showBack: true
        }
      },
      // products segment (categories/products list)
      {
        path: '/products/:segment',
        name: 'Product Segment',
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
        name: 'Congress Detail',
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
  },
  // sales training
  {
    path: '/training',
    component: MainLayout,
    children: [
      // sales training detail
      {
        path: '/training/:id/',
        name: 'Sales Training Detail',
        component: SalesTrainingDetail,
        meta: {
          showBack: true
        }
      },
      // sales training list
      {
        path: '',
        name: 'Sales Training',
        component: SalesTrainingIndex
      }
    ]
  },
  // Learn
  {
    path: '/learn',
    component: MainLayout,
    children: [
      // course detail
      {
        path: '/learn/list/:id/',
        name: 'Course Detail',
        component: CourseDetail,
        meta: {
          showBack: true
        }
      },
      {
        path: '/learn/:id/',
        name: 'Course Detail',
        component: CourseDetail,
        meta: {
          showBack: true
        }
      },
      // courses list
      {
        path: '/learn/list',
        name: 'Course List',
        component: CoursesList
      },
      // landing
      {
        path: '/learn',
        name: 'Learn Landing',
        component: Learn
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

router.beforeEach((to, from, next) => {
  if (
    to.path !== '/login' &&
    to.path !== '/privacy' &&
    !masterStore.getters.loggedIn
  ) {
    masterStore.dispatch('logout')
  }

  masterStore.dispatch('logScreenView', to)
  next()
})

export default router
