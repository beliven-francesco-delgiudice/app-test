<template>
  <div class="flex flex-col">
    <div
      v-if="updatedVideos && updatedVideos.length"
      class="bg-white rounded-12 relative videogallery-container overflow-hidden elevated-shadow mb-4"
      @click="openVideo(updatedVideos[0])"
    >
      <div
        class="image-container pointer-events-none relative bg-black flex justify-center items-center overflow-hidden"
      >
        <ion-img :src="updatedVideos[0].preview" class="w-full opacity-50" />
        <ion-img
          src="/assets/button-icons/play-white.svg"
          class="m-auto absolute z-10"
        />
      </div>
      <p
        class="px-8 py-4 font-helvetica text-16 text-mid-dark-grey spacing-1 line-24 m-0 pointer-events-none"
      >
        {{ updatedVideos[0].label }}
      </p>
    </div>
    <div
      v-for="(singleVideo, i) in updatedVideos"
      :key="i"
      class="flex item-center mb-4"
      @click="openVideo(singleVideo)"
    >
      <div
        class="width-121 height-85 rounded-8 mr-2 relative bg-black overflow-hidden pointer-events-none"
      >
        <ion-img :src="singleVideo.preview" class="w-full opacity-50" />
        <ion-img
          src="/assets/button-icons/play-white.svg"
          class="m-auto absolute z-10"
        />
      </div>
      <span
        class="font-helvetica-medium text-black text-15 spacing-4 line-24 pointer-events-none"
        >{{ singleVideo.label }}</span
      >
    </div>
    <video-modal :open="isVideoOpen" :video="video" @onClose="closeVideo" />
  </div>
</template>
<script>
import { IonImg } from '@ionic/vue'
import VideoModal from '../modals/VideoModal.vue'
export default {
  components: {
    VideoModal,
    IonImg
  },
  props: {
    videos: Array
  },
  data () {
    return {
      video: null,
      isVideoOpen: false
    }
  },
  computed: {
    updatedVideos () {
      if (this.videos && this.videos.length && this.videos.length > 1) {
        return this.videos.slice(1)
      }
      return this.videos
    }
  },
  methods: {
    openVideo (v) {
      this.video = v
      this.isVideoOpen = true
    },
    closeVideo () {
      this.isVideoOpen = false
      this.video = null
    }
  }
}
</script>
<style>
.videogallery-container {
  height: 258px;
}
.image-container {
  width: 100%;
  height: 180px;
}
.squared:after {
  content: '';
  display: block;
  padding-bottom: 100%;
}
</style>
