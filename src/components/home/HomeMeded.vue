<template>
  <div
    @click="routeToEvent"
    :class="[index === 0 ? 'ml-8 ' : '', 'flex flex-col home-container mr-4']"
  >
    <div
      :class="[
        categoryBackground,
        'meded-image w-full overflow-hidden rounded-12 flex flex-col justify-between p-6'
      ]"
    >
      <div class="flex flex-col flex-start">
        <div class="mr-auto">
          <div
            class="p-1 bg-red rounded-6 font-helvetica-bold text-12 text-white mb-2"
          >
            {{ data.date }}
          </div>
        </div>
        <span
          class="w-full text-black font-helvetica-medium text-16 mb-2 spacing-22 line-24"
          >{{ data.title }}</span
        >
      </div>
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start">
          <square-container rounded="6" squareSize="24" classes="mr-2">
            <ion-img :src="data.pillar.image" class="w-full h-full" />
          </square-container>
          <span class="font-helvetica text-14 text-grey mr-2">{{
            data.pillar.name
          }}</span>
        </div>
        <square-container
          v-for="(faculty, i) in facultiesArray"
          :key="i"
          rounded="6"
          squareSize="24"
          :classes="faculty.image ? '' : 'flex bg-red'"
        >
          <ion-img v-if="faculty.image" :src="faculty.image" />
          <span v-else class="font-helvetica text-14 text-white m-auto"
            >+{{ faculty.text }}</span
          >
        </square-container>
      </div>
    </div>
  </div>
</template>
<script>
import SquareContainer from '../containers/SquareContainer.vue'
export default {
  components: { SquareContainer },
  props: {
    data: Object,
    index: Number
  },
  computed: {
    categoryBackground () {
      if (this.data.category === 'course') {
        return 'bg-light-red'
      }
      return 'bg-light-grey'
    },
    facultiesArray () {
      if (
        this.data.faculties &&
        this.data.faculties.length &&
        this.data.faculties.length > 3
      ) {
        const array = [this.data.faculties[0], this.data.faculties[1]]
        array.push({ text: this.data.faculties.length - 2 })
        return array
      }
      return this.data.faculties
    }
  },
  methods: {
    routeToMeded () {
      this.$router.push('/meded/' + this.data.course_id)
    }
  }
}
</script>
<style scoped>
.meded-image {
  height: 203px;
  min-height: 203px;
}
</style>
