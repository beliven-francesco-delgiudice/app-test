<template>
  <congress-layout
    :section="updatedSection"
    :sections="sectionsList"
    :title="title"
    @changeSection="selectSection"
  >
    <Info v-if="section === 'info'" :congress="updatedCongress.info" />
    <Details v-if="section === 'details'" :congress="updatedCongress.details" />
    <!-- <DayByDay v-if="section === 'components'" />
    <Activities v-if="section === 'documents'" />
    <Hotels v-if="section === 'documents'" />
    <KeyMessages v-if="section === 'documents'" />-->
  </congress-layout>
</template>

<script>
import CongressLayout from '../../components/congressdetails/CongressLayout.vue'
import Info from '../../components/congressdetails/Info.vue'
import Details from '../../components/congressdetails/Details.vue'
export default {
  components: {
    CongressLayout,
    Info,
    Details
  },
  data () {
    return {
      section: 'info',
      congress: {
        tabs: {
          info: {
            title: 'Info',
            content: {
              image: '/assets/test/congress.jpg',
              name: 'Nome evento',
              subtitle: 'Virtual tour',
              description_short: '<p>Descrizione corta</p>',
              description: '<p>Descrizione evento 1 2 3 4</p>',
              first_date: 'Tue, 01 Jun',
              last_date: 'Sat, 26 Jun',
              first_date_time: '15:00 pm',
              last_date_time: '18:00 pm',
              link: 'https://google.it',
              link_label: 'google.it',
              save_event:
                'https://lima-app-api.lndo.site/api/congresses/save-event/1'
            }
          },
          details: {
            title: 'Details',
            content: {
              congress_venue: {
                gallery: [
                  {
                    preview: '/assets/test/congress-gallery.jpg',
                    hd: '/assets/test/congress-gallery.jpg'
                  },
                  {
                    preview: '/assets/test/congress-gallery.jpg',
                    hd: '/assets/test/congress-gallery.jpg'
                  }
                ],
                title: 'Congress title',
                description: '<p>Congress description</p>',
                link_googlemaps: 'https://goo.gl/maps/EgzLrbHbMGDH2fs2A',
                link_googlemaps_label: 'View on Google Maps',
                link_download:
                  'https://limacorporate.com/repo/conferences/356a192b7913b04c54574d18c28d46e6395428ab/no-image_600x400.jpg',
                link_download_label: 'Download Congress Map'
              },
              timing_dates: {
                title: 'Timing title',
                description: '<p>Timing description long long long</p>',
                description_short: '<p>Timing description short</p>',
                from_date: 'Tue, 01 Jun',
                from_time: '15:00 pm',
                to_date: 'Sat, 26 Jun',
                to_time: '18:00 pm',
                save_event:
                  'https://lima-app-api.lndo.site/api/congresses/save-event/1'
              },
              lima_booth: {
                title: 'Lima booth Title',
                description_short: '<p>Prova</p>',
                description: '<p>Prova lung lung lung</p>',
                gallery: [
                  {
                    preview: '/assets/test/congress-gallery.jpg',
                    hd: '/assets/test/congress-gallery.jpg'
                  },
                  {
                    preview: '/assets/test/congress-gallery.jpg',
                    hd: '/assets/test/congress-gallery.jpg'
                  }
                ]
              },
              useful_information: {
                title: 'Useful intermation title',
                description: '<p>Useful intermation description</p>'
              }
            }
          },
          hotel: {
            title: 'Hotel & Transfer',
            content: {
              hotel: {
                image:
                  'https://limacorporate.com/repo/conferences-users/356a192b7913b04c54574d18c28d46e6395428ab/o_1f8f8ik1b1bku1uat1pfj1es4181e7_mob.jpg',
                name: 'Prova hotel',
                address: '<p>Indirizzo hotel</p>',
                googlemaps: 'mappa',
                info: '<p>Note hotel</p>',
                checkin_date: 'Fri, 18 Jun',
                checkin_time: '12:00 pm',
                checkout_date: 'Sun, 20 Jun',
                checkout_time: '23:00 pm',
                save_event:
                  'https://lima-app-api.lndo.site/api/congresses/save-hotel/1'
              },
              transfer: {
                transfer_date: 'Tue, 25 May',
                transfer_time: '12:00 pm',
                transfer_return_date: '',
                transfer_return_time: '',
                save_event:
                  'https://lima-app-api.lndo.site/api/congresses/save-transfer/1',
                info: '<p>Note transfer</p>'
              }
            }
          },
          day: {
            title: 'Day by day',
            content: [
              {
                date: 'Tue, 25 May 2021',
                events: [
                  {
                    time: '15:00 - 18:00 UTC',
                    title: 'Prova',
                    subtitle: 'Location',
                    description: '<p>Descrizione</p>',
                    save_event:
                      'https://lima-app-api.lndo.site/api/congresses/save-day/1'
                  },
                  {
                    time: '19:00 - 21:00 UTC',
                    title: 'Secondo evento',
                    subtitle: 'Stanza 2',
                    description: '<p>Prova di testo </p>',
                    save_event:
                      'https://lima-app-api.lndo.site/api/congresses/save-day/2'
                  }
                ]
              },
              {
                date: 'Fri, 18 Jun 2021',
                events: [
                  {
                    time: '12:00 - 15:00 UTC',
                    title: 'Terzo evento',
                    subtitle: 'Primo piano',
                    description: '<p>prova di testo</p>',
                    save_event:
                      'https://lima-app-api.lndo.site/api/congresses/save-day/3'
                  }
                ]
              }
            ]
          },
          activities: {
            title: 'Activities',
            content: [
              {
                label: 'Innovation Theatre',
                events: [
                  {
                    id: 1,
                    type: 'innovation_theatre',
                    title: 'Attività 1',
                    location: 'Stanza 1',
                    experts: [
                      {
                        id: 1,
                        image:
                          'https://limacorporate.com/images/experts-preview/356a192b7913b04c54574d18c28d46e6395428ab/o_1e1ef8ptg1vn1d071tmidhl1vtb9t_tmb.jpg'
                      },
                      {
                        id: 2,
                        image: 'https://limacorporate.com/images/'
                      }
                    ],
                    date: '26 May'
                  }
                ]
              },
              {
                label: 'Symposium',
                events: [
                  {
                    id: 2,
                    type: 'symposium',
                    title: 'Seconda attività',
                    location: 'Location 1',
                    experts: [
                      {
                        id: 2,
                        image: 'https://limacorporate.com/images/'
                      }
                    ],
                    date: '26 May'
                  }
                ]
              }
            ]
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
      const obj = Object.assign({}, this.congress.tabs)
      return obj
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
  }
}
</script>
