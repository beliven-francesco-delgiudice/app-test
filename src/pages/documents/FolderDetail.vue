<template>
  <Page :label="updatedDocuments.back.name || 'Folder'" back>
    <div class="flex flex-col px-8 pt-8">
      <div class="mb-4" v-for="(doc, i) in updatedDocuments.list" :key="i">
        <document-list-item
          :document="doc"
          :type="updatedDocuments.type"
          :actions="doc.actions"
        />
      </div>
    </div>
    <add-button-and-modal
      v-if="updatedDocuments.type === 'my'"
      :title="updatedDocuments.back.name"
      :parent="updatedDocuments.back.id"
    />
  </Page>
</template>

<script>
import Page from '../../components/Page'
import DocumentListItem from '../../components/DocumentListItem'
import messages from '@/messages'
import urls from '@/urls'
import AddButtonAndModal from '../../components/documents/AddButtonAndModal'
export default {
  components: {
    Page,
    DocumentListItem,
    AddButtonAndModal
  },
  data () {
    return {
      documents: {
        back: {},
        list: [],
        type: ''
      }
    }
  },
  computed: {
    updatedDocuments () {
      const obj = Object.assign({}, this.documents)
      return obj
    }
  },
  methods: {
    async getDocuments () {
      if (this.$route.params.id && this.$route.query.type) {
        const folderID = this.$route.params.id
        const folderType = this.$route.query.type

        try {
          const endpoint = 'list_' + folderType
          const results = await this.$http({
            method: 'GET',
            url: urls.documents[endpoint] + '/' + folderID,
            params: this.filters
          })
          this.documents = results
        } catch (e) {
          console.error(e)
          this.$toast({
            message: messages.errors.documents,
            color: 'danger'
          })
        }
      } else {
        console.error('No documents id in route')
        this.$toast({
          message: messages.errors.folderDetail,
          color: 'danger'
        })
        this.$router.push('/documents')
      }
    }
  },
  async mounted () {
    this.getDocuments()
  },
  watch: {
    '$route.params.id' () {
      if (
        this.$router.currentRoute &&
        this.$router.currentRoute.value &&
        this.$router.currentRoute.value.path &&
        this.$router.currentRoute.value.path.includes('folder')
      ) {
        this.getDocuments()
      }
    }
  }
}
</script>
