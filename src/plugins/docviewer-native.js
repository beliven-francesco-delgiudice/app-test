import { File } from '@ionic-native/file'
import { FileOpener } from '@ionic-native/file-opener'

export const docviewer = $app => async function (url, name = 'Document') {
  const doc = await $app.$http({
    method: 'GET',
    url,
    headers: {
      Accept: 'application/pdf'
    },
    responseType: 'arraybuffer'
  })

  if (!doc.data) throw new Error('Cannot open pdf')
  const pdf = new Blob([doc.data], { type: 'application/pdf' })

  await File.writeFile(File.dataDirectory, `${name}.pdf`, pdf, { replace: true })

  return new Promise((resolve, reject) => {
    FileOpener.open(
      `${File.dataDirectory}${name}.pdf`,
      'application/pdf',
      {
        error: reject,
        success: resolve
      }
    )
  })
}

export default {
  install (app) {
    app.config.globalProperties.$docviewer = docviewer(app.config.globalProperties)
  }
}
