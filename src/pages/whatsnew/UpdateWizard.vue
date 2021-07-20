<template>
  <slider :slides="slides" @onEnd="routeBack" back>
    <template v-slot="{ item }">
      <div class="">{{ item.text }}</div>
    </template>
  </slider>
</template>
<script>
import messages from '@/messages'
import urls from '@/urls'
import Slider from '../../components/Slider.vue'
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
    if (this.$route.params.id) {
      try {
        const results = await this.$http({
          method: 'GET',
          url: urls.notifications.updates + '/' + this.$route.params.id
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
    } else {
      this.routeBack()
    }
  },
  methods: {
    routeBack () {
      this.$router.back()
    }
  }
}
</script>
