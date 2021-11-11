<template>
  <div
    class="fixed top-0 left-0 w-full h-full flex justofy-center items-center"
  >
    <div
      class="absolute top-0 left-0 bg-black opacity-50 w-full h-full pointer-events-none"
      style="z-index: 10;"
    ></div>
    <form
      class="relative z-10 bg-white rounded-8 p-6 mx-auto flex flex-col"
      style="min-width:300px; max-width:300px"
      @submit="deleteDoc"
    >
      <span
        class="font-helvetica-bold text-20 spacing-22 line-30 text-black mb-1 block"
        >Are you sure?</span
      >
      <p
        class="w-full font-helvetica text-16 text-mid-dark-grey spacing-1 line-24 mt-2"
      >
        By pressing confirm you will delete
      </p>
      <p
        class="w-full font-helvetica text-16 text-mid-dark-grey spacing-1 line-24 mb-2"
      >
        the {{ type }} "{{ name }}"
      </p>
      <div class="mt-2 w-full flex justify-end items-center">
        <div
          class="bg-white
            rounded-12 flex justify-center items-center height-56 w-auto px-2 ml-auto normal-case mr-4 shadow-none
          "
          @click="cancel"
        >
          <span
            class="font-helvetica-medium text-black text-16 spacing-5 line-24 m-auto normal-case"
            >Cancel</span
          >
        </div>
        <ion-button
          color="secondary"
          type="submit"
          class="bg-red rounded-12 flex justify-center items-center height-56 w-auto px-2 normal-case"
        >
          <span
            class="font-helvetica-medium text-white text-16 spacing-5 line-24 m-auto normal-case bg-red"
            >Confirm</span
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
  computed: {
    name () {
      return this.doc.title
    },
    type () {
      return this.doc.type
    }
  },
  methods: {
    cancel () {
      this.$emit('onClose')
    },
    async deleteDoc (e) {
      e.preventDefault()
      if (this.name && this.name.length && this.doc.id) {
        const deleteResults = await this.$http({
          method: 'GET',
          url: urls.folders.create + '/' + this.doc.id + '/delete',
          loader: true
        })
        console.log(deleteResults)
        this.$router.go()
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

.bg-red button {
  background: #e30513 !important;
}
</style>
