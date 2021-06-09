<template>
  <ion-page>
    <ion-header class="ion-no-border">
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
          <shadow-button
            square
            styles="position:relative; right:2rem;margin:0;"
            @onClick="openWizard"
          >
            <IonImg
              src="/assets/button-icons/info.svg"
              className="pointer-events-none"
            />
          </shadow-button>
          <!-- <ion-button @click="openWizard">
            <IonImg
              src="/assets/button-icons/info.svg"
              className="pointer-events-none"
            />
          </ion-button> -->
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
  </ion-page>
</template>

<script>
import Tabs from '../components/Tabs'
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
import ShadowButton from '../components/buttons/ShadowButton.vue'

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
    Tabs,
    ShadowButton
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
  --min-height: 100px !important;
}
</style>
