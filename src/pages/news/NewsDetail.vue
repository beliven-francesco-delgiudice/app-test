<template>
  <Page withMargin back="/news" :label="updatedNews.title">
    <div
      class="bg-white rounded-12 relative mr-4 gallery-container elevated-shadow overflow-hidden bg-cover bg-no-repeat bg-center"
      :style="`background-image:url('${updatedNews.preview}')`"
    >
      <!-- <ion-img
        :src="updatedNews.preview || ''"
        class="w-full pointer-events-none"
      /> -->
    </div>

    <div class="flex my-8 justify-between items-start">
      <p
        class="m-0 paragraph font-helvetica text-16 line-24 spacing-1 text-mid-dark-grey"
        v-html="updatedNews.description"
      ></p>
    </div>
  </Page>
</template>

<script>
import Page from '../../components/Page.vue'
import messages from '@/messages'
import urls from '@/urls'
import MatomoManager from '../../mixins/MatomoManager.vue'

export default {

  name: 'NewsDetail',

  components: {
    Page
  },

  mixins: [MatomoManager],

  data () {
    return {
      news: {}
    }
  },

  computed: {
    updatedNews () {
      return this.news
    },

    backPath () {
      return `/news/`
    }
  },

  async created () {
    if (this.$route.params.id) {
      try {
        const instance = await this.$http({
          method: 'GET',
          url: urls.news.list + '/' + this.$route.params.id,
          params: {}
        })
        this.news = instance
        this.logPage(instance.title)
      } catch (e) {
        console.error(e)
        this.$toast({
          message: messages.errors.newsDetail,
          color: 'danger'
        })
      }
    } else {
      console.error('No news id in route')
      this.$toast({
        message: messages.errors.newsDetail,
        color: 'danger'
      })
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.gallery-container {
  width: 100%;
  min-width: 100%;
  height: 221px;
}
@media screen and (min-width: 1024px) {
  .gallery-container {
    width: 100%;
    min-width: 100% - 4rem;
  }
}
</style>
