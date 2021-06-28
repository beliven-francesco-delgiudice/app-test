<template>
  <Page
    :label="updatedCategory.parent_name"
    :back="segmentPath"
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
            classes="mr-4 p-2"
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
import messages from '@/messages'
import urls from '@/urls'
export default {
  components: {
    Page,
    IonList,
    IonImg,
    SquareContainer
  },
  data () {
    return {
      category: {
        parent_id: '11',
        parent_name: 'Acetabular Cups',
        list: [
          {
            id: 144,
            name: 'DELTA TT',
            subcategory: 12,
            subtitle: 'DELTA system Primary',
            preview:
              'https://limacorporate.com/repo/product-preview/7320828c9153b2a9848d6bc45d3544236b22fc48/o_1ac4obths1rdt168muk71q181r4rib_tmb.jpg'
          },
          {
            id: 147,
            name: 'DELTA ST-C',
            subcategory: 12,
            subtitle: 'DELTA system Primary',
            preview:
              'https://limacorporate.com/repo/product-preview/b3c0730cf3f50613e40561e67c871fdb92820cf9/o_1aa762jp673t17t2cf01mha13hi1e5_tmb.jpg'
          },
          {
            id: 145,
            name: 'DELTA PF',
            subcategory: 12,
            subtitle: 'DELTA system Primary',
            preview:
              'https://limacorporate.com/repo/product-preview/50336bc687eb161ee9fb0ddb8cf2b7e65bad865f/o_1aa75t7srvh21vna1rdc1d3nlk41c4_tmb.jpg'
          },
          {
            id: 146,
            name: 'DELTA Fins',
            subcategory: 12,
            subtitle: 'DELTA system Primary',
            preview:
              'https://limacorporate.com/repo/product-preview/3fcfb99ec010d4a8ba364f43169465d91ca39ada/o_1aae19p253i6iu5bhjcit1h8p49_tmb.jpg'
          }
        ],
        filters: {
          subcategories: [
            {
              id: '',
              label: 'All'
            },
            {
              id: 12,
              label: 'DELTA system Primary'
            },
            {
              id: 13,
              label: 'DELTA system Revision'
            }
          ],
          order: [
            {
              id: 'nameASC',
              label: 'Name (A-Z)'
            },
            {
              id: 'nameDESC',
              label: 'Name (Z-A)'
            }
          ]
        }
      },
      filtersOptions: {
        subcategories: [
          {
            id: '',
            label: 'All'
          },
          {
            id: 12,
            label: 'DELTA system Primary'
          },
          {
            id: 13,
            label: 'DELTA system Revision'
          }
        ],
        order: [
          {
            id: 'nameASC',
            label: 'Name (A-Z)'
          },
          {
            id: 'nameDESC',
            label: 'Name (Z-A)'
          }
        ]
      },
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
    updatedCategory () {
      return this.category
    },
    segmentPath () {
      const id = this.category.parent_id
      return '/products/' + id
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
