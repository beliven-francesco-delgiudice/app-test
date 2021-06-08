<template>
  <ion-grid>
    <ion-row>
      <ion-col>
        <ion-item mode="md">
          <ion-label><ion-icon :icon="icons.mailOutline"></ion-icon></ion-label>
          <ion-input
            v-model="form.email"
          />
        </ion-item>
      </ion-col>
    </ion-row>
    <ion-row class="ion-padding-top">
      <ion-button class="margin-center" @click="submit">Reset</ion-button>
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
        email: ''
      }
    }
  },
  mixins: [icons],
  methods: {
    submit () {
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