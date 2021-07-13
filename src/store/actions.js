import urls from '@/urls'
import messages from '@/messages'

export async function logout (context) {
  context.commit('setUserData', false)
  this.$app.$router.push('/login')
}
export async function login (context, data) {
  try {
    // Decouple data from Vue as we will do modifications that user should not see
    data = { ...data }

    const loggedData = await this.$app.$http({
      method: 'POST',
      url: urls.auth.login,
      data
    })

    const userData = Object.assign({}, loggedData.user)

    context.commit('setUserData', userData)
    console.log('Logged in, user data: ', userData)

    window.localStorage.setItem('JWT', loggedData.jwt)

    // Now that we have user id we can proceed wit OneSignal sync with server
    await context.dispatch('syncOneSignal')

    // Check OneSignal permissions status
    // const subscriptionData = await this.$app.$onesignal.getPermissionState()
    // await context.dispatch('newNotificationsState', subscriptionData)

    if (userData.onboarding) {
      this.$app.$router.push('/onboarding')
    } else {
      this.$app.$router.push('/home')
    }
  } catch (e) {
    this.$app.$toast({
      message: messages.errors.cannotLogin,
      color: 'danger'
    })
    throw e
  }
}
export async function loginWithToken (context) {
  try {
    // Decouple data from Vue as we will do modifications that user should not see

    const loggedData = await this.$app.$http({
      method: 'POST',
      url: urls.auth.loginWithToken
    })

    const userData = Object.assign({}, loggedData.user)

    context.commit('setUserData', userData)
    console.log('Logged in, user data: ', userData)

    window.localStorage.setItem('JWT', loggedData.jwt)

    // Now that we have user id we can proceed wit OneSignal sync with server
    await context.dispatch('syncOneSignal')

    // Check OneSignal permissions status
    // const subscriptionData = await this.$app.$onesignal.getPermissionState()
    // await context.dispatch('newNotificationsState', subscriptionData)

    if (userData.onboarding) {
      this.$app.$router.push('/onboarding')
    } else {
      this.$app.$router.push('/home')
    }
  } catch (e) {
    this.$app.$toast({
      message: messages.errors.cannotLogin,
      color: 'danger'
    })
    throw e
  }
}

export async function syncOneSignal () {
  const playerId = await this.$app.$onesignal.getUID()
  const deviceInfo = await this.$app.$device.getInfo()
  const deviceId = await this.$app.$device.getId()
  const appInfo = await this.$app.$device.getAppInfo()

  await this.$app.$http({
    method: 'POST',
    url: urls.deviceInfo,
    data: {
      uuid: deviceId.uuid,
      os: deviceInfo.platform,
      device: `${deviceInfo.platform} ${deviceInfo.osVersion} - ${deviceInfo.model}`,
      push_id: playerId,
      browser: window.navigator.userAgent || window.navigator.appVersion,
      app_version: appInfo.version
    }
  })
}
export async function getMessages (context, event) {
  try {
    const messagesList = await this.$app.$http({
      method: 'GET',
      url: `${urls.list.messages}${
        context.getters.roundId ? `?roundId=${context.getters.roundId}` : ''
      }`,
      loader: !!context.getters.roundId
    })
    context.commit('setMessages', (messagesList || {}).data || {})
  } catch (e) {
    this.$app.$toast({
      message: messages.errors.cannotGetMessages,
      color: 'danger'
    })
  }
  if (event && event.target.complete) event.target.complete()
}
export async function setMessageAs (context, { id, status = 1 }) {
  await this.$app.$http({
    method: 'POST',
    url: urls.list.messages,
    loader: false,
    data: {
      messageId: id,
      status
    }
  })
}
export async function sendMessageResponse (context, { id, reply }) {
  await this.$app.$http({
    method: 'POST',
    url: urls.list.reply,
    data: {
      messageId: id,
      reply
    }
  })
}

export async function getHome (context) {
  let products = []
  let congresses = []

  try {
    // get products
    const prod = await this.$app.$http({
      method: 'GET',
      url: urls.products.segments,
      params: {}
    })

    if (prod && prod.categories) {
      products = prod.categories
    }

    // get congresses
    const congressesList = await this.$app.$http({
      method: 'GET',
      url: urls.congresses.home,
      params: {}
    })
    congresses = congressesList
  } catch (e) {
    this.$app.$toast({
      message: messages.errors.home,
      color: 'danger'
    })
  }

  const homeObject = {
    products,
    congresses
  }

  context.commit('setHome', homeObject)
}
