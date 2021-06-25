<template>
  <!-- <ion-page>
    <ion-content :fullscreen="true" id="content">
      <ion-refresher
        slot="fixed"
        v-if="refreshAction"
        @ionRefresh="$store.dispatch(refreshAction, $event)"
      >
        <ion-refresher-content />
      </ion-refresher>
      <div id="container">
        <Tabs home />
      </div>
    </ion-content>
  </ion-page> -->
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
  created () {
    this.$store.dispatch('getHome')
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
