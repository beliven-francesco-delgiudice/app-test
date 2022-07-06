<template>
  <div :class="divClass" :style="styles || ''">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    bgClass: String,
    squareSize: [String, Number],
    rounded: String,
    classes: [String, Array],
    styles: [String, Array]
  },
  computed: {
    divClass () {
      const propsClass = this.classes
      return (
        `rounded-${this.rounded || '8'} ${this.bgClass || 'bg-white'} ${
          this.squareSize
            ? 'width-' + this.squareSize + ' height-' + this.squareSize
            : ''
        }` +
        ' flex justify-center items-center overflow-hidden ' +
        propsClass
      )
    }
  }
}
</script>
