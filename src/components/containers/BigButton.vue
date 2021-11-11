<template>
  <ion-button
    :type="type || 'button'"
    :disabled="isDisabled"
    :class="[
      bgClass || 'bg-black',
      'small-shadow rounded-12 flex justify-center items-center height-56 w-full normal-case'
    ]"
    :style="styles || ''"
    @click="emitClick"
  >
    <span
      v-if="label && label.length"
      class="font-helvetica-medium text-white text-16 spacing-5 line-24 m-auto normal-case"
      >{{ label }}</span
    >
    <slot></slot>
  </ion-button>
</template>
<script>
import { IonButton } from '@ionic/vue'
export default {
  emits: ['onClick'],
  components: {
    IonButton
  },
  props: {
    bgClass: String,
    styles: String,
    square: Boolean,
    disabled: Boolean,
    type: String,
    label: String
  },
  computed: {
    isDisabled () {
      console.log('disabled', this.disabled)
      return this.disabled
    }
  },
  methods: {
    emitClick () {
      this.$emit('onClick')
    }
  }
}
</script>
