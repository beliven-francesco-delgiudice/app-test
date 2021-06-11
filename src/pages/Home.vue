<template>
  <div class="min-h-screen gradient-background relative">
    <div class="w-full relative pb-20">
      <ion-img src="/assets/hero.png" class="w-full z-0" />
      <div class="absolute top-0 z-10 w-full h-full">
        <Title
          titleClass="relative pb-4 text-black font-helvetica-bold text-28 block px-8 pt-20 z-10"
        >
          <span class="text-black font-helvetica-bold text-20"
            >Hi {{ userName }}, <br /></span
          >Welcome Back
        </Title>
        <searchbar classes="mt-4" />
      </div>
    </div>
    <div class="w-full relative pt-8">
      <carousel>
        <grey-container
          v-for="(prod, i) in products"
          :key="i"
          :classes="[i === 0 ? 'ml-8 ' : '', ' p-4 mr-4 overflow-visible']"
        >
          <div class="relative mr-2 width-40">
            <ion-img :src="prod.img" class="absolute bottom-0" />
          </div>
          <span class="font-helvetica-medium text-black text-16">{{
            prod.name
          }}</span>
        </grey-container>
      </carousel>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { IonImg } from '@ionic/vue'
import Title from '../components/Title.vue'
import Searchbar from '../components/Searchbar.vue'
import Carousel from '../components/Carousel.vue'
import GreyContainer from '../components/containers/GreyContainer.vue'
export default {
  components: {
    IonImg,
    Title,
    Searchbar,
    Carousel,
    GreyContainer
  },
  data () {
    return {
      products: [
        {
          name: 'Hip',
          img: '/assets/test/product-vertical-home.svg'
        },
        {
          name: 'Knee',
          img: '/assets/test/product-square-home.svg'
        },
        {
          name: 'Shoulder',
          img: '/assets/test/product-vertical-home.svg'
        }
      ]
    }
  },
  computed: {
    userName () {
      return 'Astrid'
    }
  }
}
</script>
