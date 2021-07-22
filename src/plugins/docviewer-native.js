import { File } from '@ionic-native/file'
import { FileOpener } from '@ionic-native/file-opener'

export const docviewer = $app =>
  async function (url, name = 'Document') {
    const doc = await $app.$http({
      method: 'GET',
      baseUrl: url,
      auth: false,
      headers: {
        Accept: 'application/pdf'
      },
      responseType: 'arraybuffer'
    })

    console.log('result', doc)
    console.log('result data', doc.data)

    if (!doc) throw new Error('Cannot open pdf')
    const pdf = new Blob([doc], { type: 'application/pdf' })

    console.log('after blob', pdf)

    await File.writeFile(File.dataDirectory, `${name}.pdf`, pdf, {
      replace: true
    })

    console.log('after write file', pdf)

    return new Promise((resolve, reject) => {
      FileOpener.open(`${File.dataDirectory}${name}.pdf`, 'application/pdf', {
        error: reject,
        success: resolve
      })
    })
  }

export default {
  install (app) {
    app.config.globalProperties.$docviewer = docviewer(
      app.config.globalProperties
    )
  }
}
