<template>
  <div
    class="min-h-screen gradient-background relative max-h-screen overflow-y-auto pb-20"
  >
    <!-- Hero -->
    <div class="w-full relative">
      <div
        class="bg-transparent absolute top-0 flex px-8 w-full z-10"
        style="height:90px"
      >
        <shadow-button
          square
          styles="position:relative;"
          bgClass="bg-white ml-auto my-auto"
          @onClick="openNotifications"
        >
          <ion-img
            src="/assets/menu/notifications.svg"
            className="pointer-events-none"
          />

          <div
            v-if="$store.getters.areNotificationsNotRead"
            class="absolute width-8 height-8 bg-red rounded-full top-0 right-0 pointer-events-none"
            style="margin-top: 4px; margin-right: 4px;"
          ></div>
        </shadow-button>
      </div>
      <ion-img src="/assets/hero.png" class="w-full z-0 pointer-events-none" />
      <div class="absolute top-0 z-0 w-full h-full">
        <Title
          titleClass="relative pb-4 text-black font-helvetica-bold text-28 block px-8 pt-20 z-10"
        >
          <span
            class="text-black font-helvetica-bold text-20 pointer-events-none"
            >Hi {{ $store.getters.userData.first_name }}, <br /></span
          >Welcome Back
        </Title>
        <searchbar classes="mx-8 mt-4" @submit="routeToSearch" />
      </div>
    </div>
    <!-- Products -->
    <div class="w-full relative pt-4 overflow-y-visible">
      <carousel height="h-24">
        <!-- <ion-slide
          v-for="(prod, i) in products"
          :key="i"
          class="w-auto-important"
        > -->
        <div
          class="w-auto-important flex"
          v-for="(prod, i) in $store.getters.homeProducts"
          :key="i"
          @click="routeToSegment(prod)"
        >
          <grey-container
            :classes="[
              i === 0 ? 'ml-8 ' : '',
              ' p-6 mr-4 overflow-y-visible mt-auto pointer-events-none'
            ]"
          >
            <div class="relative mr-2 width-44 overflow-y-visible">
              <ion-img :src="prod.preview" class="absolute bottom-0" />
            </div>
            <span class="font-helvetica-medium text-black text-16">{{
              prod.name
            }}</span>
          </grey-container>
        </div>
        <!-- </ion-slide> -->
      </carousel>
    </div>

    <!-- Documents -->
    <!-- <home-titled-container label="Documents" path="/documents">
      <carousel classes="py-4 -my-4">
        <home-documents
          title="Last saved"
          :docs="documents.last_saved"
          classes="ml-8"
        />
        <home-documents title="Other" :docs="documents.other" />
        <div>&nbsp;</div>
      </carousel>
    </home-titled-container> -->

    <!-- Medical Education -->
    <!-- <home-titled-container label="Medical Education" path="/meded">
      <carousel>
        <home-meded
          v-for="(singleMed, i) in meded"
          :key="i"
          :index="i"
          :data="singleMed"
        />
        <div>&nbsp;</div>
      </carousel>
    </home-titled-container> -->

    <!-- News -->
    <!-- <home-titled-container label="News" path="/news">
      <carousel>
        <home-news
          v-for="(singleNews, i) in news"
          :key="i"
          :index="i"
          :news="singleNews"
        />
        <div>&nbsp;</div>
      </carousel>
    </home-titled-container> -->

    <!-- Congresses -->
    <home-titled-container
      v-if="
        $store.getters.homeCongresses && $store.getters.homeCongresses.length
      "
      label="Congresses"
      path="/congresses"
    >
      <carousel classes="py-4 -mt-4">
        <home-congress
          v-for="(congress, i) in $store.getters.homeCongresses"
          :key="i"
          :index="i"
          :congress="congress"
        />
        <div>&nbsp;</div>
      </carousel>
    </home-titled-container>

    <slot></slot>
  </div>
</template>

