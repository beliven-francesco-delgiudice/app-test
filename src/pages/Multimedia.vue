<template>
  <Page
    label="Multimedia"
    back
    :filters="filters"
    :filtersOptions="options"
    @onFiltersChange="updateFilters"
  >
    <carousel id="sections-carousel" classes="pt-4 -my-4 pb-8">
      <section-button
        v-for="(theSection, i) in sections"
        :key="i"
        :active="section === theSection.path"
        :classes="[i === 0 ? 'ml-8' : '', ' mr-4']"
        :label="theSection.label"
        @onClick="changeSection(theSection.path)"
      />
      <div>&nbsp;</div>
    </carousel>
    <div class="flex px-8">
      <multimedia-images v-if="section === 'images'" :images="updatedImages" />
      <multimedia-videos v-if="section === 'videos'" :videos="updatedVideos" />
    </div>
  </Page>
</template>
<script>
import Carousel from '../components/Carousel.vue'
import Page from '../components/Page.vue'
import SectionButton from '../components/containers/SectionButton'
import MultimediaImages from '../components/multimedia/MultimediaImages.vue'
import messages from '@/messages'
import urls from '@/urls'
import MultimediaVideos from '../components/multimedia/MultimediaVideos.vue'
export default {
  components: {
    Page,
    Carousel,
    SectionButton,
    MultimediaImages,
    MultimediaVideos
  },
  data () {
    return {
      section: 'videos',
      sections: [
        {
          label: 'Videos',
          path: 'videos'
        },
        {
          label: 'Images',
          path: 'images'
        }
      ],
      images: [],
      videos: [],
      filters: {},
      filtersOptions: {}
    }
  },
  computed: {
    updatedImages () {
      return this.images
    },
    updatedVideos () {
      return this.videos
    },
    options () {
      return this.filtersOptions
    }
  },
  created () {
    this.getMultimedia()
  },
  methods: {
    changeSection (section) {
      this.section = section
      this.getMultimedia()
    },
    updateFilters (filterObj) {
      this.filters = Object.assign({}, filterObj)
    },
    async getMultimedia () {
      try {
        const results = await this.$http({
          method: 'GET',
          url: urls.multimedia[this.section],
          params: this.filters
        })
        this[this.section] = results.list
        this.filtersOptions = results.filters
      } catch (e) {
        console.error(e)
        this.$toast({
          message: messages.errors.multimedia,
          color: 'danger'
        })
      }
    }
  },
  watch: {
    filters: function (newFilters) {
      this.getMultimedia(newFilters)
    }
  }
}
</script>
