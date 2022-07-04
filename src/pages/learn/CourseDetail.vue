<template>
  <Page
    :back="'/learn'"
    :customGradient="gradient"
    :label="course.title || 'Course'"
  >
    <carousel
      v-if="sections && sections.length"
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
    <Detail v-if="section === 'info'" :course="course" />
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
      course: {},
      section: 'info',
      sections: []
    }
  },

  computed: {
    gradient () {
      return ''
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
        this.course = res
        setTimeout(() => {
          this.cleanParagraphs()
        }, 500)
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
  }
}
</script>
