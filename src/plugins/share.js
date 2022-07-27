import { Share } from '@capacitor/share'

export default {
  async install (app) {
    const $share = {
      canShare: async function () {
        return Share.canShare()
      },
      share: async function (options) {
        const canShare = await this.canShare()
        if (canShare) {
          return Share.share(options)
        }
        return false
      }
    }

    app.config.globalProperties.$share = $share
  }
}
