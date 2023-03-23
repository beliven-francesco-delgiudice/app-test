<template>
  <ion-modal
    animated
    showBackdrop
    css-class="custom-modal"
    :is-open="computedOpen"
    @didDismiss="$emit('onClose')"
  >
    <div
      class="w-full h-full relative pt-20 bg-black flex justify-center items-center"
    >
      <div
        class="bg-black absolute top-0 left-0 flex px-8 w-full z-10"
        style="height:90px"
      >
        <!-- close button -->
        <ion-button
          type="button"
          class="relative mr-auto my-auto back-button"
          @click="closeImage"
        >
          <img
            src="/assets/button-icons/close-white.svg"
            className="pointer-events-none"
          />
        </ion-button>
      </div>
      <ion-img
        v-if="updatedGallery.length === 1"
        :src="updatedGallery[0]"
        class="w-full my-auto"
      />
      <ion-slides
        v-else
        mode="ios"
        ref="slides"
        pager="true"
        style="position:absolute; top:0; left:0; width:100%; height:100%; z-index:0"
        :options="slideOpts"
        @ionSlidesDidLoad="onLoad"
      >
        <ion-slide v-for="(slide, i) in updatedGallery" :key="i">
          <div class="flex w-full h-full">
            <img :src="slide.img" class="w-full mx-auto my-auto pointer-events-none" />
            <div class="absolute bottom-0 left-0 p-2 w-full" style="background: rgba(0,0,0,0.7); min-height:100px;">
              <p class="font-helvetica text-white text-14 spacing-44 line-24">
              {{ slide.text }}
              </p>
            </div>
          </div>
        </ion-slide>
      </ion-slides>
    </div>
  </ion-modal>
</template>

<script>
import { IonImg, IonModal, IonSlides, IonSlide, IonButton } from '@ionic/vue'

export default {
  components: {
    IonImg,
    IonModal,
    IonSlides,
    IonSlide,
    IonButton
  },

  props: {
    open: {
      type: Boolean,
    },

    image: {
      type: Number,
    },

    gallery: {
      type: Array,
    },

    index: {
      type: Number
    }
  },

  data () {
    return {
      slideOpts: {
        initialSlide: 0,
        speed: 400
      }
    }
  },

  methods: {
    closeImage () {
      this.$emit('onClose')
    },

    async onLoad () {
      if (this.$refs.slides) {
        const swiper = await this.$refs.slides.$el.getSwiper()
        if (swiper) {
          swiper.update()
          if (this.index) {
            swiper.slideTo(this.index)
          }
        }
      }
    }
  },

  computed: {
    computedOpen () {
      return this.open
    },

    updatedGallery () {
      if (this.gallery && this.gallery.length) {

        return this.gallery.map(item => ({
          img: item.hd || item.image || item.preview || item.img,
          text: item.label || item.text
        }))
      }
      return []
    }
  }
}
</script>
