<template>
  <div
    :class="[
      withMargin ? 'px-8' : '',
      noTopSpace ? '' : 'pt-20',
      'min-h-screen gradient-background'
    ]"
  >
    <Title
      v-if="label"
      :titleClass="[
        withMargin ? '' : 'px-8',
        'pb-4 text-black font-helvetica-bold text-28 block'
      ]"
      v-html="label"
    >
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
    withMargin: Boolean,
    noTopSpace: Boolean
  }
}
</script>
