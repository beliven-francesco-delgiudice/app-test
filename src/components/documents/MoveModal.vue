<template>
  <ion-modal
    animated
    showBackdrop
    css-class="custom-modal"
    :is-open="isOpened"
    @didDismiss="$emit('onClose')"
  >
    <div class="w-full h-full relative pt-20 gradient-background">
      <div
        class="bg-transparent absolute top-0 left-0 flex px-8 w-full z-10"
        :style="
          isIos
            ? 'margin-top:35px;height:70px;min-height:70px;'
            : 'height:90px;min-height:90px;'
        "
      >
        <!-- close button -->
        <ion-button
          type="button"
          class="relative mr-auto my-auto back-button"
          @click="emitClose"
        >
          <ion-img
            src="/assets/button-icons/close.svg"
            className="pointer-events-none"
          />
        </ion-button>
      </div>
      <form class="flex h-full flex-col justify-between" @submit="onSubmit">
        <div class="flex flex-col px-8 h-full">
          <Title titleClass="pb-4 text-black font-helvetica-bold text-28 block">
            Choose destination
          </Title>
          <div class="h-full flex flex-col overflow-y-scroll">
            <move-folder-component
              v-for="(item, i) in filesystem"
              :key="i"
              :item="item"
              :folder="folder"
              v-on:activate="selectFolder"
            >
              <move-folder-component
                v-for="(subitem, j) in item.folders"
                :key="j"
                :item="subitem"
                :folder="folder"
                v-on:activate="selectFolder"
                ><move-folder-component
                  v-for="(subitemsub, k) in subitem.folders"
                  :key="k"
                  :item="subitemsub"
                  :folder="folder"
                  v-on:activate="selectFolder"
              /></move-folder-component>
            </move-folder-component>
          </div>
          <div class="w-full px-8 pb-4 pt-2 border-t border-grey">
            <big-button type="submit" :disabled="!folder" label="Move" />
          </div>
        </div>
      </form>
    </div>
  </ion-modal>
</template>
<script>
import Title from '../Title.vue'
import BigButton from '../containers/BigButton.vue'
import MoveFolderComponent from './MoveFolderComponent.vue'
import { IonImg, IonModal, IonButton } from '@ionic/vue'
import { Capacitor } from '@capacitor/core'
export default {
  components: {
    Title,
    BigButton,
    IonButton,
    IonImg,
    IonModal,
    MoveFolderComponent
  },
  props: {
    document: Object,
    open: Boolean
  },
  data () {
    return {
      isOpened: false,
      folder: 0,
      filesystem: []
    }
  },
  computed: {
    isIos () {
      if (
        Capacitor &&
        Capacitor.getPlatform() &&
        Capacitor.getPlatform() === 'ios'
      ) {
        return true
      }
      return false
    }
  },

  methods: {
    checkSelected (array, id) {
      for (let i = 0; i < array.length; i++) {
        const item = array[i]
        if (item.id === id) {
          item.selected = true
        } else if (item.folders && item.folders.length) {
          this.checkSelected(item.folders)
        }
      }
    },
    selectFolder (folderID) {
      this.folder = folderID
      console.log('selectFolder', folderID)
    },
    getFileSystem () {
      const filesystem = [
        {
          id: 1,
          name: 'Cartella 1',
          folders: [
            {
              id: 11,
              name: 'Cartella 1A'
            },
            {
              id: 12,
              name: 'Cartella 1B',
              folders: [
                {
                  id: 121,
                  name: 'Cartella 1B1'
                }
              ]
            }
          ]
        },
        {
          id: 2,
          name: 'Cartella 2'
        }
      ]
      this.filesystem = filesystem.map(i => i)
    },
    emitClose () {
      this.$emit('onClose')
    },
    onSubmit (e) {
      e.preventDefault()
    }
  },
  watch: {
    open: function (value) {
      this.isOpened = value
      if (value) {
        this.getFileSystem()
      }
    }
  }
}
</script>
<style scoped></style>
