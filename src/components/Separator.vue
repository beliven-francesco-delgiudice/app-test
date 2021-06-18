<template>
  <div
    :class="[withMargin ? 'mx-8' : '', margin, ' border-b border-grey']"
  ></div>
</template>

<script>
export default {
  props: {
    withMargin: Boolean,
    topMargin: Boolean,
    bottomMargin: Boolean,
    noYMargin: Boolean
  },
  computed: {
    margin () {
      if (this.topMargin) {
        return 'mt-8'
      } else if (this.bottomMargin) {
        return 'mb-8'
      } else if (this.noYMargin) {
        return ''
      } else {
        return 'my-8'
      }
    }
  }
}
</script>
