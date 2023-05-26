<template>
  <div
    class="fixed top-0 left-0 w-full h-full flex justify-center items-center z-20"
  >
    <div
      class="absolute top-0 left-0 bg-black opacity-50 w-full h-full"
      style="z-index: 10;"
      @click="cancel"
    ></div>
    <div
      class="relative z-10 bg-white rounded-8 p-6 mx-auto "
      style="min-width:300px; max-width:300px"
    >
      <div class="flex flex-row justify-between w-full mb-2">
        <span
          class="font-helvetica-bold text-20 spacing-22 line-30 text-black block"
        >
          app Support
        </span>
        <ion-button
          type="button"
          class="relative ml-auto back-button"
          style="top:-0.5rem;left:0.5rem;"
          @click="cancel"
        >
          <ion-img
            src="/assets/button-icons/close.svg"
            className="pointer-events-none"
          />
        </ion-button>
      </div>
      <p class="font-helvetica text-grey text-14 spacing-44 line-24 mb-2">
        Contact
        <a href="appsupport@corporate.com" title="" class="text-black">
          appsupport@corporate.com
        </a>
        for anything related to the app: Account activation, login or
        navigation problems, material updates requests. <br />
        When contacting
        <a href="appsupport@corporate.com" title="" class="text-black">
          appsupport@corporate.com
        </a>
        for any kind of problem always remember to attach screenshot, specify
        browser and operating system.
      </p>
      <div class="mt-4 w-full flex justify-center items-center">
        <div class="relative">
          <a
            href="mailto:appsupport@corporate.com"
            title=""
            class="absolute top-0 left-0 w-full h-full z-10"
          >
          </a>
          <ion-button
            class="rounded-12 flex justify-center items-center height-56 w-auto normal-case"
            style="--padding-start: 0.5rem; --pading-right:0.5rem"
          >
            <ion-img
              src="/assets/button-icons/mail-white.svg"
              className="width-24 height-24 pointer-events-none"
            />
            <span
              class="font-helvetica-medium text-white text-16 spacing-5 line-24 ml-4 normal-case"
            >
              app Support
            </span>
          </ion-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { IonButton } from '@ionic/vue'

export default {
  components: {
    IonButton
  },

  methods: {
    cancel () {
      this.$emit('onClose')
    }
  }
}
</script>

<style scoped>
.native-input.sc-ion-input-md,
input {
  padding: 0 !important;
}
.shadow-none button {
  box-shadow: none !important;
}
</style>
