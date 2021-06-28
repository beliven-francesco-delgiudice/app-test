<template>
  <div
    class="min-h-screen gradient-background relative max-h-screen overflow-y-auto pb-20 flex flex-col"
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

    <div
      v-if="isSearched && isSearched.length && formattedResultsLength > 0"
      class="flex flex-col"
    >
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

      <div class="flex flex-col px-8 mt-4">
        <detail-section
          v-for="(section, i) in formattedResults"
          :key="i"
          :label="section.name"
          :count="section.count"
          noPadding
        >
          <div v-for="(item, j) in section.childs" :key="j" class="mb-4">
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
                  classes="mr-4 p-2"
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
                  classes="mr-4 overflow-hidden"
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
        </detail-section>
      </div>
    </div>
    <div
      v-else-if="isSearched && isSearched.length && formattedResultsLength <= 0"
      class="flex-grow flex flex-col justify-center items-center"
    >
      <span class="font-helvetica-bold text-20 spacing-2 line-28 mb-2 -mt-8"
        >Sorry, no results found :(</span
      >
      <span class="font-helvetica text-16 spacing-1 line-24 text-center"
        >We couldn’t find any matches for "{{ isSearched }}". <br />Please try
        with another keyword.</span
      >
    </div>
  </div>
</template>

<script>
import { IonImg } from '@ionic/vue'
import Searchbar from '../components/Searchbar.vue'
import Title from '../components/Title.vue'
import DocumentListItem from '../components/DocumentListItem.vue'
import Carousel from '../components/Carousel.vue'
import SquareContainer from '../components/containers/SquareContainer.vue'
import SectionButton from '../components/containers/SectionButton.vue'
import DetailSection from '../components/DetailSection.vue'
export default {
  components: {
    IonImg,
    Searchbar,
    Title,
    DocumentListItem,
    SquareContainer,
    SectionButton,
    Carousel,
    DetailSection
  },
  data () {
    return {
      filter: '*',
      isSearched: null, //should be false at beginning
      results: {}
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
      for (let i = 0; i < keys.length; i++) {
        array.push({
          label: this.getLabel(keys[i]),
          value: keys[i]
        })
      }
      return array
    }
  },
  methods: {
    search (searchText) {
      this.isSearched = searchText
      alert(searchText)
    },
    cancelResults () {
      this.$refs.searchbar.cancelValue()
      this.isSearched = null
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
