<template>
  <Page label="Contacts" back mail="info@limacorporate.com">
    <carousel classes="pt-4 -my-4 pb-8">
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
        v-for="(sub, k) in sectionToShow.subsidiaries"
        :key="k"
        class="flex flex-row pb-4 mb-4 items-center"
        @click="openModal(sub)"
      >
        <square-container
          bgClass="bg-white"
          squareSize="64"
          rounded="full"
          classes="mr-4"
        >
          <ion-img :src="sub.image" class="width-44 height-44" />
        </square-container>
        <div class="flex flex-col justify-between">
          <span
            class="font-helvetica-medium text-16 text-black spacing-5 line-28"
          >
            {{ sub.title }}
          </span>
          <span class="font-helvetica text-14 text-grey spacing-44 line-24">
            {{ sub.location }}
          </span>
        </div>
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
import SquareContainer from '../components/containers/SquareContainer.vue'
import ContactsModal from '../components/ContactsModal.vue'
export default {
  components: {
    Page,
    Carousel,
    SectionButton,
    SquareContainer,
    ContactsModal
  },
  data () {
    return {
      section: 1,
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
  computed: {
    sectionsForCarousel () {
      return this.sections.map(sec => ({
        path: sec.id,
        label: sec.title
      }))
    },
    sectionToShow () {
      return this.sections.find(sec => sec.id === this.section)
    },
    subsidiary () {
      console.log(
        this.subsidiaryOpened,
        this.subsidiaryOpened ? Object.keys(this.subsidiaryOpened).length : ''
      )
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
    openModal (subsidiary) {
      this.subsidiaryOpened = subsidiary
    },
    closeSubsidiary () {
      this.subsidiaryOpened = null
    }
  }
}
</script>
