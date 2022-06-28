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
              <ion-img
                :src="
                  item.img
                    ? '/assets/menu/' + item.img
                    : '/assets/' + item.fallbackImg
                "
              />
            </square-container>
            <span class="font-helvetica-medium text-black text-16">{{
              item.name
            }}</span>
          </div>
          <div v-if="item.disabled" class="bg-light-red rounded-6 px-2">
            <span
              class="font-helvetica-medium text-12 text-red spacing-8 line-30 pointer-events-none"
              >COMING SOON
            </span>
          </div>
          <square-container
            v-if="item.notifications && item.notifications > 0"
            bgClass="bg-red"
            squareSize="24"
            rounded="6"
            classes="flex text-center justify-center items-center"
          >
            <span class="font-helvetica-bold text-white text-12">
              {{ item.notifications }}
            </span>
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
import FirebaseManagerVue from '../mixins/FirebaseManager.vue'

export default {
  components: {
    Page,
    SquareContainer,
    IonList,
    IonImg
  },

  mixins: [FirebaseManagerVue],

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
          img: 'documents.svg'
        },
        {
          name: 'L.E.A.R.N.',
          href: '/learn',
          img: 'meded.svg',
          disabled: true
        },
        {
          name: 'Congresses',
          href: '/congresses',
          img: 'congresses.svg'
        },
        // {
        //   name: 'Sales Training',
        //   href: '/training',
        //   img: 'sales-training.svg'
        // },
        {
          name: 'News',
          href: '/news',
          img: 'news.svg'
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
          disabled: true
        },
        {
          name: 'Privacy',
          href: '/privacy',
          img: 'privacy.svg'
        },
        {
          name: 'Terms and Conditions',
          href: '/terms?accepted=true',
          fallbackImg: 'button-icons/info.svg'
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
      const newList = this.list.map(item => {
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
