<template>
  <slider :slides="slides" @onEnd="routeHome">
    <template v-slot="{ item }">
      <div class="">{{ item.text }}</div>
    </template>
  </slider>
</template>
<script>
import messages from '@/messages'
import urls from '@/urls'
import Slider from '../components/Slider.vue'
export default {
  components: {
    Slider
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
  async created () {
    try {
      const results = await this.$http({
        method: 'GET',
        url: urls.onBoarding
      })
      this.slides = results
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
      this.$router.push('/home')
    }
  }
}
</script>
