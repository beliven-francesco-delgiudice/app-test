<template>
  <button
    :type="type || 'button'"
    :class="[
      bgClass || 'bg-black',
      'small-shadow rounded-12 flex justify-center items-center height-56 w-full'
    ]"
    :style="styles || ''"
    @click="emitClick"
  >
    <span
      v-if="label && label.length"
      class="font-helvetica-medium text-white text-16 spacing-5 line-24 m-auto"
      >{{ label }}</span
    >
    <slot></slot>
  </button>
</template>
<script>
export default {
  components: {},
  props: {
    bgClass: String,
    styles: String,
    square: Boolean,
    type: String,
    label: String
  },
  methods: {
    emitClick () {
      this.$emit('onClick')
    }
  }
}
</script>
