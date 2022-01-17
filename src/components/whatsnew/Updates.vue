<template>
  <ion-list class="bg-transparent px-8">
    <div
      class="flex flex-row justify-between items-center bg-transparent pb-4 mb-4"
      v-for="(item, i) in formattedUpdates"
      :key="i"
      @click="openUpdate(item)"
    >
      <div class="flex flex-start items-center pointer-events-none w-full">
        <square-container
          bgClass="bg-white"
          squareSize="64"
          rounded="12"
          classes="mr-4"
        >
          <ion-img :src="item.preview" />
        </square-container>
        <div class="flex flex-col justify-between py-2">
          <span
            class="font-helvetica-medium text-black text-16 spacing-5 line-28"
            >{{ item.name }}</span
          >
          <span class="font-helvetica text-grey text-14 spacing-44 line-24">{{
            item.release
          }}</span>
        </div>
      </div>
    </div>
  </ion-list>
</template>

<script>
import { IonList, IonImg } from '@ionic/vue'
import messages from '@/messages'
import urls from '@/urls'
import SquareContainer from '../containers/SquareContainer.vue'
export default {
  components: {
    IonList,
    IonImg,
    SquareContainer
  },
  data () {
    return {
      updates: []
    }
  },
  created () {
    this.getUpdates()
  },
  computed: {
    formattedUpdates () {
      return this.updates
    }
  },
  methods: {
    openUpdate (item) {
      this.$router.push('/new/update/' + item.id)
    },
    async getUpdates () {
      try {
        const results = await this.$http({
          method: 'GET',
          url: urls.notifications.updates,
          params: {}
        })
        this.updates = results
      } catch (e) {
        console.error(e)
        this.$toast({
          message: messages.errors.appUpdates,
          color: 'danger'
        })
        if (this.$store.getters.gotNotificationToShow) {
          const path = this.$store.getters.gotNotificationToShow
          if (this.$store.getters.gotNotificationToShow) {
            this.$store.commit('setNotificationToShow', null)
          }
          this.$router.push(path)
        } else {
          this.$router.push('/new?section=updates')
        }
      }
    }
  }
}
</script>
