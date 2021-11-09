<template>
  <!-- <ion-tabs color="primary">
    <div
      v-if="!home"
      class="tabs-inner"
      style="position: relative; flex: 1 1 0%; contain: size layout style;"
    >
      <ion-router-outlet tabs="true" class="hydrated"
        ><router-view
      /></ion-router-outlet>
    </div>
    <ion-tab-bar
      slot="bottom"
      class="tabs-bar bg-black border-none px-8 fixed bottom-0 left-0 right-0"
    >
      <ion-tab-button
        class="bg-black"
        v-for="(tab, i) in routingTabs"
        :key="i"
        :tab="tab.name"
        @click="$router.push(tab.href)"
      >
        <ion-img :src="tab.icon" :class="tab.active ? '' : 'opacity-50'" />
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs> -->
  <div
    class="w-full fixed bottom-0 left-0 bg-transparent"
    style="height: 72px;"
  >
    <div class="h-full h-full flex tabs-bar bg-black px-8">
      <div
        v-for="(tab, i) in routingTabs"
        :key="i"
        :tab="tab.name"
        :class="[
          tab.disabled ? 'pointer-events-none' : '',
          ' flex flex-grow justify-center items-center'
        ]"
        @click="$router.push(tab.href)"
      >
        <ion-img
          :src="tab.icon"
          :class="tab.active ? '' : tab.disabled ? 'opacity-25' : 'opacity-50'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { IonImg } from '@ionic/vue'

export default {
  components: { IonImg },
  data () {
    return {
      tabs: [
        {
          name: 'home',
          href: '/home',
          icon: '/assets/button-icons/home.svg'
        },
        {
          name: 'products',
          href: '/products',
          icon: '/assets/button-icons/products.svg'
        },
        {
          name: 'documents',
          href: '/documents',
          icon: '/assets/button-icons/documents.svg'
        },
        {
          name: 'search',
          href: '/search',
          icon: '/assets/button-icons/search.svg'
        },
        {
          name: 'menu',
          href: '/menu',
          icon: '/assets/button-icons/menu.svg'
        }
      ]
    }
  },
  props: {
    home: Boolean
  },
  computed: {
    routingTabs () {
      const currentRoute = this.$route.path
      const activePath = this.getActivePath(currentRoute)
      return this.tabs.map(route => ({
        ...route,
        active: route.href === activePath
      }))
    }
  },
  methods: {
    getActivePath (route) {
      for (let i = 0; i < this.tabs.length; i++) {
        const path = this.tabs[i].href
        if (route.includes(path)) {
          return path
        }
      }
    }
  }
}
</script>

<style scoped>
.tabs-bar {
  border-radius: 24px 24px 0 0;
}
</style>
