import urls from '@/urls'
import messages from '@/messages'
import { parseEmail } from '@/plugins/utils'

export async function login (context, data) {
  try {
    // Decouple data from Vue as we will do modifications that user should not see
    data = { ...data }

    data.username = parseEmail(data.username)

    const loggedData = await this.$app.$http({
      method: 'POST',
      url: urls.list.login,
      data
    })

    const userData = {
      username: data.username,
      ...loggedData.data
    }

    context.commit('setUserData', userData)
    console.log('Logged in, user data: ', userData)

    // Now that we have user id we can proceed wit OneSignal sync with server
    context.dispatch('syncOneSignal', userData.id)

    // Check OneSignal permissions status
    const subscriptionData = await this.$app.$onesignal.getPermissionState()
    await context.dispatch('newNotificationsState', subscriptionData)
  } catch (e) {
    this.$app.$toast({
      message: messages.errors.cannotLogin,
      color: 'danger'
    })
    throw e
  }
}

export async function getHome () {
  console.log('Refreshing home')
}
