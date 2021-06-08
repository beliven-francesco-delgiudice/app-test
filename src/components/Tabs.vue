<template>
  <ion-tabs color="primary">
    <ion-tab-bar slot="bottom" class="tabs-bar bg-black border-none">
      <ion-tab-button
        class="bg-black"
        v-for="(tab, i) in routingTabs"
        :key="i"
        :tab="tab.name"
        @click="$router.push(tab.href)"
      >
        <IonImg :src="tab.icon" :class="tab.active ? '' : 'opacity-50'" />
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>
</template>

<script>
import { IonTabBar, IonTabButton, IonTabs, IonImg } from '@ionic/vue'

export default {
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
  computed: {
    routingTabs () {
      let currentRoute = this.$route.path
      return this.tabs.map(route => ({
        ...route,
        active: currentRoute.includes(route.href)
      }))
    }
  },
  components: { IonTabBar, IonTabButton, IonTabs, IonImg }
}
</script>

<style scoped>
.tabs-bar {
  border-radius: 24px 24px 0 0;
}
</style>
