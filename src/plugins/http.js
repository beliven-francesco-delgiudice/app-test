import axios from 'axios'
import urls from '@/urls'
import messages from '@/messages'

export const getJWT = () => {
  return (
    window.localStorage.getItem('JWT') ||
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjI3NTIsImlhdCI6MTYyNDYxNjI3MSwibmJmIjoxNjI0NjE2MjcxLCJleHAiOjE2MjcyMDgyNzF9.D6avez71QlGkYNz6PtMVviGTX6NqdQk-2jNxmUpsJbk'
  )
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
        console.log(config)
        data = await axios({
          ...defaults,
          ...base,
          ...config,
          url: `${baseUrl}${url}`
        })

        if (data.data && data.data.token) setJWT(data.data.token)
      } catch (e) {
        if (loader) await this.$loading.hide()
        if (notifyErrors) {
          app.$toast({
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
