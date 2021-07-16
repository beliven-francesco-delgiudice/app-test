<template>
  <ion-modal
    animated
    showBackdrop
    css-class="custom-modal"
    :is-open="isOpened"
    @didDismiss="$emit('onClose')"
  >
    <div
      class="w-full h-full relative pt-20 bg-black flex justify-center items-center"
    >
      <div
        class="bg-transparent absolute top-0 left-0 flex px-8 w-full z-10"
        style="height:90px"
      >
        <!-- close button -->
        <ion-button
          type="button"
          class="relative mr-auto my-auto back-button"
          @click="closeImage"
        >
          <ion-img
            src="/assets/button-icons/close-white.svg"
            className="pointer-events-none"
          />
        </ion-button>
      </div>
      <ion-img
        v-if="updatedGallery.length === 1"
        :src="imgSrc"
        class="w-full my-auto"
      />
      <ion-slides v-else ref="slides">
        <ion-slide v-for="(slide, i) in updatedGallery" :key="i">
          <ion-img :src="slide" class="w-full my-auto" />
        </ion-slide>
      </ion-slides>
    </div>
  </ion-modal>
</template>
<script>
import { IonImg, IonModal, IonSlides, IonSlide } from '@ionic/vue'
export default {
  components: {
    IonImg,
    IonModal,
    IonSlides,
    IonSlide
  },
  props: {
    open: Boolean,
    image: Number,
    gallery: Array
  },
  data () {
    return {
      isOpened: false
    }
  },
  methods: {
    closeImage () {
      this.$emit('onClose')
    }
  },
  computed: {
    imgSrc () {
      return this.image
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
    open: function (newValue) {
      this.isOpened = newValue
      if (this.image) {
        this.$refs.slides.slideTo(this.image)
      }
    }
  }
}
</script>
