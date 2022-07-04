<template>
  <div class="flex flex-col rounded-12 w-full p-6" :class="bgColor">
    <span class="block font-helvetica-bold mb-4" :class="textColor">
      {{ instance.category }}
    </span>
    <span class="block"> {{ instance.title }} </span>
  </div>
</template>

<script>
export default {
  name: 'CourseCard',

  props: {
    instance: {
      type: Object
    }
  },

  computed: {
    bgColor () {
      if (this.instance && this.instance.type) {
        switch (this.instance.type) {
          case 1:
            return 'bg-light-orange'
          case 2:
            return 'bg-light-green'
          default:
            return 'bg-light-grey'
        }
      }
      return 'bg-light-grey'
    },

    textColor () {
      if (this.instance && this.instance.type) {
        switch (this.instance.type) {
          case 1:
            return 'text-orange'
          case 2:
            return 'text-green'
          default:
            return 'text-black'
        }
      }
      return 'text-black'
    }
  }
}
</script>
