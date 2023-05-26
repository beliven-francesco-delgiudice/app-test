/**
 * If notification permission has changed notify the user and set state
 * @param {*} plugins Instance of Vue plugins
 * @param {*} permissionChange Permission status
 */
export async function onOnesignalPermissionChange (plugins, permissionChange) {
  const currentPermission = permissionChange.to
  // console.log('New permission state:', currentPermission)

  await plugins.$store.dispatch('newNotificationsState', currentPermission)
}

/**
 * When notification is received notify the server
 * @param {*} plugins Instance of Vue plugins
 * @param {*} e Raw event
 */
export async function onOnesignalNotificationReceived (plugins, e) {
  console.log('Notification received', plugins, e)

  if (e.notification && e.notification && e.notification.launchURL) {
    let path = e.notification.launchURL
    path = path.split('sales:/')[1]
    plugins.$router.push(path)
  } else {
    plugins.$bg.wakeUp()
  }

}

/**
 * When user notification is opened open directly the message
 * @param {*} plugins Instance of Vue plugins
 * @param {*} e Raw event
 */
export async function onOnesignalNotificationOpened (plugins, e) {
  console.log('Opened notification', plugins, e)

  if (e.notification) {
    const notification = e.notification
    if (notification && notification.launchURL) {
      let path = notification.launchURL
      // Use custom url scheme, sales://

      console.log('NOTIFICATION', notification, plugins.$store.getters.loggedIn, path)
      path = path.split('sales:/')[1]
      if (plugins.$store.getters.loggedIn) {
        plugins.$router.push(path)
        plugins.$store.commit('setLaunchUrl', path)
      } else {
        plugins.$store.commit('setLaunchUrl', notification.launchURL)
        plugins.$store.commit('setNotificationToShow', path)
      }
    }
  }
}

/**
 * When we open the app and is already running will reload all the notifications, only if the correct page is open
 * @param {*} plugins Instance of Vue plugins
 * @param {*} e Raw event
 */
export async function onAppForeground (plugins, e) {
  if (
    e.isActive === true &&
    !plugins.$store.getters.loggedIn &&
    window.localStorage.getItem('JWT')
  ) {
    await plugins.$store.dispatch('loginWithToken')
  }

  if (
    e.isActive === true &&
    plugins.$store.getters.loggedIn &&
    plugins.$route.meta.refreshOnOpen === true
  ) {
    await plugins.$store.dispatch('getMessages')
  }
}

export function onBackButton (plugins, e, App) {
  if (plugins.$route.meta.backAction === 'background') {
    plugins.$bg.moveToBg()
  } else if (plugins.$route.meta.backAction === 'exit') {
    App.exitApp()
  }
}
