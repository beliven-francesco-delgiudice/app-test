import { Directory, Filesystem } from '@capacitor/filesystem'
import {FileOpener} from '@capacitor-community/file-opener'

export const docviewer = $app =>
  async function (url, name = 'Document') {
    await $app.$loading.show()
    const doc = await $app.$http({
      method: 'GET',
      baseUrl: url,
      auth: false,
      headers: {
        Accept: 'application/pdf'
      },
      responseType: 'arraybuffer'
    })

    if (!doc) throw new Error('Cannot open pdf')
    const pdf = window.btoa(doc)

    const {uri} = await Filesystem.writeFile({
      data: pdf,
      path: `${name}.pdf`,
      directory: Directory.Data
    })

    await $app.$loading.hide()
    return new Promise(() => {
      FileOpener.open({filePath: uri, contentType: 'application/pdf', openWithDefault: true})
    })
  }

export default {
  install (app) {
    app.config.globalProperties.$docviewer = docviewer(
      app.config.globalProperties
    )
  }
}
