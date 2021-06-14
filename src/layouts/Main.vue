<template>
  <ion-page>
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
            square
            styles="position:relative; right:2rem;margin:0;"
            @onClick="openWizard"
          >
            <ion-img
              src="/assets/button-icons/info.svg"
              className="width-24 height-24 pointer-events-none m-auto"
            />
          </shadow-button>
          <!-- <ion-button @click="openWizard">
            <ion-img
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
        <Tabs />
      </div>
    </ion-content>
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
import ShadowButton from '../components/containers/ShadowButton.vue'

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
  --min-height: 90px !important;
}
</style>
