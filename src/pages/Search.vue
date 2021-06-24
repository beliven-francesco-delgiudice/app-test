<template>
  <div
    class="min-h-screen gradient-background relative max-h-screen overflow-y-auto pb-20"
  >
    <div class="bg-transparent flex px-8 z-10" style="height:90px">
      <ion-button
        v-if="formattedResultsLength > 0"
        type="button"
        class="relative mr-8 my-auto back-button"
        @click="cancelResults"
      >
        <ion-img
          src="/assets/button-icons/back.svg"
          className="pointer-events-none"
        />
      </ion-button>
      <div class="my-auto flex-grow">
        <searchbar ref="searchbar" @submit="search" />
      </div>
    </div>

    <div v-if="formattedResultsLength > 0" class="flex flex-col">
      <Title
        :titleClass="[
          withMargin ? '' : 'px-8',
          'pb-4 text-black font-helvetica-bold text-28 block'
        ]"
      >
        Search Results
      </Title>

      <carousel classes="pt-4 -my-4 pb-8">
        <section-button
          v-for="(section, i) in parsedSections"
          :key="i"
          :active="filter === section.value"
          :classes="[i === 0 ? 'ml-8' : '', ' mr-4']"
          :label="section.label"
          @onClick="changeSection(section.value)"
        />
        <div>&nbsp;</div>
      </carousel>

      <div class="flex flex-col px-8">
        <accordions-list classes="mt-4" :list="formattedResults">
          <template v-slot="{ item }">
            <div>
              <div
                v-if="item.type === 'products'"
                class="flex flex-row justify-between items-center bg-transparent"
                @click="route(item, 'products')"
              >
                <div
                  class="flex flex-start items-center pointer-events-none w-full"
                >
                  <square-container
                    bgClass="bg-white"
                    squareSize="64"
                    rounded="12"
                    classes="elevated-shadow mr-4 p-2"
                  >
                    <ion-img :src="item.preview" />
                  </square-container>
                  <div class="flex flex-col justify-between py-2">
                    <span
                      class="font-helvetica-medium text-black text-16 spacing-5 line-28"
                      >{{ item.name }}</span
                    >
                    <span
                      class="font-helvetica text-grey text-14 spacing-44 line-24"
                      >{{ item.subtitle }}</span
                    >
                  </div>
                </div>
              </div>
              <document-list-item
                v-if="item.type === 'documents'"
                :document="item"
              />
              <div
                class="flex flex-row justify-between items-center bg-transparent pb-4 mb-4"
                v-if="item.type === 'congress'"
                @click="route(item, 'congress')"
              >
                <div
                  class="flex flex-start items-start pointer-events-none px-8 w-full"
                >
                  <square-container
                    bgClass="bg-white"
                    squareSize="64"
                    rounded="12"
                    classes="elevated-shadow mr-4 overflow-hidden"
                  >
                    <ion-img :src="item.image" class="h-full w-auto" />
                  </square-container>
                  <div class="flex flex-col justify-between py-2">
                    <span
                      class="font-helvetica-medium text-black text-16 spacing-5 line-28"
                      >{{ item.title }}
                    </span>
                    <span
                      class="font-helvetica text-grey text-14 spacing-44 line-24"
                    >
                      {{ item.location }}
                    </span>
                    <div class="bg-light-red rounded-6 px-2 mr-auto">
                      <span
                        class="font-helvetica-medium text-12 text-red spacing-8 line-30 pointer-events-none"
                        >{{ item.date }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </accordions-list>
      </div>
    </div>
  </div>
</template>

<script>
import { IonImg } from '@ionic/vue'
import Searchbar from '../components/Searchbar.vue'
import Title from '../components/Title.vue'
import AccordionsList from '../components/AccordionsList.vue'
import DocumentListItem from '../components/DocumentListItem.vue'
import Carousel from '../components/Carousel.vue'
import SquareContainer from '../components/containers/SquareContainer.vue'
import SectionButton from '../components/containers/SectionButton.vue'
export default {
  components: {
    IonImg,
    Searchbar,
    Title,
    AccordionsList,
    DocumentListItem,
    SquareContainer,
    SectionButton,
    Carousel
  },
  data () {
    return {
      filter: '*',
      results: {
        products: [
          {
            id: 146,
            name: 'DELTA Fins',
            subtitle: 'DELTA system Primary',
            preview:
              'https://limacorporate.com/repo/product-preview/3fcfb99ec010d4a8ba364f43169465d91ca39ada/o_1aae19p253i6iu5bhjcit1h8p49_tmb.jpg'
          },
          {
            id: 258,
            name: 'Delta Liners and Accessories',
            subtitle: null,
            preview:
              'https://limacorporate.com/repo/product-preview/982fd8b711279888a3b54f5af24f185041d22ee6/o_1bg5qktme17usr7418jh1q2ng836k_tmb.jpg'
          }
        ],
        documents: [
          {
            id: 439,
            name: '9055-21-000 - Delta-ST-C Cups',
            link:
              'https://limacorporate.com/repo/storage/439/file/9055-21-000_B-5521-52-010-1_071100.pdf',
            size: ''
          },
          {
            id: 446,
            name: '9055-33-000 - Delta-One-TT, Delta-Revision',
            link:
              'https://limacorporate.com/repo/storage/446/file/9055-33-000_B-5533-52-010-1_061300.pdf',
            size: ''
          }
        ]
      }
    }
  },
  computed: {
    formattedResultsLength () {
      const keys = Object.keys(this.results)
      let total = 0
      for (let i = 0; i < keys.length; i++) {
        total += this.results[keys[i]].length
      }
      return total
    },
    formattedResults () {
      const keys = Object.keys(this.results)
      const resultini = []
      for (let i = 0; i < keys.length; i++) {
        if (
          this.filter === '*' ||
          (this.filter !== '*' && this.filter === keys[i])
        ) {
          resultini.push({
            name: this.getLabel(keys[i]),
            childs: this.results[keys[i]].map(item => ({
              ...item,
              type: keys[i]
            })),
            count: this.results[keys[i]].length
          })
        }
      }
      return resultini
    },
    parsedSections () {
      const keys = Object.keys(this.results)
      const array = [
        {
          label: 'All',
          value: '*'
        }
      ]
      console.log(keys)
      for (let i = 0; i < keys.length; i++) {
        array.push({
          label: this.getLabel(keys[i]),
          value: keys[i]
        })
      }
      console.log(array)
      return array
    }
  },
  methods: {
    search (searchText) {
      alert(searchText)
    },
    cancelResults () {
      this.$refs.searchbar.cancelValue()
      this.results = []
    },
    changeSection (value) {
      this.filter = value
    },
    getLabel (value) {
      if (value === 'congress') {
        return 'Congresses'
      }
      return value.replace(/^\w/, c => c.toUpperCase())
    },
    route (item, type) {
      switch (type) {
        case 'products':
          this.$router.push(`/products/detail/${item.id}`)
          break
        case 'congress':
          this.$router.push(`/congresses/${item.id}`)
          break
        default:
          this.$router.push('/home')
          break
      }
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
