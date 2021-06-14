<template>
  <div :class="[divClass, 'w-full flex justify-between']">
    <div @click="documentAction" class="flex justify-start items-center">
      <square-container
        rounded="8"
        :bgClass="imageBackround"
        squareSize="44"
        classes="pointer-events-none mr-2 flex"
      >
        <ion-img :src="image" class="m-auto" />
      </square-container>
      <div class="flex flex-col justify-between items-start">
        <span
          class="font-helvetica-medium text-16 text-black spacing-5 line-28"
          >{{ document.label }}</span
        >
        <span class="font-helvetica text-14 text-grey spacing-44 line-24">{{
          document.size
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
import { IonImg } from '@ionic/vue'

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
    openDocumentMenu () {
      alert('document menu')
    }
  }
}
</script>
