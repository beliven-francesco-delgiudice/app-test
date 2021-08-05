<template>
  <ion-page>
    <ion-content
      id="content"
      :fullscreen="true"
      :forceOverscroll="true"
      :scroll-x="true"
    >
      <ion-refresher
        v-if="refreshAction"
        slot="fixed"
        @ionRefresh="$store.dispatch(refreshAction, $event)"
      >
        <ion-refresher-content />
      </ion-refresher>
      <div id="container">
        <router-view />
      </div>
    </ion-content>
    <Tabs />
  </ion-page>
</template>

<script>
import Tabs from '../components/Tabs'
import {
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent
} from '@ionic/vue'

export default {
  data () {
    return {}
  },

  computed: {
    refreshAction () {
      return this.$route.meta.refreshAction || false
    }
  },
  components: {
    IonContent,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    Tabs
  }
}
</script>
