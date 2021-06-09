<template>
  <div class="min-h-screen gradient-background pt-24">
    <Title
      v-if="label"
      titleClass="pb-4 text-black font-helvetica-bold text-28 block px-8"
    >
      {{ label }}
    </Title>
    <slot></slot>
  </div>
</template>
<script>
import Title from '../components/Title'

export default {
  components: {
    Title
  },
  props: {
    label: String
  }
}
</script>
