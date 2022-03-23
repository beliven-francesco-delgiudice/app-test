<template>
  <Details v-if="section === 'details'" />
  <Components v-if="section === 'components'" />
  <Documents v-if="section === 'documents'" />
</template>

<script>
import Details from '../../components/productdetails/Details.vue'
import Documents from '../../components/productdetails/Documents.vue'
import Components from '../../components/productdetails/Components.vue'

export default {
  components: {
    Details,
    Documents,
    Components
  },
  data () {
    return {
      initSection: 'details'
    }
  },
  computed: {
    section () {
      if (this.$route.meta && this.$route.meta.section) {
        return this.$route.meta.section
      }
      return this.initSection
    }
  }
}
</script>
