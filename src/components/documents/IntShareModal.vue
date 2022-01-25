<template>
  <div
    class="fixed top-0 left-0 w-full h-full flex justify-center items-center z-10"
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
      <span class="font-helvetica text-12 spacing-38 line-24 text-grey">
        Write the full email or search and select one from the list below.
        Clicking again a selected user will unselect him.
      </span>
      <ion-input
        required
        type="email"
        placeholder="Search or add email"
        class="font-helvetica text-16 spacing-5 line-28 text-black my-2"
        v-model="email"
      ></ion-input>

      <div v-if="updatedList && updatedList.length" class="flex flex-col">
        <span class="font-helvetica text-12 spacing-38 line-24 text-grey">
          Select a user:
        </span>
        <div class="flex flex-col" style="max-height:200px;overflow-y:auto;">
          <div
            v-for="user in updatedList"
            :key="user"
            class="flex flex-row p-2 font-helvetica text-14 spacing-44 line-24 rounded-6 w-full"
            :class="selected === user ? 'bg-black text-white' : ''"
            style="border-bottom: 1px solid #ededed;"
            @click="selectUser(user)"
          >
            {{ user }}
          </div>
        </div>
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
    doc: Object,
    isStorage: Boolean
  },

  computed: {
    recipient () {
      return this.selected && this.selected.length ? this.selected : this.email
    },

    updatedList () {
      if (this.selected && this.selected.length) {
        const updatedList = this.list.map(user => user)
        const index = this.list.indexOf(this.selected)
        if (index > -1) {
          updatedList.splice(index, 1)
        }
        updatedList.unshift(this.selected)
        return updatedList
      }
      return this.list
    }
  },

  data () {
    return {
      email: '',
      selected: '',
      list: []
    }
  },

  methods: {
    cancel () {
      this.$emit('onClose')
    },

    async getList () {
      try {
        const list = await this.$http({
          method: 'GET',
          url: urls.users.shareList,
          params: {
            search: this.email
          }
        })
        if (list && list.length) {
          this.list = list
        }
      } catch (e) {
        console.error(e)
        this.$toast({
          message: messages.errors.shareList,
          color: 'danger'
        })
      }
    },

    async saveName (e) {
      this.email = this.selected
      e.preventDefault()
      if (this.recipient && this.recipient.length && this.doc.id) {
        const data = { email: this.recipient, file: this.doc.id }
        let endpoint = urls.documents.share
        if (this.doc.type === 'folder') {
          endpoint = urls.folders.share
          delete data.file
          data.folder = this.doc.id
        }
        if (this.isStorage) {
          endpoint = urls.documents.storage_share
        }
        try {
          await this.$http({
            method: 'POST',
            url: endpoint,
            data,
            loader: true
          })
          this.$toast({
            message: messages.success.shared + ' ' + this.recipient,
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
    },

    selectUser (user) {
      if (this.selected !== user) {
        this.selected = user
        this.email = user
      } else {
        this.selected = ''
        if (this.email === user) {
          this.email = ''
        }
      }
    }
  },

  watch: {
    email: function (val) {
      if (val && val.length > 3) {
        this.getList()
      }
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
