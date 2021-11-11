<template>
  <div>
    <div
      @click="openAdd"
      class="absolute z-10 rounded-8 bg-black width-56 height-56 flex justify-center items-center"
      style="bottom: 92px; right:23px;"
    >
      <ion-img
        src="/assets/button-icons/plus-white.svg"
        class="width-12 height-12 pointer-events-none"
      />
    </div>
    <new-folder-modal
      v-if="isFolderModalOpened"
      :parent="computedParent"
      @onClose="toggleModal('folder')"
    />
    <new-file-modal
      v-if="isUploadModalOpened"
      :parent="computedParent"
      @onClose="toggleModal('file')"
    />
  </div>
</template>
<script>
// import Title from '../Title.vue'
import { IonImg, actionSheetController } from '@ionic/vue'
import NewFolderModal from './NewFolderModal'
import NewFileModal from './NewFileModal'
// import SquareContainer from '../containers/SquareContainer.vue'
export default {
  components: {
    // Title,
    IonImg,
    NewFolderModal,
    NewFileModal
    // IonModal,
    // SquareContainer,
    // IonButton
  },
  props: {
    title: String,
    parent: [Number, String]
  },
  data () {
    return {
      isFolderModalOpened: false,
      isUploadModalOpened: false
    }
  },
  computed: {
    computedParent () {
      return this.parent || null
    }
  },
  methods: {
    toggleModal (action) {
      switch (action) {
        case 'folder':
          this.isFolderModalOpened = !this.isFolderModalOpened
          break

        case 'file':
          this.isUploadModalOpened = !this.isUploadModalOpened
          break
      }
    },
    async openAdd () {
      const actionMenu = await actionSheetController.create({
        header: 'Add to ' + this.title,
        animated: true,
        cssClass: 'document-action-menu',
        buttons: [
          {
            text: 'Create new folder',
            handler: async () => {
              this.toggleModal('folder')
            }
          },
          {
            text: 'Upload file',
            handler: async () => {
              this.toggleModal('file')
            }
          }
        ]
      })
      await actionMenu.present()
    }
  }
}
</script>
<style scoped>
p > p {
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
  letter-spacing: inherit;
  line-height: inherit;
}
</style>
