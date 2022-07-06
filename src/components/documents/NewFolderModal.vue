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
      @submit="createFolder"
    >
      <span
        class="font-helvetica-bold text-20 spacing-22 line-30 text-black mb-1 block"
        >Create new folder</span
      >
      <ion-input
        type="text"
        placeholder="Untitled folder"
        v-model="name"
        class="input-filled font-helvetica text-16 spacing-5 line-28 text-black mt-2 mb-4 pb-4"
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
          class="bg-black
            rounded-12 flex justify-center items-center height-56 w-auto normal-case px-2'
          "
        >
          <span
            class="font-helvetica-medium text-white text-16 spacing-5 line-24 m-auto normal-case"
            >Create</span
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
    parent: [String, Number]
  },
  data () {
    return {
      name: ''
    }
  },
  computed: {
    computedParent () {
      return this.parent
    }
  },
  methods: {
    cancel () {
      this.$emit('onClose')
    },
    async createFolder (e) {
      e.preventDefault()
      if (this.name && this.name.length) {
        try {
          const createResults = await this.$http({
            method: 'POST',
            url: urls.folders.create,
            data: {
              name: this.name,
              type: 'my',
              parent: this.parent || null
            },
            loader: true
          })
          console.log(createResults)
          this.$router.go()
        } catch (e) {
          console.error(e)
          if (e && e.response && e.response.status === 400) {
            this.$toast({
              message: messages.errors.furtherFolders,
              color: 'danger'
            })
            this.$emit('onClose')
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
