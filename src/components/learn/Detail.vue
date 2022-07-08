<template>
  <div class="flex flex-col">
    <!-- info -->
    <div class="mx-8 my-4 flex flex-col">
      <div class="mb-2 flex no-wrap">
        <div class="w-1/2">
          <span
            class="block font-helvetica text-14 spacing-44 line-20 text-grey"
          >
            Course type
          </span>
          <span
            class="block font-helvetica text-16 spacing-2 line-26 text-mid-dark-grey mr-4"
          >
            {{ course.category ? course.category.label : '' }}
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
              course.segment && course.segment.length
                ? course.segment.join(', ')
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
            class="block font-helvetica text-16 spacing-2 line-26 text-mid-dark-grey"
          >
            {{ course.language || '' }}
          </span>
        </div>
      </div>
    </div>
    <div v-if="videoGallery && videoGallery.length" class="mb-8">
      <video-gallery :gallery="videoGallery" />
    </div>
    <!-- time -->
    <div
      v-if="course.save_outlook"
      class="mx-8 flex flex-col bg-light-red rounded-12 p-6"
    >
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
            {{ course.save_outlook.start_date.date }}
          </span>
          <span class="font-helvetica text-14 text-red spacing-2 line-24">
            {{ course.save_outlook.start_date.time }}
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
            {{ course.save_outlook.end_date.date }}
          </span>
          <span class="font-helvetica text-14 text-red spacing-2 line-24">
            {{ course.save_outlook.end_date.time }}
          </span>
        </div>
      </div>

      <big-button
        v-if="course.save_outlook && course.save_outlook.link"
        bgClass="mt-4"
        label="Save in calendar"
        @onClick="saveEvent()"
      />
    </div>
    <!-- buttons -->
    <div class="mx-8 mt-4">
      <ion-list class="bg-transparent">
        <div
          v-if="course.show_register"
          class=" flex flex-row justify-between items-center bg-transparent py-2"
          @click="$emit('register')"
        >
          <div class="flex flex-start items-center pointer-events-none">
            <square-container
              bgClass="bg-light-grey"
              classes="mr-2"
              squareSize="44"
            >
              <ion-img src="/assets/button-icons/register-black.svg" />
            </square-container>
            <span class="font-helvetica-medium text-black text-16">
              Register to this course
            </span>
          </div>
        </div>
        <div
          v-if="course.evenium"
          class=" flex flex-row justify-between items-center bg-transparent py-2"
          @click="openLink"
        >
          <div class="flex flex-start items-center pointer-events-none">
            <square-container
              bgClass="bg-light-grey"
              classes="mr-2"
              squareSize="44"
            >
              <ion-img src="/assets/button-icons/evenium-black.svg" />
            </square-container>
            <span class="font-helvetica-medium text-black text-16">
              Registration open on Evenium Platform
            </span>
          </div>
        </div>
        <div
          v-if="course.show_learn_contact"
          class="relative flex flex-row justify-between items-center bg-transparent py-2"
        >
          <a
            href="mailto:learn@limacorporate.com"
            class="absolute top-0 left-0 w-full h-full"
            target="_blank"
          ></a>
          <div class="flex flex-start items-center pointer-events-none">
            <square-container
              bgClass="bg-light-grey"
              classes="mr-2"
              squareSize="44"
            >
              <ion-img src="/assets/button-icons/letter-black.svg" />
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
    <detail-section
      v-if="course.speakers && course.speakers.length"
      label="Speakers"
    >
      <ion-list class="bg-transparent pb-0 mb-0">
        <div
          class="flex flex-row justify-between items-center bg-transparent mb-4"
          v-for="(item, i) in speakersArray"
          :key="i"
        >
          <div
            class="flex flex-start items-center pointer-events-none px-8 w-full"
          >
            <square-container
              bgClass="bg-white"
              squareSize="64"
              rounded="12"
              classes="mr-4 overflow-hidden"
            >
              <ion-img :src="item.preview" class="w-full h-full" />
            </square-container>
            <div class="flex flex-col justify-between items-start">
              <span
                class="font-helvetica-medium text-dark-grey text-16 spacing-5 line-28"
              >
                {{ item.name }}
              </span>
              <span class="font-helvetica text-grey text-14 spacing-44 line-24">
                {{ item.country }}
              </span>
            </div>
          </div>
        </div>
      </ion-list>
      <div v-if="showViewAll" class="mx-8 mt-2 flex justify-start">
        <section-button
          :label="isViewAll ? 'View less' : 'View all'"
          @onClick="isViewAll = !isViewAll"
        />
      </div>
    </detail-section>
    <!-- images -->
    <detail-section v-if="imageGallery && imageGallery.length" label="Images">
      <image-gallery :gallery="imageGallery" />
    </detail-section>

    <!-- documents -->
    <detail-section
      v-if="course.files && course.files.length"
      label="Documents"
    >
      <div class="mx-8 flex flex-col pt-8">
        <div class="mb-4" v-for="(doc, i) in course.files" :key="i">
          <document-list-item
            type="my"
            :document="doc"
            :actions="doc.actions"
          />
        </div>
      </div>
    </detail-section>
  </div>
</template>

<script>
import Separator from '../Separator.vue'
import ImageGallery from '../ImageGallery.vue'
import VideoGallery from '../VideoGallery.vue'
import DetailSection from '../DetailSection.vue'
import DocumentListItem from '../DocumentListItem'
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
    SquareContainer,
    DocumentListItem
  },

  props: {
    course: {
      type: Object
    }
  },

  data () {
    return {
      isReadMore: false,
      isViewAll: false
    }
  },

  computed: {
    formattedDescription () {
      if (this.course.description && this.course.description.length) {
        return this.sanitizeManageText(this.course.description)
      }
      return ''
    },

    showViewAll () {
      return this.course.speakers && this.course.speakers.length > 3
    },

    speakersArray () {
      if (this.showViewAll && !this.isViewAll) {
        return this.course.speakers.slice(0, 3)
      }
      return this.course.speakers || []
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
      window.open(this.course.save_outlook.link)
    },

    openLink () {
      window.open(this.course.evenium)
    }
  }
}
</script>
