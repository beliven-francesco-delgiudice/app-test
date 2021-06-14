<template>
  <div
    @click="routeToCongress"
    :class="[
      index === 0 ? 'ml-8 ' : '',
      'home-big-container flex flex-col mr-4 -mt-4 pt-4 pb-4'
    ]"
  >
    <div
      class="congress w-full overflow-hidden rounded-12 flex flex-col justify-between p-6 bg-white elevated-shadow"
    >
      <span
        class="w-full text-black font-helvetica-medium text-16 mb-1 spacing-5 line-28"
        >{{ congress.title }}</span
      >
      <span
        class="w-full text-grey font-helvetica text-14 mb-2 spacing-44 line-24"
        >{{ congress.location }}</span
      >
      <div class="mr-auto">
        <div
          class="p-1 bg-light-red rounded-6 font-helvetica-medium text-12 text-red"
        >
          {{ congress.date }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    congress: Object,
    index: Number
  },
  methods: {
    routeToCongress () {
      this.$router.push('/congresses/' + this.congress.id)
    }
  }
}
</script>
<style scoped>
.congress {
  height: 125px;
  min-height: 125px;
}
</style>
