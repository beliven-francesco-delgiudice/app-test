<template>
  <ion-grid class="full-height">
    <ion-row class="ion-align-items-center ion-justify-content-center full-height">
      <ion-col size-lg="4">
        <AddUserForm
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

import AddUserForm from './AddUserForm'

export default {
  methods: {
    async changePassword (data) {
      try {
        await this.$store.dispatch('addUserToTeam', data)
      } catch (e) {
        console.error(e)
        return
      }

      this.$toast({
        message: messages.userAdded,
        color: 'success'
      })

      this.$router.push('/')
    }
  },
  components: {
    AddUserForm,

    IonGrid,
    IonRow,
    IonCol
  }
}
</script>