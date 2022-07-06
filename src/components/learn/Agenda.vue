<template>
  <accordions-list classes="mt-4 px-8" :list="list">
    <template v-slot="{ item }">
      <div class="flex flex-col">
        <div class="p-8 bg-light-red flex flex-col rounded-8 mb-4">
          <div>
            <span
              class="block mb-2 font-helvetica text-14 text-red spacing-2 line-24"
            >
              {{ item.time }}
            </span>
            <span
              class="block mb-4 font-helvetica-medium text-16 text-dark-grey spacing-4 line-24"
            >
              {{ item.title }}
            </span>
          </div>
          <separator noYMargin v-if="item.speakers && item.speakers.length" />
          <ion-list class="bg-transparent py-0 mt-4">
            <div
              v-for="(speaker, i) in item.speakers"
              class="flex flex-row justify-between items-center bg-transparent"
              :class="i === item.speakers.length - 1 || 'mb-4'"
              :key="i"
            >
              <div
                class="flex flex-start items-center pointer-events-none w-full"
              >
                <square-container
                  bgClass="bg-white"
                  squareSize="64"
                  rounded="12"
                  classes="mr-4 overflow-hidden"
                >
                  <ion-img :src="speaker.preview" class="w-full h-full" />
                </square-container>
                <div class="flex flex-col justify-between items-start">
                  <span
                    class="font-helvetica-medium text-dark-grey text-16 spacing-5 line-28"
                  >
                    {{ speaker.name }}
                  </span>
                  <span
                    class="font-helvetica text-grey text-14 spacing-44 line-24"
                  >
                    {{ speaker.country }}
                  </span>
                </div>
              </div>
            </div>
          </ion-list>
          <separator v-if="course.show_register" noYMargin />
          <big-button
            v-if="course.show_register"
            bgClass="bg-black mt-4"
            label="Register to this course"
            @onClick="$emit('register', item)"
          />
        </div>
        <p
          class="font-helvetica-normal text-mid-dark-grey text-16 spacing-1 line-24 mt-4"
          v-html="item.description"
        ></p>
        <div class="flex flex-col pt-8">
          <div class="mb-4" v-for="(doc, i) in item.files" :key="i">
            <document-list-item
              type="my"
              :document="doc"
              :actions="doc.actions"
            />
          </div>
        </div>
      </div>
    </template>
  </accordions-list>
</template>

<script>
import Separator from '../Separator'
import AccordionsList from '../AccordionsList'
import BigButton from '../containers/BigButton'
import SquareContainer from '../containers/SquareContainer'
import DocumentListItem from '../DocumentListItem'

export default {
  name: 'Agenda',

  components: {
    BigButton,
    Separator,
    AccordionsList,
    SquareContainer,
    DocumentListItem
  },

  props: {
    course: {
      type: Object
    }
  },

  computed: {
    list () {
      if (this.course && this.course.days && this.course.days.length) {
        const array = this.course.days.map(a => ({
          name: a.date_text,
          childs: [{ ...a }],
          count: null
        }))
        console.log(array)
        return array
      }
      return []
    }
  }
}
</script>
