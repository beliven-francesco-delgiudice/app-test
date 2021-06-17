<template>
  <div
    :class="[
      withMargin ? 'px-8' : '',
      noTopSpace ? '' : 'pt-20',
      'min-h-screen gradient-background relative max-h-screen overflow-y-auto pb-24'
    ]"
  >
    <filters-modal
      v-if="filters"
      :filtersState="computedFilters"
      :open="isFiltersOpened"
      @onClose="closeFilters"
      @onSubmit="onSubmit"
    />
    <div
      v-if="isHeaderNecessary"
      class="bg-transparent absolute top-0 left-0 flex px-8 w-full z-10"
      style="height:90px"
    >
      <!-- back button -->
      <ion-button
        type="button"
        class="relative mr-auto my-auto back-button"
        v-if="back"
        @click="onBack"
      >
        <ion-img
          src="/assets/button-icons/back.svg"
          className="pointer-events-none"
        />
      </ion-button>

      <!-- Wizard button -->
      <shadow-button
        square
        styles="position:relative;"
        bgClass="bg-white ml-auto my-auto"
        v-if="info"
        @onClick="routeToWizard"
      >
        <ion-img
          src="/assets/button-icons/info.svg"
          className="width-24 height-24 pointer-events-none m-auto"
        />
      </shadow-button>

      <!-- Filters button -->
      <shadow-button
        square
        styles="position:relative;"
        bgClass="bg-white ml-auto my-auto"
        v-if="filters"
        @onClick="openFilters"
      >
        <ion-img
          src="/assets/button-icons/filters.svg"
          className="width-24 height-24 pointer-events-none m-auto"
        />
      </shadow-button>
    </div>
    <Title
      v-if="label"
      :titleClass="[
        withMargin ? '' : 'px-8',
        'pb-4 text-black font-helvetica-bold text-28 block'
      ]"
      v-html="label"
    >
    </Title>
    <slot></slot>
  </div>
</template>
<script>
import Title from '../components/Title'
import ShadowButton from '../components/containers/ShadowButton.vue'
import { IonImg } from '@ionic/vue'
import FiltersModal from './FiltersModal.vue'
export default {
  components: {
    Title,
    ShadowButton,
    IonImg,
    FiltersModal
  },
  data () {
    return {
      isFiltersOpened: false
    }
  },
  props: {
    label: String,
    withMargin: Boolean,
    noTopSpace: Boolean,
    info: Boolean,
    back: [Boolean, String, Object],
    filters: [Boolean, Object]
  },
  computed: {
    isHeaderNecessary () {
      if (this.info || this.back || this.filters) {
        return true
      }
      return false
    },
    computedFilters () {
      // here with have a Proxy with the ofull object
      return this.filters
    }
  },
  methods: {
    onBack () {
      if (this.back && this.back.length) {
        this.$router.push(this.back)
      }
      // this.$router.push('/home')
      this.$router.back()
    },
    routeToWizard () {
      this.$router.push('/wizard')
    },
    openFilters () {
      this.isFiltersOpened = true
    },
    closeFilters () {
      this.isFiltersOpened = false
    },
    onSubmit (payload) {
      this.$emit('onFiltersChange', payload)
      this.closeFilters()
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
