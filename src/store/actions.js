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
    // context.dispatch('syncOneSignal', userData.id)

    // Check OneSignal permissions status
    // const subscriptionData = await this.$app.$onesignal.getPermissionState()
    // await context.dispatch('newNotificationsState', subscriptionData)

    this.$app.$router.push('/home')
  } catch (e) {
    this.$app.$toast({
      message: messages.errors.cannotLogin,
      color: 'danger'
    })
    throw e
  }
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
