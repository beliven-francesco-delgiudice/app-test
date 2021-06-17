<template>
  <product-layout
    section="details"
    :title="updatedProduct.title"
    :productID="updatedProduct.id"
  >
    <image-gallery :gallery="updatedProduct.gallery" />
    <detail-section label="Description">
      <p
        class="px-8 font-helvetica text-mid-dark-grey text-16 spacing-1 line-24 mb-4"
        v-html="formattedDescription"
      />
      <div class="mx-8 mt-4 flex justify-start">
        <section-button
          :label="updatedReadMore ? 'Read less' : 'Read more'"
          @onClick="readMore"
        />
      </div>
    </detail-section>
    <detail-section label="Benefits">
      <div
        class="mx-8 rounded-12 pt-8 relative bg-light-grey flex flex-col overflow-hidden"
      >
        <div
          v-for="(benefit, i) in updatedProduct.benefits"
          :key="i"
          class="flex mb-4 justify-start items-baseline px-8"
        >
          <ion-img src="/assets/button-icons/list-icon.svg" class="width-11" />
          <span
            class="ml-4 font-helvetica text-16 text-mid-dark-grey spacing-5 line-26"
            >{{ benefit }}</span
          >
        </div>
        <ion-img
          src="/assets/hero-2.png"
          class="w-full blend-mode-darken -mt-12"
        />
      </div>
    </detail-section>
    <detail-section label="Videos" noSeparator>
      <video-gallery :gallery="updatedProduct.videos" />
    </detail-section>
  </product-layout>
</template>
<script>
import SectionButton from '../containers/SectionButton.vue'
import DetailSection from '../DetailSection.vue'
import ImageGallery from '../ImageGallery.vue'
import ProductLayout from './ProductLayout.vue'
import { IonImg } from '@ionic/vue'
import VideoGallery from '../VideoGallery.vue'
export default {
  components: {
    ProductLayout,
    ImageGallery,
    SectionButton,
    DetailSection,
    IonImg,
    VideoGallery
  },
  data () {
    return {
      isReadMore: false,
      product: {
        id: 1,
        title: 'Delta TT',
        description:
          'The LimaCorporate DELTA TT is a hemispherical cementless acetabular cup manufactured in Trabecular Titanium through the process of additive manufacturing. Breaking new ground in orthopedic technology, it combines the unique features of the DELTA System with the Trabecular Titanium structure. More: The LimaCorporate DELTA TT is a hemispherical cementless acetabular cup manufactured in Trabecular Titanium through the process of additive manufacturing. Breaking new ground in orthopedic technology, it combines the unique features of the DELTA System with the Trabecular Titanium structure.',
        gallery: [
          {
            id: 12,
            image: '/assets/test/gallery.jpg'
          },
          {
            id: 13,
            image: '/assets/test/gallery.jpg'
          },
          {
            id: 14,
            image: '/assets/test/gallery.jpg'
          }
        ],
        benefits: [
          'TT Trabecular Titanium ingrowths surface',
          'Full hemispherical profile',
          'State of the art bearing options including DELTA Dual Mobility'
        ],
        videos: [
          {
            id: 4,
            image: '/assets/test/video_thumb.jpg',
            link: 'https://www.youtube.com/watch?v=wMre5C_gWwM&t=3s',
            description: 'Lorem ipsum dolor sic amet numquam'
          },
          {
            id: 4,
            image: '/assets/test/video_thumb.jpg',
            link: 'https://www.youtube.com/watch?v=wMre5C_gWwM&t=3s',
            description: 'Lorem ipsum dolor sic amet numquam'
          }
        ]
      }
    }
  },
  computed: {
    updatedProduct () {
      return this.product
    },
    updatedReadMore () {
      return this.isReadMore
    },
    formattedDescription () {
      if (this.updatedReadMore) {
        return this.updatedProduct.description
      }
      return this.updatedProduct.description.substring(0, 290)
    }
  },
  methods: {
    readMore () {
      this.isReadMore = !this.updatedReadMore
    }
  }
}
</script>
