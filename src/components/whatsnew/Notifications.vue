<template>
  <ion-list class="bg-transparent">
    <div
      class="flex flex-row justify-between items-center bg-transparent pb-4 mb-4"
      v-for="(item, i) in updatedNotifications"
      :key="i"
      @click="openNotification(item)"
    >
      <div
        class="flex justify-between items-stretch pointer-events-none px-8 w-full"
      >
        <div
          :class="[
            !item.read ? 'bg-red' : 'bg-light-grey',
            ' width-4 rounded-2 mr-4'
          ]"
        ></div>
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
import { IonList } from '@ionic/vue'
export default {
  components: {
    IonList
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
    openNotification (item) {
      this.$emit('onChangeNotification', item.id)
    }
  }
}
</script>
