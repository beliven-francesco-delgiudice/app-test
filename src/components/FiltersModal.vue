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
        style="height:90px"
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
        <div class="flex flex-col px-8">
          <Title titleClass="pb-4 text-black font-helvetica-bold text-28 block">
            Filters
          </Title>

          <div
            class="flex pb-4 border-grey border-b w-full justify-between items-center"
          >
            <span
              class="w-1/2 font-helvetica text-16 spacing-5 line-28
            text-dark-grey"
              >Order by</span
            >
            <custom-select
              name="order_by"
              placeholder="Select order"
              :options="orderOptions"
              :value="computedFilters.order_by"
              @onChange="updateFilters($event, 'order_by')"
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
import Title from '../components/Title'
import BigButton from './containers/BigButton.vue'
import { IonImg, IonModal } from '@ionic/vue'
import CustomSelect from './CustomSelect.vue'
export default {
  components: {
    Title,
    BigButton,
    IonImg,
    IonModal,
    CustomSelect
  },
  props: {
    filtersState: Object,
    open: Boolean
  },
  data () {
    return {
      isOpened: false,
      filters: {},
      orderOptions: [
        {
          value: 'name:desc',
          label: 'Name (A-Z)'
        },
        {
          value: 'name:asc',
          label: 'Name (Z-A)'
        }
      ]
    }
  },
  computed: {
    computedFilters () {
      return this.filters
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
<style scoped>
.back-button {
  --background: transparent;
  --border: none;
  --box-shadow: none;
  left: -1rem;
}
</style>
