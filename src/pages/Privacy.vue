<template>
  <Page withMargin label="Privacy Policy" back>
    <p
      class="px-8 font-helvetica text-mid-dark-grey text-16 spacing-1 line-24 mb-4"
      v-html="formattedPrivacy"
    />

    <a
      class="font-helvetica text-mid-dark-grey text-12 spacing-1 line-24 mt-4 z-10"
      href="https://limacorporate.com/en/about-us/privacy-policy.html"
      title="LimaCorporate Privacy Policy"
      target="_blank"
      >Read the full Privacy Policy</a
    >
  </Page>
</template>

<script>
import Page from '../components/Page.vue'
export default {
  components: {
    Page
  },
  data () {
    return {
      privacy: ''
    }
  },
  computed: {
    formattedPrivacy () {
      return this.privacy
    }
  }
}
</script>
