<template>
  <accordions-list classes="mt-4 px-8" :list="activities">
    <template v-slot="{ item }">
      <div
        class="flex flex-col justify-between items-start bg-white rounded-12 elevated-shadow px-6 py-4"
      >
        <span
          class="font-helvetica-medium text-black text-16 spacing-5 line-28"
        >
          {{ item.title }}
        </span>
        <span class="font-helvetica text-grey text-14 spacing-44 line-24 mb-2">
          {{ item.location }}
        </span>
        <div class="flex justify-between items-center w-full">
          <div class="bg-light-red rounded-6 px-2 mr-auto">
            <span
              class="font-helvetica-medium text-12 text-red spacing-8 line-30 pointer-events-none"
              >{{ item.date }}
            </span>
          </div>
          <div class="flex ml-2">
            <square-container
              v-for="(expert, i) in item.experts"
              :key="i"
              rounded="6"
              squareSize="24"
              :classes="[expert.image ? '' : 'flex bg-red', 'ml-2']"
            >
              <ion-img v-if="expert.image" :src="expert.image" />
            </square-container>
          </div>
        </div>
        <div
          v-if="item.type !== 'lunch'"
          class="flex mt-4 items-center relative"
          @click="openLink(item.googlemaps)"
        >
          <square-container
            bgClass="bg-black"
            squareSize="44"
            classes="pointer-events-none flex"
          >
            <ion-img src="/assets/button-icons/pin.svg" class="m-auto" />
          </square-container>
          <span
            class="pointer-events-none ml-2 font-helvetica-medium text-black text-16 spacing-5 line-28"
          >
            Open in Maps
          </span>
        </div>
      </div>
    </template>
  </accordions-list>
</template>
<script>
import { IonImg } from '@ionic/vue'
import SquareContainer from '../containers/SquareContainer.vue'
import AccordionsList from '../AccordionsList.vue'

export default {
  components: {
    IonImg,
    AccordionsList,
    SquareContainer
  },

  props: {
    instance: Object
  },

  computed: {
    activities () {
      if (
        this.instance &&
        this.instance.content &&
        this.instance.content.length
      ) {
        const array = this.instance.content.map(a => ({
          name: a.label,
          childs: a.events.map(i => i),
          count: a.events.length
        }))
        return array
      }
      return []
    }
  },

  methods: {
    openLink (link) {
      window.open(link)
    }
  }
}
</script>
