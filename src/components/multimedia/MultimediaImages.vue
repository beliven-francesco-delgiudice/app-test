<template>
  <div class="flex flex-wrap w-full -mx-2">
    <div
      v-for="(img, i) in updatedGallery"
      :key="i"
      class="flex w-1/3 mb-4"
      @click="openImage(i)"
    >
      <div
        class="w-full mx-2 squared pointer-events-none bg-light-grey rounded-8 relative overflow-hidden"
      >
        <ion-img :src="img" class="w-full absolute" />
      </div>
    </div>
    <image-modal
      :open="isOpenImage"
      :image="image"
      :gallery="bigGallery"
      @onClose="closeImage"
    />
  </div>
</template>
<script>
import { IonImg } from '@ionic/vue'
import ImageModal from '../modals/ImageModal.vue'
export default {
  components: {
    ImageModal,
    IonImg
  },
  props: {
    images: Array
  },
  data () {
    return {
      image: '',
      isOpenImage: false
    }
  },
  computed: {
    updatedGallery () {
      const array = this.images
        ? this.images.map(galleryItem => galleryItem.small)
        : []
      return array
    },
    bigGallery () {
      const array = this.images
        ? this.images.map(galleryItem => galleryItem.big)
        : []
      return array
    }
  },
  methods: {
    openImage (i) {
      this.image = i
      this.isOpenImage = true
    },
    closeImage () {
      this.isOpenImage = false
      this.image = ''
    }
  }
}
</script>
<style>
.squared:after {
  content: '';
  display: block;
  padding-bottom: 100%;
}
</style>
