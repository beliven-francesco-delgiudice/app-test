import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics'
import { Capacitor } from '@capacitor/core'
import config from '@/config'

export default {
  async install (app, conf = {}) {
    let init = false
    const $firebase = {
      initialize: async function (userId) {
        if (
          !init &&
          Capacitor.getPlatform() &&
          Capacitor.getPlatform() === 'web'
        ) {
          await FirebaseAnalytics.initializeFirebase(config.firebaseConfig)
        }

        if (!init) {
          init = true
          await FirebaseAnalytics.setCollectionEnabled({
            enabled: true
          })
          if (userId) {
            return this.setUserId(userId)
          }
          return
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
