<template>
  <ion-list v-if="userData">
    <ion-item v-for="(userValue, userKey) in userData" :key="userValue">
      <ion-label>
        <h2>{{capitalizeFirstLetter(userKey)}}</h2>
        <ul v-if="valIsArray(userValue)">
          <li v-for="val in userValue" :key="val"><p>{{val}}</p></li>
        </ul>
        <p v-else>{{userValue}}</p>
      </ion-label>
    </ion-item>

    <ion-button size="full" @click="addUserToTeam" class="ion-margin-bottom ion-margin-top">Add user to team</ion-button>
    <ion-button size="full" @click="changePassword" color="warning" class="ion-margin-bottom">Change password</ion-button>
    <ion-button size="full" color="danger" @click="logout">Logout</ion-button>
  </ion-list>
</template>

<script>
import {
  IonLabel,
  IonItem,
  IonList,
  IonButton
} from '@ionic/vue'

export default {
  async beforeMount () {
    this.info = await this.$device.getInfo()
    await this.$store.dispatch('getUserData')
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
    },
    changePassword () {
      this.$router.push('/user/changepassword')
    },
    addUserToTeam () {
      this.$router.push('/user/addusertoteam')
    }
  },
  computed: {
    userData () {
      const udata = this.$store.getters.userData
      const appVersion = this.info ? this.info.appVersion : 'Unknown'

      return Object.keys(udata).length ? {
        appVersion,
        ...udata
      } : false
    }
  },
  components: {
    IonList,
    IonLabel,
    IonItem,
    IonButton
  }
}
</script>