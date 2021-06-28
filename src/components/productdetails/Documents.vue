<template>
  <product-layout
    section="documents"
    :title="updatedProduct.name"
    :productID="$route.params.id"
  >
    <accordions-list classes="mt-4 px-8" :list="computedAttachments">
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
import messages from '@/messages'
import urls from '@/urls'
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
    },
    computedAttachments () {
      return this.updatedProduct && this.updatedProduct.attachments
        ? this.updatedProduct.attachments.map(docCategory => ({
            name: docCategory.name,
            childs: docCategory.files,
            count: docCategory.files.length
          }))
        : []
    }
  },
  async created () {
    if (this.$route.params.id) {
      try {
        const resProduct = await this.$http({
          method: 'GET',
          url:
            urls.products.product +
            '/' +
            this.$route.params.id +
            '/attachments',
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
  }
}
</script>
