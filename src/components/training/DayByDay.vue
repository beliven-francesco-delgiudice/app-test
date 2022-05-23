<template>
  <div class="flex flex-col">
    <detail-section
      v-for="(day, i) in updatedCongress"
      :key="i"
      :label="day.date"
      noSeparator
    >
      <div class="flex flex-col relative border-l border-grey mx-8 mb-4 mt-2">
        <div
          v-for="(event, j) in day.events"
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
            <span class="font-helvetica text-grey text-14 spacing-44 line-20">{{
              event.subtitle
            }}</span>

            <big-button
              bgClass="bg-black mt-4 "
              label="Save in calendar"
              v-if="event.save_event && event.save_event.length"
              @onClick="saveEvent(event)"
            />
            <!-- <div class="flex ml-2">
              <div
                @click="saveEvent(event)"
                :class="[
                  event.save_event && event.save_event.length
                    ? ''
                    : 'opacity-50 pointer-events-none',
                  ' mb-auto'
                ]"
              >
                <square-container
                  squareSize="44"
                  bgClass="bg-black"
                  classes="pointer-events-none flex"
                >
                  <ion-img
                    src="/assets/button-icons/add-calendar.svg"
                    class="m-auto"
                  />
                </square-container>
              </div>
            </div> -->
          </div>
          <p
            class="mmt-0 mb-0 mr-0 ml-8 font-helvetica text-16 text-mid-dark-grey spacing-1 line-24"
            v-html="event.description"
          ></p>
        </div>
      </div>
    </detail-section>
  </div>
</template>
<script>
// import SquareContainer from '../containers/SquareContainer.vue'
import DetailSection from '../DetailSection.vue'
import { IonImg } from '@ionic/vue'
import BigButton from '../containers/BigButton.vue'
export default {
  components: {
    // SquareContainer,
    DetailSection,
    IonImg,
    BigButton
  },
  props: {
    congress: Object
  },
  computed: {
    updatedCongress () {
      if (this.congress && this.congress.content) {
        return this.congress.content
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
