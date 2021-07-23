<template>
  <Title
    :titleClass="[
      classes || '',
      noPadding ? '' : 'px-8',
      ' text-black font-helvetica-bold text-20 block'
    ]"
  >
    {{ label }}
  </Title>
</template>

<script>
import Title from '../components/Title'
export default {
  props: {
    label: String,
    classes: [String, Array],
    noPadding: Boolean
  },
  components: {
    Title
  }
}
</script>
