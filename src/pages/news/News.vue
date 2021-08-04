<template>
  <Page
    back
    label="News"
    :filters="filters"
    :filtersOptions="options"
    @onFiltersChange="updateFilters"
  >
    <ion-list class="bg-transparent">
      <div
        class="flex flex-row justify-between items-center bg-transparent pb-4 mb-4"
        v-for="(item, i) in updatedNews.list"
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
            classes="mr-4 bg-no-repeat bg-cover"
            :styles="`background-image:url('${item.preview}')`"
          ></square-container>
          <div class="flex flex-col justify-between py-2">
            <p
              class="font-helvetica-medium text-black text-16 spacing-5 line-28"
            >
              {{ item.title }}
            </p>
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
      news: {
        list: [],
        filters: {}
      },
      filtersOptions: {},
      filters: {
        order: ''
      }
    }
  },
  created () {
    this.getNews()
  },
  computed: {
    updatedNews () {
      return this.news
    },
    options () {
      return this.filtersOptions
    }
  },
  methods: {
    routeTo (item) {
      const link = `/news/${item.id}`
      this.$router.push(link)
    },
    updateFilters (filterObj) {
      this.filters = Object.assign({}, filterObj)
    },
    async getNews (newFilters) {
      try {
        const results = await this.$http({
          method: 'GET',
          url: urls.news.list,
          params: newFilters || this.filters
        })
        this.news = results
        this.filtersOptions = results.filters
      } catch (e) {
        console.error(e)
        this.$toast({
          message: messages.errors.newsList,
          color: 'danger'
        })
      }
    }
  },
  watch: {
    filters: function (newFilters) {
      this.getNews(newFilters)
    }
  }
}
</script>
