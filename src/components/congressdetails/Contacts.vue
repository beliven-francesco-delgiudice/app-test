<template>
  <div class="flex flex-col mx-8">
    <detail-section noPadding label="Congress">
      <div class="relative flex mb-4">
        <a
          :href="'phone:' + updatedCongress.phone"
          title="phone"
          class="absolute top-0 left-0 w-full h-full"
        ></a>
        <square-container
          bgClass="bg-black"
          squareSize="44"
          classes="pointer-events-none flex"
        >
          <ion-img src="/assets/button-icons/phone-white.svg" class="m-auto" />
        </square-container>
        <div
          class="ml-4 flex flex-col justify-between items-start pointer-events-none"
        >
          <span
            class="font-helvetica-medium text-16 text-black spacing-5 line-28"
            >{{ updatedCongress.phone }}</span
          >
          <span class="font-helvetica text-14 text-grey spacing-44 line-24">
            Phone
          </span>
        </div>
      </div>

      <div class="relative flex mb-4">
        <a
          :href="'mailto:' + updatedCongress.mail"
          title="mail to"
          class="absolute top-0 left-0 w-full h-full"
        ></a>
        <square-container
          bgClass="bg-black"
          squareSize="44"
          classes="pointer-events-none flex"
        >
          <ion-img src="/assets/button-icons/mail-white.svg" class="m-auto" />
        </square-container>
        <div
          class="ml-4 flex flex-col justify-between items-start pointer-events-none"
        >
          <span
            class="font-helvetica-medium text-16 text-black spacing-5 line-28"
            >{{ updatedCongress.mail }}</span
          >
          <span class="font-helvetica text-14 text-grey spacing-44 line-24">
            E-mail
          </span>
        </div>
      </div>

      <div class="relative flex mb-4">
        <a
          :href="updatedCongress.link"
          title="open link"
          class="absolute top-0 left-0 w-full h-full"
        ></a>
        <square-container
          bgClass="bg-black"
          squareSize="44"
          classes="pointer-events-none flex"
        >
          <ion-img
            src="/assets/button-icons/open-link-white.svg"
            class="m-auto"
          />
        </square-container>
        <div
          class="ml-4 flex flex-col justify-between items-start pointer-events-none"
        >
          <span
            class="font-helvetica-medium text-16 text-black spacing-5 line-28"
            >{{ updatedCongress.link }}</span
          >
          <span class="font-helvetica text-14 text-grey spacing-44 line-24">
            Website
          </span>
        </div>
      </div>
    </detail-section>
    <detail-section noPadding label="Congress Venue">
      <p
        class="font-helvetica text-16 text-mid-dark-grey spacing-1 line-24 mb-4"
        v-html="updatedVenue.text"
      ></p>
      <a
        :href="'phone:' + updatedVenue.phone"
        title="phone venue"
        class="font-helvetica text-16 text-mid-dark-grey spacing-1 line-24 mb-2"
        >T. {{ updatedVenue.phone }}</a
      >
      <a
        :href="'mailto:' + updatedVenue.mail"
        title="mail venue"
        class="font-helvetica-medium text-16 text-black spacing-1 line-24"
        >{{ updatedVenue.mail }}</a
      >
    </detail-section>
    <detail-section noPadding label="Hotel">
      <p
        class="font-helvetica text-16 text-mid-dark-grey spacing-1 line-24 mb-4"
        v-html="updatedHotel.text"
      ></p>
      <a
        :href="'phone:' + updatedHotel.phone"
        title="phone hotel"
        class="font-helvetica text-16 text-mid-dark-grey spacing-1 line-24 mb-2"
        >T. {{ updatedHotel.phone }}</a
      >
      <a
        :href="'mailto:' + updatedHotel.mail"
        title="mail hotel"
        class="font-helvetica-medium text-16 text-black spacing-1 line-24"
        >{{ updatedHotel.mail }}</a
      >
    </detail-section>
    <detail-section noPadding label="Staff" noSeparator>
      <p
        class="font-helvetica text-16 text-mid-dark-grey spacing-1 line-24 mb-4"
        v-html="updatedStaff.text"
      ></p>

      <div
        v-for="(member, j) in updatedStaff.employees"
        :key="j"
        class="flex flex-col mb-4"
      >
        <span
          class="font-helvetica text-16 text-mid-dark-grey spacing-1 line-24 mb-2"
        >
          {{ member.name }}
        </span>
        <a
          :href="'phone:' + member.phone"
          title="phone staff"
          class="font-helvetica text-16 text-mid-dark-grey spacing-1 line-24 mb-2"
          >T. {{ member.phone }}</a
        >
        <a
          :href="'mailto:' + member.mail"
          title="mail staff"
          class="font-helvetica-medium text-16 text-black spacing-1 line-24"
          >{{ member.mail }}</a
        >
      </div>
    </detail-section>
  </div>
</template>
<script>
import DetailSection from '../DetailSection.vue'
import { IonImg } from '@ionic/vue'
import SquareContainer from '../containers/SquareContainer.vue'
export default {
  components: {
    DetailSection,
    IonImg,
    SquareContainer
  },
  props: {
    congress: Object
  },
  computed: {
    updatedCongress () {
      const newCongress = Object.assign({}, this.congress.content)
      return newCongress
    },
    updatedVenue () {
      if (this.updatedCongress && this.updatedCongress.venue) {
        return this.updatedCongress.venue
      }
      return {}
    },
    updatedHotel () {
      if (this.updatedCongress && this.updatedCongress.hotel) {
        return this.updatedCongress.hotel
      }
      return {}
    },
    updatedStaff () {
      if (this.updatedCongress && this.updatedCongress.staff) {
        return this.updatedCongress.staff
      }
      return {}
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

a {
  text-decoration: none;
}

span > p,
p > p {
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  font-weight: inherit;
}
</style>
