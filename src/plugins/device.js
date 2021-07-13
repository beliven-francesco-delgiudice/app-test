import { isPlatform, useBackButton } from '@ionic/vue'
import { App } from '@capacitor/app'
import { Device } from '@capacitor/device'

export default {
  async install (app, conf = {}) {
    let info

    const { onForeground, onBackButton } = conf.events || {}

    if (onForeground) {
      App.addListener('appStateChange', event =>
        onForeground(app.config.globalProperties, event)
      )
    }
    if (onBackButton) {
      useBackButton(-1, event =>
        onBackButton(app.config.globalProperties, event, App)
      )
    }

    const $device = {
      getId: async function () {
        return Device.getId()
      },
      getAppInfo: async function () {
        return App.getInfo()
      },
      getInfo: async function () {
        if (!info) info = await Device.getInfo()
        return info
      },
      getBattery: async function () {
        return Device.getBatteryInfo()
      },
      getPlatform: function (...args) {
        return isPlatform(...args)
      }
    }

    app.config.globalProperties.$device = $device
  }
}
