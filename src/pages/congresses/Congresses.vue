<template>
  <Page
    label="Congresses"
    back="/menu"
    :filters="filters"
    :filtersOptions="options"
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
          class="flex flex-start items-start pointer-events-none px-8 w-full"
        >
          <square-container
            bgClass="bg-white"
            squareSize="64"
            rounded="12"
            classes="mr-4 overflow-hidden"
          >
            <ion-img :src="item.preview" class="h-full w-auto" />
          </square-container>
          <div class="flex flex-col justify-between py-2">
            <span
              class="font-helvetica-medium text-black text-16 spacing-5 line-28"
              >{{ item.name }}
            </span>
            <span class="font-helvetica text-grey text-14 spacing-44 line-24">
              {{ item.subtitle }}
            </span>
            <div class="bg-light-red rounded-6 px-2 mr-auto">
              <span
                class="font-helvetica-medium text-12 text-red spacing-8 line-30 pointer-events-none"
                >{{ item.dates }}
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
      filtersOptions: {},
      filters: {
        year: '2021'
      }
    }
  },
  computed: {
    segmentPath () {
      return this.category.segment_id
    },
    options () {
      return this.filtersOptions
    }
  },
  created () {
    this.getCongressesList()
  },
  methods: {
    routeToCongress (item) {
      const link = `/congresses/${item.id}`
      this.$router.push(link)
    },
    updateFilters (filterObj) {
      this.filters = Object.assign({}, filterObj)
    },
    async getCongressesList () {
      try {
        const results = await this.$http({
          method: 'GET',
          url: urls.congresses.list,
          params: this.filters
        })
        this.congresses = results
        this.filtersOptions = results.filters || {}
      } catch (e) {
        console.error(e)
        this.$toast({
          message: messages.errors.congresses,
          color: 'danger'
        })
      }
    }
  },
  watch: {
    filters: function (newFilters) {
      this.getCongressesList(newFilters)
    }
  }
}
</script>
