import { toastController } from '@ionic/vue'

export default {
  install: (app, options) => {
    app.config.globalProperties.$toast = async data => {
      const toast = await toastController.create({
        ...options,
        ...data
      })
      return toast.present()
    }
  }
}
