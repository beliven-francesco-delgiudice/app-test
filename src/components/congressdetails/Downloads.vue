<template>
  <div class="flex flex-col px-8 pt-8">
    <div class="mb-4" v-for="(doc, i) in congressDocuments" :key="i">
      <document-list-item :document="doc" />
    </div>
  </div>
</template>
<script>
import DocumentListItem from '../DocumentListItem.vue'
export default {
  components: {
    DocumentListItem
  },
  props: {
    congress: Object
  },
  computed: {
    congressDocuments () {
      if (
        this.congress &&
        this.congress.content &&
        this.congress.content.length
      ) {
        return this.congress.content
      }
      return []
    }
  }
}
</script>
