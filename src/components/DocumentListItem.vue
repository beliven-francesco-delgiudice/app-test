<template>
  <div
    :class="[
      divClass,
      'w-full flex justify-between items-center py-2 rounded-8'
    ]"
  >
    <div
      @click="documentAction"
      class="flex justify-start items-center flex-grow"
    >
      <square-container
        rounded="8"
        :bgClass="imageBackround"
        squareSize="44"
        :classes="[small ? 'mr-2 ' : 'mr-4 ', ' pointer-events-none flex']"
      >
        <ion-img :src="image" class="m-auto" />
      </square-container>
      <div
        class="flex flex-col justify-between items-start pointer-events-none"
      >
        <span
          class="font-helvetica-medium text-16 text-black spacing-5 line-28"
          >{{
            updatedDocument.label ||
              updatedDocument.name ||
              updatedDocument.title
          }}</span
        >
        <span class="font-helvetica text-14 text-grey spacing-44 line-24">{{
          updatedDocument.size || updatedDocument.subtitle
        }}</span>
      </div>
    </div>
    <div
      v-if="actions && actions.length"
      @click="openDocumentMenu"
      class="height-44 w-44 flex pl-4"
    >
      <ion-img
        src="/assets/button-icons/threedots.svg"
        class="width-4 height-18 my-auto ml-auto"
      />
    </div>
  </div>
  <rename-modal
    v-if="isRenameModalOpen"
    :doc="document"
    @onClose="closeModal('rename')"
  />
</template>

<script>
import SquareContainer from './containers/SquareContainer.vue'
import { IonImg, actionSheetController } from '@ionic/vue'
import { Capacitor } from '@capacitor/core'
import RenameModal from './documents/RenameModal.vue'

export default {
  components: { SquareContainer, IonImg, RenameModal },
  props: {
    bgClass: String,
    classes: [String, Array],
    document: Object,
    small: Boolean,
    actions: Array,
    type: String
  },
  data () {
    return {
      action: null,
      isRenameModalOpen: false,
      isDeleteModalOpen: false
    }
  },
  computed: {
    isApp () {
      return this.checkIsApp(Capacitor.getPlatform())
    },
    divClass () {
      return `${this.bgClass || 'bg-white'} ${this.classes || ''}`
    },
    imageBackround () {
      if (this.document.type === 'folder') {
        return 'bg-light-grey2'
      }
      return 'bg-light-red'
    },
    image () {
      if (this.document.type === 'folder') {
        return '/assets/button-icons/folder.svg'
      }
      return '/assets/button-icons/pdf.svg'
    },
    updatedDocument () {
      return this.document
    }
  },
  methods: {
    async getAppInfo () {
      return await this.$device.getAppInfo()
    },
    closeModal (action) {
      switch (action) {
        case 'rename':
          this.isRenameModalOpen = false
          break

        case 'delete':
          this.isDeleteModalOpen = false
          break
        default:
          break
      }
    },
    getDocumentPath (document) {
      let path = ''
      if (document.url) {
        path = document.url
      } else if (document.link) {
        path = document.link
      } else if (document.file) {
        path = document.file
      } else if (document.path) {
        path = document.path
      }
      return path
    },
    openFile (doc) {
      const path = this.getDocumentPath(doc)
      var link = document.createElement('a')
      link.target = '_blank'
      link.href = path
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    documentAction () {
      if (this.document && this.document.type === 'folder') {
        this.$router.push(
          '/documents/folder/' + this.document.id + '?type=' + this.type
        )
      } else {
        this.openDocumentMenu()
      }
    },
    openActionModal (action) {
      this.action = action
      this.isActionModalOpen = true
    },
    async openDocumentMenu () {
      const buttonsArray = []
      const actionsList = this.actions ? this.actions.map(i => i) : []
      for (let i = 0; i < actionsList.length; i++) {
        switch (actionsList[i]) {
          case 'rename':
            buttonsArray.push({
              text: 'Rename',
              handler: async () => {
                this.openActionModal('rename')
              }
            })
            break
          default:
            break
        }
      }

      if (this.document.type !== 'folder') {
        buttonsArray.push({
          text: 'Open',
          handler: async () => {
            if (this.isApp) {
              const path = this.getDocumentPath(this.updatedDocument)
              try {
                await this.$loading.show()
                await this.$docviewer(path, this.updatedDocument.title)
              } catch (e) {
                console.error(e)
                this.$toast({
                  message: 'Cannot open document',
                  color: 'danger'
                })
              }
              await this.$loading.hide()
            } else {
              this.openFile(this.updatedDocument)
            }
          }
        })

        buttonsArray.push({
          text: 'Download',
          handler: async () => {
            if (this.isApp) {
              const path = this.getDocumentPath(this.updatedDocument)
              try {
                await this.$loading.show()
                await this.$docsaver(path, this.updatedDocument.title)
                await this.$loading.hide()
                this.$toast({
                  message: 'Document successfully saved in "Documents"',
                  color: 'dark'
                })
              } catch (e) {
                await this.$loading.hide()
                console.log(e)
                this.$toast({
                  message: 'Cannot download document',
                  color: 'danger'
                })
              }
            } else {
              this.openFile(this.updatedDocument)
            }
          }
        })
      }

      const actionMenu = await actionSheetController.create({
        header: this.document.label,
        animated: true,
        cssClass: 'document-action-menu',
        buttons: buttonsArray
      })
      await actionMenu.present()
      // const { role } = await actionMenu.onDidDismiss()
      // console.debug('onDidDismiss resolved with role', role)
    }
  }
}
</script>

<style>
.document-action-menu {
  --background: white;
}
.document-action-menu .action-sheet-group {
  border-radius: 24px 24px 0 0;
  padding-left: 2rem;
  padding-right: 2rem;
}

.document-action-menu .action-sheet-title {
  font-family: 'Helvetica Neue', sans-serif;
  font-weight: normal;
  letter-spacing: 0.025em;
  color: #707273;
  font-size: 16px;
  border-bottom: 1px solid #ededed;
  padding: 1.5rem 0 1.5rem 0;
  height: auto;
  line-height: 16px;
  margin-bottom: 1rem;
}

.document-action-menu button {
  padding: 1.5rem 0 1.5rem 0 !important;
  margin-bottom: 0.5rem !important;
  height: auto !important;
}
.document-action-menu .action-sheet-group > button:last-child {
  margin-bottom: 1.5rem !important;
}
.document-action-menu button > span {
  font-family: 'Helvetica Neue', sans-serif;
  font-weight: 500;
  letter-spacing: 0.025em;
  font-size: 16px;
  color: #1c1c1b;
}
</style>
