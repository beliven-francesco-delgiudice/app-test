<template>
  <ion-page class="relative">
    <!-- <ion-header class="ion-no-border">
        <ion-toolbar>
        <ion-buttons slot="end">
          <shadow-button
            square
            styles="position:relative; right:2rem;margin:0;"
            @onClick="openUpdates"
          >
            <ion-img
              src="/assets/menu/notifications.svg"
              className="pointer-events-none"
            />
          </shadow-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header> -->
    <ion-content :fullscreen="true" id="content">
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
  // IonHeader,
  IonPage,
  // IonToolbar,
  // IonButtons,
  // IonImg,
  IonRefresher,
  IonRefresherContent
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
    IonContent,
    // IonHeader,
    IonPage,
    // IonToolbar,
    // IonButtons,
    // IonImg,
    IonRefresher,
    IonRefresherContent,
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
