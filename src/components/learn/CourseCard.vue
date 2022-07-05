<template>
  <div class="flex flex-col rounded-12 w-full p-6 elevated-shadow bg-white">
    <div class="flex no-wrap mb-2 overflow-hidden">
      <span
        class="inline-block font-helvetica-medium text-12 py-1 px-2 rounded-6 text-white mr-2 whitespace-nowrap  spacing-34 line-18"
        :class="bgColor"
      >
        {{ typeName }}
      </span>
      <span
        class="inline-block font-helvetica-medium text-12 py-1 px-2 rounded-6 border border-grey text-grey whitespace-nowrap spacing-34 line-18"
      >
        {{ instance.category }}
      </span>
    </div>

    <span
      class="block font-helvetica-medium text-black mb-2 text-16 spacing-22 line-24"
    >
      {{ instance.title }}
    </span>
    <span
      v-if="instance.location && instance.location.length"
      class="block font-helvetica text-grey mb-2 text-14 spacing-44 line-24"
    >
      {{ instance.location }}
    </span>
    <div v-if="instance.date && instance.date.length" class="mr-auto mb-2">
      <span
        class="block font-helvetica-medium bg-light-red py-1 px-2 text-red text-12 spacing-34 line-18"
      >
        {{ instance.date }}
      </span>
    </div>
    <div class="flex no-wrap overflow-hidden">
      <div v-if="instance.lang" class="flex no-wrap py-2 pr-2">
        <square-container
          v-for="lang in instance.lang"
          classes="bg-white elevated-shadow flex"
          :key="lang"
          :squareSize="24"
        >
          <span class="uppercase text-grey text-10 m-auto">
            {{ lang }}
          </span>
        </square-container>
      </div>
      <div
        v-if="instance.lang"
        class="border-l border-grey py-1"
        style="width:1px;"
      ></div>
      <div v-if="instance.segments" class="flex no-wrap py-2 px-2">
        <square-container
          v-for="segment in instance.segments"
          classes="bg-white elevated-shadow overflow-hidden"
          :key="segment.id"
          :squareSize="24"
        >
          <img :src="segment.img" class="w-full h-full" />
        </square-container>
      </div>
      <div
        v-if="instance.speakers"
        class="border-l border-grey py-1"
        style="width:1px;"
      ></div>
      <div v-if="instance.speakers" class="flex no-wrap py-2 px-2">
        <square-container
          v-for="speaker in instance.speakers"
          classes="bg-white elevated-shadow overflow-hidden"
          :key="speaker"
          :squareSize="24"
        >
          <img :src="speaker.img" class="w-full h-full" />
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
      if (this.instance && this.instance.type) {
        switch (this.instance.type) {
          case 1:
            return 'bg-orange'
          case 2:
            return 'bg-green'
          case 3:
            return 'bg-cyan'
          default:
            return 'bg-light-grey'
        }
      }
      return 'bg-light-grey'
    },

    typeName () {
      if (this.instance && this.instance.type) {
        switch (this.instance.type) {
          case 1:
            return 'Course'
          case 2:
            return 'Online course'
          case 3:
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
