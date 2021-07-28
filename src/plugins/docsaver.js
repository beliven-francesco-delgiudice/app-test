import { File } from '@ionic-native/file'
import { Filesystem, Directory } from '@capacitor/filesystem'

export const docsaver = $app =>
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
      await Filesystem.writeFile({
        path: `${name}.pdf`,
        data: pdf,
        directory: Directory.Documents
      })
    }

    await writeSecretFile()
  }

export default {
  install (app) {
    app.config.globalProperties.$docsaver = docsaver(
      app.config.globalProperties
    )
  }
}
