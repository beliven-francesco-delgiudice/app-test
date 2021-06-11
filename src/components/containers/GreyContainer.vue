<template>
  <div :class="divClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    squareSize: String,
    rounded: String,
    classes: [String, Array],
    vertical: Boolean
  },
  computed: {
    divClass () {
      return `rounded-${this.rounded || '8'} bg-light-grey flex ${
        this.vertical
          ? 'flex-col justify-between items-center'
          : 'justify-between items-baseline'
      } ${
        this.squareSize
          ? 'width-' + this.squareSize + ' height-' + this.squareSize
          : ''
      } ${this.classes || ''}`
    }
  }
}
</script>
