<template>
  <product-layout
    section="details"
    :title="updatedProduct.name"
    :productID="$route.params.id"
    :parentID="updatedProduct.parent_id"
    :isFirstLevel="updatedProduct.parent_first_level"
  >
    <image-gallery :gallery="updatedProduct.images" />
    <detail-section label="Description">
      <p
        class="px-8 font-helvetica text-mid-dark-grey text-16 spacing-1 line-24 mb-4"
        :style="
          !updatedReadMore
            ? 'display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;overflow: hidden;text-overflow: ellipsis;'
            : ''
        "
        v-html="formattedDescription"
      />
      <div
        v-if="formattedDescription && formattedDescription.length"
        class="mx-8 mt-4 flex justify-start"
      >
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
          class="w-full blend-mode-darken lg:-mt-32 -mt-20"
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
    <detail-section v-if="showDisclaimer" label="Disclaimer">
      <div class="p-8 mx-8 mb-4 bg-light-grey rounded-12 ">
        <p
          v-for="(disclaimer, i) in updatedProduct.disclaimers"
          :key="i"
          :class="[
            i === 0 || 'mt-4',
            'font-helvetica text-mid-dark-grey text-12 spacing-38 line-20'
          ]"
        >
          {{ disclaimer }}
        </p>
      </div>
    </detail-section>
  </product-layout>
</template>

<script>
import VideoGallery from '../VideoGallery.vue'
import ImageGallery from '../ImageGallery.vue'
import ProductLayout from './ProductLayout.vue'
import DetailSection from '../DetailSection.vue'
import SectionButton from '../containers/SectionButton.vue'
import MatomoManager from '../../mixins/MatomoManager.vue'
import urls from '@/urls'
import messages from '@/messages'
import { IonImg } from '@ionic/vue'

export default {
  name: 'Details',

  components: {
    IonImg,
    ImageGallery,
    VideoGallery,
    SectionButton,
    DetailSection,
    ProductLayout
  },

  mixins: [MatomoManager],

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
      if (
        this.updatedProduct.description &&
        this.updatedProduct.description.length
      ) {
        return this.sanitizeManageText(this.updatedProduct.description)
      }
      return ''
    },

    showDisclaimer () {
      return (
        this.updatedProduct.disclaimers &&
        this.updatedProduct.disclaimers.length
      )
    }
  },

  async created () {
    if (this.$route.params.id) {
      try {
        const instance = await this.$http({
          method: 'GET',
          url: urls.products.product + '/' + this.$route.params.id + '/details',
          params: {}
        })
        this.product = instance
        setTimeout(() => {
          this.cleanParagraphs()
        }, 500)
        this.logPage(instance.name + ' (Product details)')
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
