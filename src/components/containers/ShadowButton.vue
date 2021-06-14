<template>
  <div
    @click="emitClick"
    :class="[bgClass || 'bg-white', 'elevated-shadow rounded-8 p-0 flex']"
    :style="computedStyle"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    bgClass: String,
    styles: String,
    square: Boolean
  },
  computed: {
    computedStyle () {
      let style = ''
      if (this.styles) {
        style += this.styles + ' '
      }
      if (this.square) {
        style += 'width:44px;height:44px; '
      }
      return style
    }
  }
}
</script>
