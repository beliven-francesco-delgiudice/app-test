<template>
  <form class="flex h-full flex-col justify-between" @submit="onSubmit">
    <div class="flex flex-col px-8 h-full">
      <Title titleClass="pb-4 text-black font-helvetica-bold text-28 block">
        Choose destination: {{ destination }}
      </Title>
      <div class="h-full flex flex-col overflow-y-scroll">
        <tree-folder-component
          v-for="(item, i) in tree"
          :key="i"
          :item="item"
          :source="source"
          :folder="folder"
          @selectFolder="selectFolder"
        />
        <div @click="selectFolder(null)" class="flex h-full"></div>
      </div>
      <div class="w-full px-8 pb-4 pt-2 border-t border-grey">
        <big-button type="submit" label="Move" />
      </div>
    </div>
  </form>
</template>
<script>
import Title from '../Title.vue'
import BigButton from '../containers/BigButton.vue'
import TreeFolderComponent from './TreeFolderComponent'
import messages from '@/messages'
import urls from '@/urls'
export default {
  components: {
    Title,
    BigButton,
    TreeFolderComponent
  },
  props: {
    source: Object
  },
  data () {
    return {
      isOpened: false,
      folder: undefined,
      tree: []
    }
  },
  computed: {
    destination () {
      return this.folder && this.folder.name ? this.folder.name : 'My docs'
    }
  },

  methods: {
    async getFileSystem () {
      try {
        const treeResults = await this.$http({
          method: 'GET',
          url: urls.folders.list
        })
        this.tree = treeResults
      } catch (e) {
        console.error(e)
        this.$toast({
          message: messages.errors.documents,
          color: 'danger'
        })
      }
    },
    selectFolder (selectedFolder) {
      this.folder = selectedFolder
    },
    async onSubmit (e) {
      e.preventDefault()
      let endpoint = ''
      let moveObject = {}
      if (this.source.type === 'folder') {
        endpoint = urls.folders.move
        moveObject.destination = this.folder ? this.folder.id : null
        moveObject.folder = this.source.id
      } else {
        endpoint = urls.documents.move
        moveObject.folder = this.folder ? this.folder.id : null
        moveObject.file = this.source.id
      }
      try {
        const moveResults = await this.$http({
          method: 'POST',
          url: endpoint,
          data: moveObject
        })
        console.log(moveResults)
        this.$router.go()
      } catch (e) {
        console.error(e)
        if (
          this.source.type === 'folder' &&
          e &&
          e.response &&
          e.response.data
        ) {
          this.$toast({
            message: e.response.data,
            color: 'danger'
          })
        } else {
          this.$toast({
            message: messages.errors.documents,
            color: 'danger'
          })
        }
      }
    }
  },
  mounted () {
    this.getFileSystem()
  }
}
</script>
