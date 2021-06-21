<template>
  <ion-modal
    animated
    showBackdrop
    css-class="custom-modal"
    :is-open="isOpened"
    @didDismiss="$emit('onClose')"
  >
    <div
      class="w-full h-full relative pt-20 bg-black flex justify-center items-center"
    >
      <div
        class="bg-transparent absolute top-0 left-0 flex px-8 w-full z-10"
        style="height:90px"
      >
        <!-- close button -->
        <ion-button
          type="button"
          class="relative mr-auto my-auto back-button"
          @click="closeImage"
        >
          <ion-img
            src="/assets/button-icons/close-white.svg"
            className="pointer-events-none"
          />
        </ion-button>
      </div>
      <ion-img :src="imgSrc" class="w-full my-auto" />
    </div>
  </ion-modal>
</template>
<script>
import { IonImg, IonModal } from '@ionic/vue'
export default {
  components: {
    IonImg,
    IonModal
  },
  props: {
    open: Boolean,
    image: String
  },
  data () {
    return {
      isOpened: false
    }
  },
  methods: {
    closeImage () {
      this.$emit('onClose')
    }
  },
  computed: {
    imgSrc () {
      return this.image
    }
  },
  watch: {
    open: function (newValue) {
      this.isOpened = newValue
    }
  }
}
</script>
<style scoped>
.back-button {
  --background: transparent;
  --border: none;
  --box-shadow: none;
  left: -1rem;
}
</style>
