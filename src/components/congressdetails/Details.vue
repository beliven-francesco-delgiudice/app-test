<template>
  <div class="flex flex-col">
    <image-gallery :gallery="updatedVenueGallery" />
    <detail-section label="Congress Venue">
      <p
        class="px-8 font-helvetica text-mid-dark-grey text-16 spacing-1 line-24 mb-4 mt-0"
        v-html="congressDescription"
      />

      <div v-if="congressMaps" class="flex relative mb-4 mx-8 items-center">
        <a
          :href="'geo:' + congressMaps.link"
          title="google maps link"
          class="absolute top-0 left-0 w-full h-full"
        ></a>
        <square-container
          bgClass="bg-black"
          squareSize="44"
          classes="pointer-events-none flex"
        >
          <ion-img src="/assets/button-icons/pin.svg" class="m-auto" />
        </square-container>
        <span
          class="pointer-events-none ml-2 font-helvetica-medium text-black text-16 spacing-5 line-28"
        >
          {{ congressMaps.label }}
        </span>
      </div>
      <div v-if="congressDownloadMaps" class="flex relative mx-8 items-center">
        <a
          :href="congressDownloadMaps.link"
          title="google maps link"
          class="absolute top-0 left-0 w-full h-full"
        ></a>
        <square-container
          bgClass="bg-light-grey"
          squareSize="44"
          classes="pointer-events-none flex"
        >
          <ion-img src="/assets/button-icons/download.svg" class="m-auto" />
        </square-container>
        <span
          class="pointer-events-none ml-2 font-helvetica-medium text-black text-16 spacing-5 line-28"
        >
          {{ congressDownloadMaps.label }}
        </span>
      </div>
    </detail-section>
    <detail-section label="Timing & Dates">
      <div class="flex flex-col bg-light-red rounded-12 p-6 mx-8">
        <div class="flex justify-between items-start mb-4">
          <div class="flex flex-col">
            <span
              class="font-helvetica text-14 text-grey spacing-44 line-28 mb-4"
              >From</span
            >
            <span
              class="font-helvetica-medium text-16 text-red spacing-23 line-24 mb-2"
              >{{ congressDates.from_date }}</span
            >
            <span class="font-helvetica text-14 text-red spacing-2 line-24"
              >{{ congressDates.from_time }} UTC</span
            >
          </div>
          <div class="flex flex-col">
            <span
              class="font-helvetica text-14 text-grey spacing-44 line-28 mb-4"
              >To</span
            >
            <span
              class="font-helvetica-medium text-16 text-red spacing-23 line-24 mb-2"
              >{{ congressDates.to_date }}</span
            >
            <span class="font-helvetica text-14 text-red spacing-2 line-24"
              >{{ congressDates.to_time }} UTC</span
            >
          </div>
        </div>
        <big-button label="Save in calendar" />
      </div>
      <div class="mt-8">
        <p
          class="px-8 font-helvetica text-mid-dark-grey text-16 spacing-1 line-24 mb-4 mt-0"
          v-html="formattedDescriptionDates"
        />
        <div class="mx-8 flex justify-start">
          <section-button
            :label="updatedReadMore.dates ? 'Read less' : 'Read more'"
            @onClick="readMore('dates')"
          />
        </div>
      </div>
    </detail-section>
    <detail-section label="Lima Booth">
      <image-gallery
        :gallery="
          updatedCongress.lima_booth && updatedCongress.lima_booth.gallery
            ? updatedCongress.lima_booth.gallery
            : []
        "
      />
      <div class="mt-8">
        <p
          class="px-8 font-helvetica text-mid-dark-grey text-16 spacing-1 line-24 mb-4 mt-0"
          v-html="formattedDescriptionBooth"
        />
        <div class="mx-8 flex justify-start">
          <section-button
            :label="updatedReadMore.booth ? 'Read less' : 'Read more'"
            @onClick="readMore('booth')"
          />
        </div>
      </div>
    </detail-section>
    <detail-section label="Useful information">
      <p
        class="px-8 font-helvetica text-mid-dark-grey text-16 spacing-1 line-24 mb-4 mt-0"
        v-html="formattedDescriptionInfo"
      />
      <div class="mx-8 flex justify-start">
        <section-button
          :label="updatedReadMore.useful ? 'Read less' : 'Read more'"
          @onClick="readMore('useful')"
        />
      </div>
    </detail-section>
  </div>
