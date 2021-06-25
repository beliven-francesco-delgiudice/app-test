<template>
  <Page :label="segment.name" back="/products">
    <ion-list class="bg-transparent">
      <div
        class="flex flex-row justify-between items-center bg-transparent pb-4 mb-4"
        v-for="(item, i) in list"
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
            classes="elevated-shadow mr-4 p-2"
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
export default {
  components: {
    Page,
    IonList,
    IonImg,
    SquareContainer
  },
  data () {
    return {
      list: [],
      segment: {
        id: 2,
        name: 'None',
        list: []
      }
    }
  },

  created () {
    if (this.$route.params.segment) {
      try {
        const list = await this.$app.$http({
          method: 'GET',
          url: urls.products.segments  + '/' + this.$route.params.segment,
          parameters: {}
        })
        this.list = list
      } catch (e) {
        console.error(e)
        this.$app.$toast({
          message: messages.errors.segmentProducts,
          color: 'danger'
        })
      }
    } else {
      console.error('No segment id in route')
      this.$app.$toast({
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
