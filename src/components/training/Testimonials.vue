<template>
  <div class="flex flex-col">
    <video-gallery :gallery="instance" />
  </div>
</template>
<script>
import VideoGallery from '../VideoGallery.vue'
export default {
  components: { VideoGallery },
  props: {
    instance: Object
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
</style>
