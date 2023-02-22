<template>
  <congress-layout
    :section="updatedSection"
    :sections="sectionsList"
    :title="title"
    @changeSection="selectSection"
  >
    <Info v-if="updatedSection === 'info'" :instance="updatedTraining.info" />
    <Testimonials
      v-if="updatedSection === 'messages'"
      :instance="updatedTraining.messages"
    />
    <Details
      v-if="updatedSection === 'details'"
      :instance="updatedTraining.details"
    />
    <Hotels
      v-if="updatedSection === 'hotel'"
      :congress="updatedTraining.hotel"
    />
    <DayByDay v-if="section === 'day'" :instance="updatedTraining.day" />
    <Activities
      v-if="section === 'activities'"
      :instance="updatedTraining.activities"
    />
    <Downloads
      v-if="section === 'download'"
      :congress="updatedTraining.download"
    />
    <Contacts
      v-if="section === 'contacts'"
      :instance="updatedTraining.contacts"
    />
  </congress-layout>
</template>

<script>
import Info from '../../components/training/Info.vue'
import Details from '../../components/training/Details.vue'
import Contacts from '../../components/training/Contacts.vue'
import DayByDay from '../../components/training/DayByDay.vue'
import Hotels from '../../components/congressdetails/Hotels.vue'
import Activities from '../../components/training/Activities.vue'
import Testimonials from '../../components/training/Testimonials.vue'
import Downloads from '../../components/congressdetails/Downloads.vue'
import CongressLayout from '../../components/congressdetails/CongressLayout.vue'
import urls from '@/urls'
import messages from '@/messages'
import MatomoManager from '../../mixins/MatomoManager.vue'

export default {
  name: 'SalesTrainingDetail',

  components: {
    CongressLayout,
    Info,
    Details,
    Hotels,
    DayByDay,
    Activities,
    Testimonials,
    Downloads,
    Contacts
  },

  mixins: [MatomoManager],

  data () {
    return {
      section: 'info',
      training: {
        tabs: {
          info: {
            title: 'Info',
            content: {}
          },
          details: {
            title: 'Details',
            content: {
              congress_venue: {},
              timing_dates: {},
              lima_booth: {},
              useful_information: {}
            }
          },
          hotel: {
            title: 'Hotel & Transfer',
            content: {
              hotel: {},
              transfer: {}
            }
          },
          day: {
            title: 'Day by day',
            content: []
          },
          activities: {
            title: 'Activities',
            content: []
          },
          key: {
            title: 'Key messages',
            content: []
          },
          downloads: {
            title: 'Downloads',
            content: []
          },
          contacts: {
            title: 'Contacts',
            content: {}
          }
        }
      }
    }
  },

  computed: {
    title () {
      if (
        this.updatedTraining &&
        this.updatedTraining.info &&
        this.updatedTraining.info.content &&
        this.updatedTraining.info.content.name
      ) {
        return this.updatedTraining.info.content.name
      }
      return 'Training details'
    },

    updatedTraining () {
      const object = Object.assign({}, this.training.tabs)
      return object
    },

    updatedSection () {
      return this.section
    },

    sectionsList () {
      const newSections = Object.keys(this.updatedTraining)
      const array = []

      for (let i = 0; i < newSections.length; i++) {
        array.push({
          label: this.updatedTraining[newSections[i]].title,
          path: newSections[i]
        })
      }
      return array
    }
  },

  methods: {
    selectSection (path) {
      this.section = path
    }
  },

  async created () {
    if (this.$route.params.id) {
      const trainingID = this.$route.params.id
      try {
        const results = await this.$http({
          method: 'GET',
          url: urls.training.list + '/' + trainingID,
          params: this.filters
        })
        this.training = results
        this.logPage(results?.tabs?.info?.content?.name + ' (Sales Training details)' || 'Sales Training Detail')
      } catch (e) {
        console.error(e)
        this.$toast({
          message: messages.errors.trainingDetail,
          color: 'danger'
        })
      }
    } else {
      console.error('No training id in route')
      this.$toast({
        message: messages.errors.trainingDetail,
        color: 'danger'
      })
      this.$router.push('/training')
    }
  }
}
</script>
