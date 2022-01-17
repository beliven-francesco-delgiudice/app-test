<template>
  <div
    class=" pt-20 min-h-screen login-background relative max-h-screen overflow-y-auto pb-24"
  >
    <div
      class="px-8 bg-transparent absolute top-0 left-0 flex px-8 w-full z-10"
      :style="isIos ? 'margin-top:35px;height:70px;' : 'height:90px;'"
    >
      <div class="relative mr-auto my-auto">
        <ion-img src="/assets/limapp.svg" />
      </div>
    </div>
    <div
      class="px-8 relative flex flex-col justify-between items-baseline my-4"
    >
      <Title titleClass="pb-2 text-black font-helvetica-bold text-28 block">
        Terms and conditions
      </Title>
      <span class="font-helvetica text-12 spacing-38 line-24 text-grey">
        Accept to continue
      </span>
    </div>

    <div class="px-8 relative z-10 bg-transparent pb-24">
      <Terms />
    </div>

    <form
      class="flex flex-col fixed px-8 py-8 w-full z-10 bg-white rounded-32 elevated-shadow"
      style="bottom:-1px"
      @submit="resolveRouting"
    >
      <div class="flex justify-start items-center z-10 relative mb-4">
        <ion-toggle
          mode="ios"
          color="primary"
          :checked="areAccepted"
          @ionChange="updateAccepted"
        />
        <span class="font-helvetica text-14 spacing-38 line-24 ml-4 text-grey">
          I accept the terms and conditions
        </span>
      </div>
      <big-button :disabled="!areAccepted" label="Next" type="submit" />
    </form>
  </div>
</template>
<script>
import { IonToggle, IonImg } from '@ionic/vue'
import { Capacitor } from '@capacitor/core'
import Title from '../components/Title.vue'
import BigButton from '../components/containers/BigButton.vue'
import Terms from '../components/Terms'
import messages from '@/messages'
import urls from '@/urls'

export default {
  components: {
    IonToggle,
    IonImg,
    Title,
    BigButton,
    Terms
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
    }
  },

  data () {
    return {
      areAccepted: false
    }
  },

  methods: {
    updateAccepted () {
      this.areAccepted = !this.areAccepted
    },

    async resolveRouting (e) {
      e.preventDefault()
      try {
        const results = await this.$http({
          method: 'GET',
          url: urls.acceptTerms
        })
        // no need to accept terms anymore
        this.$store.commit('setNeedToAcceptTerms', false)
        console.log('RESULTS', results)
      } catch (e) {
        console.error(e)
        this.$toast({
          message: messages.errors.acceptTerms,
          color: 'danger'
        })
        return
      }

      // ROUTE
      if (this.$store.getters.needOnboarding) {
        this.$router.push('/onboarding')
      } else if (this.$store.getters.gotUpdatesToShow) {
        this.$router.push('/new/update/' + this.$store.getters.gotUpdatesToShow)
      } else if (this.$store.getters.gotNotificationToShow) {
        const path = this.$store.getters.gotNotificationToShow
        this.$store.commit('setNotificationToShow', null)
        this.$router.push(path)
      } else {
        this.$router.push('/home')
      }
    }
  }
}
</script>
