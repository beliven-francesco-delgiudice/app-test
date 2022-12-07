import { FirebaseAnalytics } from '@capacitor-community/firebase-analytics'
import { Capacitor } from '@capacitor/core'
import config from '@/config'

export default {
  async install (app, conf = {}) {
    const $firebase = {
      initialize: async function () {
        if (Capacitor.getPlatform() && Capacitor.getPlatform() === 'web') {
          const res = await FirebaseAnalytics.initializeFirebase(
            config.firebaseConfig
          )
          console.log('Initialize res:', res)
        }

        await FirebaseAnalytics.setCollectionEnabled({
          enabled: true
        })

        // if (userId) {
        //   return this.setUserId(userId)
        // }
        return
      },

      setUserId: async function (userId) {
        return FirebaseAnalytics.setUserId({ userId })
      },

      reset: async function () {
        return FirebaseAnalytics.reset()
      },

      setScreenName: async function (screenName, nameOverride, userId) {
        try {
          await this.initialize(userId)
        } catch (err) {
          console.log('Initialize error:', err)
        }

        let res = ''

        try {
          res = await FirebaseAnalytics.setScreenName({
            screenName,
            nameOverride
          })
          console.log('Log res:', res)
        } catch (err) {
          console.log('Log Event error:', err)
        }
        return res
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
          console.log('[LOG EVENT ERROR]:', err)
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