</template>
<script>
import SectionButton from '../containers/SectionButton.vue'
import DetailSection from '../DetailSection.vue'
import ImageGallery from '../ImageGallery.vue'
import { IonImg } from '@ionic/vue'
import SquareContainer from '../containers/SquareContainer.vue'
import BigButton from '../containers/BigButton.vue'
export default {
  components: {
    ImageGallery,
    SectionButton,
    DetailSection,
    IonImg,
    SquareContainer,
    BigButton
  },
  props: {
    congress: Object
  },
  data () {
    return {
      isReadMore: {
        dates: false,
        booth: false,
        useful: false
      },
      detailsObject: {
        congress_venue: {
          gallery: [],
          title: '',
          description: '',
          link_googlemaps: '',
          link_googlemaps_label: '',
          link_download: '',
          link_download_label: ''
        },
        timing_dates: {
          title: '',
          description: '',
          from_date: '',
          from_time: '',
          to_date: '',
          to_time: '',
          save_event: ''
        },
        lima_booth: {
          title: '',
          description: '',
          gallery: []
        },
        useful_information: {
          title: '',
          description: ''
        }
      }
    }
  },
  computed: {
    updatedCongress () {
      if (this.congress && this.congress.content) {
        return Object.assign({}, this.congress.content)
      }
      return this.detailsObject
    },
    updatedVenueGallery () {
      if (
        this.updatedCongress &&
        this.updatedCongress.congress_venue &&
        this.updatedCongress.congress_venue.gallery &&
        this.updatedCongress.congress_venue.gallery.length
      ) {
        return this.updatedCongress.congress_venue.gallery
      }
      return []
    },
    updatedReadMore () {
      return this.isReadMore
    },
    congressDescription () {
      if (
        this.updatedCongress.congress_venue &&
        this.updatedCongress.congress_venue.description
      ) {
        return this.updatedCongress.congress_venue.description
      }
      return ''
    },
    formattedDescriptionDates () {
      if (this.updatedReadMore.dates) {
        return this.updatedCongress.lima_booth && this.congressDates.description
          ? this.congressDates.description
          : ''
      }
      return this.congressDates && this.congressDates.description_short
        ? this.congressDates.description_short
        : ''
    },
    formattedDescriptionBooth () {
      if (this.updatedReadMore.booth) {
        return this.updatedCongress.lima_booth &&
          this.updatedCongress.lima_booth.description
          ? this.updatedCongress.lima_booth.description
          : ''
      }
      return this.updatedCongress.lima_booth &&
        this.updatedCongress.lima_booth.description_short
        ? this.updatedCongress.lima_booth.description_short
        : ''
    },
    formattedDescriptionInfo () {
      if (this.updatedReadMore.useful) {
        return this.updatedCongress.useful_information &&
          this.updatedCongress.useful_information.description
          ? this.updatedCongress.useful_information.description
          : ''
      }
      return this.updatedCongress.useful_information &&
        this.updatedCongress.useful_information.description_short
        ? this.updatedCongress.useful_information.description_short
        : ''
    },
    congressMaps () {
      if (
        this.updatedCongress.congress_venue &&
        this.updatedCongress.congress_venue.link_googlemaps &&
        this.updatedCongress.congress_venue.link_googlemaps.length
      ) {
        return {
          link: this.updatedCongress.congress_venue.link_googlemaps,
          label: this.updatedCongress.congress_venue.link_googlemaps_label
        }
      }
      return false
    },
    congressDownloadMaps () {
      if (
        this.updatedCongress.congress_venue &&
        this.updatedCongress.congress_venue.link_download &&
        this.updatedCongress.congress_venue.link_download.length
      ) {
        return {
          link: this.updatedCongress.congress_venue.link_download,
          label: this.updatedCongress.congress_venue.link_download_label
        }
      }
      return false
    },
    congressDates () {
      if (this.updatedCongress && this.updatedCongress.timing_dates) {
        return this.updatedCongress.timing_dates
      }
      return {}
    }
  },
  methods: {
    readMore (param) {
      const obj = Object.assign({}, this.isReadMore)
      obj[param] = !obj[param]
      this.isReadMore = obj
    }
  }
}
</script>
