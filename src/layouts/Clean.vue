<template>
  <ion-page>
    <ion-content :fullscreen="true" id="content">
      <div id="container">
        <router-view />
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage } from '@ionic/vue'

export default {
  components: {
    IonContent,
    IonPage
  }
}
</script>
