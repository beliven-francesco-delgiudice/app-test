<template>
  <ion-modal
    animated
    showBackdrop
    css-class="custom-modal"
    :is-open="isOpened"
    @didDismiss="$emit('onClose')"
  >
    <div class="w-full h-full relative pt-20 gradient-background">
      <div
        class="bg-transparent absolute top-0 left-0 flex px-8 w-full z-10"
        :style="
          isIos
            ? 'margin-top:35px;height:70px;min-height:70px;'
            : 'height:90px;min-height:90px;'
        "
      >
        <!-- close button -->
        <ion-button
          type="button"
          class="relative mr-auto my-auto back-button"
          @click="emitClose"
        >
          <ion-img
            src="/assets/button-icons/close.svg"
            className="pointer-events-none"
          />
        </ion-button>
        <span class="text-grey font-helvetica text-12 inline ml-auto my-auto"
          >You are moving "{{ computedName }}"</span
        >
      </div>
      <tree-component :source="doc" />
    </div>
  </ion-modal>
</template>

<script>
import { IonImg, IonModal, IonButton } from '@ionic/vue'
import { Capacitor } from '@capacitor/core'
import TreeComponent from './TreeComponent'
export default {
  components: {
    IonButton,
    IonImg,
    IonModal,
    TreeComponent
  },
  props: {
    doc: Object,
    open: Boolean
  },
  data () {
    return {
      isOpened: false
    }
  },
  computed: {
    computedName () {
      const name = this.doc.title || this.doc.name
      if (name && name.length > 20) {
        const firstPart = name.slice(0, 5)
        const secondPart = name.slice(-5)
        return firstPart + '...' + secondPart
      }
      return name || ''
    },
    isIos () {
      if (
        Capacitor &&
        Capacitor.getPlatform() &&
        Capacitor.getPlatform() === 'ios'
      ) {
        return true
      }
      return false
    }
  },

  methods: {
    emitClose () {
      this.$emit('onClose')
    }
  },
  watch: {
    open: function (value) {
      this.isOpened = value
    }
  }
}
</script>
<style scoped>
.custom-modal .ion-page {
  height: 100%;
  --height: 100%;
}
</style>
