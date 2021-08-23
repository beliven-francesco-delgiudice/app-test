<template>
  <Page :label="$route.name" withMargin>
    <div class="flex flex-wrap -mx-4">
      <div
        v-for="(segment, i) in segments"
        :key="i"
        @click="routeToSegment(segment)"
        class="w-1/2 pt-10 mt-8"
      >
        <grey-container
          vertical
          rounded="12"
          classes="mx-4 overflow-y-visible px-6 py-4 pointer-events-none"
        >
          <div
            class="relative w-auto mx-auto overflow-y-visible flex justify-center w-full pt-10"
          >
            <ion-img
              :src="segment.preview"
              class="absolute bottom-0 w-3/4 sm:w-1/2 blend-mode-darken"
            />
          </div>
          <span class="font-helvetica-medium text-black text-16 mt-4">{{
            segment.name
          }}</span>
        </grey-container>
      </div>
    </div>
    <separator />
    <document-list-item v-if="catalogue" :document="catalogue" />
  </Page>
</template>

<script>
import { IonImg } from '@ionic/vue'
import Page from '../../components/Page.vue'
import GreyContainer from '../../components/containers/GreyContainer.vue'
import Separator from '../../components/Separator.vue'
import DocumentListItem from '../../components/DocumentListItem.vue'
import messages from '@/messages'
import urls from '@/urls'

export default {
  components: {
    Page,
    GreyContainer,
    IonImg,
    Separator,
    DocumentListItem
  },
  data () {
    return {
      segments: [],
      catalogue: {}
    }
  },
  computed: {},
  created () {
    this.getProducts()
  },
  methods: {
    routeToSegment (segment) {
      const link = `/products/${segment.id}`
      this.$router.push(link)
    },
    async getProducts () {
      try {
        const prod = await this.$http({
          method: 'GET',
          url: urls.products.segments,
          params: {}
        })
        if (prod) {
          if (prod.categories) {
            this.segments = prod.categories
          }
          if (prod.catalogue) {
            this.catalogue = prod.catalogue
          }
        }
      } catch (e) {
        console.error(e)
        this.$toast({
          message: messages.errors.segments,
          color: 'danger'
        })
      }
    }
  }
}
</script>
