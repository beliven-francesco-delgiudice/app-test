<template>
  <Page
    back="/learn"
    label="Learn"
    :filters="filters"
    :filtersOptions="filtersOptions"
    @onFiltersChange="updateFilters"
  >
    <ion-list class="bg-transparent">
      <div
        class="flex flex-row justify-between items-center bg-transparent pb-4 mb-2"
        v-for="(course, i) in list"
        :key="i"
        @click="routeTo(course)"
      >
        <div
          class="flex flex-start items-center pointer-events-none px-8 w-full"
        >
          <CourseCard :instance="course" />
        </div>
      </div>
    </ion-list>
  </Page>
</template>

<script>
import Page from '../../components/Page.vue'
import CourseCard from '../../components/learn/CourseCard.vue'
import { IonList } from '@ionic/vue'
import messages from '@/messages'
import urls from '@/urls'

export default {
  components: {
    Page,
    IonList,
    CourseCard
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

  created () {
    this.fetchCourses()
  },

  methods: {
    routeTo (item) {
      this.$router.push(`/learn/${item.id}`)
    },

    async fetchCourses () {
      this.$router.push({
        path: this.$route.path,
        query: this.filters
      })
      try {
        const results = await this.$http({
          method: 'GET',
          url: urls.learn.list,
          params: this.filters
        })
        if (results) {
          this.list = results.list
          this.filtersOptions = results.filters || {}
        }
      } catch (e) {
        console.error(e)
        this.$toast({
          message: messages.errors.learn,
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
      this.getCongressesList(newFilters)
    }
  }
}
</script>
