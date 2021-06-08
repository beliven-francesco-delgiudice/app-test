import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import config from './config'

import { IonicVue } from '@ionic/vue'
import { Plugins } from '@capacitor/core'

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
import $onesignal from '@/plugins/onesignal-native'
import $backgroundmode from '@/plugins/backgroundmode'

async function init () {
  await Plugins.SplashScreen.show()

  const app = createApp(App)
    .use(IonicVue)
    .use(router)
    .use(masterStore)
    .use(utils)

    .use($http, {
      mode: config.mode
    })
    .use($alert)
    .use($loading)
    .use($toast, {
      duration: 3000,
      color: 'primary'
    })
    .use($docviewer)
    .use($backgroundmode, {
      enabled: true,
      defaults: {
        silent: false,
        title: 'App in background',
        text: 'Monitoring messages'
      }
    })
    .use($onesignal, {
      events: {
        permissionChange: onOnesignalPermissionChange,
        notifOpened: onOnesignalNotificationOpened,
        notifReceived: onOnesignalNotificationReceived
      },
      ...config.oneSignal
    })
    .use($device, {
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
    Plugins.SplashScreen.hide()
  }, 500)
}

init()
