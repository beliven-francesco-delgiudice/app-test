<template>
  <ion-list class="bg-transparent">
    <div
      class="flex flex-row justify-between items-center bg-transparent pb-4 mb-4"
      v-for="(item, i) in updatedNotifications"
      :key="i"
      @click="routeTo(item)"
    >
      <div
        class="flex justify-between items-center pointer-events-none px-8 w-full"
      >
        <square-container
          bgClass="bg-white"
          squareSize="64"
          rounded="12"
          classes="mr-4"
        >
          <ion-img
            :src="item.preview ? item.preview : '/assets/icon/icon.png'"
          />
        </square-container>
        <div class="flex flex-col justify-between py-2">
          <p class="font-helvetica-medium text-black text-16 spacing-5 line-28">
            {{ item.title }}
          </p>
        </div>
        <div
          class="width-12 height-12 my-auto ml-auto flex justify-center items-center"
        >
          <div
            v-if="!item.read"
            class="width-8 height-8 bg-red rounded-full"
          ></div>
        </div>
      </div>
    </div>
  </ion-list>
</template>

<script>
import { IonList, IonImg } from '@ionic/vue'
import SquareContainer from '../../components/containers/SquareContainer.vue'
export default {
  components: {
    IonList,
    IonImg,
    SquareContainer
  },
  data () {
    return {
      notifications: []
    }
  },
  created () {
    this.$store.dispatch('getNotifications')
  },
  computed: {
    updatedNotifications () {
      return this.$store.getters.gotNotifications
    }
  },
  methods: {
    routeTo (item) {
      const link = `/new/notifications/${item.id}`
      this.$router.push(link)
    }
  }
}
</script>
