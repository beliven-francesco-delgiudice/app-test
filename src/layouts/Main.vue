<template>
  <!-- <ion-page class="main-layout">
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons v-if="showBack" slot="start">
          <ion-button @click="backButton">
            <ion-img
              src="/assets/button-icons/back.svg"
              className="pointer-events-none"
            />
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <shadow-button
            v-if="showWizard"
            square
            styles="position:relative; right:2rem;margin:0;"
            @onClick="openWizard"
          >
            <ion-img
              src="/assets/button-icons/info.svg"
              className="width-24 height-24 pointer-events-none m-auto"
            />
          </shadow-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
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
  </ion-page> -->
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
          : '-webkit-overflow-scrolling: touch;  overflow-y: scroll !important;'
      "
    >
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
    <Tabs v-if="modalNotOpen" />
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
  // IonButton,
  // IonImg,
  IonRefresher,
  IonRefresherContent
} from '@ionic/vue'
// import ShadowButton from '../components/containers/ShadowButton.vue'
import { Capacitor } from '@capacitor/core'

export default {
  methods: {
    openWizard () {
      this.$router.push('/wizard')
    },
    backButton () {
      this.$router.push('/home')
    }
  },
  computed: {
    isApp () {
      return this.checkIsApp(Capacitor.getPlatform())
    },
    showBack () {
      return this.$route.meta.showBack
    },
    showWizard () {
      return this.$route.meta.showWizard
    },
    refreshAction () {
      return this.$route.meta.refreshAction || false
    },
    modalNotOpen () {
      return !this.$store.state.isModalOpen
    }
  },
  components: {
    IonContent,
    // IonHeader,
    IonPage,
    // IonToolbar,
    // IonButtons,
    // IonButton,
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
