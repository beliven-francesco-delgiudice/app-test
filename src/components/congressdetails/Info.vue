<template>
  <div class="flex flex-col">
    <div
      class="ml-8 bg-white rounded-12 relative mr-4 gallery-container elevated-shadow overflow-hidden"
    >
      <ion-img
        :src="updatedCongress.image"
        class="w-full pointer-events-none"
      />
    </div>
    <detail-section :label="updatedCongress.name">
      <span
        class="font-helvetica text-16 text-mid-dark-grey spacing-2 line-26 px-8 mb-4"
        >{{ updatedCongress.subtitle }}</span
      >

      <div class="flex flex-col bg-light-red rounded-12 p-6 mx-8">
        <div class="flex justify-between items-start mb-4">
          <div class="flex flex-col">
            <span
              class="font-helvetica text-14 text-grey spacing-44 line-28 mb-4"
              >From</span
            >
            <span
              class="font-helvetica-medium text-16 text-red spacing-23 line-24 mb-2"
              >{{ updatedCongress.first_date }}</span
            >
            <span class="font-helvetica text-14 text-red spacing-2 line-24"
              >{{ updatedCongress.first_date_time }}
            </span>
          </div>
          <div class="flex flex-col">
            <span
              class="font-helvetica text-14 text-grey spacing-44 line-28 mb-4"
              >To</span
            >
            <span
              class="font-helvetica-medium text-16 text-red spacing-23 line-24 mb-2"
              >{{ updatedCongress.last_date }}</span
            >
            <span class="font-helvetica text-14 text-red spacing-2 line-24"
              >{{ updatedCongress.last_date_time }}
            </span>
          </div>
        </div>
        <big-button
          v-if="updatedCongress.save_event && updatedCongress.save_event.length"
          label="Save in calendar"
          @onClick="saveEvent"
        />
      </div>
      <div
        v-if="updatedCongress.link && updatedCongress.link.length"
        class="flex mt-4 items-center relative mx-8"
        @click="openLink"
      >
        <square-container
          bgClass="bg-light-grey"
          squareSize="44"
          classes="pointer-events-none flex"
        >
          <ion-img src="/assets/button-icons/open-link.svg" class="m-auto" />
        </square-container>
        <span
          class="pointer-events-none ml-2 font-helvetica-medium text-black text-16 spacing-5 line-28"
        >
          {{ updatedCongress.link }}
        </span>
      </div>
    </detail-section>
    <detail-section label="Description" noSeparator>
      <p
        class="px-8 font-helvetica text-mid-dark-grey text-16 spacing-1 line-24 mb-4 mt-0"
        v-html="formattedDescription"
      ></p>
      <!-- <div class="mx-8 flex justify-start">
        <section-button
          :label="updatedReadMore ? 'Read less' : 'Read more'"
          @onClick="readMore"
        />
      </div> -->
    </detail-section>
  </div>
</template>
<script>
// import SectionButton from '../containers/SectionButton.vue'
import DetailSection from '../DetailSection.vue'
import { IonImg } from '@ionic/vue'
import BigButton from '../containers/BigButton.vue'
import SquareContainer from '../containers/SquareContainer.vue'
export default {
  components: {
    // SectionButton,
    DetailSection,
    IonImg,
    BigButton,
    SquareContainer
  },
  props: {
    congress: Object
  },
  data () {
    return {
      isReadMore: true
    }
  },
  computed: {
    updatedCongress () {
      if (this.congress && this.congress.content) {
        const congress = Object.assign({}, this.congress.content)
        return congress
      }
      return {}
    },
    updatedReadMore () {
      return this.isReadMore
    },
    formattedDescription () {
      if (this.updatedReadMore) {
        return this.updatedCongress.description
      }
      return this.updatedCongress.description_short
    }
  },
  methods: {
    readMore () {
      this.isReadMore = !this.updatedReadMore
    },
    saveEvent () {
      window.open(this.updatedCongress.save_event)
    },
    openLink () {
      window.open(this.updatedCongress.link)
    }
  }
}
</script>
<style scoped>
.gallery-container {
  width: calc(100vw - 4rem);
  min-width: calc(100vw - 4rem);
  height: 221px;
}
@media screen and (min-width: 1024px) {
  .gallery-container {
    width: calc(100% - 4rem);
    min-width: calc(100% - 4rem);
  }
}
</style>
