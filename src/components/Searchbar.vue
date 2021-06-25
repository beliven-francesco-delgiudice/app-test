<template>
  <form
    @submit.prevent="submitSearch"
    :class="
      `bg-white small-shadow rounded-8 flex items-center z-10 relative px-2 ${classes ||
        ''}`
    "
  >
    <ion-img
      src="/assets/button-icons/search-black.svg"
      class="width-24 height-24"
    />
    <ion-input
      placeholder="Search"
      v-model="search"
      @keydown.enter.prevent="submitSearch"
      class="mx-2"
      required
    ></ion-input>
    <div v-if="search && search.length" @click="cancelValue" class="flex">
      <ion-img src="/assets/button-icons/close.svg" class="my-auto" />
    </div>
  </form>
</template>
<script>
import { IonImg, IonInput } from '@ionic/vue'
export default {
  components: {
    IonImg,
    IonInput
  },
  props: {
    classes: String
  },
  data () {
    return {
      search: ''
    }
  },
  created () {
    if (this.$route.query.string && this.$route.query.string.length) {
      this.search = this.$route.query.string
      this.$emit('submit', this.search)
    }
  },
  methods: {
    cancelValue () {
      this.search = ''
      this.$emit('cancel')
    },
    submitSearch () {
      this.$emit('submit', this.search)
    }
  }
}
</script>
