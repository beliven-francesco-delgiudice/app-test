<template>
  <carousel id="images-carousel" classes="-my-8 py-8">
    <div
      v-for="(image, i) in updatedGallery"
      :key="i"
      :class="[
        i === 0 ? margin : '',
        'bg-white rounded-12 relative mr-4 gallery-container overflow-hidden'
      ]"
    >
      <ion-img
        :src="image.image ? image.image : image.preview"
        class="h-full w-auto pointer-events-none"
      />
      <div
        v-if="gallery.length && gallery.length > 1"
        class="absolute bottom-0 right-0 mb-4 mr-4 px-2 py-1 rounded-6 flex justify-center items-center bg-black-50 pointer-events-none"
      >
        <span
          class="font-helvetica-medium text-12 text-white spacing-38 line-24"
          >{{ `${i + 1} / ${gallery.length}` }}</span
        >
      </div>
    </div>
    <div>
      &nbsp;
    </div>
  </carousel>
  <image-modal
    :open="isOpenImage"
    :index="computedIndex"
    :gallery="updatedGallery"
    @onClose="closeImage"
  />
</template>
<script>
import Carousel from './Carousel.vue'
import { IonImg } from '@ionic/vue'
import ImageModal from './modals/ImageModal.vue'
export default {
  components: {
    Carousel,
    IonImg,
    ImageModal
  },
  props: {
    gallery: Array,
    initMargin: String
  },
  data () {
    return {
      isOpenImage: false,
      index: 0
    }
  },
  computed: {
    margin () {
      return this.initMargin || 'ml-8'
    },
    computedIndex () {
      return this.index
    },
    updatedGallery () {
      const array = this.gallery
        ? this.gallery.map(galleryItem => {
            if (typeof galleryItem === 'string') {
              return {
                image: galleryItem
              }
            } else {
              return {
                image: galleryItem.image || galleryItem.preview
              }
            }
          })
        : []
      return array
    }
  },
  methods: {
    openImage (i) {
      this.index = i
      this.isOpenImage = true
    },
    closeImage () {
      this.index = 0
      this.isOpenImage = false
    }
  }
}
</script>
<style scoped>
.gallery-container {
  width: calc(100% - 4rem);
  min-width: calc(100% - 4rem);
  height: 221px;
}
@media screen and (min-width: 1024px) {
  .gallery-container {
    width: calc(100% - 4rem);
    min-width: calc(100% - 4rem);
  }
}
.bg-black-50 {
  background-color: #1c1c1b80;
  --background: #1c1c1b80;
}
</style>
