import { BackgroundMode } from '@ionic-native/background-mode'

function killDoze () {
  const doze = window.cordova.plugins.DozeOptimize
  return new Promise((resolve, reject) => {
    doze.IsIgnoringBatteryOptimizations((response) => {
      if (!response) doze.RequestOptimizations(response => resolve({msg: 'DOZE_ACCEPT', data: response}), error => reject({msg: 'DOZE_REJECTED', data: error}))
      else resolve({msg: 'ALREADY_DOZE', data: {}})
    },
    error => reject({msg: 'DOZE_ERROR', data: error}))
  })
}

export default {
  async install (app, conf = {}) {
    app.config.globalProperties.$bg = {
      async enable () {
        try {
          BackgroundMode.setDefaults({ silent: true, ...conf.defaults })
          BackgroundMode.on('activate', function () { BackgroundMode.disableWebViewOptimizations() })
          BackgroundMode.enable()
          BackgroundMode.disableBatteryOptimizations()
          try {
            const dozeStatus = await killDoze()
            console.log('Doze status: ', dozeStatus)
          } catch (e) {
            console.error('Doze error: ', e)
          }
          return true
        } catch (e) {
          console.warn('Error in bg mode', e)
          return false
        }
      },
      killDoze,
      moveToBg () {
        return BackgroundMode.moveToBackground()
      },
      wakeUp () {
        return BackgroundMode.wakeUp()
      },
      disable () {
        return BackgroundMode.disable()
      }
    }

    if (conf.enabled) app.config.globalProperties.$bg.enable()
  }
}
