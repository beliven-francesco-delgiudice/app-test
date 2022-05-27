<template>
  <congress-layout
    :section="updatedSection"
    :sections="sectionsList"
    :title="title"
    @changeSection="selectSection"
  >
    <Info v-if="updatedSection === 'info'" :instance="updatedTraining.info" />
    <Testimonials
      v-if="updatedSection === 'testimonials'"
      :instance="updatedTraining.testimonials"
    />
    <Details
      v-if="updatedSection === 'details'"
      :instance="updatedTraining.details"
    />
    <Hotels
      v-if="updatedSection === 'hotel'"
      :congress="updatedTraining.hotel"
    />
    <DayByDay v-if="section === 'day'" :congress="updatedTraining.day" />
    <Activities
      v-if="section === 'activities'"
      :congress="updatedTraining.activities"
    />
    <Downloads
      v-if="section === 'download'"
      :congress="updatedCongress.download"
    />
    <Contacts
      v-if="section === 'contacts'"
      :congress="updatedCongress.contacts"
    />
  </congress-layout>
</template>

<script>
import CongressLayout from '../../components/congressdetails/CongressLayout.vue'
import Info from '../../components/training/Info.vue'
import Details from '../../components/training/Details.vue'
import Hotels from '../../components/congressdetails/Hotels.vue'
import DayByDay from '../../components/training/DayByDay.vue'
import Testimonials from '../../components/training/Testimonials.vue'
import Downloads from '../../components/congressdetails/Downloads.vue'
import Contacts from '../../components/training/Contacts.vue'
import Activities from '../../components/training/Activities.vue'
import messages from '@/messages'
import urls from '@/urls'

export default {
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
      return 'Congress details'
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
