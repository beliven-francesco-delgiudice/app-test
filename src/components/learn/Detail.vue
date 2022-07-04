<template>
  <detail-section label="Description">
    <p
      class="px-8 font-helvetica text-mid-dark-grey text-16 spacing-1 line-24 mb-4"
      :style="
        !isReadMore
          ? 'display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;overflow: hidden;text-overflow: ellipsis;'
          : ''
      "
      v-html="formattedDescription"
    />
    <div
      v-if="formattedDescription && formattedDescription.length"
      class="mx-8 mt-4 flex justify-start"
    >
      <section-button
        :label="isReadMore ? 'Read less' : 'Read more'"
        @onClick="isReadMore = !isReadMore"
      />
    </div>
  </detail-section>
  <detail-section label="Speakers">
    <p
      class="px-8 font-helvetica text-mid-dark-grey text-16 spacing-1 line-24 mb-4"
      :style="
        !isReadMore
          ? 'display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;overflow: hidden;text-overflow: ellipsis;'
          : ''
      "
      v-html="formattedDescription"
    />
    <div
      v-if="formattedDescription && formattedDescription.length"
      class="mx-8 mt-4 flex justify-start"
    >
      <section-button
        :label="isReadMore ? 'Read less' : 'Read more'"
        @onClick="isReadMore = !isReadMore"
      />
    </div>
  </detail-section>
  <detail-section v-if="imageGallery && imageGallery.length" label="Images">
    <image-gallery :gallery="imageGallery" />
  </detail-section>
  <detail-section v-if="videoGallery && videoGallery.length" label="Videos">
    <video-gallery :gallery="videoGallery" />
  </detail-section>
</template>

<script>
import ImageGallery from '../ImageGallery.vue'
import VideoGallery from '../VideoGallery.vue'
import DetailSection from '../DetailSection.vue'
import SectionButton from '../containers/SectionButton.vue'

export default {
  components: {
    ImageGallery,
    VideoGallery,
    SectionButton,
    DetailSection
  },

  props: {
    course: {
      type: Object
    }
  },

  data () {
    return {
      isReadMore: false
    }
  },

  computed: {
    formattedDescription () {
      if (this.course.description && this.course.description.length) {
        return this.sanitizeManageText(this.course.description)
      }
      return ''
    },

    imageGallery () {
      return this.course.images || []
    },
    videoGallery () {
      return this.course.videos || []
    }
  }
}
</script>
