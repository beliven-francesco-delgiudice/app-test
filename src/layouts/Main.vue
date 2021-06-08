<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons v-if="showBack" slot="start">
          <ion-button @click="backButton">
            <IonImg
              src="/assets/button-icons/back.svg"
              className="pointer-events-none"
            />
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button @click="openWizard">
            <IonImg
              src="/assets/button-icons/info.svg"
              className="pointer-events-none"
            />
          </ion-button>
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
      <!-- <Title titleClass="pt-6 pb-2 text-black">
        {{ $route.name }}
      </Title> -->
      <div id="container">
        <router-view />
      </div>
    </ion-content>
    <Tabs />
  </ion-page>
</template>

<script>
import Tabs from '../components/Tabs'
import Title from '../components/Title'
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonButton,
  IonImg,
  IonRefresher,
  IonRefresherContent
} from '@ionic/vue'
import icons from '@/mixins/icons'

export default {
  mixins: [icons],
  methods: {
    openWizard () {
      this.$router.push('/wizard')
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
    IonHeader,
    IonPage,
    IonToolbar,
    IonButtons,
    IonButton,
    IonImg,
    IonRefresher,
    IonRefresherContent,
    Title,
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
</style>
