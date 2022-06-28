import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics'
import { Capacitor } from '@capacitor/core'
import config from '@/config'

export default {
  async install (app, conf = {}) {
    let init = false
    const $firebase = {
      initialize: async function (userId) {
        if (Capacitor.getPlatform() && Capacitor.getPlatform() === 'web') {
          const res = await FirebaseAnalytics.initializeFirebase(
            config.firebaseConfig
          )
          console.log('Initialize res:', res)
        }

        if (!init) {
          await FirebaseAnalytics.setCollectionEnabled({
            enabled: true
          })
        }
        if (userId) {
          return this.setUserId(userId)
        }
        return
      },
      setUserId: async function (userId) {
        return FirebaseAnalytics.setUserId({ userId })
      },
      reset: async function () {
        return FirebaseAnalytics.reset()
      },
      logEvent: async function (name, params = {}, userId) {
        try {
          await this.initialize(userId)
        } catch (err) {
          console.log('Initialize error:', err)
        }

        let res = ''

        try {
          res = await FirebaseAnalytics.logEvent({
            name,
            params
          })
          console.log('Log res:', res)
        } catch (err) {
          console.log('Log Event error:', err)
        }
        return res
      }
    }

    app.config.globalProperties.$firebase = $firebase

    if (conf.autoload) {
      await $firebase.initialize()
    }
  }
}
