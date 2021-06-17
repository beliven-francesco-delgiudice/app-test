<template>
  <product-layout :title="updatedTitle" section="documents">
    documents
  </product-layout>
</template>
<script>
import ProductLayout from './ProductLayout.vue'
export default {
  components: {
    ProductLayout
  },
  data () {
    return {
      product: {
        id: 1,
        title: 'Delta TT'
      }
    }
  },
  computed: {
    updatedTitle () {
      return this.product.title
    }
  }
}
</script>
