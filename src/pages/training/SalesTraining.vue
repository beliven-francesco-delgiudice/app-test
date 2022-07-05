<template>
  <Page
    label="Sales Training"
    back="/home"
    :filters="filters"
    :filtersOptions="options"
    @onFiltersChange="updateFilters"
  >
    <ion-list class="bg-transparent">
      <div
        class="flex flex-row justify-between items-center bg-transparent pb-4 mb-4"
        v-for="(item, i) in list"
        :key="i"
        @click="routeToTraining(item)"
      >
        <div
          class="flex flex-start items-start pointer-events-none px-8 w-full"
        >
          <square-container
            bgClass="bg-white"
            squareSize="64"
            rounded="12"
            classes="mr-4 bg-no-repeat bg-cover bg-center"
            :styles="`background-image:url('${item.preview}')`"
          ></square-container>
          <div class="flex flex-col justify-between py-2">
            <span
              class="font-helvetica-medium text-black text-16 spacing-5 line-28"
              >{{ item.name }}
            </span>
            <span
              class="font-helvetica text-grey text-14 spacing-44 line-24"
              v-html="item.subtitle"
            ></span>
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
      list: [],
      filtersOptions: {},
      filters: {
        year: 2022
      }
    }
  },

  computed: {
    options () {
      return this.filtersOptions
    }
  },

  created () {
    if (this.$route.query && this.$route.query.year) {
      this.filters.year = parseInt(this.$route.query.year)
    }
    this.getTrainingList()
  },

  methods: {
    routeToTraining (item) {
      const link = `/training/${item.id}`
      this.$router.push(link)
    },

    updateFilters (filterObj) {
      this.filters = Object.assign({}, filterObj)
    },

    async getTrainingList () {
      this.$router.push({
        path: this.$route.path,
        query: this.filters
      })
      try {
        const results = await this.$http({
          method: 'GET',
          url: urls.training.list,
          params: this.filters
        })
        this.list = results.list
        this.filtersOptions = results.filters || {}
      } catch (e) {
        console.error(e)
        this.$toast({
          message: messages.errors.training,
          color: 'danger'
        })
      }
    }
  },

  watch: {
    filters: function (newFilters) {
      this.$router.push({
        path: this.$route.path,
        query: newFilters
      })
      this.getTrainingList(newFilters)
    }
  }
}
</script>
