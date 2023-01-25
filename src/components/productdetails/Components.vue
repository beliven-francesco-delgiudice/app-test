<template>
  <product-layout
    section="components"
    :title="updatedProduct.name"
    :productID="$route.params.id"
    :parentID="updatedProduct.parent_id"
    :isFirstLevel="updatedProduct.parent_first_level"
  >
    <accordions-list classes="mt-4 px-8" :list="updatedProduct.components">
      <template v-slot="{ item }">
        <div
          class="flex flex-row justify-between items-center bg-transparent"
          @click="routeToComponent(item)"
        >
          <div class="flex flex-start items-center pointer-events-none w-full">
            <square-container
              bgClass="bg-white"
              squareSize="64"
              rounded="12"
              classes="mr-4 bg-no-repeat bg-contain bg-center"
              :styles="`background-image:url('${item.preview}')`"
            >
            </square-container>
            <div class="flex flex-col justify-between py-2">
              <span
                class="font-helvetica-medium text-black text-16 spacing-5 line-28"
                >{{ item.title }}</span
              >
              <span
                class="font-helvetica text-grey text-14 spacing-44 line-24"
                >{{ item.subtitle }}</span
              >
            </div>
          </div>
        </div>
      </template>
    </accordions-list>
  </product-layout>
</template>
<script>
import AccordionsList from '../AccordionsList.vue'
import SquareContainer from '../containers/SquareContainer.vue'
import MatomoManager from '../../mixins/MatomoManager.vue'
import ProductLayout from './ProductLayout.vue'
import messages from '@/messages'
import urls from '@/urls'

export default {
  name: 'Components',

  components: {
    ProductLayout,
    AccordionsList,
    SquareContainer
  },

  mixins:[MatomoManager],

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

  async created () {
    if (this.$route.params.id) {
      try {
        const instance = await this.$http({
          method: 'GET',
          url:
            urls.products.product + '/' + this.$route.params.id + '/components',
          params: {}
        })
        this.product = instance
        this.logPage(instance.name + ' components')
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
    routeToComponent (component) {
      const link = '/products/detail/component/' + component.id
      this.$router.push(link)
    }
  }
}
</script>
