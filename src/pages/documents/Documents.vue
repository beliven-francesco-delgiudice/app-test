<template>
  <Page label="Documents" back>
    <carousel id="sections-carousel" classes="pt-4 -my-4 pb-8">
      <section-button
        v-for="(theSection, i) in formattedSections"
        :key="i"
        :active="section === theSection.path"
        :classes="[i === 0 ? 'ml-8' : '', ' mr-4']"
        :red="theSection.path === 'us'"
        :label="theSection.label"
        @onClick="changeSection(theSection.path)"
      />
      <div>&nbsp;</div>
    </carousel>
    <div class="flex flex-col px-8 pt-8">
      <div class="mb-4" v-for="(doc, i) in documentsToShow" :key="i">
        <document-list-item
          :document="doc"
          :type="updatedSection"
          :actions="doc.actions"
        />
      </div>
    </div>
    <add-button-and-modal title="Documents" v-if="updatedSection === 'my'" />
  </Page>
</template>

<script>
import Page from '../../components/Page'
import Carousel from '../../components/Carousel'
import SectionButton from '../../components/containers/SectionButton'
import DocumentListItem from '../../components/DocumentListItem'
import AddButtonAndModal from '../../components/documents/AddButtonAndModal'
import messages from '@/messages'
import urls from '@/urls'
export default {
  components: {
    Page,
    Carousel,
    SectionButton,
    DocumentListItem,
    AddButtonAndModal
  },
  data () {
    return {
      section: 'my',
      sections: [
        {
          path: 'my',
          label: 'My Docs'
        },
        {
          path: 'shared',
          label: 'Shared with me'
        }
      ],
      documents: {
        my: [],
        shared: [],
        us: []
      }
    }
  },

  computed: {
    formattedSections () {
      const sections = this.sections
      if (this.$store.getters.showUS) {
        sections.unshift({
          path: 'us',
          label: 'US'
        })
      }
      return sections
    },

    updatedDocuments () {
      let docsObj = this.$store.getters.documents || []
      if (
        this.documents[this.updatedSection] &&
        this.documents[this.updatedSection].length
      ) {
        docsObj[this.updatedSection] = this.documents[this.updatedSection]
      }
      return docsObj
    },

    updatedSection () {
      return this.section
    },

    documentsToShow () {
      return this.updatedDocuments[this.updatedSection] || []
    }
  },

  methods: {
    changeSection (path) {
      this.section = path
      this.getDocuments()
    },
    async getDocuments (loader = false) {
      try {
        const endpoint = 'list_' + this.updatedSection
        const results = await this.$http({
          method: 'GET',
          url: urls.documents[endpoint],
          params: this.filters,
          loader
        })
        this.documents[this.updatedSection] = results.list
      } catch (e) {
        console.error(e)
        this.$toast({
          message: messages.errors.documents,
          color: 'danger'
        })
      }
    }
  },

  async mounted () {
    if (this.$store.getters.showUS) {
      this.section = 'us'
    }
    this.getDocuments(true)
  }
}
</script>
