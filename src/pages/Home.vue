<template>
  <div class="min-h-screen gradient-background relative">
    <div class="w-full relative">
      <ion-img src="/assets/hero.png" class="absolute top-0 w-full z-0" />
      <Title
        titleClass="relative pb-4 text-black font-helvetica-bold text-28 block px-8 pt-20 z-10"
      >
        <span class="text-black font-helvetica-bold text-20"
          >Hi {{ userName }}, <br /></span
        >Welcome Back
      </Title>
      <searchbar classes="mt-4" />
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { IonImg } from '@ionic/vue'
import Title from '../components/Title.vue'
import Searchbar from '../components/Searchbar.vue'
export default {
  components: {
    IonImg,
    Title,
    Searchbar
  },
  data () {
    return {}
  },
  computed: {
    userName () {
      return 'Astrid'
    }
  }
}
</script>
