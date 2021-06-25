<template>
  <div class="flex flex-col">
    <div
      :class="[noPadding ? '' : 'px-8', ' flex justify-between items-center']"
    >
      <small-title :label="label" classes="pb-4 mt-8" noPadding />
      <square-container
        v-if="count && count > 0"
        bgClass="bg-light-grey"
        squareSize="24"
        rounded="6"
        classes="flex text-center justify-center items-center mt-2"
      >
        <span class="text-grey font-helvetica-bold text-12">{{ count }}</span>
      </square-container>
    </div>
    <slot></slot>
    <separator v-if="!noSeparator" :withMargin="!noPadding" topMargin />
  </div>
</template>
<script>
import SquareContainer from './containers/SquareContainer.vue'
import Separator from './Separator.vue'
import SmallTitle from './SmallTitle.vue'
export default {
  components: {
    SmallTitle,
    Separator,
    SquareContainer
  },
  props: {
    noSeparator: Boolean,
    label: String,
    noPadding: Boolean,
    count: [String, Number]
  }
}
</script>
