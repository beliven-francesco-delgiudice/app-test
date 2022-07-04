<template>
  <div class="flex flex-col">
    <div class="flex flex-col bg-light-red rounded-12 p-6 mx-8">
      <div class="flex justify-between items-start">
        <div class="flex flex-col">
          <span class="font-helvetica text-14 text-grey spacing-44 line-28 mb-2"
            >In</span
          >
          <span
            class="font-helvetica-medium text-16 text-red spacing-23 line-24 mb-2"
            >{{ course.checkin_date }}</span
          >
        </div>
        <div class="flex flex-col">
          <span class="font-helvetica text-14 text-grey spacing-44 line-28 mb-2"
            >Out</span
          >
          <span
            class="font-helvetica-medium text-16 text-red spacing-23 line-24 mb-2"
            >{{ course.checkout_date }}</span
          >
        </div>
      </div>

      <big-button
        bgClass="bg-black mt-4 "
        label="Save in calendar"
        v-if="course.save_event && course.save_event.length"
        @onClick="saveEvent()"
      />
    </div>
    <div class="mx-8">
      <separator topMargin />
    </div>
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
  </div>
</template>

<script>
import Separator from '../Separator.vue'
import ImageGallery from '../ImageGallery.vue'
import VideoGallery from '../VideoGallery.vue'
import DetailSection from '../DetailSection.vue'
import BigButton from '../containers/BigButton.vue'
import SectionButton from '../containers/SectionButton.vue'

export default {
  components: {
    Separator,
    BigButton,
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
  },

  methods: {
    saveEvent () {
      window.open(this.course.save_event)
    }
  }
}
</script>
