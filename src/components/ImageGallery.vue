<template>
  <carousel classes="-my-8 py-8">
    <div
      v-for="(image, i) in gallery"
      :key="i"
      :class="[
        i === 0 ? 'ml-8' : '',
        'bg-white rounded-12 relative mr-4 gallery-container elevated-shadow overflow-hidden'
      ]"
    >
      <ion-img :src="image.image" class="h-full w-auto pointer-events-none" />
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
</template>
<script>
import Carousel from './Carousel.vue'
import { IonImg } from '@ionic/vue'
export default {
  components: {
    Carousel,
    IonImg
  },
  props: {
    gallery: Array
  }
}
</script>
<style scoped>
.gallery-container {
  width: calc(100vw - 4rem);
  min-width: calc(100vw - 4rem);
  height: 221px;
}
.bg-black-50 {
  background-color: #1c1c1b80;
  --background: #1c1c1b80;
}
</style>
