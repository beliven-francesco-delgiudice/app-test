<template>
  <div
    :class="[
      withMargin ? 'px-8' : '',
      noTopSpace ? '' : 'pt-20',
      customGradient || 'gradient-background',
      'min-h-screen max-h-screen overflow-y-auto relative pb-24'
    ]"
  >
    <!-- <IonScroll direction="y"> -->
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

      <!-- Support button -->
      <shadow-button
        square
        styles="position:relative;"
        bgClass="my-auto bg-white ml-4"
        v-if="support"
        @onClick="openSupport"
        @click="openSupport"
      >
        <ion-img
          src="/assets/button-icons/support.svg"
          className="width-24 height-24 pointer-events-none m-auto"
        />
      </shadow-button>

      <!-- Share button -->
      <shadow-button
        square
        styles="position:relative;"
        bgClass="my-auto bg-white ml-auto"
        v-if="share"
        @onClick="onShare"
        @click="onShare"
      >
        <ion-img
          src="/assets/button-icons/share-black.svg"
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
    <div :class="withMargin ? '' : 'px-8'" v-if="aboveTitle">
      <slot name="above-title">
        <span class="font-helvetica text-14 text-grey spacing-44 line-24">
          {{ aboveTitle }}
        </span>
      </slot>
    </div>
    <Title
      v-if="label"
      :titleClass="[
        withMargin ? '' : 'px-8',
        'pb-4 text-black font-helvetica-bold text-28 block'
      ]"
    >
      {{ label }}
    </Title>
    <slot></slot>
    <!-- </IonScroll> -->
    <contacts-support v-if="isSupportModalOpen" @onClose="closeSupport" />
  </div>
</template>

<script>
import Title from '../components/Title'
import ShadowButton from '../components/containers/ShadowButton.vue'
import FiltersModal from './modals/FiltersModal.vue'
import ContactsSupport from '../components/ContactsSupport.vue'
import { IonImg, IonButton } from '@ionic/vue'
import { Capacitor } from '@capacitor/core'

export default {
  components: {
    Title,
    ShadowButton,
    IonImg,
    FiltersModal,
    IonButton,
    ContactsSupport
    // IonScroll
  },

  props: {
    label: {
      type: String
    },

    aboveTitle: {
      type: String
    },

    withMargin: {
      type: Boolean
    },

    noTopSpace: {
      type: Boolean
    },

    info: {
      type: Boolean
    },

    support: {
      type: Boolean
    },

    back: {
      type: [Boolean, String, Object]
    },

    mail: {
      type: String
    },

    share: {
      type: Object
    },

    filters: {
      type: [Boolean, Object]
    },

    filtersOptions: {
      type: Object
    },

    customGradient: {
      type: String
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

  data () {
    return {
      isFiltersOpened: false,
      isSupportModalOpen: false
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

    onShare () {
      try {
        this.$share.share(this.share)
      } catch (err) {
        console.log(err)
      }
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
    },

    openSupport () {
      this.isSupportModalOpen = true
    },

    closeSupport () {
      this.isSupportModalOpen = false
    }
  }
}
</script>
