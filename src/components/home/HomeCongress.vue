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
      >
        {{ congress.name }}
      </span>
      <p
        class="w-full text-grey font-helvetica text-14 mb-0 mb-4 spacing-44 line-24"
        style=" overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;line-clamp: 2;-webkit-box-orient: vertical;"
      >
        {{ congress.subtitle }}
      </p>
      <div class="flex flex-row mr-auto">
        <div
          class="p-1 bg-light-red rounded-6 font-helvetica-medium text-12 text-red mr-2"
        >
          {{ congress.dates }}
        </div>
        <div
        v-if="congress.type === 'event'"
          class="p-1 px-2 bg-red rounded-6 font-helvetica-medium text-12 text-white"
        >
          Event
        </div>
        <div
        v-else
          class="p-1 px-2 bg-black rounded-6 font-helvetica-medium text-12 text-white"
        >
          Congress
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
  height: 165px;
  min-height: 165px;
}
</style>
