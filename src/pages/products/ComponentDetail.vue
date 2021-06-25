<template>
  <Page
    withMargin
    :label="updatedProduct.title"
    :aboveTitle="aboveTitle"
    :back="backPath"
  >
    <div
      class="bg-white rounded-12 relative mr-4 gallery-container elevated-shadow overflow-hidden"
    >
      <ion-img
        :src="updatedProduct.gallery[0].big"
        class="h-full w-auto pointer-events-none"
      />
    </div>

    <div class="flex my-8 justify-between items-start">
      <div class="flex flex-col">
        <span class="font-helvetica text-14 text-grey spacing-44 line-20"
          >Material</span
        >
        <span
          class="font-helvetica text-16 text-mid-dark-grey spacing-2 line-26"
          >{{ updatedProduct.material }}</span
        >
      </div>
      <div class="flex flex-col">
        <span class="font-helvetica text-14 text-grey spacing-44 line-20"
          >Sterile</span
        >
        <span
          class="font-helvetica text-16 text-mid-dark-grey spacing-2 line-26"
          >{{
            updatedProduct.sterile ? 'Sterile component' : 'Not sterile'
          }}</span
        >
      </div>
    </div>
    <div
      v-if="updatedProduct.notes && updatedProduct.notes.length"
      class="bg-light-grey rounded-12 p-4 flex flex-col mb-8"
    >
      <span class="font-helvetica text-14 text-grey spacing-44 line-20"
        >Notes</span
      >
      <p
        class="m-0 pt-4 font-helvetica text-16 text-mid-dark-grey spacing-1 line-24"
      >
        {{ updatedProduct.notes }}
      </p>
    </div>

    <separator noYMargin />

    <detail-section
      v-for="(group, i) in updatedProduct.variants"
      :key="i"
      :label="group.title"
      noPadding
    >
      <div
        v-for="(variant, j) in group.variants"
        :key="j"
        class="flex mb-8 justify-between items-center"
      >
        <div class="flex justify-start items-stretch">
          <div
            :class="[
              variant.upon_request ? 'bg-red' : 'bg-light-grey',
              ' width-4 rounded-2 mr-4'
            ]"
          ></div>
          <div class="flex flex-col justify-between items-start">
            <span
              class="font-helvetica-medium text-dark-grey text-16 spacing-4 line-24"
              >{{ variant.attribute }}</span
            >
            <span class="font-helvetica text-grey text-14 spacing-44 line-24">{{
              variant.code
            }}</span>
          </div>
        </div>
        <div
          v-if="variant.upon_request"
          class="bg-light-red rounded-6 px-2 ml-auto"
        >
          <span
            class="font-helvetica-medium text-12 text-red spacing-8 line-30 pointer-events-none"
            >upon request</span
          >
        </div>
      </div>
    </detail-section>
  </Page>
</template>

<script>
import { IonImg } from '@ionic/vue'
import Page from '../../components/Page.vue'
import Separator from '../../components/Separator.vue'
import DetailSection from '../../components/DetailSection.vue'
export default {
  components: {
    IonImg,
    Page,
    Separator,
    DetailSection
  },
  data () {
    return {
      component: {}
    }
  },
  computed: {
    updatedProduct () {
      return this.component
    },
    aboveTitle () {
      return this.updatedProduct.parent_name + ' /'
    },
    backPath () {
      const id = this.updatedProduct.parent_id
      return `/products/detail/${id}/components`
    }
  },
  created () {
    if (this.$route.params.id) {
      try {
        const resProduct = await this.$app.$http({
          method: 'GET',
          url: urls.products.component  + '/' + this.$route.params.id,
          parameters: {}
        })
        this.product = resProduct
      } catch (e) {
        console.error(e)
        this.$app.$toast({
          message: messages.errors.componentDetail,
          color: 'danger'
        })
      }
    } else {
      console.error('No product id in route')
      this.$app.$toast({
        message: messages.errors.componentDetail,
        color: 'danger'
      })
      this.$router.back()
    }
  },
}
</script>
<style scoped>
.gallery-container {
  width: calc(100vw - 4rem);
  min-width: calc(100vw - 4rem);
  height: 221px;
}
</style>
