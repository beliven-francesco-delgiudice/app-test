<template>
  <ion-grid v-if="messageReady" class="ion-padding">
    <div class="messageHead">
      <ion-text color="primary">
        <h3>{{message.messageType}}</h3>
      </ion-text>
      <ion-text color="medium">
        <p>{{ticksToString(message.dateTimeTicks)}}</p>
      </ion-text>
    </div>
    <div class="messageBody ion-padding-bottom ion-padding-top">
      <ion-text color="dark">
        <p class="ion-justify">{{message.note}}</p>
      </ion-text>
    </div>
    <div v-if="message.withAttachment" class="messageAttachment ion-margin-bottom">
      <ion-button @click="showPDF" size="full" color="warning">Show Attachment</ion-button>
    </div>
    <div class="messageResponse">
      <template v-if="message.replyToMessage">
        <h4>Reply: </h4>
        <p>{{message.replyToMessage}}</p>
      </template>
      <template v-else-if="respondText !== false">
        <ion-item class="ion-margin-top ion-margin-bottom">
          <ion-textarea v-model="respondText" placeholder="Insert text to reply"/>
        </ion-item>
        <ion-button :disabled="respondText === ''" size="full" @click="respond">Send</ion-button>
      </template>
      <ion-button v-else-if="respondText === false && message.userCanReply === true" size="full" @click="respondText = ''">Reply</ion-button>
    </div>
  </ion-grid>
</template>

<script>
import {
  IonGrid,
  IonButton,
  IonTextarea,
  IonItem,
  IonText
} from '@ionic/vue'
import urls from '@/urls'
import messages from '@/messages'

export default {
  data () {
    return {
      respondText: false
    }
  },
  beforeMount () {
    // If no data is present return to main menu
    if (!Object.keys(this.message).length) this.$router.push('/hub')
  },
  mounted () {
    this.$store.dispatch('setMessageAs', {
      id: this.id,
      status: 3 // Read
    })
  },
  methods: {
    async respond () {
      await this.$store.dispatch('sendMessageResponse', {
        id: this.id,
        reply: this.respondText
      })
      this.$toast({
        message: messages.messageSent,
        color: 'success'
      })
      this.message.replyToMessage = this.respondText
    },
    async showPDF () {
      try {
        await this.$loading.show()
        await this.$docviewer(`${urls.list.pdf}/${this.message.id}`, this.message.messageType)
      } catch (e) {
        this.$toast({
          message: 'Cannot open attachment',
          color: 'error'
        })
      }
      await this.$loading.hide()
    }
  },
  computed: {
    id () {
      return parseInt(this.$route.params.id || 0)
    },
    message () {
      return this.$store.getters.messages.find(message => message.id === this.id) || {}
    },
    messageReady () {
      return !!Object.keys(this.message).length
    }
  },
  components: {
    IonGrid,
    IonButton,
    IonTextarea,
    IonItem,
    IonText
  }
}
</script>

<style scoped>
.ion-justify {
  text-align: justify;
}
</style>