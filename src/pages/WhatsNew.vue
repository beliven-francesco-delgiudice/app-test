<template>
  <Page
    label="What's New"
    back="/menu"
    :filters="filters"
    :filtersOptions="options"
    @onFiltersChange="onFiltersChange"
  >
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
    <!-- <Updates
      v-if="section === 'updates'"
      :filters="updatedFilters"
      @updateFilters="updateFilters"
    />
    <Notifications
      v-if="section === 'widgets'"
      :filters="updatedFilters"
      @updateFilters="updateFilters"
    /> -->
  </Page>
</template>

<script>
// import Updates from '../../components/whatsnew/Updates.vue'
// import Notifications from '../../components/whatsnew/Notifications.vue'
export default {
  components: {
    // Updates,
    // Notifications
  },
  data () {
    return {
      initSection: 'notifications',
      sections: [
        {
          label: 'Notifications',
          path: 'notifications'
        },
        {
          label: 'App updates',
          path: 'updates'
        }
      ],
      filtersOptions: {},
      filters: {}
    }
  },
  computed: {
    section () {
      if (this.$route.meta && this.$route.meta.section) {
        return this.$route.meta.section
      }
      return this.initSection
    },
    options () {
      return this.filtersOptions
    },
    updatedFilters () {
      return this.filters
    }
  },
  methods: {
    routeToSection (path) {
      let link = `/new/`
      if (path && path !== 'updates') {
        link += path
      }
      this.$router.push(link)
    },
    updateFilters (payload) {
      this.filters = payload.filters
      this.filtersOptions = payload.filtersOptions
    },
    onFiltersChange (filterObj) {
      this.filters = Object.assign({}, filterObj)
    }
  }
}
</script>
