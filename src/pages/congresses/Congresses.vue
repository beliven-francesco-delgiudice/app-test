<template>
  <Page
    label="Congresses"
    back="/menu"
    :filters="filters"
    @onFiltersChange="updateFilters"
  >
    <ion-list class="bg-transparent">
      <div
        class="flex flex-row justify-between items-center bg-transparent pb-4 mb-4"
        v-for="(item, i) in congresses"
        :key="i"
        @click="routeToCongress(item)"
      >
        <div
          class="flex flex-start items-center pointer-events-none px-8 w-full"
        >
          <square-container
            bgClass="bg-white"
            squareSize="64"
            rounded="12"
            classes="elevated-shadow mr-4 overflow-hidden"
          >
            <ion-img :src="item.image" class="h-full w-auto" />
          </square-container>
          <div class="flex flex-col justify-between py-2">
            <span
              class="font-helvetica-medium text-black text-16 spacing-5 line-28"
              >{{ item.title }}
            </span>
            <span class="font-helvetica text-grey text-14 spacing-44 line-24">
              {{ item.location }}
            </span>
            <div class="bg-light-red rounded-6 px-2 mr-auto">
              <span
                class="font-helvetica-medium text-12 text-red spacing-8 line-30 pointer-events-none"
                >{{ item.date }}
              </span>
            </div>
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
      congresses: [
        {
          id: 1,
          image: '/assets/test/congress-small.jpg',
          title: 'ESSKA Congress',
          location: 'Virtual event',
          date: '11 - 15 May'
        },
        {
          id: 1,
          image: '/assets/test/congress-small.jpg',
          title: 'ESSKA Congress',
          location: 'Virtual event',
          date: '11 - 15 May'
        },
        {
          id: 1,
          image: '/assets/test/congress-small.jpg',
          title: 'ESSKA Congress',
          location: 'Virtual event',
          date: '11 - 15 May'
        }
      ],
      filters: {
        order_by: 'name:desc'
      }
    }
  },
  computed: {
    segmentPath () {
      return this.category.segment_id
    }
  },
  methods: {
    routeToCongress (item) {
      const link = `/congresses/${item.id}`
      this.$router.push(link)
    },
    updateFilters (filterObj) {
      this.filters = Object.assign({}, filterObj)
      console.log('products categ', filterObj)
    }
  }
}
</script>
