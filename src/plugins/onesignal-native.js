import OneSignal from 'onesignal-cordova-plugin';

function oneSignalInstaller (plugins, conf = {}) {
  OneSignal.setAppId(conf.appId, conf.firebaseId)

  // OneSignal.inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.Notification)

  // Initialize events that can be managed
  const {
    notifOpened,
    notifReceived
  } = (conf.events || {})

  OneSignal.setNotificationOpenedHandler(e => notifOpened(plugins,e));
  OneSignal.setNotificationWillShowInForegroundHandler(e => notifReceived(plugins, e));

  // If permissions change during app execution this function will prevent unforeseen behaviors
  // if (permissionChange) OneSignal.addPermissionObserver().subscribe(permissionChangeEvent => permissionChange(plugins, permissionChangeEvent))

  // if (notifReceived) OneSignal.handleNotificationReceived().subscribe(event => notifReceived(plugins, event))

  // if (notifOpened) OneSignal.handleNotificationOpened().subscribe(event => notifOpened(plugins, event))

  // OneSignal.endInit()

  return OneSignal
}

export default {
  install (app, conf) {
    const OneSignal = oneSignalInstaller(app.config.globalProperties, conf)

    app.config.globalProperties.$onesignal = {
      // Return unique id of mobile app. It changes if app is reinstalled
      getUID: async function () {
        return new Promise((resolve, reject) => {
          OneSignal.getDeviceState(function (state) {
            console.log(state)
            if (!state.userId) return reject(new Error('NO_USERID'))
            resolve(state.userId)
          })
        })
      },
    }
  }
}
