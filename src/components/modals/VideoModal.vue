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
        class="bg-black absolute top-0 left-0 flex px-8 w-full z-10"
        style="height:90px"
      >
        <!-- close button -->
        <ion-button
          type="button"
          class="relative mr-auto my-auto back-button"
          @click="closeVideo"
        >
          <ion-img
            src="/assets/button-icons/close-white.svg"
            className="pointer-events-none"
          />
        </ion-button>
      </div>
      <div class="w-full relative" style="padding-bottom:56.25%">
        <iframe
          :src="videoEmbedUrl"
          title="YouTube video player"
          class="absolute w-full h-full"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </ion-modal>
</template>
<script>
import { IonImg, IonModal } from '@ionic/vue'
export default {
  components: {
    IonImg,
    IonModal
  },
  props: {
    open: Boolean,
    video: Object
  },
  data () {
    return {
      isOpened: false
    }
  },
  methods: {
    closeVideo () {
      this.$emit('onClose')
    }
  },
  computed: {
    videoEmbedUrl () {
      const url = this.video.url
      const urlCodeArray = url.split('/')
      const code = urlCodeArray[urlCodeArray.length - 1]
      return 'https://www.youtube.com/embed/' + code
    }
  },
  watch: {
    open: function (newValue) {
      this.isOpened = newValue
    }
  }
}
</script>
