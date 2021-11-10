<template>
  <ion-page :style="isApp ? '' : 'max-width:400px; margin:auto;'">
    <ion-content
      id="content"
      :fullscreen="true"
      :forceOverscroll="true"
      :scroll-x="true"
      :overflow-scroll="true"
      :style="
        isApp
          ? ''
          : '-webkit-overflow-scrolling: touch;  overflow-y: auto !important;'
      "
    >
      <div id="container">
        <router-view />
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage } from '@ionic/vue'
import { Capacitor } from '@capacitor/core'
export default {
  components: {
    IonContent,
    IonPage
  },
  computed: {
    isApp () {
      return this.checkIsApp(Capacitor.getPlatform())
    }
  }
}
</script>
