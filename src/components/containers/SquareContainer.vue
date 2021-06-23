<template>
  <div :class="divClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    bgClass: String,
    squareSize: String,
    rounded: String,
    classes: [String, Array]
  },
  computed: {
    divClass () {
      const propsClass = this.classes
      return (
        `rounded-${this.rounded || '8'} ${this.bgClass || 'bg-white'} ${
          this.squareSize
            ? 'width-' + this.squareSize + ' height-' + this.squareSize
            : ''
        } ` + propsClass
      )
    }
  }
}
</script>
