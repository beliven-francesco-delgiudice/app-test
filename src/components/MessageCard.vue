<template>
  <ion-card :color="color || 'primary'">
    <ion-card-header v-if="title">
      <ion-card-title>{{title}}</ion-card-title>
    </ion-card-header>

    <ion-card-content> <slot/> </ion-card-content>
  </ion-card>
</template>

<script>
import { 
  IonCard,
  IonCardContent,
  IonCardTitle
} from '@ionic/vue';
export default {
  props: ['title', 'color'],
  components: {
    IonCard,
    IonCardContent,
    IonCardTitle
  }
}
</script>