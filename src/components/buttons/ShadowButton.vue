<template>
  <ion-button
    @click="emitClick"
    :class="[bgClass || 'bg-white', 'elevated-shadow rounded-8']"
    :style="computedStyle"
  >
    <slot></slot>
  </ion-button>
</template>
<script>
import { IonButton } from '@ionic/vue'

export default {
  components: {
    IonButton
  },
  props: {
    bgClass: String,
    styles: String,
    square: Boolean
  },
  computed: {
    computedStyle () {
      let style = ''
      if (this.styles) {
        style += this.styles + ' '
      }
      if (this.square) {
        style += 'width:40px;height:40px; '
      }
      return style
    }
  }
}
</script>
