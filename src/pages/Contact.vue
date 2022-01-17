<template>
  <Page support label="Contacts" back="/menu" mail="info@limacorporate.com">
    <carousel id="sections-carousel" classes="pt-4 -my-4 pb-8">
      <section-button
        v-for="(theSection, i) in sectionsForCarousel"
        :key="i"
        :active="section === theSection.path"
        :classes="[i === 0 ? 'ml-8' : '', ' mr-4']"
        :label="theSection.label"
        @onClick="changeSection(theSection.path)"
      />
      <div>&nbsp;</div>
    </carousel>
    <div class="flex flex-col px-8 mt-4">
      <div
        v-for="(sub, k) in sectionToShow.voices"
        :key="k"
        class="flex flex-row pb-4 mb-4 items-center justify-between"
        @click="openModal(sub)"
      >
        <div class="flex flex-col justify-between">
          <span
            class="font-helvetica-medium text-16 text-black spacing-5 line-28"
          >
            {{ sub.title }}
          </span>
          <span class="font-helvetica text-14 text-grey spacing-44 line-24">
            {{ sub.subtitle }}
          </span>
        </div>
        <ion-button
          type="button"
          class="relative my-auto ml-auto pointer-events-none transparent-button"
        >
          <ion-img
            src="/assets/button-icons/back.svg"
            className="pointer-events-none width-17 height-17 rotate-180"
          />
        </ion-button>
      </div>
    </div>
    <contacts-modal
      v-if="subsidiary"
      :subsidiary="subsidiary"
      @onClose="closeSubsidiary"
    />
  </Page>
</template>
<script>
import Carousel from '../components/Carousel.vue'
import Page from '../components/Page.vue'
import SectionButton from '../components/containers/SectionButton'
import ContactsModal from '../components/ContactsModal.vue'
import messages from '@/messages'
import urls from '@/urls'
export default {
  components: {
    Page,
    Carousel,
    SectionButton,
    ContactsModal
  },
  data () {
    return {
      section: 0,
      subsidiaryOpened: null,
      sections: [
        {
          id: 1,
          title: 'LimaCorporate',
          subsidiaries: [
            {
              image: '/assets/icon/italy.svg',
              title: 'Limacorporate S.p.A.',
              location: 'Udine, Italy',
              contacts: {
                address:
                  'Via Nazionale, 52 <br/> 33038 Villanova di San Daniele del Friuli <br/> Udine - ITALY',
                phone: '(+39) 0432 945511',
                fax: '(+39) 0432 945511',
                mail: 'info@limacorporate.com'
              }
            },
            {
              image: '/assets/icon/italy.svg',
              title: 'Limacorporate S.p.A.',
              location: 'Udine, Italy',
              contacts: {
                address:
                  'Via Nazionale, 52 <br/> 33038 Villanova di San Daniele del Friuli <br/> Udine - ITALY',
                phone: '(+39) 0432 945511',
                fax: '(+39) 0432 945511',
                mail: 'info@limacorporate.com'
              }
            }
          ]
        },
        {
          id: 2,
          title: 'Southern America',
          subsidiaries: [
            {
              image: '/assets/icon/italy.svg',
              title: 'Limacorporate S.p.A. AMERICA',
              location: 'Udine, Italy',
              contacts: {
                address:
                  'Via Nazionale, 52 <br/> 33038 Villanova di San Daniele del Friuli <br/> Udine - ITALY',
                phone: '(+39) 0432 945511',
                fax: '(+39) 0432 945511',
                mail: 'info@limacorporate.com'
              }
            },
            {
              image: '/assets/icon/italy.svg',
              title: 'Limacorporate S.p.A. AMERICA2',
              location: 'Udine, Italy',
              contacts: {
                address:
                  'Via Nazionale, 52 <br/> 33038 Villanova di San Daniele del Friuli <br/> Udine - ITALY',
                phone: '(+39) 0432 945511',
                fax: '(+39) 0432 945511',
                mail: 'info@limacorporate.com'
              }
            }
          ]
        }
      ]
    }
  },
  async created () {
    try {
      const contacts = await this.$http({
        method: 'GET',
        url: urls.contacts,
        params: {}
      })
      this.sections = contacts
    } catch (e) {
      console.error(e)
      this.$toast({
        message: messages.errors.contacts,
        color: 'danger'
      })
    }
  },

  computed: {
    formattedSections () {
      return this.sections.map((sec, i) => ({
        ...sec,
        id: i
      }))
    },
    sectionsForCarousel () {
      return this.formattedSections.map(sec => ({
        path: sec.id,
        label: sec.tab
      }))
    },
    sectionToShow () {
      return this.formattedSections.find(sec => sec.id === this.section)
    },
    subsidiary () {
      if (this.subsidiaryOpened && Object.keys(this.subsidiaryOpened).length) {
        return this.subsidiaryOpened
      }
      return null
    }
  },
  methods: {
    changeSection (id) {
      this.section = id
    },
    async openModal (subsidiary) {
      const subsidiaryID = subsidiary.id
      if (subsidiaryID) {
        try {
          const results = await this.$http({
            method: 'GET',
            url: urls.contacts + '/' + subsidiaryID,
            params: {}
          })
          this.subsidiaryOpened = results
        } catch (e) {
          console.error(e)
          this.$toast({
            message: messages.errors.contactsDetail,
            color: 'danger'
          })
        }
      } else {
        console.error('No contact id')
        this.$toast({
          message: messages.errors.contactsDetail,
          color: 'danger'
        })
      }
    },
    closeSubsidiary () {
      this.subsidiaryOpened = null
    }
  }
}
</script>
