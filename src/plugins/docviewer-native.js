import { File } from '@ionic-native/file'
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
  // file needs to be in base64 when saved
  const pdf = fromArrayBufferToBase64doc(doc)

  function fromArrayBufferToBase64doc (buffer) {
    let binary = ''
    const bytes = new Uint8Array(buffer)
    const len = bytes.byteLength
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    return window.btoa(binary)
  }

  await File.writeFile(File.dataDirectory, `${name}.pdf`, pdf, {
    replace: true
  })

  await $app.$loading.hide()

  const writeSecretFile = async () => {
    return await Filesystem.writeFile({
      path: `${name}.pdf`,
      data: pdf,
      directory: Directory.Data
    })
  }

  const {uri} = await writeSecretFile()

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
