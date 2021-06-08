import { Plugins } from '@capacitor/core'
import { isPlatform, useBackButton } from '@ionic/vue'
const { Device, App } = Plugins

export default {
  async install (app, conf = {}) {
    let info

    const {
      onForeground,
      onBackButton
    } = (conf.events || {})

    if (onForeground) App.addListener('appStateChange', event => onForeground(app.config.globalProperties, event))
    if (onBackButton) useBackButton(-1, event => onBackButton(app.config.globalProperties, event, App))

    const $device = {
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
