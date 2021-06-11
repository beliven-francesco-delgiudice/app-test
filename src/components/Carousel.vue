<template>
  <div
    :class="[
      height || '',
      'flex w-full max-w-full overflow-x-auto carousel overflow-y-visible'
    ]"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    height: [Number, String]
  }
}
</script>
