<template>
  <div
    :class="!modelValue || 'selected'"
    class="mb-2 flex items-start checkbox cursor-pointer"
    @click="onClick"
  >
    <div class="square rounded-4 mr-2 width-24 height-24 relative flex">
      <ion-img src="/assets/button-icons/check-white.svg" class="check" />
    </div>
    <slot name="label">
      <span
        class="block text-black font-helvetica-normal text-14 spacing-4 line-18"
      >
        {{ label }}<span v-if="required" class="text-red">*</span>
      </span>
    </slot>
  </div>
</template>

<script>
import { IonImg } from '@ionic/vue'
export default {
  name: 'CustomCheckbox',

  components: {
    IonImg
  },

  props: {
    required: {
      type: Boolean
    },

    modelValue: {
      type: Boolean
    },

    label: {
      type: String
    }
  },

  methods: {
    onClick (e) {
      e.preventDefault()
      this.$emit('update:modelValue', !this.modelValue)
    }
  }
}
</script>
