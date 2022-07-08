<template>
  <carousel id="video-gallery" classes="-my-8 py-8">
    <div
      v-for="(obj, i) in gallery"
      :key="i"
      :class="[
        i === 0 ? 'ml-8' : '',
        'bg-white rounded-12 relative mr-4 videogallery-container overflow-hidden elevated-shadow'
      ]"
      @click="openVideo(obj)"
    >
      <div
        class="image-container pointer-events-none relative bg-black flex justify-center items-center"
      >
        <ion-img :src="obj.preview" class="w-full opacity-50" />
        <ion-img
          src="/assets/button-icons/play-white.svg"
          class="m-auto absolute z-10"
        />
      </div>
      <p
        class="px-8 py-4 font-helvetica text-16 text-mid-dark-grey spacing-1 line-24 m-0"
      >
        {{ obj.label }}
      </p>
    </div>
    <div>
      &nbsp;
    </div>
  </carousel>
  <video-modal :open="isVideoOpen" :video="video" @onClose="closeVideo" />
</template>
<script>
import Carousel from './Carousel.vue'
import { IonImg } from '@ionic/vue'
import VideoModal from './modals/VideoModal.vue'

export default {
  components: {
    Carousel,
    IonImg,
    VideoModal
  },

  props: {
    gallery: Array
  },

  data () {
    return {
      video: null,
      isVideoOpen: false
    }
  },
  methods: {
    openVideo (video) {
      this.video = video
      this.isVideoOpen = true
    },
    closeVideo () {
      this.isVideoOpen = false
      this.video = null
    }
  }
}
</script>
<style scoped>
.videogallery-container {
  width: 240px;
  min-width: 240px;
  height: 258px;
}
.image-container {
  width: 100%;
  height: 180px;
}
</style>
