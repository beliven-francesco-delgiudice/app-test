<template>
  <Page back="/products" :label="updatedSegment.category_name">
    <ion-list class="bg-transparent">
      <div
        class="flex flex-row justify-between items-center bg-transparent pb-4 mb-4 cursor-pointer"
        v-for="(item, i) in updatedSegment.categories"
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
            <ion-img :src="item.preview" />
          </square-container>
          <span
            class="font-helvetica-medium text-black text-16 spacing-5 line-28"
            >{{ item.name }}</span
          >
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
      segment: {
        category_name: 'Segment',
        categories: []
      }
    }
  },
  computed: {
    updatedSegment () {
      return this.segment
    }
  },
  async created () {
    if (this.$route.params.segment) {
      try {
        const results = await this.$http({
          method: 'GET',
          url: urls.products.segments + '/' + this.$route.params.segment,
          params: {}
        })
        this.segment = results
      } catch (e) {
        console.error(e)
        this.$toast({
          message: messages.errors.segmentProducts,
          color: 'danger'
        })
      }
    } else {
      console.error('No segment id in route')
      this.$toast({
        message: messages.errors.segmentProducts,
        color: 'danger'
      })
      this.$router.push('/products')
    }
  },
  methods: {
    routeTo (item) {
      // if category push to category
      let link = '/products/'
      if (this.isCategory(item)) {
        link += 'category/' + item.id
      } else {
        link += 'detail/' + item.id
      }
      this.$router.push(link)
    },
    isCategory (item) {
      if (item && item.type === 'category') {
        return true
      }
      return false
    }
  }
}
</script>
