<template>
  <ion-item :class="['message', { 'toread': !message.read }]" :color="!message.read ? 'warning' : ''" @click="$emit('open', message.id)" button>
    <ion-label>
      <ion-row>
        <ion-col class="expanded">
          <ion-text :color="message.read ? 'primary' : 'light'">
            <h2 class="title">{{message.messageType}}</h2>
          </ion-text>
        </ion-col>
        <ion-col class="ion-text-right expanded">
            <p>{{ticksToString(message.dateTimeTicks)}}</p>
        </ion-col>
      </ion-row>
      <hr/>
      <p v-if="message.adminUser"><b>Admin:</b> {{message.adminUser}}</p>
      <p v-if="message.championship"><b>Champ.:</b> {{message.championship}}</p>
      <p v-if="message.team"><b>Team:</b> {{message.team}}</p>
      <p v-if="message.user"><b>User:</b> {{message.user}}</p>
      <div class="content_badges">
        <ion-icon v-if="message.withAttachment" class="icon" :icon="icons.documentAttachOutline"/>
        <ion-icon v-if="message.note" class="icon" :icon="icons.documentTextOutline"/>
      </div>
    </ion-label>
  </ion-item>
</template>

<script>
import {
  IonItem,
  IonText,
  IonLabel,
  IonCol,
  IonRow
} from '@ionic/vue'
import icons from '@/mixins/icons'

export default {
  props: [
    'message'
  ],
  mixins: [icons],
  components: {
    IonItem,
    IonText,
    IonLabel,
    IonCol,
    IonRow
  }
}
</script>

<style scoped>
.expanded {
  padding: 0;
}
.title {
  font-weight: bold;
}
.message p {
  color: var(--ion-color-primary-contrast, white);
}
.message.toread p {
  color: var(--ion-color-light, black);
}
.content_badges {
  position: absolute;
  right:  10px;
  bottom: 5px;
}
.content_badges .icon {
  margin-left: 5px;
}
</style>