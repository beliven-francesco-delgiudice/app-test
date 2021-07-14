<template>
  <Page label="What's New" back="/menu">
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
    <Updates
      v-if="section === 'updates'"
      :filters="updatedFilters"
      @updateFilters="updateFilters"
    />
    <Notifications
      v-if="section === 'notifications'"
      @onChangeNotification="openNotification"
    />
    <notifications-modal
      v-if="notificationOpened !== null"
      :notificationID="notificationOpened"
      @onClose="closeNotification"
    />
  </Page>
</template>

<script>
import Page from '../../components/Page.vue'
import Updates from '../../components/whatsnew/Updates.vue'
import Notifications from '../../components/whatsnew/Notifications.vue'
import NotificationsModal from '../../components/whatsnew/NotificationsModal.vue'
import Carousel from '../../components/Carousel.vue'
import SectionButton from '../../components/containers/SectionButton.vue'
export default {
  components: {
    Page,
    Updates,
    Notifications,
    NotificationsModal,
    Carousel,
    SectionButton
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
      notificationOpened: null
    }
  },
  computed: {
    section () {
      return this.initSection
    }
  },
  methods: {
    routeToSection (path) {
      this.initSection = path
    },
    closeNotification () {
      this.notificationOpened = null
    },
    openNotification (notificationID) {
      this.notificationOpened = notificationID
    }
  }
}
</script>
