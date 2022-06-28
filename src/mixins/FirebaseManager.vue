<script>
export default {
  name: 'FirebaseManager',

  mounted () {
    this.logScreen(this.$route.name)
  },

  methods: {
    async logEvent (name, params = {}) {
      try {
        const userId = this.$store.getters.userData.id
        const res = await this.$firebase.logEvent(name, params, userId)
        console.log(res)
      } catch (err) {
        console.log('Firebase error: ', err)
      }
    },

    logScreen (screen) {
      return this.logEvent('screen_view', {
        firebase_screen: screen,
        screen_name: screen
      })
    }
  }
}
</script>
