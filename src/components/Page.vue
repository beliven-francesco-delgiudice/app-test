<template>
  <div
    :class="[
      withMargin ? 'px-8' : '',
      'min-h-screen gradient-background pt-20'
    ]"
  >
    <Title
      v-if="label"
      :titleClass="[
        withMargin ? '' : 'px-8',
        'pb-4 text-black font-helvetica-bold text-28 block'
      ]"
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
    label: String,
    withMargin: Boolean
  }
}
</script>
