<template>
  <div class="flex flex-col">
    <div
      class="ml-8 bg-white rounded-12 relative mr-4 gallery-container elevated-shadow overflow-hidden bg-no-repeat bg-cover bg-center"
      :style="`background-image:url('${updatedHotel.image}'`"
    >
      <!-- <ion-img :src="updatedHotel.image" class="w-full pointer-events-none m" /> -->
    </div>
    <detail-section :label="updatedHotel.name">
      <div class="flex flex-col justify-start items-start mb-8 px-8">
        <span class="font-helvetica text-14 text-grey spacing-44 line-20"
          >Location</span
        >
        <span
          class="font-helvetica text-16 text-mid-dark-grey spacing-2 line-26"
          v-html="updatedHotel.address"
        />
        <div
          v-if="updatedHotel.googlemaps"
          class="flex relative mt-2 mb-4 items-center"
          @click="openLink(updatedHotel.googlemaps)"
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
            View on Google Maps
          </span>
        </div>
      </div>

      <div class="flex flex-col bg-light-red rounded-12 p-6 mx-8">
        <div class="flex justify-between items-start">
          <div class="flex flex-col">
            <span
              class="font-helvetica text-14 text-grey spacing-44 line-28 mb-2"
              >Check-in</span
            >
            <!-- <span
              class="font-helvetica text-12 text-grey spacing-44 line-28 mb-2"
              >From</span
            > -->
            <span
              class="font-helvetica-medium text-16 text-red spacing-23 line-24 mb-2"
              >{{ updatedHotel.checkin_date }}</span
            >
            <!-- <span class="font-helvetica text-14 text-red spacing-2 line-24"
              >{{ updatedHotel.checkin_time }}
            </span> -->
          </div>
          <div class="flex flex-col">
            <span
              class="font-helvetica text-14 text-grey spacing-44 line-28 mb-2"
              >Check-out</span
            >
            <!-- <span
              class="font-helvetica text-12 text-grey spacing-44 line-28 mb-2"
              >Until</span
            > -->
            <span
              class="font-helvetica-medium text-16 text-red spacing-23 line-24 mb-2"
              >{{ updatedHotel.checkout_date }}</span
            >
            <!-- <span class="font-helvetica text-14 text-red spacing-2 line-24"
              >{{ updatedHotel.checkout_time }}
            </span> -->
          </div>
        </div>
        <!-- <big-button label="Save in calendar" /> -->
      </div>
      <p
        v-if="hotelDescription && hotelDescription.length"
        class="px-8 font-helvetica text-mid-dark-grey text-16 spacing-1 line-24 mb-8 mt-8"
        v-html="hotelDescription"
      />
      <div class="mx-8 flex justify-start">
        <section-button
          v-if="hotelDescription && hotelDescription.length"
          :label="updatedReadMore.hotel ? 'Read less' : 'Read more'"
          @onClick="readMore('hotel')"
        />
      </div>
    </detail-section>
    <detail-section
      v-if="
        (updatedTransfer &&
          updatedTransfer.transfer_date &&
          updatedTransfer.transfer_return_date) ||
          transferDescription
      "
      label="Transfer"
      noSeparator
    >
      <div
        v-if="
          updatedTransfer.transfer_date && updatedTransfer.transfer_return_date
        "
        class="flex flex-col bg-light-red rounded-12 p-6 mx-8"
      >
        <div class="flex justify-between items-start mb-4">
          <div class="flex flex-col">
            <span
              class="font-helvetica text-14 text-grey spacing-44 line-28 mb-2"
              >Check-in</span
            >
            <span
              class="font-helvetica text-12 text-grey spacing-44 line-28 mb-2"
              >From</span
            >
            <span
              class="font-helvetica-medium text-16 text-red spacing-23 line-24 mb-2"
              >{{ updatedTransfer.transfer_date }}</span
            >
            <span class="font-helvetica text-14 text-red spacing-2 line-24"
              >{{
                updatedTransfer.transfer_time
                  ? `${updatedTransfer.transfer_time} `
                  : ''
              }}
            </span>
          </div>
          <div class="flex flex-col">
            <span
              class="font-helvetica text-14 text-grey spacing-44 line-28 mb-2"
              >Check-out</span
            >
            <span
              class="font-helvetica text-12 text-grey spacing-44 line-28 mb-2"
              >Until</span
            >
            <span
              class="font-helvetica-medium text-16 text-red spacing-23 line-24 mb-2"
              >{{ updatedTransfer.transfer_return_date }}</span
            >
            <span class="font-helvetica text-14 text-red spacing-2 line-24">{{
              updatedTransfer.transfer_return_time
                ? `${updatedTransfer.transfer_return_time} `
                : ''
            }}</span>
          </div>
        </div>
        <big-button label="Save in calendar" @onClick="saveEvent('transfer')" />
      </div>
      <p
        class="px-8 font-helvetica text-mid-dark-grey text-16 spacing-1 line-24 mb-4 mt-0"
        v-html="transferDescription"
      />
      <div
        v-if="transferDescription && transferDescription.length"
        class="mx-8 flex justify-start"
      >
        <section-button
          :label="updatedReadMore.transfer ? 'Read less' : 'Read more'"
          @onClick="readMore('transfer')"
        />
      </div>
    </detail-section>
  </div>
</template>
<script>
import SectionButton from '../containers/SectionButton.vue'
import DetailSection from '../DetailSection.vue'
import { IonImg } from '@ionic/vue'
import BigButton from '../containers/BigButton.vue'
import SquareContainer from '../containers/SquareContainer.vue'
export default {
  components: {
    SectionButton,
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
      isReadMore: {
        hotel: false,
        transfer: false
      }
    }
  },
  computed: {
    updatedCongress () {
      const newCongress = Object.assign({}, this.congress.content)
      return newCongress
    },
    updatedHotel () {
      if (this.updatedCongress && this.updatedCongress.hotel) {
        return this.updatedCongress.hotel
      }
      return {}
    },
    updatedTransfer () {
      if (this.updatedCongress && this.updatedCongress.transfer) {
        return this.updatedCongress.transfer
      }
      return {}
    },
    updatedReadMore () {
      return this.isReadMore
    },
    hotelDescription () {
      if (this.updatedReadMore.hotel) {
        return this.updatedHotel.info
      }
      return this.updatedHotel.info_short
    },
    transferDescription () {
      if (this.updatedReadMore.transfer) {
        return this.updatedTransfer.info
      }
      return this.updatedTransfer.info_short
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
    },
    saveEvent (string) {
      if (string === 'transfer') {
        window.open(this.updatedTransfer.save_event)
      } else {
        window.open(this.updatedHotel.save_event)
      }
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

span > p {
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  font-weight: inherit;
}
</style>
