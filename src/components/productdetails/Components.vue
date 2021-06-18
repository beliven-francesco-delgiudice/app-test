<template>
  <product-layout
    section="components"
    :title="updatedProduct.title"
    :productID="updatedProduct.id"
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
              classes="elevated-shadow mr-4 p-2"
            >
              <ion-img :src="item.preview" />
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
import ProductLayout from './ProductLayout.vue'
export default {
  components: {
    ProductLayout,
    AccordionsList,
    SquareContainer
  },
  data () {
    return {
      product: {
        id: 1,
        title: 'Delta TT',
        components: [
          {
            count: 2,
            name: 'Acetabular Cups',
            childs: [
              {
                id: 4,
                title: 'Acetabularino Cupsino',
                subtitle: 'Ti6Al4V',
                preview: '/assets/test/component-small.jpg'
              },
              {
                id: 4,
                title: 'Acetabularato Cupsato',
                subtitle: 'Ti6Al4V',
                preview: '/assets/test/component-small.jpg'
              }
            ]
          },
          {
            count: 2,
            name: 'Lorem Ipsum',
            childs: [
              {
                id: 4,
                title: 'Acetabularino Cupsino',
                subtitle: 'Ti6Al4V',
                preview: '/assets/test/component-small.jpg'
              },
              {
                id: 4,
                title: 'Acetabularato Cupsato',
                subtitle: 'Ti6Al4V',
                preview: '/assets/test/component-small.jpg'
              }
            ]
          },
          {
            id: 4,
            title: 'Componentino',
            subtitle: 'Ti6Al4V',
            preview: '/assets/test/component-small.jpg'
          }
        ]
      }
    }
  },
  computed: {
    updatedProduct () {
      return this.product
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
