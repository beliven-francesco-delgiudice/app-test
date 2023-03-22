<template>
  <div class="flex flex-col">
    <div
      v-if="hero && slicedVideos && slicedVideos.length"
      class="bg-white rounded-12 relative videogallery-container overflow-hidden elevated-shadow mb-4"
      @click="openVideo(slicedVideos[0])"
    >
      <div
        class="image-container pointer-events-none relative bg-black flex justify-center items-center overflow-hidden"
      >
        <ion-img :src="slicedVideos[0].preview" class="w-full opacity-50" />
        <ion-img
          src="/assets/button-icons/play-white.svg"
          class="m-auto absolute z-10"
        />
      </div>
      <p
        class="px-8 py-4 font-helvetica text-16 text-mid-dark-grey spacing-1 line-24 m-0 pointer-events-none"
      >
        {{ slicedVideos[0].label }}
      </p>
    </div>
    <div
      v-for="(singleVideo, i) in slicedVideos"
      :key="i"
      class="flex item-center mb-4"
      @click="openVideo(singleVideo)"
    >
      <div
        class="width-121 height-85 rounded-8 mr-4 relative bg-black overflow-hidden pointer-events-none relative"
      >
        <ion-img :src="singleVideo.preview_image" class="w-full h-full opacity-50 z-0" style="object-fit:cover;" />
        <ion-img
          src="/assets/button-icons/play-white.svg"
          class="m-auto absolute z-10"
          style="top:50%;left:50%;transform:translate(-50%,-50%);"
        />
      </div>
      <div
        class="font-helvetica-medium text-black text-15 spacing-4 line-24 pointer-events-none flex items-center "
        > {{ singleVideo.label || singleVideo.title }} </div>
    </div>
    <video-modal :code="code" :direct="direct" :open="isVideoOpen" :video="video" @onClose="closeVideo" />
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
    videos: {
      type: Array
    },

    hero: {
      type: Boolean,
      default: false
    },

    direct: {
      type: Boolean,
      default: false
    },

    code: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      video: null,
      isVideoOpen: false
    }
  },

  computed: {
    slicedVideos () {
      if (this.hero && this.videos && this.videos.length && this.videos.length > 1) {
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
