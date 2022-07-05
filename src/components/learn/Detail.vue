<template>
  <div class="flex flex-col">
    <!-- info -->
    <div class="mx-8 my-4 flex flex-col">
      <div class="mb-4 flex no-wrap">
        <div class="w-1/2">
          <span
            class="block font-helvetica text-14 spacing-44 line-20 text-grey"
          >
            Course type
          </span>
          <span
            class="block font-helvetica text-16 spacing-2 line-26 text-mid-dark-grey mr-4"
          >
            {{ course.category }}
          </span>
        </div>
        <div class="w-1/2">
          <span
            class="block font-helvetica text-14 spacing-44 line-20 text-grey"
          >
            Segment
          </span>
          <span
            class="block font-helvetica text-16 spacing-2 line-26 text-mid-dark-grey"
          >
            {{
              course.segments && course.segments.length
                ? course.segments.map(segment => segment.name).join(', ')
                : ''
            }}
          </span>
        </div>
      </div>
      <div class="flex no-wrap">
        <div class="w-1/2">
          <span
            class="block font-helvetica text-14 spacing-44 line-20 text-grey"
          >
            Location
          </span>
          <span
            class="block font-helvetica text-16 spacing-2 line-26 text-mid-dark-grey mr-4"
          >
            {{ course.location || 'Online' }}
          </span>
        </div>
        <div class="w-1/2">
          <span
            class="block font-helvetica text-14 spacing-44 line-20 text-grey"
          >
            Language
          </span>
          <span
            class="block font-helvetica text-16 spacing-2 line-26 text-mid-dark-grey uppercase"
          >
            {{
              course.lang && course.lang.length ? course.lang.join(', ') : ''
            }}
          </span>
        </div>
      </div>
    </div>
    <!-- time -->
    <div class="mx-8 flex flex-col bg-light-red rounded-12 p-6">
      <div class="flex justify-between items-start">
        <div class="flex flex-col">
          <span
            class="font-helvetica text-14 text-grey spacing-44 line-28 mb-2"
          >
            From
          </span>
          <span
            class="font-helvetica-medium text-16 text-red spacing-23 line-24 mb-2"
          >
            {{ course.checkin_date }}
          </span>
          <span class="font-helvetica text-14 text-red spacing-2 line-24">
            {{ course.checkin_time }}
          </span>
        </div>
        <div class="flex flex-col">
          <span
            class="font-helvetica text-14 text-grey spacing-44 line-28 mb-2"
          >
            To
          </span>
          <span
            class="font-helvetica-medium text-16 text-red spacing-23 line-24 mb-2"
          >
            {{ course.checkout_date }}
          </span>
          <span class="font-helvetica text-14 text-red spacing-2 line-24">
            {{ course.checkout_time }}
          </span>
        </div>
      </div>

      <big-button
        v-if="course.save_event && course.save_event.length"
        bgClass="bg-black mt-4"
        label="Save in calendar"
        @onClick="saveEvent()"
      />
    </div>
    <!-- buttons -->
    <div class="mx-8 mt-4">
      <ion-list class="bg-transparent">
        <div
          class=" flex flex-row justify-between items-center bg-transparent py-2"
          @click="$emit('register')"
        >
          <div class="flex flex-start items-center pointer-events-none">
            <square-container
              bgClass="bg-light-grey"
              classes="mr-2"
              squareSize="44"
            >
              <ion-img src="/assets/" />
            </square-container>
            <span class="font-helvetica-medium text-black text-16">
              Register to this course
            </span>
          </div>
        </div>
        <div
          class=" flex flex-row justify-between items-center bg-transparent py-2"
        >
          <div class="flex flex-start items-center pointer-events-none">
            <square-container
              bgClass="bg-light-grey"
              classes="mr-2"
              squareSize="44"
            >
              <ion-img src="/assets/" />
            </square-container>
            <span class="font-helvetica-medium text-black text-16">
              Slot available on Evenium
            </span>
          </div>
        </div>
        <div
          class="relative flex flex-row justify-between items-center bg-transparent py-2"
        >
          <a
            href="mailto:learn@limacorporate.com"
            class="absolute top-0 left-0 w-full h-full"
          ></a>
          <div class="flex flex-start items-center pointer-events-none">
            <square-container
              bgClass="bg-light-grey"
              classes="mr-2"
              squareSize="44"
            >
              <ion-img src="/assets/" />
            </square-container>
            <span class="font-helvetica-medium text-black text-16">
              Ask for more information
            </span>
          </div>
        </div>
      </ion-list>
    </div>
    <div class="mx-8">
      <separator topMargin />
    </div>
    <!-- description -->
    <detail-section
      v-if="formattedDescription && formattedDescription.length"
      label="Description"
    >
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
    <!-- speakers -->
    <detail-section label="Speakers">
      <ion-list class="bg-transparent">
        <div
          class="flex flex-row justify-between items-center bg-transparent pb-4 mb-4"
          v-for="(item, i) in course.speakers"
          :key="i"
        >
          <div
            class="flex flex-start items-center pointer-events-none px-8 w-full"
          >
            <square-container
              bgClass="bg-white"
              squareSize="64"
              rounded="12"
              classes="mr-4 p-2"
            >
              <ion-img :src="item.preview" />
            </square-container>
            <span
              class="font-helvetica-medium text-black text-16 spacing-5 line-28"
            >
              {{ item.name }}
            </span>
          </div>
        </div>
      </ion-list>
    </detail-section>
    <!-- images -->
    <detail-section v-if="imageGallery && imageGallery.length" label="Images">
      <image-gallery :gallery="imageGallery" />
    </detail-section>
    <!-- videos -->
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
import SquareContainer from '../containers/SquareContainer.vue'
import { IonList, IonImg } from '@ionic/vue'

export default {
  components: {
    IonImg,
    IonList,
    Separator,
    BigButton,
    ImageGallery,
    VideoGallery,
    SectionButton,
    DetailSection,
    SquareContainer
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
