<template>
  <div
    :class="[
      withMargin ? 'px-8' : '',
      noTopSpace ? '' : 'pt-20',
      'min-h-screen gradient-background relative max-h-screen overflow-y-auto pb-20'
    ]"
  >
    <div
      v-if="isHeaderNecessary"
      class="bg-transparent absolute top-0 left-0 flex px-8 w-full z-10"
      style="height:90px"
    >
      <!-- back button -->
      <ion-button
        v-if="back"
        @click="backButton"
        class="relative mr-auto my-auto back-button"
      >
        <ion-img
          src="/assets/button-icons/back.svg"
          className="pointer-events-none"
        />
      </ion-button>

      <!-- Wizard button -->
      <shadow-button
        v-if="info"
        square
        styles="position:relative;"
        bgClass="bg-white ml-auto my-auto"
        @onClick="openUpdates"
      >
        <ion-img
          src="/assets/button-icons/info.svg"
          className="width-24 height-24 pointer-events-none m-auto"
        />
      </shadow-button>

      <!-- Filters button -->
      <shadow-button
        v-if="filters"
        square
        styles="position:relative;"
        bgClass="bg-white ml-auto my-auto"
        @onClick="openUpdates"
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

export default {
  components: {
    Title
  },
  props: {
    label: String,
    withMargin: Boolean,
    noTopSpace: Boolean,
    info: Boolean,
    back: Boolean,
    filters: Boolean
  },
  computed: {
    isHeaderNecessary () {
      if (this.info || this.back || this.filters) {
        return true
      }
      return false
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
