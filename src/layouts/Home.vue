<template>
  <ion-page>
    <ion-content :fullscreen="true" id="content">
      <ion-refresher
        slot="fixed"
        v-if="refreshAction"
        @ionRefresh="$store.dispatch(refreshAction, $event)"
      >
        <ion-refresher-content />
      </ion-refresher>
      <div id="container">
        <Tabs />
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import Tabs from '../components/Tabs'
import {
  // IonContent,
  // IonHeader,
  IonPage
  // IonToolbar,
  // IonButtons,
  // IonImg,
  // IonRefresher,
  // IonRefresherContent
} from '@ionic/vue'
// import ShadowButton from '../components/containers/ShadowButton.vue'

export default {
  methods: {
    openUpdates () {
      this.$router.push('/updates')
    },
    backButton () {
      this.$router.push('/home')
    }
  },
  computed: {
    showBack () {
      return this.$route.meta.showBack
    },
    refreshAction () {
      return this.$route.meta.refreshAction || false
    }
  },
  components: {
    // IonContent,
    // IonHeader,
    IonPage,
    // IonToolbar,
    // IonButtons,
    // IonImg,
    // IonRefresher,
    // IonRefresherContent,
    Tabs
    // ShadowButton
  }
}
</script>

<style scoped>
ion-toolbar,
ion-header {
  --background: transparent;
  --border-width: 0;
  --border-color: transparent;
}
ion-toolbar {
  --min-height: 90px !important;
}
</style>
