<template>
  <Page
    :aboveTitle="typeName"
    :back="'/learn'"
    :customGradient="gradient"
    :label="course.title || 'Course'"
  >
    <template #above-title>
      <span
        class="inline-block font-helvetica-medium text-12 py-1 px-2 rounded-6 text-white whitespace-nowrap spacing-34 line-18"
        :class="bgColor"
      >
        {{ typeName }}
      </span>
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
  </Page>
</template>

<script>
import Page from '../../components/Page.vue'
import SectionButton from '../../components/containers/SectionButton.vue'
import messages from '@/messages'
import urls from '@/urls'
import Detail from '../../components/learn/Detail.vue'

export default {
  components: {
    Page,
    SectionButton,
    Detail
  },

  data () {
    return {
      course: {
        id: 1,
        title:
          'Smart SPACE: your digital companion from pre-op planning to inter-op solutions',
        category: 'Reverse S2S',
        type: 2,
        location: 'San Diego, California - USA',
        date: '30 Jun - 2 Jul 2022',
        lang: ['en'],
        segments: [
          {
            img: '',
            name: 'Shoulder'
          }
        ],
        speakers: [
          {
            img: '',
            name: 'gatto'
          },
          {
            img: '',
            name: 'cane'
          }
        ],
        checkin_date: 'Thu, 30 Jun',
        checkout_date: 'Thu, 29 Jun',
        checkin_time: '10:30  utc',
        checkout_time: '10:30  utc'
      },
      section: 'info',
      sections: []
    }
  },

  computed: {
    gradient () {
      if (this.course && this.course.type) {
        switch (this.course.type) {
          case 1:
            return 'gradient-background-orange'
          case 2:
            return 'gradient-background-green'
          case 3:
            return 'gradient-background-cyan'
          default:
            return ''
        }
      }
      return ''
    },

    typeName () {
      if (this.course && this.course.type) {
        switch (this.course.type) {
          case 1:
            return 'Course'
          case 2:
            return 'Online course'
          case 3:
            return '3rd-Party event'
          default:
            return 'Other'
        }
      }
      return 'Other'
    },

    bgColor () {
      if (this.course && this.course.type) {
        switch (this.course.type) {
          case 1:
            return 'bg-orange'
          case 2:
            return 'bg-green'
          case 3:
            return 'bg-cyan'
          default:
            return 'bg-light-grey'
        }
      }
      return 'bg-light-grey'
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
    onRegister (id) {
      // TODO show modal
    }
  }
}
</script>
