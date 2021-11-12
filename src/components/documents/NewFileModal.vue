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
      @submit="uploadFile"
    >
      <span
        class="font-helvetica-bold text-20 spacing-22 line-30 text-black mb-1 block"
        >Upload new file</span
      >
      <ion-input
        type="text"
        placeholder="Untitled file"
        v-model="name"
        class="font-helvetica text-16 spacing-5 line-28 text-black mt-2 pb-4"
      ></ion-input>
      <div
        class="relative w-full bg-white border-2 border-dashed border-grey rounded-8 flex flex-col justify-center items-center mt-2 mb-8 py-4 px-2"
      >
        <ion-input
          id="fileInput"
          type="file"
          placeholder=""
          @change="previewFiles"
          accept="application/pdf,application/vnd.ms-excel"
          class="font-helvetica text-16 spacing-5 line-28 text-black absolute w-full h-full top-0 left-0 opacity-0"
          required
        ></ion-input>
        <ion-img
          src="/assets/button-icons/folder.svg"
          class="pointer-events-none m-auto"
        />
        <span
          class="text-center mx-auto font-helvetica text-16 text-mid-dark-grey spacing-1 line-24 mt-2 px-2 block"
          style="word-break: break-all;"
          >{{ file && file.name ? file.name : '' }}</span
        >
      </div>

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
          :disabled="!file"
          type="submit"
          class="bg-black
            rounded-12 flex justify-center items-center height-56 w-auto normal-case px-2'
          "
        >
          <span
            class="font-helvetica-medium text-white text-16 spacing-5 line-24 m-auto normal-case"
            >Upload</span
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
      name: '',
      file: null
    }
  },
  computed: {
    computedParent () {
      return this.parent || null
    }
  },
  methods: {
    cancel () {
      this.$emit('onClose')
    },
    previewFiles (event) {
      const eventFile = event.target.files[0]
      this.file = eventFile
      if (!this.name || !this.name.length) {
        this.name = eventFile.name
      }
    },
    async uploadFile (e) {
      e.preventDefault()
      if (this.name && this.name.length) {
        try {
          const formData = new FormData()
          formData.append('name', this.name)
          formData.append('file', this.file)
          formData.append('parent', this.computedParent)
          const uploadResults = await this.$http({
            method: 'POST',
            url: urls.documents.upload,
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            loader: true
          })
          console.log(uploadResults)
          this.$router.go()
        } catch (e) {
          console.error(e)
        }
      } else {
        console.error('No file found')
        this.$toast({
          message: messages.errors.fileUpload,
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
