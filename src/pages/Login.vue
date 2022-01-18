<template>
  <div
    class="px-8 pt-20 min-h-screen login-background relative max-h-screen overflow-y-auto pb-24"
  >
    <ion-img
      src="/assets/login-bg.png"
      class="fixed bottom-0 left-0 z-0 w-full"
    />
    <div
      class="bg-transparent absolute top-0 left-0 flex px-8 w-full z-10"
      :style="isIos ? 'margin-top:35px;height:70px;' : 'height:90px;'"
    >
      <ion-button
        v-if="backAction"
        type="button"
        :class="[
          isIos ? 'mb-auto' : 'my-auto',
          ' relative mr-auto my-auto back-button'
        ]"
        @click="onBack"
      >
        <ion-img
          src="/assets/button-icons/back.svg"
          className="pointer-events-none"
        />
      </ion-button>
      <div v-else class="relative mr-auto my-auto">
        <ion-img src="/assets/limapp.svg" />
      </div>
    </div>
    <div class="relative flex justify-between items-baseline my-4">
      <Title titleClass="pb-4 text-black font-helvetica-bold text-28 block">
        Sign in
      </Title>
      <span class="font-helvetica text-12 spacing-38 line-24 text-grey">
        Step {{ step }}/2
      </span>
    </div>
    <form v-if="step === 1" class="flex flex-col" @submit="next">
      <div
        class="bg-white small-shadow rounded-8 flex items-center z-10 relative px-2 mb-4"
      >
        <ion-img src="/assets/menu/contact.svg" class="" />
        <ion-input
          type="email"
          placeholder="Email"
          v-model="email"
          class="mx-2"
          required
        ></ion-input>
      </div>
      <big-button label="Next" type="submit" />

      <a
        class="font-helvetica text-mid-dark-grey text-12 spacing-1 line-24 mt-4 text-center mx-auto z-10"
        href="https://limacorporate.com/en/about-us/privacy-policy.html"
        title="LimaCorporate Privacy Policy"
        target="_blank"
        >Privacy Policy</a
      >
    </form>
    <div v-if="step === 2 && isAzureMail" class="flex flex-col">
      <ion-button
        type="button"
        class="relative bg-azure small-shadow rounded-12 flex justify-center items-center height-56 w-full normal-case"
        @click="loginWithAzure"
      >
        <ion-img
          src="/assets/button-icons/azure.svg"
          class="absolute left-0 ml-4 pointer-events-none"
        />
        <span
          class="font-helvetica-medium text-white text-16 spacing-5 line-24 m-auto normal-case pointer-events-none"
        >
          Login with Azure
        </span>
      </ion-button>
      <a
        class="font-helvetica text-mid-dark-grey text-12 spacing-1 line-24 mt-4 text-center mx-auto z-10"
        href="https://limacorporate.com/en/about-us/privacy-policy.html"
        title="LimaCorporate Privacy Policy"
        target="_blank"
        >Privacy Policy</a
      >
    </div>
    <form
      v-if="step === 2 && !isAzureMail"
      class="flex flex-col"
      @submit="loginWithPassword"
    >
      <div
        class="bg-white small-shadow rounded-8 flex items-center z-10 relative px-2 mb-4"
      >
        <div class="width-44 height-44 flex justify-center items-center">
          <ion-img
            src="/assets/button-icons/lock.svg"
            class="width-24 height-24"
          />
        </div>
        <ion-input
          type="password"
          placeholder="Password"
          v-model="password"
          class="mx-2"
          required
        ></ion-input>
      </div>
      <big-button label="Sign in" type="submit" />
      <a
        class="mt-4 font-helvetica-medium text-14 text-black spacing-44 line-28 mx-auto z-10"
        title="Forgot your password link"
        href="https://limacorporate.com/it/intranet-login.html?recovery=password"
        target="_blank"
        >Forgot your password?</a
      >
      <a
        class="font-helvetica text-mid-dark-grey text-12 spacing-1 line-24 mt-4 text-center mx-auto z-10"
        href="https://limacorporate.com/en/about-us/privacy-policy.html"
        title="LimaCorporate Privacy Policy"
        target="_blank"
        >Privacy Policy</a
      >
    </form>
  </div>
</template>

<script>
import { IonInput, IonImg, IonButton } from '@ionic/vue'
// import { Browser } from '@capacitor/browser'
import Title from '../components/Title.vue'
import BigButton from '../components/containers/BigButton.vue'
import messages from '@/messages'
import urls from '@/urls'
import config from '@/config'
import { Capacitor } from '@capacitor/core'
export default {
  components: {
    IonInput,
    IonImg,
    Title,
    BigButton,
    IonButton
  },
  data () {
    return {
      email: '',
      password: '',
      step: 1,
      isAzureMail: false
    }
  },
  computed: {
    isIos () {
      if (
        Capacitor &&
        Capacitor.getPlatform() &&
        Capacitor.getPlatform() === 'ios'
      ) {
        return true
      }
      return false
    },
    backAction () {
      if (this.step > 1) {
        return true
      }
      return false
    }
  },
  created () {
    console.log(Capacitor.getPlatform())
    if (this.$store.getters.loggedIn && Capacitor.getPlatform() !== 'web') {
      // user is already logged in
      this.$store.dispatch('alreadyLoggedRouting')
    }
    if (this.$route.query.token && Capacitor.getPlatform() === 'web') {
      window.azureToken = this.$route.query.token
      window.localStorage.setItem('JWT', this.$route.query.token)
      this.$store.dispatch('loginWithToken')
    }
  },
  methods: {
    onBack () {
      this.step = 1
    },
    loginWithPassword (e) {
      e.preventDefault()
      this.$store.dispatch('login', {
        username: this.email,
        password: this.password
      })
    },
    async loginWithAzure () {
      const mode = config.mode
      const url = urls.baseUrl[mode] + urls.auth.azureLogin
      // await Browser.open({ url })
      window.open(url, '_system')
    },
    async next (e) {
      e.preventDefault()
      if (this.email && this.email.length) {
        try {
          const azureFlag = await this.$http({
            method: 'GET',
            url: urls.auth.loginCheck,
            params: {
              email: this.email
            }
          })
          this.isAzureMail = azureFlag
          this.step = 2
        } catch (e) {
          console.error(e)
          this.$toast({
            message: messages.errors.checkEmail,
            color: 'danger'
          })
        }
      } else {
        this.$toast({
          message: messages.errors.noEmail,
          color: 'danger'
        })
      }
    }
  },
  watch: {
    'this.$route.query': function (val) {
      console.debug('QUERY', val)
    }
  }
}
</script>
