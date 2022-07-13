<template>
  <div
    class="flex flex-col rounded-12 w-full p-6 pb-4 elevated-shadow bg-white"
  >
    <div class="flex no-wrap mb-2 overflow-hidden">
      <span
        class="inline-block font-helvetica-medium text-12 py-1 px-2 rounded-6 text-white mr-2 whitespace-nowrap  spacing-34 line-18"
        :class="bgColor"
      >
        {{ categoryName }}
      </span>
      <span
        v-if="instance.typology"
        class="inline-block font-helvetica-medium text-12 py-1 px-2 rounded-6 border border-grey text-grey whitespace-nowrap spacing-34 line-18"
      >
        {{ instance.typology }}
      </span>
    </div>

    <span
      class="block font-helvetica-medium text-black text-16 spacing-22 line-24"
    >
      {{ instance.title }}
    </span>
    <span
      v-if="instance.subtitle && instance.subtitle.length"
      class="block font-helvetica text-grey mt-2 text-14 spacing-44 line-24"
    >
      {{ instance.subtitle }}
    </span>
    <div
      v-if="instance.print_date && instance.print_date.length"
      class="mr-auto my-2"
    >
      <span
        class="block font-helvetica-medium bg-light-red py-1 px-2 text-red text-12 spacing-34 line-18"
      >
        {{ instance.print_date }}
      </span>
    </div>
    <div class="flex no-wrap overflow-hidden">
      <div v-if="instance.language" class="flex no-wrap py-2 pr-2">
        <square-container classes="bg-white flex" :squareSize="24">
          <span class="uppercase text-grey text-10 m-auto">
            {{ instance.language }}
          </span>
        </square-container>
      </div>
      <div
        v-if="instance.language"
        class="border-l border-grey my-2"
        style="width:1px;"
      ></div>
      <div v-if="instance.segment" class="flex no-wrap py-2 px-2">
        <square-container
          v-for="segment in instance.segment"
          classes="bg-white overflow-hidden"
          :key="segment.id"
          :squareSize="24"
        >
          <img :src="segment.image" class="w-full h-full" />
        </square-container>
      </div>
      <div
        v-if="instance.segment && instance.speakers && instance.speakers.length"
        class="border-l border-grey my-2"
        style="width:1px;"
      ></div>
      <div v-if="instance.speakers" class="flex no-wrap py-2 px-2">
        <square-container
          v-for="speaker in instance.speakers"
          classes="bg-white overflow-hidden mr-2"
          :key="speaker"
          :squareSize="24"
        >
          <img :src="speaker.image" class="w-full h-full" />
        </square-container>
      </div>
    </div>
  </div>
</template>

<script>
import SquareContainer from '../containers/SquareContainer.vue'
export default {
  name: 'CourseCard',

  components: {
    SquareContainer
  },

  props: {
    instance: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    bgColor () {
      if (this.instance && this.instance.category) {
        switch (this.instance.category.class) {
          case 'course':
            return 'bg-orange'
          case 'online':
            return 'bg-green'
          case 'third':
            return 'bg-cyan'
          default:
            return 'bg-light-grey'
        }
      }
      return 'bg-light-grey'
    },

    categoryName () {
      if (this.instance && this.instance.category) {
        switch (this.instance.category.class) {
          case 'course':
            return 'Course'
          case 'online':
            return 'Online course'
          case 'third':
            return '3rd-Party event'
          default:
            return 'Other'
        }
      }
      return 'Other'
    }
  }
}
</script>