<script>
import { IonImg } from '@ionic/vue'
import Title from '../components/Title.vue'
import Searchbar from '../components/Searchbar.vue'
import Carousel from '../components/Carousel.vue'
import GreyContainer from '../components/containers/GreyContainer.vue'
import HomeTitledContainer from '../components/home/HomeTitledContainer.vue'
// import HomeNews from '../components/home/HomeNews.vue'
// import HomeMeded from '../components/home/HomeMeded.vue'
import HomeCongress from '../components/home/HomeCongress.vue'
// import HomeDocuments from '../components/home/HomeDocuments.vue'
import ShadowButton from '../components/containers/ShadowButton.vue'
export default {
  components: {
    IonImg,
    // IonSlide,
    Title,
    Searchbar,
    Carousel,
    GreyContainer,
    HomeTitledContainer,
    ShadowButton,
    // HomeNews,
    // HomeMeded,
    HomeCongress
    // HomeDocuments
  },
  data () {
    return {
      products: [
        {
          id: 2,
          name: 'Hip',
          img: '/assets/test/product-vertical-home.svg'
        },
        {
          id: 3,
          name: 'Knee',
          img: '/assets/test/product-square-home.svg'
        },
        {
          id: 4,
          name: 'Shoulder',
          img: '/assets/test/product-vertical-home.svg'
        }
      ],
      documents: {
        last_saved: [
          {
            image: '/assets/test/folder.jpg',
            type: 'folder',
            label: 'Lorem ipsum',
            size: '3.6MB',
            link: 'link'
          },
          {
            image: '/assets/test/file.jpg',
            type: 'file',
            label: 'Lorem ipsum',
            size: '3.6MB',
            link: 'link'
          },
          {
            image: '/assets/test/folder.jpg',
            type: 'folder',
            label: 'Lorem ipsum',
            size: '3.6MB',
            link: 'link'
          },
          {
            image: '/assets/test/file.jpg',
            type: 'file',
            label: 'Lorem ipsum',
            size: '3.6MB',
            link: 'link'
          }
        ],
        other: [
          {
            image: '/assets/test/folder.jpg',
            type: 'folder',
            label: 'Lorem ipsum',
            size: '3.6MB',
            link: 'link'
          },
          {
            image: '/assets/test/file.jpg',
            type: 'file',
            label: 'Lorem ipsum',
            size: '3.6MB',
            link: 'link'
          },
          {
            image: '/assets/test/folder.jpg',
            type: 'folder',
            label: 'Lorem ipsum',
            size: '3.6MB',
            link: 'link'
          },
          {
            image: '/assets/test/file.jpg',
            type: 'file',
            label: 'Lorem ipsum',
            size: '3.6MB',
            link: 'link'
          }
        ]
      },
      news: [
        {
          id: 1,
          img: '/assets/test/news.jpg',
          text: '1st Surgery using the Trabecular Titanium™ Tibial Plate'
        },
        {
          id: 2,
          img: '/assets/test/news.jpg',
          text: '1st Surgery using the Trabecular Titanium™ Tibial Plate'
        }
      ],
      meded: [
        {
          course_id: 12,
          date: '14-15 June',
          title: 'Smart SPACE: your digital companion from pre-op planning to…',
          category: 'course',
          pillar: {
            image: '/assets/test/shoulder.jpg',
            name: 'Shoulder'
          },
          faculties: [
            {
              name: 'A',
              image: '/assets/test/faculty1.jpg'
            },
            {
              name: 'B',
              image: '/assets/test/faculty2.jpg'
            },
            {
              name: 'C',
              image: '/assets/test/faculty3.jpg'
            }
          ]
        },
        {
          course_id: 13,
          date: '17-18 June',
          title: 'Smart SPACE: your digital companion from pre-op planning to…',
          category: 'limaonlineeducation',
          pillar: {
            image: '/assets/test/shoulder.jpg',
            name: 'Shoulder'
          },
          faculties: [
            {
              name: 'A',
              image: '/assets/test/faculty1.jpg'
            },
            {
              name: 'B',
              image: '/assets/test/faculty2.jpg'
            },
            {
              name: 'C',
              image: '/assets/test/faculty3.jpg'
            },
            {
              name: 'D',
              image: '/assets/test/faculty2.jpg'
            }
          ]
        }
      ],
      congresses: [
        {
          title: 'AAOS | 2021 Annual Meeting',
          location: 'San Diego, California - USA',
          date: '31 Aug - 4 Sep'
        }
      ]
    }
  },
  methods: {
    openNotifications () {
      this.$router.push({ path: '/new', meta: { section: 'notifications' } })
    },
    updateState (payload) {
      const { products, documents, news, meded, congresses } = payload
      this.products = products || []
      this.news = news || []
      this.meded = meded || []
      this.documents = documents || {}
      this.congresses = congresses || []
    },
    routeToSegment (segment) {
      const link = `/products/${segment.id}`
      this.$router.push({ path: link })
    },
    routeToSearch (searchText) {
      const text = searchText ? '?string=' + searchText : ''
      this.$router.push('/search' + text)
    }
  }
}
</script>
<style scoped>
.home-container {
  width: 240px;
  min-width: 240px;
}
.home-big-container {
  width: 308px;
  min-width: 308px;
}
</style>
