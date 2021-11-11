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
          :class="[isExpandable ? '' : 'opacity-0', 'width-22']"
        />
        <span
          class="font-helvetica-bold text-20 spacing-22 line-30 ml-2 text-black"
          >{{ item.name }}
        </span>
      </div>
      <div
        @click="emitSelect(item.id)"
        class="flex-grow flex justify-end items-center"
      >
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
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { IonImg } from '@ionic/vue'
// import SquareContainer from './containers/SquareContainer.vue'
export default {
  name: 'MoveFolder',
  components: {
    IonImg
    // SquareContainer
  },
  props: {
    item: Object,
    folder: Number,
    classes: [String, Array]
  },
  data () {
    return {
      isExpanded: false
    }
  },
  computed: {
    isExpandable () {
      if (this.item && this.item.folders && this.item.folders.length) {
        return true
      }
      return false
    },
    isSelected () {
      return this.folder === this.item.id
    }
  },
  methods: {
    emitSelect (id) {
      if (id) {
        this.$emit('activate', id)
      } else {
        this.$emit('activate', this.item.id)
      }
    },
    toggleExpanded () {
      console.log(this.item)
      this.isExpanded = !this.isExpanded
    }
  }
}
</script>
