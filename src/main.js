import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import config from './config'

import { IonicVue } from '@ionic/vue'
import { SplashScreen } from '@capacitor/splash-screen'

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/float-elements.css'
import '@ionic/vue/css/text-alignment.css'
import '@ionic/vue/css/text-transformation.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/display.css'

/* Theme variables */
import './theme/variables.css'
import './theme/tailwind.css'
import './theme/utils.css'
import './theme/fonts.css'

import masterStore from './store'

import {
  onOnesignalPermissionChange,
  onOnesignalNotificationReceived,
  onOnesignalNotificationOpened,
  onAppForeground,
  onBackButton
} from './events'

/* Custom plugins */
import utils from '@/plugins/utils'
import $http from '@/plugins/http'
import $loading from '@/plugins/loading'
import $toast from '@/plugins/toast'
import $alert from '@/plugins/alert'
import $device from '@/plugins/device'

import $docviewer from '@/plugins/docviewer-native'
import $docsaver from '@/plugins/docsaver'
import $onesignal from '@/plugins/onesignal-native'
// import $backgroundmode from '@/plugins/backgroundmode'
import { Capacitor } from '@capacitor/core'

async function init () {
  await SplashScreen.show()

  window.handleOpenURL = function (url) {
    if (url) {
      const token = url.split('token=')[1].split('#')[0]
      window.azureToken = token
      console.log('received url: ' + url, token)
      window.localStorage.setItem('JWT', token)
    }
  }

  const app = createApp(App)

  app.use(IonicVue)

  app.use(router)
  app.use(masterStore)
  app.use(utils)
  app.use($http, {
    mode: config.mode
  })
  app.use($alert)
  app.use($loading)
  if (!Capacitor.getPlatform() || Capacitor.getPlatform() !== 'web') {
    app.use($toast, {
      duration: 3000,
      color: 'primary'
    })
  }
  app.use($docviewer)
  app.use($docsaver)

  if (!Capacitor.getPlatform() || Capacitor.getPlatform() !== 'web') {
    app.use($onesignal, {
      events: {
        permissionChange: onOnesignalPermissionChange,
        notifOpened: onOnesignalNotificationOpened,
        notifReceived: onOnesignalNotificationReceived
      },
      ...config.oneSignal
    })
  }

  app.use($device, {
    events: {
      onForeground: onAppForeground,
      onBackButton
    }
  })

  masterStore.$app = app.config.globalProperties

  await router.isReady()
  app.mount('#app')

  // Fixing iphone quirks
  setTimeout(() => {
    SplashScreen.hide()
  }, 500)
}

init()
