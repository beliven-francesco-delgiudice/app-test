<template>
  <Page :label="$route.name" withMargin info>
    <div class="flex flex-col">
      <ion-list class="bg-transparent">
        <div
          :class="[
            item.disabled ? 'opacity-50 pointer-events-none' : '',
            ' flex flex-row justify-between items-center bg-transparent py-2'
          ]"
          v-for="(item, i) in updatedList"
          :key="i"
          @click="routeTo(item.href)"
        >
          <div class="flex flex-start items-center pointer-events-none">
            <square-container
              bgClass="bg-light-grey"
              classes="mr-2"
              squareSize="44"
            >
              <ion-img :src="'/assets/menu/' + item.img" />
            </square-container>
            <span class="font-helvetica-medium text-black text-16">{{
              item.name
            }}</span>
          </div>
          <square-container
            v-if="item.notifications && item.notifications > 0"
            bgClass="bg-red"
            squareSize="24"
            rounded="6"
            classes="flex text-center justify-center items-center"
          >
            <span class="font-helvetica-bold text-white text-12">{{
              item.notifications
            }}</span>
          </square-container>
        </div>
      </ion-list>
      <hr class="w-full border-t border-grey" />
      <div @click="logout" class="py-2 flex">
        <span class="font-helvetica-medium text-black text-14">Logout</span>
      </div>
    </div>
  </Page>
</template>

<script>
import Page from '../components/Page.vue'
import SquareContainer from '../components/containers/SquareContainer.vue'
import { IonList, IonImg } from '@ionic/vue'
export default {
  components: {
    Page,
    SquareContainer,
    IonList,
    IonImg
  },
  data () {
    return {
      list: [
        {
          name: 'Products',
          href: '/products',
          img: 'products.svg'
        },
        {
          name: 'Documents',
          href: '/documents',
          img: 'documents.svg',
          disabled: true,
          hidden: true
        },
        {
          name: 'Medical Education',
          href: '/meded',
          img: 'meded.svg',
          disabled: true,
          hidden: true
        },
        {
          name: 'Congresses',
          href: '/congresses',
          img: 'congresses.svg'
        },
        {
          name: 'News',
          href: '/news',
          img: 'news.svg',
          hidden: true
        },
        {
          name: "What's New",
          href: '/new',
          img: 'notifications.svg'
        },
        {
          name: 'Useful Links',
          href: '/useful',
          img: 'useful.svg'
        },
        {
          name: 'Multimedia',
          href: '/multimedia',
          img: 'multimedia.svg',
          hidden: true
        },
        {
          name: 'Privacy',
          href: '/privacy',
          img: 'privacy.svg'
        },
        {
          name: 'Contacts',
          href: '/contacts',
          img: 'contact.svg'
        }
      ]
    }
  },
  computed: {
    updatedList () {
      const newList = this.list
        .filter(item => !item.hidden)
        .map(item => {
          if (item.href === '/new') {
            return {
              ...item,
              notifications: this.$store.getters.areNotificationsNotRead
            }
          }
          return item
        })
      return newList
    }
  },
  methods: {
    routeTo (href) {
      this.$router.push(href)
    },
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>
