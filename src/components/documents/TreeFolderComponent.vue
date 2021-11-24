<template>
  <div class="flex flex-col ">
    <div class="flex justify-between items-center py-4 border-b border-grey">
      <div
        @click="toggleExpanded()"
        :class="[
          isExpandable ? '' : 'pointer-events-none',
          'flex justify-start items-center'
        ]"
      >
        <ion-img
          :src="
            `/assets/button-icons/arrow-${isExpanded ? 'down' : 'right'}.svg`
          "
          :class="[
            isExpandable ? '' : 'opacity-0',
            isExpanded ? 'width-17 min-width-17' : 'width-12 min-width-12'
          ]"
        />
      </div>
      <div
        @click="e => emitSelect(e, item)"
        :class="[
          isFolderTheSource ? 'opacity-50 pointer-events-none' : '',
          'flex-grow flex justify-between items-center'
        ]"
      >
        <span
          class="font-helvetica-bold text-20 spacing-22 line-30 ml-2 text-black"
          >{{ item.name }}
        </span>
        <div
          :class="[
            isSelected ? 'border-black' : 'border-grey',
            'bg-white width-24 height-24 rounded-full border p-1'
          ]"
        >
          <div
            :class="[
              isSelected ? 'bg-black' : 'bg-white',
              'rounded-full w-full h-full pointer-events-none'
            ]"
          ></div>
        </div>
      </div>
    </div>
    <div v-if="isExpanded" class="flex flex-col h-auto pl-8">
      <TreeFolderComponent
        v-for="(subitem, j) in item.folders"
        :key="j"
        :item="subitem"
        :folder="folder"
        :source="source"
        @selectFolder="item => emitSelect(null, item)"
      />
    </div>
  </div>
</template>
<script>
import { IonImg } from '@ionic/vue'
// import SquareContainer from './containers/SquareContainer.vue'
export default {
  name: 'TreeFolderComponent',
  components: {
    IonImg
    // SquareContainer
  },
  props: {
    item: Object,
    folder: Object,
    source: Object,
    classes: [String, Array]
  },
  data () {
    return {
      isExpanded: false
    }
  },
  computed: {
    isFolderTheSource () {
      if (
        this.source &&
        this.source.type === 'folder' &&
        this.source.id === this.item.id
      ) {
        return true
      }
      return false
    },
    isExpandable () {
      if (this.item && this.item.folders && this.item.folders.length) {
        return true
      }
      return false
    },
    isSelected () {
      return this.folder ? this.folder.id === this.item.id : false
    }
  },
  methods: {
    emitSelect (e, item) {
      if (e && e.target) {
        e.stopPropagation()
      }
      const folderToEmit = item || this.item
      this.$emit('selectFolder', folderToEmit)
    },
    toggleExpanded () {
      this.isExpanded = !this.isExpanded
    }
  }
}
</script>
