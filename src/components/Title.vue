<template>
  <span :class="titleClass">
    <slot></slot>
  </span>
</template>

<script>
export default {
  props: {
    label: String,
    titleClass: String
  },
  components: {}
}
</script>
