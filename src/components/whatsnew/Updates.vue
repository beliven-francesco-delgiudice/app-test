<template>
  <ion-list class="bg-transparent">
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
          classes="mr-4 p-2"
        >
          <ion-img :src="item.preview" />
        </square-container>
        <div class="flex flex-col justify-between py-2">
          <span
            class="font-helvetica-medium text-black text-16 spacing-5 line-28"
            >{{ item.title }}</span
          >
          <span class="font-helvetica text-grey text-14 spacing-44 line-24">{{
            item.subtitle
          }}</span>
        </div>
      </div>
    </div>
  </ion-list>
</template>

<script>
import { IonList } from '@ionic/vue'
export default {
  components: {
    IonList
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
      const results = await this.$app.$http({
        method: 'GET',
        url: urls.notifications.updates,
        params: {}
      })
      this.updates = results
    }
  }
}
</script>
