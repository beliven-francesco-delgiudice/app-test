<template>
  <ion-grid>
    <ion-row>
      <ion-col>
         <ion-item mode="md" class="item-input">
          <ion-select 
            :disabled="!userTypes.length"
            interface="action-sheet"
            @ionChange="form.usertypeid = $event.detail.value"
            placeholder="Select user type"
          >
            <ion-select-option 
              v-for="type in userTypes"
              :key="type.id"
              :value="type.id"
            >{{type.description}}</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <ion-item mode="md">
          <ion-label><ion-icon :icon="icons.mailOutline"></ion-icon></ion-label>
          <ion-input
            type="email"
            v-model="form.email"
            placeholder="Email"
          />
        </ion-item>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <ion-item mode="md">
          <ion-label><ion-icon :icon="icons.personOutline"></ion-icon></ion-label>
          <ion-input
            v-model="form.firstname"
            placeholder="First name"
          />
        </ion-item>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <ion-item mode="md">
          <ion-label><ion-icon :icon="icons.personOutline"></ion-icon></ion-label>
          <ion-input
            v-model="form.lastname"
            placeholder="Last name"
          />
        </ion-item>
      </ion-col>
    </ion-row>
    <ion-row class="ion-padding-top">
      <ion-button class="margin-center" @click="submit">Add user</ion-button>
    </ion-row>
  </ion-grid>
</template>

<script>
import {
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonIcon,
  IonItem,
  IonButton,
  IonLabel
} from '@ionic/vue'
import icons from '@/mixins/icons'

export default {
  data () {
    return {
      form: {
        email: '',
        firstname: '',
        lastname: '',
        usertypeid: 0
      }
    }
  },
  mixins: [icons],
  async beforeMount () {
    if (!this.userTypes.length) await this.$store.dispatch('getUserTypes')
  },
  methods: {
    submit () {
      this.$emit('submit', this.form)
    }
  },
  computed: {
    userTypes: function () {
      return this.$store.getters.userTypes
    }
  },
  components: {
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
    IonItem,
    IonButton,
    IonLabel,
    IonIcon
  }
}
</script>