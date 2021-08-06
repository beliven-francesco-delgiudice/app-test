<template>
  <div
    :class="[
      withMargin ? 'px-8' : '',
      noTopSpace ? '' : 'pt-20',
      'min-h-screen gradient-background max-h-screen overflow-y-auto relative pb-24'
    ]"
  >
    <filters-modal
      v-if="filters"
      :options="options"
      :filtersState="computedFilters"
      :open="isFiltersOpened"
      @onClose="closeFilters"
      @onSubmit="onSubmit"
    />
    <div
      v-if="isHeaderNecessary"
      class="bg-transparent absolute top-0 left-0 flex px-8 w-full z-10"
      :style="isIos ? 'margin-top:35px;height:70px;' : 'height:90px;'"
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
        bgClass="my-auto bg-white ml-auto"
        v-if="info"
        @onClick="routeToWizard"
      >
        <ion-img
          src="/assets/button-icons/info.svg"
          className="width-24 height-24 pointer-events-none m-auto"
        />
      </shadow-button>

      <!-- Mail button -->
      <shadow-button
        square
        styles="position:relative;"
        bgClass="my-auto bg-white ml-auto"
        v-if="mail"
      >
        <a
          :href="'mailto:' + mail"
          title="Mail to info"
          class="absolute top-0 left-0 w-full h-full"
        ></a>
        <ion-img
          src="/assets/button-icons/mail-black.svg"
          className="width-24 height-24 pointer-events-none m-auto"
        />
      </shadow-button>

      <!-- Filters button -->
      <shadow-button
        square
        styles="position:relative;"
        bgClass="my-auto bg-white ml-auto"
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
    >
      <span
        v-if="aboveTitle"
        class="font-helvetica text-14 text-grey spacing-44 line-24 pb-2"
        >{{ aboveTitle }} </span
      ><br />
      {{ label }}
    </Title>
    <slot></slot>
  </div>
</template>
<script>
import Title from '../components/Title'
import ShadowButton from '../components/containers/ShadowButton.vue'
import { IonImg, IonButton } from '@ionic/vue'
import FiltersModal from './modals/FiltersModal.vue'
import { Capacitor } from '@capacitor/core'
export default {
  components: {
    Title,
    ShadowButton,
    IonImg,
    FiltersModal,
    IonButton
  },
  data () {
    return {
      isFiltersOpened: false
    }
  },
  props: {
    label: String,
    aboveTitle: String,
    withMargin: Boolean,
    noTopSpace: Boolean,
    info: Boolean,
    back: [Boolean, String, Object],
    mail: String,
    filters: [Boolean, Object],
    filtersOptions: Object
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
    isHeaderNecessary () {
      if (this.info || this.back || this.filters || this.mail) {
        return true
      }
      return false
    },
    computedFilters () {
      return this.filters
    },
    options () {
      return this.filtersOptions
    }
  },
  methods: {
    onBack () {
      if (this.back && this.back.length) {
        this.$router.push(this.back)
      } else {
        this.$router.back()
      }
      // this.$router.push('/home')
    },
    routeToWizard () {
      this.$router.push('/new?section=updates')
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
