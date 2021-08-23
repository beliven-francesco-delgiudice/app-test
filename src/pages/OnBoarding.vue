<template>
  <slider :slides="slides" :pager="true" @onEnd="routeHome">
    <template v-slot="{ item }">
      <div class="flex flex-col flex flex-grow">
        <ion-img :src="item.big" />
      </div>
    </template>
  </slider>
</template>
<script>
// import messages from '@/messages'
// import urls from '@/urls'
import Slider from '../components/Slider.vue'
import { IonImg } from '@ionic/vue'
export default {
  components: {
    Slider,
    IonImg
  },
  data () {
    return {
      slides: [
        {
          big: '/assets/onboarding/prova.jpg'
        },
        {
          big: '/assets/onboarding/prova.jpg'
        }
      ]
    }
  },
  computed: {
    formattedSlides () {
      return this.slides
    }
  },
  // async created () {
  //   try {
  //     const results = await this.$http({
  //       method: 'GET',
  //       url: urls.onBoarding
  //     })
  //     this.slides = results
  //     const userData = this.$store.getters.userData
  //     userData.onboarding = false
  //     this.$store.commit('setUserData', userData)
  //   } catch (e) {
  //     console.error(e)
  //     this.$router.push('/home')
  //     this.$toast({
  //       message: messages.errors.onboarding,
  //       color: 'danger'
  //     })
  //   }
  // },
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
