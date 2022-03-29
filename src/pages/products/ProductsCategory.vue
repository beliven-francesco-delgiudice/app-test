<template>
  <Page
    :back="backLink"
    :label="updatedCategory.category_name"
    :filters="filters"
    :filtersOptions="options"
    @onFiltersChange="updateFilters"
  >
    <ion-list class="bg-transparent">
      <div
        class="flex flex-row justify-between items-center bg-transparent pb-4 mb-4"
        v-for="(item, i) in updatedCategory.list"
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
            classes="mr-4 bg-no-repeat bg-contain bg-center"
            :styles="`background-image:url('${item.preview}')`"
          >
            <!-- <ion-img :src="item.preview" /> -->
          </square-container>
          <div class="flex flex-col justify-between py-2">
            <span
              class="font-helvetica-medium text-black text-16 spacing-5 line-28"
              >{{ item.name }}</span
            >
            <span class="font-helvetica text-grey text-14 spacing-44 line-24">
              {{ item.category }}
            </span>
          </div>
        </div>
      </div>
    </ion-list>
  </Page>
</template>

<script>
import Page from '../../components/Page.vue'
import { IonList } from '@ionic/vue'
import SquareContainer from '../../components/containers/SquareContainer.vue'
import messages from '@/messages'
import urls from '@/urls'
export default {
  components: {
    Page,
    IonList,
    SquareContainer
  },
  data () {
    return {
      category: {
        parent_id: '0',
        parent_name: 'Segment',
        category_name: 'Category',
        list: [],
        filters: {}
      },
      filtersOptions: {},
      filters: {
        order: '',
        subcategory: ''
      }
    }
  },
  created () {
    if (this.$route.params.category) {
      this.categoryID = this.$route.params.category
      this.getCategoryProducts()
    } else {
      console.error('No category id in route')
      this.$toast({
        message: messages.errors.categoryProducts,
        color: 'danger'
      })
      this.$router.push('/products')
    }
  },
  computed: {
    backLink () {
      if (this.updatedCategory.parent_id) {
        return '/products/' + this.updatedCategory.parent_id
      } else {
        return '/products'
      }
    },
    updatedCategory () {
      return this.category
    },
    options () {
      return this.filtersOptions
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
    async getCategoryProducts () {
      try {
        const id = this.categoryID || this.$route.params.category
        const results = await this.$http({
          method: 'GET',
          url: urls.products.products + '/' + id,
          params: this.filters
        })
        this.category = results
        this.filtersOptions = results.filters
      } catch (e) {
        console.error(e)
        this.$toast({
          message: messages.errors.categoryProducts,
          color: 'danger'
        })
      }
    }
  },
  watch: {
    filters: function (newFilters) {
      this.getCategoryProducts(newFilters)
    }
  }
}
</script>
