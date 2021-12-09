import { loadingController } from '@ionic/vue'

export default {
  install: (app, options) => {
    let loading = false
    let index = 0

    app.config.globalProperties.$loading = {
      async show () {
        index++
        if (index !== 1) return
        loading = await loadingController.create(options)
        return loading.present()
      },
      async hide () {
        index--

        if (loading === false && index > 0) {
          console.warn('Have you awaited the show function?')
        }
        if (index === 0 && loading) {
          await loading.dismiss()

          setTimeout(async () => {
            try {
              await loading.dismiss()
            } catch (e) {
              console.debug('Loader already dismissed', e)
            }
          }, 1500)
        }
      }
    }
  }
}
