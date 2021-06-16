<template>
  <div
    :class="[
      withMargin ? 'px-8' : '',
      noTopSpace ? '' : 'pt-20',
      'min-h-screen gradient-background relative max-h-screen overflow-y-auto pb-20'
    ]"
  >
    <div
      v-if="filters"
      :class="[
        isFiltersOpened
          ? 'actual-h-screen opacity-1 pt-20'
          : 'h-0 opacity-0 pointer-events-none',
        'gradient-background absolute top-0 left-0 z-20 transition-all duration-700 w-full elevated-shadow'
      ]"
    >
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
      <div class="flex h-full flex-col justify-between">
        <Title
          titleClass="px-8 pb-4 text-black font-helvetica-bold text-28 block"
        >
          Filters
        </Title>
        <div class="w-full px-8 pb-4">
          <big-button label="Done" />
        </div>
      </div>
    </div>
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
import BigButton from './containers/BigButton.vue'
export default {
  components: {
    Title,
    ShadowButton,
    BigButton
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
    filters: Boolean
  },
  computed: {
    isHeaderNecessary () {
      if (this.info || this.back || this.filters) {
        return true
      }
      return false
    }
  },
  methods: {
    onBack () {
      console.log(this.back)
      if (this.back && this.back.length) {
        this.$router.push(this.back)
      }
      this.$router.push('/home')
    },
    routeToWizard () {
      this.$router.push('/wizard')
    },
    openFilters () {
      this.isFiltersOpened = true
    },
    closeFilters () {
      this.isFiltersOpened = false
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
