<script>
export default {
  name: 'MatomoManager',

  methods: {
    logPage (name) {
      this.$matomo.setScreen({
        name,
        path: this.$route.path,
      })
      // this.$matomo.logPage(name, id)
      this.$matomo.trackView()
    },

    logEvent (category, name, params) {
      this.$matomo.logEvent(category, name, params)
    },
  }
}
</script>
