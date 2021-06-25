<template>
  <product-layout
    section="documents"
    :title="updatedProduct.name"
    :productID="$route.params.id"
  >
    <accordions-list classes="mt-4 px-8" :list="updatedProduct.attachments">
      <template v-slot="{ item }">
        <document-list-item :document="item" />
      </template>
    </accordions-list>
  </product-layout>
</template>
<script>
import AccordionsList from '../AccordionsList.vue'
import DocumentListItem from '../DocumentListItem.vue'
import ProductLayout from './ProductLayout.vue'
export default {
  components: {
    ProductLayout,
    AccordionsList,
    DocumentListItem
  },
  data () {
    return {
      product: {}
    }
  },
  computed: {
    updatedProduct () {
      return this.product
    }
  },
  created () {
    if (this.$route.params.id) {
      try {
        const resProduct = await this.$app.$http({
          method: 'GET',
          url: urls.products.product  + '/' + this.$route.params.id + '/attachments',
          parameters: {}
        })
        this.product = resProduct
      } catch (e) {
        console.error(e)
        this.$app.$toast({
          message: messages.errors.productDetail,
          color: 'danger'
        })
      }
    } else {
      console.error('No product id in route')
      this.$app.$toast({
        message: messages.errors.productDetail,
        color: 'danger'
      })
      this.$router.back()
    }
  },
}
</script>
