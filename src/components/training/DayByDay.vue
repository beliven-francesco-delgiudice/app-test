<template>
  <accordions-list classes="mt-4 px-8" :list="computedInstance">
    <template v-slot="{ item }">
      <div class="flex flex-col relative border-l border-grey mx-4 mb-4 mt-2">
        <div
          v-for="(event, j) in item"
          :key="j"
          :class="[j > 0 ? 'mt-8' : '', 'relative']"
        >
          <ion-img
            src="/assets/button-icons/dot.svg"
            class="absolute top-0"
            style="width:7px;height:7px;margin-left:-3.5px;margin-top: 1.35rem;"
          />
          <div
            class="ml-8 relative p-4 bg-light-red rounded-8 flex flex-col mb-4 justify-between items-start"
          >
            <span
              class="font-helvetica text-red text-14 spacing-2 line-24 mb-2"
              >{{ event.time }}</span
            >
            <span
              class="font-helvetica-medium text-dark-grey text-16 spacing-4 line-24 mb-2"
              >{{ event.title }}</span
            >
            <span class="font-helvetica text-grey text-14 spacing-44 line-20">
              {{ event.subtitle }}
            </span>
          </div>
          <p
            class="mmt-0 mb-0 mr-0 ml-8 font-helvetica text-16 text-mid-dark-grey spacing-1 line-24"
            v-html="event.description"
          ></p>
        </div>
      </div>
    </template>
  </accordions-list>
</template>
<script>
import AccordionsList from '../AccordionsList.vue'
import { IonImg } from '@ionic/vue'

export default {
  components: {
    AccordionsList,
    IonImg
  },

  props: {
    instance: Object
  },

  computed: {
    computedInstance () {
      if (this.instance && this.instance.content) {
        const array = this.instance.content.map(a => ({
          name: a.date,
          childs: [a.events],
          count: a.events.length
        }))
        return array
      }
      return []
    }
  },

  methods: {
    saveEvent (event) {
      window.open(event.save_event)
    }
  }
}
</script>
