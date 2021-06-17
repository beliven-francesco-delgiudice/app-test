<template>
  <div
    :class="[
      withMargin ? 'mx-8' : '',
      topMargin ? 'mt-8' : 'my-8',
      'w-full border-b border-grey'
    ]"
  ></div>
</template>

<script>
export default {
  props: {
    withMargin: Boolean,
    topMargin: Boolean
  }
}
</script>
