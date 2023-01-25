<template>
  <slider
    back
    :pager="true"
    :slides="formattedSlides"
    :url="formattedUrl || null"
    :finalLabel="!!formattedUrl ? 'Discover more' : 'Close'"
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
import Slider from '../../components/Slider.vue'
import MatomoManager from '../../mixins/MatomoManager.vue'
import urls from '@/urls'
import messages from '@/messages'
import { IonImg } from '@ionic/vue'

export default {
  name: 'UpdateWizard',

  components: {
    Slider,
    IonImg
  },

  mixins: [MatomoManager],

  data () {
    return {
      results: {}
    }
  },

  computed: {
    formattedSlides () {
      return this.results.gallery || []
    },

    formattedUrl () {
      if (this.results && this.results.url) {
        return this.results.url.split('limasales:/')[1]
      }
      return null
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
        this.logPage('Last App Update')
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
