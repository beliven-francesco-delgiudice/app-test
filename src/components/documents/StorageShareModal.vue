<template>
  <div
    class="fixed top-0 left-0 w-full h-full flex justofy-center items-center"
  >
    <div
      class="absolute top-0 left-0 bg-black opacity-50 w-full h-full pointer-events-none"
      style="z-index: 10;"
    ></div>
    <form
      class="relative z-10 bg-white rounded-8 p-6 mx-auto "
      style="min-width:300px; max-width:300px"
      @submit="saveName"
    >
      <span
        class="font-helvetica-bold text-20 spacing-22 line-30 text-black mb-1 block"
        >Share {{ doc.type }} with</span
      >
      <ion-input
        type="email"
        placeholder="Email"
        v-model="email"
        class="font-helvetica text-16 spacing-5 line-28 text-black my-2"
        required
      ></ion-input>
      <div class="mt-2 w-full flex justify-end items-center">
        <div
          class="bg-white
            rounded-12 flex justify-center items-center height-56 w-auto px-2 ml-auto normal-case mr-4 shadow-none
          "
          @click="cancel"
        >
          <span
            class="font-helvetica-medium text-black text-16 spacing-5 line-24 m-auto normal-case "
            >Cancel</span
          >
        </div>
        <ion-button
          type="submit"
          class="rounded-12 flex justify-center items-center height-56 w-auto px-2 normal-case"
        >
          <span
            class="font-helvetica-medium text-white text-16 spacing-5 line-24 m-auto normal-case"
            >Share</span
          >
        </ion-button>
      </div>
    </form>
  </div>
</template>

<script>
import { IonButton, IonInput } from '@ionic/vue'
import messages from '@/messages'
import urls from '@/urls'
export default {
  components: {
    IonButton,
    IonInput
  },
  props: {
    doc: Object
  },
  data () {
    return {
      email: ''
    }
  },
  methods: {
    cancel () {
      this.$emit('onClose')
    },
    async saveName (e) {
      e.preventDefault()
      if (this.email && this.email.length && this.doc.id) {
        const data = { email: this.email, file: this.doc.id }
        try {
          const shareResults = await this.$http({
            method: 'POST',
            url: urls.storage.share,
            data,
            loader: true
          })
          console.log(shareResults)
          this.$toast({
            message: messages.success.shared,
            color: 'dark'
          })
        } catch (e) {
          if (e && e.response && e.response.status === 404) {
            this.$toast({
              message: messages.errors.notInternal,
              color: 'danger',
              duration: 6000
            })
          } else if (e && e.response && e.response.data) {
            this.$toast({
              message: e.response.data,
              color: 'danger'
            })
          }
        }
      } else {
        console.error('No folder in route')
        this.$toast({
          message: messages.errors.folderDetail,
          color: 'danger'
        })
      }
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
