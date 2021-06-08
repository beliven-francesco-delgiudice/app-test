/**
 * If notification permission has changed notify the user and set state
 * @param {*} plugins Instance of Vue plugins
 * @param {*} permissionChange Permission status
 */
export async function onOnesignalPermissionChange (plugins, permissionChange) {
  var currentPermission = permissionChange.to
  console.log('New permission state:', currentPermission)

  await plugins.$store.dispatch('newNotificationsState', currentPermission)
}

/**
 * When notification is received notify the server
 * @param {*} plugins Instance of Vue plugins
 * @param {*} e Raw event
 */
export async function onOnesignalNotificationReceived (plugins, e) {
  console.log('Notification received', e)

  const data = e.payload.additionalData
  plugins.$bg.wakeUp()

  // Set message as read
  await plugins.$store.dispatch('setMessageAs', {
    id: data.messageId,
    status: 2
  })

  // Set round of the message and fetch it
  plugins.$router.push('/hub')
  await plugins.$store.commit('setRoundId', data.roundId)

  await plugins.$store.dispatch('getMessages')
}

/**
 * When user notification is opened open directly the message
 * @param {*} plugins Instance of Vue plugins
 * @param {*} e Raw event
 */
export async function onOnesignalNotificationOpened (plugins, e) {
  console.log('Opened notification', e)

  const data = e.notification.payload.additionalData

  // Set round of the message and redirect directly to message
  plugins.$store.commit('setRoundId', data.roundId)

  await plugins.$router.push('/hub')

  await plugins.$store.dispatch('getMessages')
  await plugins.$router.push(`/hub/message/${data.messageId}`)
}

/**
 * When we open the app and is already running will reload all the notifications, only if the correct page is open
 * @param {*} plugins Instance of Vue plugins
 * @param {*} e Raw event
 */
export async function onAppForeground (plugins, e) {
  console.log('App foreground: ', e)

  if (e.isActive === true && plugins.$store.getters.loggedIn && plugins.$route.meta.refreshOnOpen === true)
    await plugins.$store.dispatch('getMessages')
}

export function onBackButton (plugins, e, App) {
  if (plugins.$route.meta.backAction === 'background') {
    plugins.$bg.moveToBg()
  } else if (plugins.$route.meta.backAction === 'exit') {
    App.exitApp()
  }
}
