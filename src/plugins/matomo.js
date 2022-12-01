export default {
  async install (app) {
    const $matomo = {
      setUserId: async function (userId) {
        return window._paq.push(['setUserId', userId]);
      },

      reset: async function () {
        return window._paq.push(['resetUserId']);
      },

      setScreenName: async function (screenName, nameOverride, userId) {
        try {
          await this.initialize(userId)
        } catch (err) {
          console.log('Initialize error:', err)
        }

        let res = ''

        try {
          res = window._paq.push(['setDocumentTitle', screenName]);
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
          window._paq.push(['trackEvent', name, params]);

          console.log('Log res:', res)
        } catch (err) {
          console.log('Log Event error:', err)
        }
        return res
      }
    }

    app.config.globalProperties.$matomo = $matomo
  }
}
