import { Clipboard } from '@capacitor/clipboard'

export const clipboard = $app =>
  async function (text) {
    await $app.$loading.show()

    Clipboard.write({
      string: text
    })
    await $app.$loading.hide()
  }

export default {
  install (app) {
    app.config.globalProperties.$clipboard = clipboard(
      app.config.globalProperties
    )
  }
}
