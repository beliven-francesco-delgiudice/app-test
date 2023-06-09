import axios from 'axios'
import urls from '@/urls'
import messages from '@/messages'

export const getJWT = () => {
  return window.localStorage.getItem('JWT') || false
}

export const setJWT = jwt => {
  return window.localStorage.setItem('JWT', jwt)
}

export default {
  install: function (app, { mode = 'dev', ...defaults }) {
    const $http = async function ({
      auth = true, // Choose to send bearer if available
      loader = true, // Show loading spinner
      notifyErrors = false,
      baseUrl = urls.baseUrl[mode],
      url = '',
      headers = {},
      ...config
    } = {}) {
      const base = {}

      if (auth) {
        const jwt = getJWT()
        if (jwt) {
          base.headers = {
            Authorization: `Bearer ${jwt}`,
            ...headers
          }
        }
      }

      if (!base.headers) base.headers = headers

      if (loader) await this.$loading.show()

      let data

      try {
        data = await axios({
          ...defaults,
          ...base,
          ...config,
          url: `${baseUrl}${url}`
        })

        if (data.data && data.data.jwt) setJWT(data.data.jwt)
      } catch (e) {
        if (e.request && e.request.status === 401) {
          this.$store.dispatch('logout')
          this.$toast({
            message: messages.errors.loginNecessary,
            color: 'danger'
          })
          if (loader) await this.$loading.hide()
          // FIXME: pay attention, it is possible to break stuff by returning an object
          return {}
        }

        if (loader) await this.$loading.hide()
        if (notifyErrors) {
          this.$toast({
            message: messages.errors.cannotPerform,
            color: 'error'
          })
          return console.error(e)
        }
        throw e
      }
      await this.$loading.hide()
      return data.data
    }

    app.config.globalProperties.$http = $http
  }
}
