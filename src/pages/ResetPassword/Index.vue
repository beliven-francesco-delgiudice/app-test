<template>
  <ion-grid class="full-height">
    <ion-row class="ion-align-items-center ion-justify-content-center full-height">
      <ion-col size-lg="4">
        <ResetForm
          @submit="sendReset"
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

import ResetForm from './ResetForm'

export default {
  methods: {
    async sendReset (data) {
      try {
        await this.$store.dispatch('resetPassword', data)
      } catch (e) {
        console.error(e)
        return
      }

      this.$toast({
        message: messages.recoverMailSent,
        color: 'success'
      })
    }
  },
  components: {
    ResetForm,

    IonGrid,
    IonRow,
    IonCol
  }
}
</script>