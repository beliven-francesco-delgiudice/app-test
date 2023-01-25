<template>
  <congress-layout
    :section="updatedSection"
    :sections="sectionsList"
    :title="title"
    @changeSection="selectSection"
  >
    <Info v-if="updatedSection === 'info'" :congress="updatedCongress.info" />
    <Details
      v-if="updatedSection === 'details'"
      isCongress
      :congress="updatedCongress.details"
    />
    <Hotels
      v-if="updatedSection === 'hotel'"
      isCongress
      :congress="updatedCongress.hotel"
    />
    <DayByDay v-if="section === 'day'" :congress="updatedCongress.day" />
    <Activities
      v-if="section === 'activities'"
      :congress="updatedCongress.activities"
    />
    <KeyMessages
      v-if="section === 'messages'"
      :congress="updatedCongress.messages"
    />
    <Downloads
      v-if="section === 'download'"
      :congress="updatedCongress.download"
    />
    <Contacts
      v-if="section === 'contacts'"
      isCongress
      :congress="updatedCongress.contacts"
    />
  </congress-layout>
</template>

<script>
import Info from '../../components/congressdetails/Info.vue'
import Hotels from '../../components/congressdetails/Hotels.vue'
import Details from '../../components/congressdetails/Details.vue'
import Contacts from '../../components/congressdetails/Contacts.vue'
import DayByDay from '../../components/congressdetails/DayByDay.vue'
import Downloads from '../../components/congressdetails/Downloads.vue'
import Activities from '../../components/congressdetails/Activities.vue'
import KeyMessages from '../../components/congressdetails/KeyMessages.vue'
import CongressLayout from '../../components/congressdetails/CongressLayout.vue'
import urls from '@/urls'
import messages from '@/messages'
import MatomoManager from '../../mixins/MatomoManager.vue'

export default {
  name: 'CongressDetail',

  components: {
    CongressLayout,
    Info,
    Details,
    Hotels,
    DayByDay,
    Activities,
    KeyMessages,
    Downloads,
    Contacts
  },

  mixins: [MatomoManager],

  data () {
    return {
      section: 'info',
      congress: {
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
        this.updatedCongress &&
        this.updatedCongress.info &&
        this.updatedCongress.info.content &&
        this.updatedCongress.info.content.name
      ) {
        return this.updatedCongress.info.content.name
      }
      return 'Congress details'
    },

    updatedCongress () {
      const congressObj = Object.assign({}, this.congress.tabs)
      return congressObj
    },

    updatedSection () {
      return this.section
    },

    sectionsList () {
      const newSections = Object.keys(this.updatedCongress)
      const array = []

      for (let i = 0; i < newSections.length; i++) {
        array.push({
          label: this.updatedCongress[newSections[i]].title,
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
      const congressID = this.$route.params.id
      try {
        const results = await this.$http({
          method: 'GET',
          url: urls.congresses.list + '/' + congressID,
          params: this.filters
        })
        this.congress = results
        this.logPage(results?.tabs?.info?.content?.name?.title || 'Congress Detail')
      } catch (e) {
        console.error(e)
        this.$toast({
          message: messages.errors.congressDetail,
          color: 'danger'
        })
      }
    } else {
      console.error('No congress id in route')
      this.$toast({
        message: messages.errors.congressDetail,
        color: 'danger'
      })
      this.$router.push('/congresses')
    }
  }
}
</script>
