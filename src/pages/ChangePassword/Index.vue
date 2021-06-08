<template>
  <ion-grid class="full-height">
    <ion-row class="ion-align-items-center ion-justify-content-center full-height">
      <ion-col size-lg="4">
        <ChangePasswordForm
          @submit="changePassword"
        />
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script>
import {
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/vue'
import messages from '@/messages'

import ChangePasswordForm from './ChangePasswordForm'

export default {
  methods: {
    async changePassword (data) {
      try {
        await this.$store.dispatch('changePassword', data)
      } catch (e) {
        console.error(e)
        return
      }

      this.$toast({
        message: messages.newPasswordSet,
        color: 'success'
      })

      this.$router.push('/')
    }
  },
  components: {
    ChangePasswordForm,

    IonGrid,
    IonRow,
    IonCol
  }
}
</script>