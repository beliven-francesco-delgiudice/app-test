<template>
  <slider
    back
    finalLabel="Close"
    :pager="true"
    :slides="formattedSlides"
    v-if="formattedSlides && formattedSlides.length"
    @onEnd="resolveRouting"
  >
    <template v-slot="{ item }">
      <div
        class="flex flex-col flex flex-grow pointer-events-none"
        :id="item.big"
      >
        <ion-img :src="item.big" />
      </div>
    </template>
  </slider>
</template>
<script>
import messages from '@/messages'
import urls from '@/urls'
import Slider from '../../components/Slider.vue'
import { IonImg } from '@ionic/vue'
export default {
  components: {
    Slider,
    IonImg
  },
  data () {
    return {
      results: {}
    }
  },
  computed: {
    formattedSlides () {
      return this.results.gallery || []
    }
  },
  async created () {
    if (this.$route.params.id) {
      try {
        const results = await this.$http({
          method: 'GET',
          url: urls.notifications.updates + '/' + this.$route.params.id
        })
        this.results = results
        if (this.$store.getters.gotUpdatesToShow) {
          this.$store.commit('setAppUpdates', null)
        }
      } catch (e) {
        console.error(e)
        this.$router.push('/home')
        this.$toast({
          message: messages.errors.updates,
          color: 'danger'
        })
      }
    } else {
      this.resolveRouting()
    }
  },
  methods: {
    resolveRouting () {
      // check if user has clicked a notification
      if (this.$store.getters.gotNotificationToShow) {
        const path = this.$store.getters.gotNotificationToShow
        if (this.$store.getters.gotNotificationToShow) {
          this.$store.commit('setNotificationToShow', null)
        }
        this.$router.push(path)
      } else {
        this.$router.push('/new?section=updates')
      }
    }
  }
}
</script>
