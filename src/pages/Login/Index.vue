<template>
  <ion-grid class="full-height">
    <ion-row class="ion-align-items-center ion-justify-content-center full-height">
      <ion-col size-lg="4">
        <div class="ion-text-center">
          <h1>Messaging</h1>
          <h1>Center</h1>
          <p :style="{ visibility: info ? 'visible' : 'hidden' }">v{{info.appVersion}}</p>
        </div>
        <LoginForm
          @submit="sendLogin"
          @blur="triggerScroll"
        />
      </ion-col>
    </ion-row>
    <ion-row v-if="!showNotifyError" id="recoverPassword">
      <ion-col class="ion-text-center ion-padding">
        <router-link to="/user/resetpassword">Reset password</router-link>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script>
import {
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/vue'

import LoginForm from './LoginForm'
import messages from '@/messages'

export default {
  data () {
    return {
      info: false
    }
  },
  created () {
    this.messages = messages
  },
  async beforeMount () {
    this.info = await this.$device.getInfo()
  },
  mounted () {
    this.$el.addEventListener("touchmove", this.blockBounce)
    window.document.addEventListener("resize", this.triggerScroll)
  },
  beforeUnmount () {
    this.$el.removeEventListener("touchmove", this.blockBounce)
    window.document.removeEventListener("resize", this.triggerScroll)
  },
  methods: {
    async sendLogin (data) {
      this.triggerScroll()
      try {
        await this.$store.dispatch('login', data)
      } catch (e) {
        return console.error(e)
      }
      this.$toast({
        message: messages.loginSuccessful,
        color: 'success'
      })
      this.$router.push('/')
    },
    // iOS quirk #1, scroll bounce on page that does not need it
    blockBounce (e) {
      e.preventDefault()
    },
    // iOS quirk #2, position fixed not working when keyboard is opened
    triggerScroll () {
      setTimeout(() => {
        window.scrollTo(1, 1)
        window.scrollTo(0, 0)
      }, 300)
    }
  },
  components: {
    LoginForm,

    IonGrid,
    IonRow,
    IonCol
  }
}
</script>

<style scoped>
  #recoverPassword {
    position: fixed;
    bottom: 0;
    left:0;
    right: 0
  }

  h1 {
    font-size: 40px;
  }
</style>