<template>
  <slider
    v-if="formattedSlides && formattedSlides.length"
    :slides="formattedSlides"
    :pager="true"
    @onEnd="routeHome"
  >
    <template v-slot="{ item }">
      <div
        class="flex flex-col flex flex-grow pointer-events-none"
        :id="item.image"
      >
        <ion-img :src="item.image" />
      </div>
    </template>
  </slider>
</template>
<script>
import messages from '@/messages'
import urls from '@/urls'
import Slider from '../components/Slider.vue'
import { IonImg } from '@ionic/vue'
export default {
  components: {
    Slider,
    IonImg
  },
  data () {
    return {
      slides: []
    }
  },
  computed: {
    formattedSlides () {
      return this.slides
    }
  },
  async mounted () {
    try {
      const results = await this.$http({
        method: 'GET',
        url: urls.onBoarding
      })
      this.slides = results
      // no need to see onboarding anymore
      this.$store.commit('setOnboarding', false)
    } catch (e) {
      console.error(e)
      this.$router.push('/home')
      this.$toast({
        message: messages.errors.onboarding,
        color: 'danger'
      })
    }
  },
  methods: {
    routeHome () {
      if (this.$store.getters.gotUpdatesToShow) {
        this.$app.$router.push(
          '/new/update/' + this.$store.getters.gotUpdatesToShow
        )
      } else {
        this.$router.push('/home')
      }
    }
  }
}
</script>
