<template>
  <congress-layout
    section="info"
    :title="updatedCongress.title"
    :productID="updatedCongress.id"
  >
    <div
      class="ml-8 bg-white rounded-12 relative mr-4 gallery-container elevated-shadow overflow-hidden"
    >
      <ion-img
        :src="updatedCongress.gallery[0].image"
        class="w-full pointer-events-none"
      />
    </div>
    <detail-section label="Description">
      <p
        class="px-8 font-helvetica text-mid-dark-grey text-16 spacing-1 line-24 mb-4 mt-0"
        v-html="formattedDescription"
      />
      <div class="mx-8 mt-4 flex justify-start">
        <section-button
          :label="updatedReadMore ? 'Read less' : 'Read more'"
          @onClick="readMore"
        />
      </div>
    </detail-section>
  </congress-layout>
</template>
<script>
import SectionButton from '../containers/SectionButton.vue'
import DetailSection from '../DetailSection.vue'
import CongressLayout from './CongressLayout.vue'
import { IonImg } from '@ionic/vue'
export default {
  components: {
    CongressLayout,
    SectionButton,
    DetailSection,
    IonImg
  },
  data () {
    return {
      isReadMore: false,
      congress: {
        id: 1,
        title: 'ESSKA Congress',
        location: 'Virtual event',
        description:
          'The LimaCorporate DELTA TT is a hemispherical cementless acetabular cup manufactured in Trabecular Titanium through the process of additive manufacturing. Breaking new ground in orthopedic technology, it combines the unique features of the DELTA System with the Trabecular Titanium structure. More: The LimaCorporate DELTA TT is a hemispherical cementless acetabular cup manufactured in Trabecular Titanium through the process of additive manufacturing. Breaking new ground in orthopedic technology, it combines the unique features of the DELTA System with the Trabecular Titanium structure.',
        gallery: [
          {
            preview: '',
            image: '/assets/test/congress.jpg'
          }
        ]
      }
    }
  },
  computed: {
    updatedCongress () {
      return this.congress
    },
    updatedReadMore () {
      return this.isReadMore
    },
    formattedDescription () {
      if (this.updatedReadMore) {
        return this.updatedCongress.description
      }
      return this.updatedCongress.description.substring(0, 290)
    }
  },
  methods: {
    readMore () {
      this.isReadMore = !this.updatedReadMore
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
</style>
