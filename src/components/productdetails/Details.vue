<template>
  <product-layout
    section="details"
    :title="updatedProduct.name"
    :productID="$route.params.id"
    :parentID="updatedProduct.parent_id"
  >
    <image-gallery :gallery="updatedProduct.images" />
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
    <detail-section
      v-if="updatedProduct.benefits && updatedProduct.benefits.length"
      label="Benefits"
    >
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
    <detail-section
      v-if="updatedProduct.videos && updatedProduct.videos.length"
      label="Videos"
      noSeparator
    >
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
import messages from '@/messages'
import urls from '@/urls'
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
      product: {}
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
      return this.updatedProduct.description_short
    }
  },
  async created () {
    if (this.$route.params.id) {
      try {
        const resProduct = await this.$http({
          method: 'GET',
          url: urls.products.product + '/' + this.$route.params.id + '/details',
          params: {}
        })
        this.product = resProduct
      } catch (e) {
        console.error(e)
        this.$toast({
          message: messages.errors.productDetail,
          color: 'danger'
        })
      }
    } else {
      console.error('No product id in route')
      this.$toast({
        message: messages.errors.productDetail,
        color: 'danger'
      })
      this.$router.back()
    }
  },
  methods: {
    readMore () {
      this.isReadMore = !this.updatedReadMore
    }
  }
}
</script>
