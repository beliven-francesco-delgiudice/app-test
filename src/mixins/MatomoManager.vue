<script>
export default {
  name: 'MatomoManager',

  methods: {
    logPage (name) {
      console.log(this.$route)
      this.$matomo.setScreen({
        name,
        path: this.$route.path,
      })
      // this.$matomo.logPage(name, id)
      this.$matomo.trackView()
    },

    logEvent (name, params) {
      this.$matomo.logEvent(name, params)
    },
  }
}
</script>
