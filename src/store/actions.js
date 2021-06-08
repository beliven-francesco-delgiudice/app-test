import urls from '@/urls'
import messages from '@/messages'
import {
  validateErrorResponse,
  parseEmail
} from '@/plugins/utils'
import { getJWT } from '@/plugins/http'

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

export async function syncOneSignal (context, userId) {
  try {
    const playerId = await this.$app.$onesignal.getUID()
    const deviceInfo = await this.$app.$device.getInfo()

    const deviceId = deviceInfo.uuid

    await this.$app.$http({
      method: 'POST',
      url: urls.list.onesignal,
      data: {
        userId,
        deviceId,
        playerId
      }
    })
  } catch (e) {
    console.error(e)
    this.$app.$toast({
      message: messages.errors.cannotEnableNotifs,
      color: 'danger'
    })
  }
}

export async function logout (context) {
  window.localStorage.removeItem('JWT')
  context.commit('setUserData')
  await this.$app.$router.push({ name: 'login' })
}

export async function checkUserSession (context) {
  try {
    await this.$app.$http({
      method: 'POST',
      url: urls.list.validate,
      data: `"${getJWT()}"`,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      loader: false
    })
    return true
  } catch (e) {
    if (e.response.status === 401 || !e.response) {
      await context.dispatch('logout')
      return false
    }
  }
}

export async function newNotificationsState (context, permission) {
  context.commit('setNotificationsAllowState', permission)

  if (context.getters.notifError && context.getters.isLogged) {
    await this.$app.$alert({
      header: messages.errors.notifError.title,
      message: messages.errors.notifError.message
    })
  }
}

export async function getRounds (context) {
  try {
    const roundsList = await this.$app.$http({
      method: 'GET',
      url: urls.list.rounds,
      loader: false
    })
    context.commit('setRounds', (roundsList || {}).data || {})
  } catch (e) {
    this.$app.$toast({
      message: messages.errors.cannotGetRounds,
      color: 'danger'
    })
  }
}

export async function getMessages (context, event) {
  try {
    const messagesList = await this.$app.$http({
      method: 'GET',
      url: `${urls.list.messages}${context.getters.roundId ? `?roundId=${context.getters.roundId}` : ''}`,
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

export async function getUserData (context) {
  try {
    const userData = await this.$app.$http({
      method: 'POST',
      url: urls.list.user,
      data: `"${context.getters.username}"`,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })

    context.commit('setUserData', (userData || {}).data || {})
  } catch (e) {
    this.$app.$toast({
      message: messages.errors.cannotGetUserData,
      color: 'danger'
    })
  }
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

export async function resetPassword (context, form) {
  try {
    await this.$app.$http({
      method: 'POST',
      url: urls.list.resetpw,
      data: `"${form.email}"`,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
  } catch (e) {
    this.$app.$toast({
      header: messages.errors.cannotResetPassword,
      message: validateErrorResponse(e.response.data),
      color: 'danger'
    })
    throw e
  }
}

export async function changePassword (context, form) {
  try {
    const user = context.getters.userData

    await this.$app.$http({
      method: 'POST',
      url: urls.list.changepw,
      data: {
        userId: user.id,
        year: user.year,
        email: user.email,
        ...form
      }
    })
  } catch (e) {
    this.$app.$toast({
      header: messages.errors.cannotChangePassword,
      message: validateErrorResponse(e.response.data),
      color: 'danger'
    })
    throw e
  }
}

export async function getUserTypes (context) {
  try {
    const userTypes = await this.$app.$http({
      method: 'GET',
      url: urls.list.userTypes
    })
    context.commit('setUserTypes', (userTypes || {}).data || [])
  } catch (e) {
    this.$app.$toast({
      message: messages.errors.cannotGetUserTypes,
      color: 'danger'
    })
  }
}

export async function addUserToTeam (context, form) {
  try {
    const user = context.getters.userData

    await this.$app.$http({
      method: 'POST',
      url: urls.list.addUserToTeam,
      data: {
        year: user.year,
        teamId: user.teamsId,
        ...form
      }
    })
  } catch (e) {
    this.$app.$toast({
      header: messages.errors.failedUserRegistration,
      message: validateErrorResponse(e.response.data),
      color: 'danger'
    })
    throw e
  }
}
