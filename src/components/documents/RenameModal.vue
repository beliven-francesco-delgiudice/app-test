<template>
  <div
    class="fixed top-0 left-0 w-full h-full flex justofy-center items-center"
  >
    <div
      class="absolute top-0 left-0 bg-black opacity-50 w-full h-full pointer-events-none"
      style="z-index: 10;"
    ></div>
    <form class="relative z-10 bg-white rounded-8 p-6 mx-auto ">
      <span
        class="font-helvetica-bold text-20 spacing-22 line-30 text-black mb-1 block"
        >Rename folder</span
      >
      <ion-input
        type="text"
        placeholder="New name"
        v-model="name"
        class="font-helvetica text-16 spacing-5 line-28 text-black"
        required
      ></ion-input>
      <div class="mt-2 w-full flex justify-end items-center">
        <div
          class="bg-white
            rounded-12 flex justify-center items-center height-56 w-full normal-case mr-4 shadow-none
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
            rounded-12 flex justify-center items-center height-56 w-full normal-case'
          "
          @click="saveName"
        >
          <span
            class="font-helvetica-medium text-white text-16 spacing-5 line-24 m-auto normal-case"
            >Save</span
          >
        </ion-button>
      </div>
    </form>
  </div>
</template>

<script>
import { IonButton } from '@ionic/vue'
import messages from '@/messages'
import urls from '@/urls'
export default {
  components: {
    IonButton
  },
  props: {
    doc: Object
  },
  data () {
    return {
      name: this.doc.name
    }
  },
  methods: {
    cancel () {
      this.$emit('onClose')
    },
    async saveName () {
      if (this.name && this.name.length && this.doc.id) {
        const renameResults = await this.$app.$http({
          method: 'POST',
          url: urls.folders.create + '/' + this.doc.id,
          data: {
            name: this.name
          },
          loader: true
        })
        console.log(renameResults)
      } else {
        console.error('No folder in route')
        this.$toast({
          message: messages.errors.folderDetail,
          color: 'danger'
        })
        this.$emit('onClose')
      }
    }
  },
  created () {
    console.log(this.doc)
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
