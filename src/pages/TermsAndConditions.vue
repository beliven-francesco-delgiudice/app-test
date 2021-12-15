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
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget
      velit lacus. Aliquam pellentesque vehicula mi vitae aliquet. Pellentesque
      habitant morbi tristique senectus et netus et malesuada fames ac turpis
      egestas. Morbi at elit porta, dapibus erat eu, maximus erat. Cras sit amet
      velit a lorem faucibus rutrum. Vivamus tempus, nisl eget molestie laoreet,
      quam ipsum sollicitudin dolor, at aliquam nisl urna et tellus. Duis
      finibus erat eget mattis mattis. Aliquam id lectus pulvinar, bibendum
      mauris sed, vulputate nisl. Curabitur porta sapien neque, interdum pretium
      risus imperdiet quis. Sed est velit, pharetra vitae leo non, gravida
      consectetur turpis. Nam convallis massa at ultricies ornare. Suspendisse
      sapien lorem, tristique non augue non, feugiat vulputate enim. Fusce
      tempus pulvinar mauris. Maecenas felis neque, vestibulum tincidunt quam
      vitae, consequat molestie tellus. Quisque convallis risus a facilisis
      scelerisque. Aliquam aliquet lacus nunc, non facilisis nisi maximus eget.
      Aenean at dignissim nibh. Pellentesque habitant morbi tristique senectus
      et netus et malesuada fames ac turpis egestas. Donec est orci, rhoncus ac
      massa vitae, tempor interdum lorem. Proin accumsan, erat sit amet porta
      egestas, nulla diam aliquam enim, id vehicula ante nisi ut leo. Proin ac
      egestas velit. Suspendisse sollicitudin, ligula accumsan dapibus tempus,
      felis ex euismod urna, nec rhoncus tellus arcu sed quam. Sed rutrum erat
      et neque ornare rutrum. Pellentesque id fermentum justo. Nam sit amet
      justo erat. Duis tincidunt quis dolor ut mattis. Donec imperdiet libero at
      mollis congue. Nulla mattis, purus eu lacinia pharetra, augue mi mattis
      elit, in vulputate enim est non nunc. Sed non pulvinar neque. Duis diam
      dui, congue non tincidunt non, hendrerit ut leo. Etiam vehicula porta quam
      eleifend pretium. Nunc ornare, enim nec interdum rhoncus, tellus augue
      placerat eros, eu efficitur lectus est in nulla. Vestibulum nec euismod
      justo. Cras lacinia auctor tortor, at vestibulum nibh consequat at. Duis
      erat sapien, sagittis nec mauris feugiat, aliquet pretium orci. Etiam sit
      amet fringilla felis. Curabitur a mattis tortor, et ultrices ipsum.
      Curabitur accumsan tempor arcu, nec fringilla nunc efficitur ac. Mauris
      suscipit dictum quam, sed hendrerit dui dignissim sit amet. Mauris
      malesuada felis ex, sed lacinia enim rhoncus at. Morbi odio nunc,
      malesuada at turpis efficitur, vulputate egestas libero. In hac habitasse
      platea dictumst. Aliquam risus urna, feugiat non nunc id, consectetur
      ornare mi. Phasellus viverra facilisis purus, nec tincidunt urna
      scelerisque nec. Nam nec commodo est. Nulla purus purus, consequat vel
      ultrices ut, pellentesque sed sapien. Pellentesque habitant morbi
      tristique senectus et netus et malesuada fames ac turpis egestas. Morbi
      vehicula erat in risus blandit vehicula. Ut fermentum at mauris nec
      aliquam. Mauris pharetra odio vitae vestibulum dapibus. Aenean tempus
      varius magna, accumsan porta lorem blandit quis. Donec euismod feugiat
      arcu, convallis tincidunt quam malesuada lobortis. Vestibulum consectetur
      imperdiet finibus. Nulla imperdiet arcu sit amet massa finibus, in
      accumsan lorem dapibus. Nullam lacinia tristique purus, ac interdum erat
      accumsan ut. Vestibulum tincidunt eget turpis ac gravida. Nunc accumsan
      malesuada pretium.
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
import { IonToggle } from '@ionic/vue'
import Title from '../components/Title.vue'
import BigButton from '../components/containers/BigButton.vue'
import { Capacitor } from '@capacitor/core'
import messages from '@/messages'
import urls from '@/urls'

export default {
  components: {
    IonToggle,
    Title,
    BigButton
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

    async resolveRouting () {
      try {
        const results = await this.$http({
          method: 'GET',
          url: urls.acceptTerms
        })
        // no need to accept terms anymore
        this.$store.commit('setNeedToAcceptTerms', false)
        console.log(results)
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
