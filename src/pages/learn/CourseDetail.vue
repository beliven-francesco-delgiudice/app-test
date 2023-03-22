<template>
  <Page
    :back="'/learn/list'"
    :share="shareObject"
    :aboveTitle="typeName"
    :customGradient="gradient"
    :label="course.title || 'Course'"
  >
    <template #above-title>
      <span
        class="font-helvetica-medium text-12 py-1 px-2 rounded-6 text-white whitespace-nowrap spacing-34 line-18"
        :class="bgColor"
      >
        {{ typeName }}
      </span>
      <div class="mb-2"></div>
    </template>
    <carousel
      v-if="course.show_tabs"
      id="sections-carousel"
      classes="pt-4 -my-4 pb-8"
    >
      <section-button
        v-for="(theSection, i) in sections"
        :key="i"
        :label="theSection.label"
        :active="section === theSection.path"
        :classes="[i === 0 ? 'ml-8' : '', ' mr-4']"
        @onClick="routeToSection(theSection.path)"
      />
      <div>&nbsp;</div>
    </carousel>
    <Detail v-if="section === 'info'" :course="course" @register="onRegister" />
    <Agenda
      v-if="section === 'agenda'"
      :course="course"
      @register="onRegister"
    />
    <register-modal
      :course="course"
      :open="isRegisterOpened"
      :selected-day="selectedDay"
      @onClose="onClose"
    />
  </Page>
</template>

<script>
import Page from '../../components/Page.vue'
import Carousel from '../../components/Carousel.vue'
import Detail from '../../components/learn/Detail.vue'
import Agenda from '../../components/learn/Agenda.vue'
import RegisterModal from '../../components/learn/RegisterModal.vue'
import SectionButton from '../../components/containers/SectionButton.vue'
import urls from '@/urls'
import messages from '@/messages'
import MatomoManager from '../../mixins/MatomoManager.vue'

export default {
  name: 'CourseDetail',

  components: {
    Page,
    Detail,
    Agenda,
    Carousel,
    RegisterModal,
    SectionButton
  },

  mixins: [MatomoManager],

  data () {
    return {
      course: {},
      section: 'info',
      sections: [
        { label: 'Info', path: 'info' },
        {
          label: 'Agenda',
          path: 'agenda'
        }
      ],
      selectedDay: null,
      isRegisterOpened: false
    }
  },

  computed: {
    gradient () {
      if (this.course && this.course.category) {
        switch (this.course.category.class) {
          case 'course':
            return 'gradient-background-orange'
          case 'online':
            return 'gradient-background-green'
          case 'third':
            return 'gradient-background-cyan'
          default:
            return ''
        }
      }
      return ''
    },

    typeName () {
      if (this.course && this.course.category) {
        switch (this.course.category.class) {
          case 'course':
            return 'Course'
          case 'online':
            return 'Online course'
          case 'third':
            return '3rd-Party event'
          default:
            return 'Other'
        }
      }
      return 'Other'
    },

    bgColor () {
      if (this.course && this.course.category) {
        switch (this.course.category.class) {
          case 'course':
            return 'bg-orange'
          case 'online':
            return 'bg-green'
          case 'third':
            return 'bg-cyan'
          default:
            return 'bg-light-grey'
        }
      }
      return 'bg-light-grey'
    },

    shareObject () {
      const slugifiedTitle = (this.course.title || 'course')
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-')
      return {
        actionCategory: 'Course',
        title: this.course.title,
        text: `Look at the course "${this.course.title}"`,
        url: `https://limacorporate.com/en/learn-event/${this.course.id}/${slugifiedTitle}.html`,
        dialogTitle: 'Share course'
      }
    }
  },

  async created () {
    if (this.$route.params.id) {
      try {
        const res = await this.$http({
          method: 'GET',
          url: urls.learn.list + '/' + this.$route.params.id,
          params: {}
        })
        if (res) {
          this.course = res
          setTimeout(() => {
            this.cleanParagraphs()
          }, 500)
        }
        this.logPage(res&&res.title ? res.title + ' (Learn detail)' : 'Learn detail')
      } catch (e) {
        console.error(e)
        this.$toast({
          message: messages.errors.learnDetail,
          color: 'danger'
        })
      }
    } else {
      console.error('No course id in route')
      this.$toast({
        message: messages.errors.learnDetail,
        color: 'danger'
      })
      this.$router.back()
    }
  },

  methods: {
    onRegister (day) {
      this.selectedDay = day
      this.isRegisterOpened = true
    },

    onClose () {
      this.isRegisterOpened = false
    },

    routeToSection (value) {
      this.section = value
    }
  }
}
</script>
