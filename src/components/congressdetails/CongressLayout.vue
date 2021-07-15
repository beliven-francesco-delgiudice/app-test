<template>
  <Page :label="title" back>
    <carousel classes="pt-4 -my-4 pb-8">
      <section-button
        v-for="(theSection, i) in sections"
        :key="i"
        :active="section === theSection.path"
        :classes="[i === 0 ? 'ml-8' : '', ' mr-4']"
        :label="theSection.label"
        @onClick="changeSection(theSection.path)"
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
    section: String,
    sections: Array
  },
  data () {
    return {}
  },
  methods: {
    changeSection (path) {
      this.$emit('changeSection', path)
    }
  }
}
</script>
