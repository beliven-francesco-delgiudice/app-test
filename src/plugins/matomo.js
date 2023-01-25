export default {
  async install (app) {
    const $matomo = {
      setUserId: async function (userId) {
        return window._paq.push(['setUserId', userId]);
      },

      reset: async function () {
        return window._paq.push(['resetUserId']);
      },

      setScreen: async function (route) {
        console.log('[matomo] overriding :', route)

        window._paq.push(['setCustomUrl', route.path]);
        window._paq.push(['setDocumentTitle', route.name]);
      },

      logEvent: async function (name, params = {}) {
        console.log('[matomo] triggering event', name, params)

        return window._paq.push(['trackEvent', 'page', 'action', name, JSON.stringify(params)]);
      },

      logPage: async function (name, id) {
        console.log('[matomo] triggering pageView', name, id)

        return window._paq.push(['trackEvent', 'page', 'view', name, id]);
      },

      trackView: function () {
        console.log('[matomo] triggering page view')

        return window._paq.push(['trackPageView']);
      },

      trackSearch: function (searchQuery, numberResults = 0, category = false) {
        return window._paq.push(['trackSiteSearch',
          searchQuery,
          category,
          numberResults
        ]);
      }
    }

    app.config.globalProperties.$matomo = $matomo
  }
}
