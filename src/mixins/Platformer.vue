<script>
import { Capacitor } from '@capacitor/core'

export default {
  name: 'Platformer',

  computed: {
    isIos () {
      if (
        Capacitor &&
        Capacitor.getPlatform() &&
        Capacitor.getPlatform() === 'ios'
      ) {
        return true
      }
      return false
    }
  }
}
</script>

<style></style>
