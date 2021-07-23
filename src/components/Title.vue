<template>
  <span :class="titleClass">
    <slot></slot>
  </span>
</template>

<script>
export default {
  props: {
    label: String,
    titleClass: [String, Array]
  },
  components: {}
}
</script>
