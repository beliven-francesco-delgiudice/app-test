<template>
  <div class="flex flex-col">
    <div
      class="ml-8 bg-white rounded-12 relative mr-4 gallery-container elevated-shadow overflow-hidden bg-contain bg-no-repeat bg-center"
      :style="`background-image:url('${training.image}')`"
    >
      <!-- <ion-img :src="training.image" class="w-full pointer-events-none m" /> -->
    </div>
    <detail-section :label="training.name">
      <span
        class="font-helvetica text-16 text-mid-dark-grey spacing-2 line-26 px-8 mb-4"
      >
        {{ training.subtitle }}
      </span>

      <div class="flex flex-col bg-light-red rounded-12 p-6 mx-8">
        <div class="flex justify-between items-start mb-4">
          <div class="flex flex-col">
            <span
              class="font-helvetica text-14 text-grey spacing-44 line-28 mb-4"
              >From</span
            >
            <span
              class="font-helvetica-medium text-16 text-red spacing-23 line-24 mb-2"
              >{{ training.first_date }}</span
            >
            <span class="font-helvetica text-14 text-red spacing-2 line-24"
              >{{ training.first_date_time }}
            </span>
          </div>
          <div class="flex flex-col">
            <span
              class="font-helvetica text-14 text-grey spacing-44 line-28 mb-4"
              >To</span
            >
            <span
              class="font-helvetica-medium text-16 text-red spacing-23 line-24 mb-2"
              >{{ training.last_date }}</span
            >
            <span class="font-helvetica text-14 text-red spacing-2 line-24"
              >{{ training.last_date_time }}
            </span>
          </div>
        </div>
        <big-button
          v-if="training.save_event && training.save_event.length"
          label="Save in calendar"
          @onClick="saveEvent"
        />
      </div>
    </detail-section>
    <detail-section
      v-if="training.description && training.description.length"
      label="Description"
    >
      <p
        class="px-8 font-helvetica text-mid-dark-grey text-16 spacing-1 line-24 mt-0"
        v-html="training.description"
      ></p>
    </detail-section>
    <detail-section
      v-if="training.link && training.link.length"
      label="Website"
      noSeparator
    >
      <span
        class="font-helvetica text-16 text-mid-dark-grey spacing-2 line-26 px-8"
      >
        {{ training.text_over_website }}
      </span>

      <div class="flex mt-2 items-center relative mx-8" @click="openLink">
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
          {{ training.link }}
        </span>
      </div>
    </detail-section>
  </div>
</template>
<script>
import DetailSection from '../DetailSection.vue'
import { IonImg } from '@ionic/vue'
import BigButton from '../containers/BigButton.vue'
import SquareContainer from '../containers/SquareContainer.vue'
export default {
  components: {
    DetailSection,
    IonImg,
    BigButton,
    SquareContainer
  },

  props: {
    instance: Object
  },

  computed: {
    training () {
      if (this.instance && this.instance.content) {
        const training = Object.assign({}, this.instance.content)
        return training
      }
      return {}
    }
  },

  methods: {
    saveEvent () {
      window.open(this.training.save_event)
    },
    openLink () {
      window.open(this.training.link)
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
</style>
