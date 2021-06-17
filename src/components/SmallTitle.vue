<template>
  <Title
    :titleClass="[
      classes || '',
      ' px-8 text-black font-helvetica-bold text-20 block'
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
    classes: String
  },
  components: {
    Title
  }
}
</script>
