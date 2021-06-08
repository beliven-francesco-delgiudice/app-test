import { alertController } from '@ionic/vue';

export const $alert = async function show(conf) {
  const alert = await alertController
    .create({
      cssClass: 'alert',
      header: 'Warning',
      buttons: ['Ok'],
      ...conf
    });
  await alert.present();

  return await alert.onDidDismiss();
}

export default {
  async install (app) {
    app.config.globalProperties.$alert = $alert
  }
}