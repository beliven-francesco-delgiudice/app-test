import urls from '@/urls'
import messages from '@/messages'
import { Capacitor } from '@capacitor/core'

function resolveRouting (
  app,
  needToAcceptTerms,
  needOnboarding,
  isUpdateToShow,
  isNotificationToShow
) {
  console.debug(
    'need to accept terms? ' + needToAcceptTerms,
    'need onboarding? ' + needOnboarding
  )
  if (needToAcceptTerms) {
    app.$router.push('/terms')
  } else if (needOnboarding) {
    app.$router.push('/onboarding')
  } else if (isUpdateToShow) {
    app.$router.push('/new/update/' + isUpdateToShow)
  } else if (isNotificationToShow) {
    const path = isNotificationToShow
    app.$store.commit('setNotificationToShow', null)
    app.$router.push(path)
  } else {
    app.$router.push('/home')
  }
}

export async function alreadyLoggedRouting (context) {
  try {
    if (!Capacitor.getPlatform() || Capacitor.getPlatform() !== 'web') {
      // Now that we have user id we can proceed wit OneSignal sync with server
      await context.dispatch('syncOneSignal', context)
    }
  } catch (e) {
    console.error(e)
  }

  resolveRouting(
    this.$app,
    context.getters.needToAcceptTerms,
    context.getters.needOnboarding,
    context.getters.gotUpdatesToShow,
    context.getters.gotNotificationToShow
  )
}

export async function logout (context) {
  context.commit('setUserData', false)
  window.localStorage.setItem('JWT', '')
  this.$app.$router.push('/login')
}
export async function login (context, data) {
  try {
    // Decouple data from Vue as we will do modifications that user should not see
    data = { ...data }

    this.$app.$loading.show()

    const loggedData = await this.$app.$http({
      method: 'POST',
      url: urls.auth.login,
      data,
      loader: false
    })

    const userData = Object.assign({}, loggedData.user)

    context.commit('setUserData', userData)
    context.commit('setNeedToAcceptTerms', loggedData.need_accept_terms)
    context.commit('setOnboarding', loggedData.onboarding)
    context.commit('setNotifications', loggedData.push)
    context.commit('setAppUpdates', loggedData.update_id)

    window.localStorage.setItem('JWT', loggedData.jwt)

    // No OneSignal if WebApp
    try {
      if (!Capacitor.getPlatform() || Capacitor.getPlatform() !== 'web') {
        // Now that we have user id we can proceed wit OneSignal sync with server
        await context.dispatch('syncOneSignal', context)
      }
    } catch (e) {
      console.error(e)
    }

    // Check OneSignal permissions status
    // const subscriptionData = await this.$app.$onesignal.getPermissionState()
    // await context.dispatch('newNotificationsState', subscriptionData)

    this.$app.$loading.hide()

    resolveRouting(
      this.$app,
      context.getters.needToAcceptTerms,
      context.getters.needOnboarding,
      context.getters.gotUpdatesToShow,
      context.getters.gotNotificationToShow
    )
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

    this.$app.$loading.show()

    const loggedData = await this.$app.$http({
      method: 'POST',
      url: urls.auth.loginWithToken,
      loader: false
    })

    const userData = Object.assign({}, loggedData.user)

    context.commit('setUserData', userData)
    context.commit('setNeedToAcceptTerms', loggedData.need_accept_terms)
    context.commit('setOnboarding', loggedData.onboarding)
    context.commit('setNotifications', loggedData.push)
    context.commit('setAppUpdates', loggedData.update_id)

    window.localStorage.setItem('JWT', loggedData.jwt)

    // No OneSignal if WebApp
    try {
      if (!Capacitor.getPlatform() || Capacitor.getPlatform() !== 'web') {
        // Now that we have user id we can proceed wit OneSignal sync with server
        await context.dispatch('syncOneSignal', context)
      }
    } catch (e) {
      console.error(e)
    }

    // Check OneSignal permissions status
    // const subscriptionData = await this.$app.$onesignal.getPermissionState()
    // await context.dispatch('newNotificationsState', subscriptionData)

    this.$app.$loading.hide()

    resolveRouting(
      this.$app,
      context.getters.needToAcceptTerms,
      context.getters.needOnboarding,
      context.getters.gotUpdatesToShow,
      context.getters.gotNotificationToShow
    )
  } catch (e) {
    this.$app.$toast({
      message: messages.errors.cannotLogin,
      color: 'danger'
    })
    throw e
  }
}

export async function syncOneSignal () {
  try {
    const playerId = await this.$app.$onesignal.getUID()
    const deviceInfo = await this.$app.$device.getInfo()
    const deviceId = await this.$app.$device.getId()
    const appInfo = await this.$app.$device.getAppInfo()

    const oneSignalData = await this.$app.$http({
      method: 'POST',
      url: urls.users.deviceInfo,
      loader: false,
      data: {
        uuid: deviceId.uuid,
        os: deviceInfo.platform,
        device: `${deviceInfo.platform} ${deviceInfo.osVersion} - ${deviceInfo.model}`,
        push_id: playerId,
        browser: window.navigator.userAgent || window.navigator.appVersion,
        app_version: appInfo.version
      }
    })

    console.debug(oneSignalData)
  } catch (e) {
    console.error(e)
    this.$app.$toast({
      message: messages.errors.deviceInfo,
      color: 'danger'
    })
  }
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

export async function getNotifications (context) {
  let notifications = []

  try {
    // get notifications
    const results = await this.$app.$http({
      method: 'GET',
      url: urls.notifications.list,
      params: {}
    })

    notifications = results
  } catch (e) {
    this.$app.$toast({
      message: messages.errors.home,
      color: 'danger'
    })
  }

  context.commit('setNotifications', notifications)
}

export async function getHome (context) {
  let products = []
  let congresses = []
  let notifications = []
  let news = []
  const documents = {
    my: [],
    shared: []
  }

  this.$app.$loading.show()

  try {
    // get products
    const prod = await this.$app.$http({
      method: 'GET',
      url: urls.products.segments,
      params: {},
      loader: false
    })

    if (prod && prod.categories) {
      products = prod.categories
    }

    // get congresses
    const congressesList = await this.$app.$http({
      method: 'GET',
      url: urls.congresses.home,
      params: {},
      loader: false
    })
    congresses = congressesList

    // get notifications
    const notificationsList = await this.$app.$http({
      method: 'GET',
      url: urls.notifications.list,
      params: {},
      loader: false
    })
    notifications = notificationsList

    // get news
    const newsList = await this.$app.$http({
      method: 'GET',
      url: urls.news.home,
      params: {},
      loader: false
    })
    news = newsList

    // get documents
    const documentsMy = await this.$app.$http({
      method: 'GET',
      url: urls.documents.list_my,
      params: {},
      loader: false
    })
    documents.my = documentsMy.list

    const documentsShared = await this.$app.$http({
      method: 'GET',
      url: urls.documents.list_shared,
      params: {},
      loader: false
    })
    documents.shared = documentsShared.list
  } catch (e) {
    this.$app.$toast({
      message: messages.errors.home,
      color: 'danger'
    })
  }

  this.$app.$loading.hide()

  const homeObject = {
    products,
    congresses,
    news,
    documents: {
      my: documents.my.slice(0, 3),
      shared: documents.shared.slice(0, 3)
    }
  }

  context.commit('setHome', homeObject)
  context.commit('setDocuments', documents)
  context.commit('setNotifications', notifications)
}
