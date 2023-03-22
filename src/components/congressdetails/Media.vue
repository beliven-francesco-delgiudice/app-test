<template>
  <div class="flex flex-col">
    <accordions-list classes="px-8 w-full" :list="accordions">
      <template #childs="props">
        <multimedia-images :images="props.item.childs.images" class="mb-4"/>
        <multimedia-videos code :videos="props.item.childs.videos" />
      </template>
    </accordions-list>
    <div v-if="showImages||showVideos" class="px-8 flex flex-col">
      <span v-if="showImages" class="font-helvetica-bold text-20 spacing-22 line-30 text-black block mb-2"> Images </span>
      <multimedia-images v-if="showImages" :images="generalImages" class="mb-2"/>
      <separator v-if="showImages&&showVideos" bottomMargin />
      <span v-if="showVideos" class="font-helvetica-bold text-20 spacing-22 line-30 text-black block mb-2"> Videos </span>
      <multimedia-videos v-if="showVideos" code :videos="generalVideos" />
    </div>
  </div>
</template>

<script>
import Separator from '../Separator.vue'
import AccordionsList from '../AccordionsList.vue'
import MultimediaImages from '../multimedia/MultimediaImages.vue'
import MultimediaVideos from '../multimedia/MultimediaVideos.vue'

export default {
  components: {
    Separator,
    AccordionsList,
    MultimediaImages,
    MultimediaVideos
},

  props: {
    congress: Object
  },

  data () {
    return {
      isOpenImage: false,
    }
  },

  computed: {
    accordions () {
        return this.congress?.content?.accordions?.map(a => ({
          name: a.title,
          childs: {images: a.images, videos: a.videos},
          count: a.images.length + a.videos.length
        })) || []
    },

    generalImages () {
      return this.congress?.content?.general_images || []
    },

    generalVideos () {
      return this.congress?.content?.general_videos || []
    },

    showImages () {
      return this.generalImages&&this.generalImages.length
    },

    showVideos () {
      return this.generalVideos&&this.generalVideos.length
    }
  }
}
</script>
