<template>
  <div
    @click="routeToNews"
    :class="[index === 0 ? 'ml-8 ' : '', 'flex flex-col home-container mr-4']"
  >
    <div
      class="news-image w-full overflow-hidden rounded-12 mb-4 container-shadow pointer-events-none"
    >
      <ion-img :src="news.preview" class="w-full object-cover" />
    </div>
    <span class="font-helvetica-medium text-black text-16">{{
      news.title
    }}</span>
  </div>
</template>
<script>
import { IonImg } from '@ionic/vue'
export default {
  components: { IonImg },
  props: {
    news: Object,
    index: Number
  },
  methods: {
    routeToNews () {
      this.$router.push('/news/' + this.news.id)
    }
  }
}
</script>
<style scoped>
.news-image {
  height: 170px;
  min-height: 170px;
}
</style>
