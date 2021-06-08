<template>
  <ion-grid>
    <ion-row>
      <ion-col>
        <ion-item mode="md">
          <ion-label><ion-icon :icon="icons.mailOutline"></ion-icon></ion-label>
          <ion-input
            v-model="form.username"
            type="email"
            @focusout="$emit('blur')"
            required
          />
        </ion-item>
      </ion-col>
    </ion-row>
    <ion-row>
      <ion-col>
        <ion-item mode="md">
          <ion-label><ion-icon :icon="icons.keyOutline"></ion-icon></ion-label>
          <ion-input
            type="password"
            pattern="password"
            @focusout="$emit('blur')"
            required
            v-model="form.password"
          />
        </ion-item>
      </ion-col>
    </ion-row>
    <ion-row class="ion-padding-top">
      <ion-col>
        <ion-button expand="block" @click="submit">Login</ion-button>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script>
import {
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonInput,
  IonItem,
  IonButton,
  IonLabel
} from '@ionic/vue'
import icons from '@/mixins/icons'
import messages from '@/messages'

export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  mixins: [icons],
  methods: {
    submit () {
      if (!this.form.username || !this.form.password) return this.$toast({message: messages.errors.missingMailPassword, color: 'danger'})
      this.$emit('submit', this.form)
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