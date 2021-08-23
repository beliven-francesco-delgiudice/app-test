<template>
  <div class="flex flex-col relative gradient-background min-h-screen">
    <ion-button
      type="button"
      class="absolute top-0 left-0 z-10"
      style="--background:transparent; margin-top:1rem; margin-left:2rem;--box-shadow: none;"
      v-if="back"
      @click="onClose"
    >
      <ion-img
        src="/assets/button-icons/close.svg"
        className="pointer-events-none"
      />
    </ion-button>

    <ion-slides
      mode="ios"
      ref="slides"
      pager="true"
      style="position:absolute; top:0; left:0; width:100%; z-index:0"
      :options="slideOpts"
      @ionSlideNextEnd="onNextEnd"
      @ionSlidePrevEnd="onPrevEnd"
    >
      <ion-slide v-for="(slide, i) in computedSlides" :key="i">
        <slot :item="slide"></slot>
      </ion-slide>
    </ion-slides>
    <div class="px-8" style="margin-top:150%;">
      <div v-if="back" class="flex justify-between  items-center px-8">
        <ion-button
          type="button"
          class="mr-4"
          style="--background:transparent;"
          v-if="activeSlide > 0"
          @click="previousSlide"
        >
          <ion-img
            src="/assets/button-icons/back.svg"
            class="pointer-events-none"
          />
        </ion-button>
        <big-button
          :label="buttonLabel"
          :bgClass="isLastSlide ? 'bg-black' : 'bg-light-grey'"
          @onClick="buttonClick"
        />
        <ion-button
          type="button"
          class="pointer-events-none opacity-0 ml-4"
          style="--background:transparent;"
          v-if="activeSlide > 0"
          @click="previousSlide"
        >
          <ion-img
            src="/assets/button-icons/back.svg"
            class="pointer-events-none"
          />
        </ion-button>
      </div>
      <big-button v-else :label="buttonLabel" @onClick="buttonClick" />
    </div>
  </div>
</template>
<script>
import { IonSlides, IonSlide, IonImg, IonButton } from '@ionic/vue'
import BigButton from './containers/BigButton.vue'
export default {
  components: {
    IonSlide,
    IonSlides,
    IonImg,
    IonButton,
    BigButton
  },
  props: {
    slides: Array,
    finalLabel: String,
    mainButtonLabel: String,
    back: Boolean
  },
  data () {
    return {
      active: 0,
      slideOpts: {
        initialSlide: 1,
        speed: 400
      }
    }
  },
  mounted () {
    setTimeout(() => {
      window.location.reload
    }, 500)
  },
  computed: {
    computedSlides () {
      return this.slides
    },
    activeSlide () {
      return this.active
    },
    isLastSlide () {
      if (this.active === this.slides.length - 1) {
        return true
      }
      return false
    },
    buttonLabel () {
      if (this.isLastSlide) {
        return this.finalLabel || 'Lets’s start'
      }
      return this.mainButtonLabel || 'Next'
    }
  },
  methods: {
    onClose () {
      this.$router.back()
    },
    previousSlide () {
      this.$refs.slides.slidePrev()
    },
    buttonClick () {
      if (this.isLastSlide) {
        this.$emit('onEnd')
      } else {
        this.$refs.slides.slideNext()
      }
    },
    onNextEnd () {
      this.active = this.active + 1
    },
    onPrevEnd () {
      this.active = this.active - 1
    }
  }
}
</script>
