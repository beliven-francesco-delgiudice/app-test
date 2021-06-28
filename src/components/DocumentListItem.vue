<template>
  <div :class="[divClass, 'w-full flex justify-between']">
    <div @click="documentAction" class="flex justify-start items-center">
      <square-container
        rounded="8"
        :bgClass="imageBackround"
        squareSize="44"
        :classes="[small ? 'mr-2 ' : 'mr-4 ', ' pointer-events-none flex']"
      >
        <ion-img :src="image" class="m-auto" />
      </square-container>
      <div class="flex flex-col justify-between items-start">
        <span
          class="font-helvetica-medium text-16 text-black spacing-5 line-28"
          >{{
            updatedDocument.label ||
              updatedDocument.name ||
              updatedDocument.title
          }}</span
        >
        <span class="font-helvetica text-14 text-grey spacing-44 line-24">{{
          updatedDocument.size
        }}</span>
      </div>
    </div>
    <div @click="openDocumentMenu" class="height-44 w-44 flex">
      <ion-img
        src="/assets/button-icons/threedots.svg"
        class="width-4 height-18 my-auto ml-auto"
      />
    </div>
  </div>
</template>

<script>
import SquareContainer from './containers/SquareContainer.vue'
import { IonImg, actionSheetController } from '@ionic/vue'

export default {
  components: { SquareContainer, IonImg },
  props: {
    bgClass: String,
    classes: [String, Array],
    document: Object
  },
  computed: {
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
    documentAction () {
      if (this.document.type === 'folder') {
        this.$router.push('/documents/folders/' + this.document.id)
      }
      //open document through plugin
      alert(this.document.link)
    },
    async openDocumentMenu () {
      const actionMenu = await actionSheetController.create({
        header: this.document.label,
        animated: true,
        cssClass: 'document-action-menu',
        buttons: [
          {
            text: 'Open',
            handler: () => {
              console.log('open')
            }
          },
          {
            text: 'Download',
            handler: () => {
              console.log('download')
            }
          },
          {
            text: 'Share',
            handler: () => {
              console.log('Share clicked')
            }
          }
        ]
      })
      await actionMenu.present()
      const { role } = await actionMenu.onDidDismiss()
      console.log('onDidDismiss resolved with role', role)
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
