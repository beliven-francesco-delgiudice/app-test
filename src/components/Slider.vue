<template>
  <div class="flex flex-col">
    <ion-slides ref="slides" @ionSlideDidChange="updateActiveIndex" pager>
      <ion-slide v-for="(slide, i) in slides" :key="i">
        <slot :item="slide"></slot>
      </ion-slide>
    </ion-slides>
    <big-button :label="buttonLabel" @onClick="buttonClick" />
  </div>
</template>
<script>
import { IonSlides, IonSlide } from '@ionic/vue'
import BigButton from './containers/BigButton.vue'
export default {
  components: {
    IonSlide,
    IonSlides,
    BigButton
  },
  props: {
    slides: Array
  },
  data () {
    return {
      active: 0
    }
  },
  computed: {
    isLastSlide () {
      if (this.active === this.slides.length - 1) {
        return true
      }
      return false
    },
    buttonLabel () {
      if (this.isLastSlide) {
        return 'Lets’s start'
      }
      return 'Next'
    }
  },
  methods: {
    buttonClick () {
      if (this.isLastSlide) {
        this.$emit('onEnd')
      } else {
        this.$refs.slides.slideNext()
      }
    },
    updateActiveIndex () {
      this.active = this.$refs.slides.getActiveIndex()
    }
  }
}
</script>
