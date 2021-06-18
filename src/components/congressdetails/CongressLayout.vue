<template>
  <Page :label="title" back more>
    <carousel classes="pt-4 -my-4 pb-8">
      <section-button
        v-for="(theSection, i) in sections"
        :key="i"
        :active="section === theSection.path"
        :classes="[i === 0 ? 'ml-8' : '', ' mr-4']"
        :label="theSection.label"
        @onClick="routeToSection(theSection.path)"
      />
      <div>&nbsp;</div>
    </carousel>
    <slot></slot>
  </Page>
</template>
<script>
import Carousel from '../Carousel.vue'
import Page from '../Page.vue'
import SectionButton from '../containers/SectionButton'
export default {
  components: {
    Page,
    Carousel,
    SectionButton
  },
  props: {
    title: String,
    congressID: Number,
    section: String
  },
  data () {
    return {
      sections: [
        {
          label: 'Info',
          path: 'info'
        },
        {
          label: 'Details',
          path: 'details'
        },
        {
          label: 'Day by day',
          path: 'daybyday'
        },
        {
          label: 'Activities',
          path: 'activities'
        },
        {
          label: 'Hotel & Transfer',
          path: 'hotels'
        },
        {
          label: 'Key messages',
          path: 'keymessages'
        }
      ]
    }
  },
  methods: {
    routeToSection (path) {
      let link = `/congresses/${this.congressID}/`
      if (path) {
        link += path
      }
      this.$router.push(link)
    }
  }
}
</script>
