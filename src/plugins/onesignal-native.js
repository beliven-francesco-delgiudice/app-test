import { OneSignal as oneSignal } from '@ionic-native/onesignal'

function oneSignalInstaller (plugins, conf = {}) {
  oneSignal.startInit(conf.appId, conf.firebaseId)
  oneSignal.inFocusDisplaying(oneSignal.OSInFocusDisplayOption.Notification) // Alternatives: None, InAppAlert

  // Initialize events that can be managed
  const {
    permissionChange,
    notifOpened,
    notifReceived
  } = (conf.events || {})

  // If permissions change during app execution this function will prevent unforeseen behaviors
  if (permissionChange) oneSignal.addPermissionObserver().subscribe(permissionChangeEvent => permissionChange(plugins, permissionChangeEvent))

  if (notifReceived) oneSignal.handleNotificationReceived().subscribe(event => notifReceived(plugins, event))

  if (notifOpened) oneSignal.handleNotificationOpened().subscribe(event => notifOpened(plugins, event))

  oneSignal.endInit()

  return oneSignal
}

export default {
  install (app, conf) {
    const oneSignal = oneSignalInstaller(app.config.globalProperties, conf)

    app.config.globalProperties.$onesignal = {
      // Return unique id of mobile app. It changes if app is reinstalled
      getUID: async function () {
        return new Promise((resolve, reject) => {
          oneSignal.getIds(function (ids) {
            if (!ids.userId) return reject(new Error('NO_USERID'))
            resolve(ids.userId)
          })
        })
      },
      // Get permissions data
      getPermissionState: async function () {
        return new Promise((resolve, reject) => {
          oneSignal.getPermissionSubscriptionState(function (data) {
            if (!data || !data.permissionStatus) return reject(new Error('NO_DATA'))
            resolve(data.permissionStatus)
          })
        })
      }
    }
  }
}
