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
          @click="closeFilters"
        >
          <ion-img
            src="/assets/button-icons/close.svg"
            className="pointer-events-none"
          />
        </ion-button>
      </div>
      <form class="flex h-full flex-col justify-between" @submit="onSubmit">
        <Title
          titleClass="pb-2 text-black font-helvetica-bold text-28 block px-8"
        >
          Filters & Sort
        </Title>
        <div class="flex flex-col px-8" style="flex:1;overflow-y: scroll;">
          <div
            v-for="(option, optKey) in arrayOfOptions"
            :key="optKey"
            class="flex pt-2 pb-1 border-grey border-b w-full justify-between items-center"
          >
            <span
              class="w-1/2 font-helvetica text-16 spacing-5 line-28
            text-dark-grey"
              >{{ option.json.span }}</span
            >
            <custom-select
              :name="option.json.name"
              :value="computedFilters[option.json.name]"
              :options="filtersOptions[option.key]"
              :placeholder="option.json.placeholder"
              @onChange="updateFilters($event, option.json.name)"
            />
          </div>
        </div>
        <div class="w-full px-8 pb-4">
          <big-button type="submit" label="Done" />
        </div>
      </form>
    </div>
  </ion-modal>
</template>
<script>
import Title from '../Title.vue'
import BigButton from '../containers/BigButton.vue'
import { IonImg, IonModal, IonButton } from '@ionic/vue'
import CustomSelect from '../CustomSelect.vue'
import filtersJson from '@/filtersJson'
import { Capacitor } from '@capacitor/core'
export default {
  components: {
    Title,
    BigButton,
    IonButton,
    IonImg,
    IonModal,
    CustomSelect
  },
  props: {
    filtersState: Object,
    open: Boolean,
    options: Object
  },
  data () {
    return {
      isOpened: false,
      filters: {}
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
    },
    computedFilters () {
      return this.filters
    },
    filtersOptions () {
      return this.options
    },
    arrayOfOptions () {
      const keys = Object.keys(this.filtersOptions)
      const array = keys.map(key => ({
        key: key,
        json: filtersJson[key]
      }))

      return array.filter(
        opt =>
          this.filtersOptions[opt.key] && this.filtersOptions[opt.key].length
      )
    }
  },
  methods: {
    updateFilters (value, name) {
      const filterObj = Object.assign({}, this.filters)
      filterObj[name] = value
      this.filters = filterObj
    },
    closeFilters () {
      this.$emit('onClose')
    },
    onSubmit (e) {
      e.preventDefault()
      this.$emit('onSubmit', this.filters)
    }
  },
  watch: {
    open: function (newValue) {
      const filterObj = Object.assign({}, this.filtersState)
      this.filters = filterObj
      this.isOpened = newValue
    }
  }
}
</script>
<style scoped></style>
