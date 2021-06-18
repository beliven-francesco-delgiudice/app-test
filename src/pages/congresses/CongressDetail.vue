<template>
  <Info v-if="section === 'info'" />
  <!-- <Details v-if="section === 'details'" /> -->
  <!-- <DayByDay v-if="section === 'components'" />
  <Activities v-if="section === 'documents'" />
  <Hotels v-if="section === 'documents'" />
  <KeyMessages v-if="section === 'documents'" />-->
</template>

<script>
import Info from '../../components/congressdetails/Info.vue'
// import Details from '../../components/congressdetails/Details.vue'
export default {
  components: {
    Info
    // Details
  },
  data () {
    return {
      initSection: 'info'
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
