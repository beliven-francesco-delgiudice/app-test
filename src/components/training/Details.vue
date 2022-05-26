<template>
  <div class="flex flex-col">
    <image-gallery :gallery="updatedVenueGallery" />
    <detail-section label="Venue">
      <p
        class="px-8 font-helvetica text-mid-dark-grey text-16 spacing-1 line-24 mb-4 mt-0"
        v-html="congressDescription"
      />

      <div
        v-if="congressMaps && congressMaps.link && congressMaps.link.length"
        class="flex relative mb-4 mx-8 items-center"
        @click="openLink(congressMaps.link)"
      >
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
      <div
        v-if="
          congressDownloadMaps &&
            congressDownloadMaps.link &&
            congressDownloadMaps.link.length
        "
        class="flex relative mx-8 items-center"
        @click="openLink(congressDownloadMaps.link)"
      >
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

    <detail-section v-if="isLimaBooth" label="Lima Booth">
      <image-gallery
        v-if="
          training.lima_booth &&
            training.lima_booth.gallery &&
            training.lima_booth.gallery.length
        "
        id="booth"
        :gallery="
          training.lima_booth && training.lima_booth.gallery
            ? training.lima_booth.gallery
            : []
        "
      />
      <div
        :class="
          training.lima_booth &&
          training.lima_booth.gallery &&
          training.lima_booth.gallery.length
            ? 'mt-8'
            : ''
        "
      >
        <p
          class="px-8 font-helvetica text-mid-dark-grey text-16 spacing-1 line-24 mb-4 mt-0"
          v-html="formattedDescriptionBooth"
        />
      </div>
    </detail-section>
    <detail-section
      v-if="formattedDescriptionInfo && formattedDescriptionInfo.length"
      label="Useful information"
    >
      <p
        class="px-8 font-helvetica text-mid-dark-grey text-16 spacing-1 line-24 mb-4 mt-0"
        v-html="formattedDescriptionInfo"
      />
    </detail-section>
  </div>
</template>
<script>
import DetailSection from '../DetailSection.vue'
import ImageGallery from '../ImageGallery.vue'
import { IonImg } from '@ionic/vue'
import SquareContainer from '../containers/SquareContainer.vue'

export default {
  components: {
    ImageGallery,
    DetailSection,
    IonImg,
    SquareContainer
  },

  props: {
    instance: Object
  },

  data () {
    return {
      isReadMore: {
        useful: false
      }
    }
  },

  computed: {
    training () {
      if (this.instance && this.instance.content) {
        return Object.assign({}, this.instance.content)
      }
      return {}
    },

    updatedVenueGallery () {
      if (
        this.training &&
        this.training.congress_venue &&
        this.training.congress_venue.gallery &&
        this.training.congress_venue.gallery.length
      ) {
        return this.training.congress_venue.gallery
      }
      return []
    },

    updatedReadMore () {
      return this.isReadMore
    },

    congressDescription () {
      if (
        this.training.congress_venue &&
        this.training.congress_venue.description
      ) {
        return this.training.congress_venue.description
      }
      return ''
    },

    formattedDescriptionBooth () {
      if (this.training.lima_booth) {
        return this.training.lima_booth.description
      }
      return ''
    },

    formattedDescriptionInfo () {
      return this.training.useful_information &&
        this.training.useful_information.description
        ? this.training.useful_information.description
        : ''
    },

    congressMaps () {
      if (
        this.training.congress_venue &&
        this.training.congress_venue.link_googlemaps &&
        this.training.congress_venue.link_googlemaps.length
      ) {
        return {
          link: this.training.congress_venue.link_googlemaps,
          label: this.training.congress_venue.link_googlemaps_label
        }
      }
      return false
    },

    congressDownloadMaps () {
      if (
        this.training.congress_venue &&
        this.training.congress_venue.link_download &&
        this.training.congress_venue.link_download.length
      ) {
        return {
          link: this.training.congress_venue.link_download,
          label: this.training.congress_venue.link_download_label
        }
      }
      return false
    },

    isLimaBooth () {
      if (this.training.lima_booth) {
        if (
          this.training.lima_booth.gallery &&
          this.training.lima_booth.gallery.length
        ) {
          return true
        }
        if (
          this.training.lima_booth.description &&
          this.training.lima_booth.description.length
        ) {
          return true
        }
        return false
      }
      return false
    }
  },

  methods: {
    openLink (link) {
      window.open(link)
    },

    readMore (param) {
      const obj = Object.assign({}, this.isReadMore)
      obj[param] = !obj[param]
      this.isReadMore = obj
    }
  }
}
</script>
