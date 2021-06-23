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
      :congress="updatedCongress.details"
    />
    <Hotels
      v-if="updatedSection === 'hotel'"
      :congress="updatedCongress.hotel"
    />
    <DayByDay v-if="section === 'day'" :congress="updatedCongress.day" />
    <Activities
      v-if="section === 'activities'"
      :congress="updatedCongress.activities"
    />
    <KeyMessages v-if="section === 'key'" :congress="updatedCongress.key" />
    <Downloads
      v-if="section === 'downloads'"
      :congress="updatedCongress.downloads"
    />
    <Contacts
      v-if="section === 'contacts'"
      :congress="updatedCongress.contacts"
    />
  </congress-layout>
</template>

<script>
import CongressLayout from '../../components/congressdetails/CongressLayout.vue'
import Info from '../../components/congressdetails/Info.vue'
import Details from '../../components/congressdetails/Details.vue'
import Hotels from '../../components/congressdetails/Hotels.vue'
import DayByDay from '../../components/congressdetails/DayByDay.vue'
import Activities from '../../components/congressdetails/Activities.vue'
import KeyMessages from '../../components/congressdetails/KeyMessages.vue'
import Downloads from '../../components/congressdetails/Downloads.vue'
import Contacts from '../../components/congressdetails/Contacts.vue'
export default {
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
                image: '/assets/test/congress.jpg',
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
                        image: '/assets/test/faculty1.jpg'
                      },
                      {
                        id: 2,
                        image: '/assets/test/faculty2.jpg'
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
                        image: '/assets/test/faculty1.jpg'
                      }
                    ],
                    date: '26 May'
                  }
                ]
              }
            ]
          },
          key: {
            title: 'Key messages',
            content: [
              {
                id: 2,
                title: 'Lorem ipsum dolor sic amet nuqmuam',
                text:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
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
              {
                id: 3,
                title: 'Lorem ipsum dolor sic ',
                text:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
              },
              {
                id: 4,
                title: 'Lorem ipsum dolor sic amet nuqmuam nuqmuam',
                text:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                gallery: [
                  {
                    preview: '/assets/test/congress-gallery.jpg',
                    hd: '/assets/test/congress-gallery.jpg'
                  }
                ]
              }
            ]
          },
          downloads: {
            title: 'Downloads',
            content: [
              {
                image: '/assets/test/file.jpg',
                type: 'file',
                label: 'Lorem ipsum',
                size: '3.6MB',
                link: 'link'
              },
              {
                image: '/assets/test/folder.jpg',
                type: 'folder',
                label: 'Lorem ipsum',
                size: '3.6MB',
                link: 'link'
              },
              {
                image: '/assets/test/file.jpg',
                type: 'file',
                label: 'Lorem ipsum',
                size: '3.6MB',
                link: 'link'
              }
            ]
          },
          contacts: {
            title: 'Contacts',
            content: {
              phone: '+49 (0) 30 246 03 250',
              mail: 'esska-congress@kit-group.org',
              link: 'esska-congress.org',
              hotel: {
                text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
                phone: 'T. +49 (0) 30 246 03 250',
                mail: 'grandpalacehotel@info.it'
              },
              venue: {
                text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
                phone: 'T. +49 (0) 30 246 03 250',
                mail: 'grandpalacehotel@info.it'
              },
              staff: {
                text: 'Lorem ipsum dolor sit amet consectetur adipiscing elit',
                employees: [
                  {
                    name: 'Name Surname',
                    phone: 'T. 347 8888888',
                    mail: 'namesurname@limacorporate.it'
                  },
                  {
                    name: 'Name Surname',
                    phone: 'T. 347 8888888',
                    mail: 'namesurname@limacorporate.it'
                  }
                ]
              }
            }
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
