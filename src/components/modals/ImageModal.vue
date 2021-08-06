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
      <ion-slides v-else ref="slides" :options="options">
        <ion-slide v-for="(slide, i) in updatedGallery" :key="i">
          <div class="flex w-full h-full">
            <img :src="slide" class="w-full mx-auto my-auto" />
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
    open: Boolean,
    image: Number,
    gallery: Array,
    index: Number
  },
  data () {
    return {
      reffino: null,
      options: {
        initialSlide: 0,
        slidesPerView: 1,
        centeredSlides: true,
        freeMode: false
      }
    }
  },
  methods: {
    closeImage () {
      this.$emit('onClose')
    }
  },
  computed: {
    computedOpen () {
      return this.open
    },
    updatedGallery () {
      if (this.gallery && this.gallery.length) {
        return this.gallery.map(item => {
          if (item.hd) {
            return item.hd
          } else if (item.image) {
            return item.image
          } else if (item.preview) {
            return item.preview
          } else {
            return item
          }
        })
      }
      return []
    }
  },
  watch: {
    open: function () {
      if (this.index) {
        this.options.initialSlide = this.index
        if (this.$refs && this.$refs.slides) {
          this.$refs.slides.slideTo(this.index)
        }
      }
    },
    'this.$refs': function () {},
    reffino: function () {}
  }
}
</script>
