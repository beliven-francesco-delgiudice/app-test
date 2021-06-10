<template>
  <form
    @submit="submitSearch"
    :class="
      `bg-white small-shadow rounded-8 flex items-center mx-8 z-10 relative px-2 ${classes}`
    "
  >
    <ion-img
      src="/assets/button-icons/search-black.svg"
      class="width-24 height-24"
    />
    <ion-input
      placeholder="Search"
      v-model="search"
      class="ml-2"
      required
    ></ion-input>
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
  methods: {
    submitSearch (e) {
      e.preventDefault()
      this.$router.push(`/search${this.search ? '?string=' + this.search : ''}`)
    }
  }
}
</script>
