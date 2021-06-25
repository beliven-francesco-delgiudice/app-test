<template>
  <Page
    :label="category.name"
    :back="segmentPath"
    :filters="filters"
    @onFiltersChange="updateFilters"
  >
    <ion-list class="bg-transparent">
      <div
        class="flex flex-row justify-between items-center bg-transparent pb-4 mb-4"
        v-for="(item, i) in category.list"
        :key="i"
        @click="routeTo(item)"
      >
        <div
          class="flex flex-start items-center pointer-events-none px-8 w-full"
        >
          <square-container
            bgClass="bg-white"
            squareSize="64"
            rounded="12"
            classes="elevated-shadow mr-4 p-2"
          >
            <ion-img :src="item.image" />
          </square-container>
          <div class="flex flex-col justify-between py-2">
            <span
              class="font-helvetica-medium text-black text-16 spacing-5 line-28"
              >{{ item.name }}</span
            >
            <span class="font-helvetica text-grey text-14 spacing-44 line-24">{{
              item.category
            }}</span>
          </div>
        </div>
      </div>
    </ion-list>
  </Page>
</template>

<script>
import Page from '../../components/Page.vue'
import { IonList, IonImg } from '@ionic/vue'
import SquareContainer from '../../components/containers/SquareContainer.vue'
export default {
  components: {
    Page,
    IonList,
    IonImg,
    SquareContainer
  },
  data () {
    return {
      categoryID: null,
      category: {
        id: 2,
        segment_id: 3,
        name: 'Acetabular Cups',
        list: [
          {
            id: 3,
            name: 'DELTA TT',
            category: 'DELTA System primary',
            image: '/assets/test/delta.svg'
          },
          {
            id: 4,
            name: 'Delta PF',
            category: 'DELTA System primary',
            image: '/assets/test/delta.svg'
          }
        ]
      },
      list: [],
      filters: {
        order_by: 'name:desc'
      }
    }
  },
  created () {
    if (this.$route.params.category) {
      this.categoryID = this.$route.params.category
      this.getCategoryProducts()
    } else {
      console.error('No category id in route')
      this.$app.$toast({
        message: messages.errors.categoryProducts,
        color: 'danger'
      })
      this.$router.push('/products')
    }
  },
  computed: {
    segmentPath () {
      return this.category.segment_id
    }
  },
  methods: {
    routeTo (item) {
      const link = `/products/detail/${item.id}`
      this.$router.push(link)
    },
    updateFilters (filterObj) {
      this.filters = Object.assign({}, filterObj)
    },
    getCategoryProducts () {
      try {
        const id = this.categoryID || this.$route.params.category
        const list = await this.$app.$http({
          method: 'GET',
          url: urls.products.products  + '/' + id,
          parameters: this.filters
        })
        this.list = list
      } catch (e) {
        console.error(e)
        this.$app.$toast({
          message: messages.errors.categoryProducts,
          color: 'danger'
        })
      }
    }
  },
  watch: {
    filters: function (newFilters) {
      this.getCategoryProducts(newFilters);
    }
  }
}
</script>
