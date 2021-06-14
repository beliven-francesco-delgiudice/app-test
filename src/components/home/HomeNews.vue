<template>
  <div
    @click="routeToNews"
    :class="[index === 0 ? 'ml-8 ' : '', 'flex flex-col home-container mr-4']"
  >
    <div
      class="news-image w-full overflow-hidden rounded-12 mb-4 container-shadow"
    >
      <ion-img :src="news.img" class="w-full object-cover" />
    </div>
    <span class="font-helvetica-medium text-black text-16">{{
      news.text
    }}</span>
  </div>
</template>
<script>
export default {
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
