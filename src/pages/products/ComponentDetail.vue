<template>
  <Page :label="$route.name" withMargin>
    ComponentDetail
    <!-- <div class="flex flex-col">
      <ion-list class="bg-transparent">
        <div
          class="flex flex-row justify-between items-center bg-transparent py-2"
          v-for="(item, i) in updatedList"
          :key="i"
          @click="$router.push(item.href)"
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
    </div> -->
  </Page>
</template>

<script>
import Page from '../../components/Page.vue'
export default {
  components: {
    Page
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
          img: 'documents.svg'
        },
        {
          name: 'Medical Education',
          href: '/meded',
          img: 'meded.svg'
        },
        {
          name: 'News',
          href: '/news',
          img: 'news.svg'
        },
        {
          name: 'Congresses',
          href: '/congresses',
          img: 'congresses.svg'
        },
        {
          name: 'Updates',
          href: '/updates',
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
          img: 'multimedia.svg'
        },
        {
          name: 'Contact',
          href: '/contact',
          img: 'contact.svg'
        }
      ]
    }
  },
  computed: {
    updatedList () {
      const newList = this.list.map(i => i)
      newList[6].notifications = 2
      return newList
    }
  },
  methods: {
    logout () {
      console.log('logout')
      this.$router.push('/home')
    }
  }
}
</script>
