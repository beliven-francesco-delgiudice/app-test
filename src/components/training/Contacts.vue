<template>
  <div class="flex flex-col mx-8">
    <detail-section noPadding label="Main Contact">
      <div class="relative flex mb-4">
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
            >{{ training.name }}</span
          >
          <span class="font-helvetica text-14 text-grey spacing-44 line-24">
            Name
          </span>
        </div>
      </div>

      <div class="relative flex mb-4">
        <a
          :href="'tel:' + training.phone"
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
            >{{ training.phone }}</span
          >
          <span class="font-helvetica text-14 text-grey spacing-44 line-24">
            Phone
          </span>
        </div>
      </div>

      <div class="relative flex mb-4">
        <a
          :href="'mailto:' + training.email"
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
            >{{ training.email }}</span
          >
          <span class="font-helvetica text-14 text-grey spacing-44 line-24">
            E-mail
          </span>
        </div>
      </div>

      <span
        class="font-helvetica text-16 text-mid-dark-grey spacing-2 line-26 mt-4"
      >
        {{ training.text_over_website }}
      </span>

      <div
        @click="openLink(training.website)"
        class="relative flex items-center mt-2 mb-4"
      >
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
            >{{ training.website }}</span
          >
        </div>
      </div>
    </detail-section>
    <detail-section noPadding label="Venue">
      <p
        class="font-helvetica text-16 text-mid-dark-grey spacing-1 line-24 mb-4"
        v-html="updatedVenue"
      ></p>
    </detail-section>
    <!-- <detail-section noPadding label="Hotel">
      <p
        class="font-helvetica text-16 text-mid-dark-grey spacing-1 line-24 mb-4"
        v-html="updatedHotel"
      ></p>
    </detail-section>
    <detail-section noPadding label="Staff" noSeparator>
      <p
        class="font-helvetica text-16 text-mid-dark-grey spacing-1 line-24 mb-4 staff"
        v-html="updatedStaff"
      ></p>
    </detail-section> -->
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
    instance: Object
  },

  mounted () {
    setTimeout(() => {
      this.cleanParagraphs()
    }, 500)
  },

  computed: {
    training () {
      if (this.instance && this.instance.content) {
        const training = Object.assign({}, this.instance.content)
        return training
      }
      return {}
    },

    updatedVenue () {
      if (this.training && this.training.congress_venue) {
        return this.sanitizeManageText(this.training.congress_venue)
      }
      return {}
    },

    updatedHotel () {
      if (this.training && this.training.hotel) {
        return this.training.hotel
      }
      return {}
    },

    updatedStaff () {
      if (this.training && this.training.staff) {
        return this.training.staff
      }
      return ''
    }
  },

  methods: {
    openLink (url) {
      window.open(url)
    }
  }
}
</script>
<style scoped>
.gallery-container {
  width: calc(100% - 4rem);
  min-width: calc(100% - 4rem);
  height: 221px;
}
@media screen and (min-width: 1024px) {
  .gallery-container {
    width: calc(100% - 4rem);
    min-width: calc(100% - 4rem);
  }
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
