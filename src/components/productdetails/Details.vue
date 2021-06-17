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
      <div class="mx-8 flex justify-start">
        <section-button
          :label="updatedReadMore ? 'Read less' : 'Read more'"
          @onClick="readMore"
        />
      </div>
    </detail-section>
    <detail-section label="Benefits">
      Benefits
    </detail-section>
    <detail-section label="Videos" noSeparator>
      videos
    </detail-section>
  </product-layout>
</template>
<script>
import SectionButton from '../containers/SectionButton.vue'
import DetailSection from '../DetailSection.vue'
import ImageGallery from '../ImageGallery.vue'
import ProductLayout from './ProductLayout.vue'
export default {
  components: {
    ProductLayout,
    ImageGallery,
    SectionButton,
    DetailSection
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
