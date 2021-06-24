<template>
  <div :class="[classes || '', ' flex flex-col']">
    <div @click="expandAll" class="bg-black rounded-6 px-2 mb-8 mr-auto">
      <span
        class="font-helvetica-medium text-12 text-white spacing-8 line-30 pointer-events-none"
        >{{ isAllExpanded ? 'Close all' : 'Expand all' }}
      </span>
    </div>

    <div v-for="(item, i) in updatedList" :key="i" class="flex flex-col">
      <!-- if is category -->
      <div v-if="item.childs" class="flex flex-col">
        <div @click="expand(i)" class="flex justify-between items-center mb-8">
          <div class="flex justify-start items-center">
            <ion-img
              :src="
                `/assets/button-icons/arrow-${
                  item.expanded ? 'up' : 'down'
                }.svg`
              "
              class="width-675"
            />
            <span
              :class="
                `font-helvetica-bold text-20 spacing-22 line-30 ml-2 text-${
                  item.expanded ? 'grey' : 'black'
                }`
              "
              >{{ item.name }}</span
            >
          </div>
          <square-container
            v-if="item.count && item.count > 0"
            :bgClass="`${item.expanded ? 'bg-light-grey' : 'bg-black'}`"
            squareSize="24"
            rounded="6"
            classes="flex text-center justify-center items-center"
          >
            <span
              :class="[
                item.expanded ? 'text-grey' : 'text-white',
                'font-helvetica-bold text-12'
              ]"
              >{{ item.count }}</span
            >
          </square-container>
        </div>
        <div v-if="item.expanded" class="flex flex-col">
          <div v-for="(comp, j) in item.childs" :key="j" class="mb-4">
            <slot :item="comp"></slot>
          </div>
        </div>
      </div>

      <!-- if is element -->
      <div v-else class="-mt-2 mb-6"><slot :item="item"></slot></div>

      <separator bottomMargin />
    </div>
  </div>
</template>
<script>
import { IonImg } from '@ionic/vue'
import Separator from './Separator.vue'
import SquareContainer from './containers/SquareContainer.vue'
export default {
  components: {
    IonImg,
    Separator,
    SquareContainer
  },
  props: {
    list: Array,
    classes: [String, Array]
  },
  data () {
    return {
      expanded:
        this.list && this.list.length
          ? new Array(this.list.length).fill(false)
          : []
    }
  },
  computed: {
    updatedList () {
      return this.list.map((item, i) => ({
        ...item,
        expanded: this.expanded[i]
      }))
    },
    isAllExpanded () {
      for (let i = 0; i < this.updatedList.length; i++) {
        if (
          !this.updatedList[i].expanded &&
          this.updatedList[i].childs &&
          this.updatedList[i].childs.length
        ) {
          return false
        }
      }
      return true
    }
  },
  methods: {
    expandAll () {
      const array = this.expanded.map(i => i)
      for (let i = 0; i < array.length; i++) {
        if (this.isAllExpanded) {
          array[i] = false
        } else {
          array[i] = true
        }
      }
      this.expanded = array
    },
    expand (index) {
      const array = this.expanded.map(a => a)
      array[index] = !array[index]
      this.expanded = array
    }
  },
  watch: {
    list: function (newValue) {
      if (newValue && newValue.length) {
        this.expanded = new Array(newValue.length).fill(false)
      }
    }
  }
}
</script>
