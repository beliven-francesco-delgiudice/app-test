<template>
  <div class="flex flex-col">
    <small-title :label="label" classes="pb-4 mt-8" :noPadding="noPadding" />
    <slot></slot>
    <separator v-if="!noSeparator" :withMargin="!noPadding" topMargin />
  </div>
</template>
<script>
import Separator from './Separator.vue'
import SmallTitle from './SmallTitle.vue'
export default {
  components: {
    SmallTitle,
    Separator
  },
  props: {
    noSeparator: Boolean,
    label: String,
    noPadding: Boolean
  }
}
</script>
