<template>
    <div id="search">
      <ion-item mode="md" class="filter-container">
        <ion-select :disabled="!rounds.length" interface="action-sheet" v-model="selectedRound" placeholder="Select round">
          <ion-select-option 
            v-for="round in rounds" 
            :key="round.id" 
            :value="round.id"
          >{{round.description}}</ion-select-option>
        </ion-select>
      </ion-item>
    </div>
    <div id="messages">
      <ion-list>
        <Message v-for="message in notifications" :key="message.id" :message="message" @open="openMessage" />
        <div v-if="!notifications.length" class="ion-text-center ion-padding">
          No messages
        </div>
      </ion-list>
    </div>
</template>

<script>
import {
  IonSelect,
  IonSelectOption,
  IonItem,
  IonList
} from '@ionic/vue'

import Message from './Message'

import messages from '@/messages'

export default {
  created () {
    this.messages = messages
  },
  async beforeMount () {
    if (!this.selectedRound) await this.init()
    else await this.$store.dispatch('getMessages')
  },
  methods: {
    openMessage (id) {
      this.$router.push(`/hub/message/${id}`)
    },
    async init () {
      await this.$loading.show()

      // Check on messages page if user has still a valid token active
      const logged = await this.$store.dispatch('checkUserSession')
      if (!logged) {
        await this.$loading.hide()
        return
      }

      await this.$store.dispatch('getRounds')

      const defaultRound = this.$store.getters.defaultRound
      if (defaultRound) this.selectedRound = defaultRound.id

      await this.$loading.hide()
    }
  },
  watch: {
    async selectedRound () {
      await this.$store.dispatch('getMessages')
    }
  },
  computed: {
    rounds: function () {
      return this.$store.state.rounds.list.filter(round => round.deleted !== true)
    },
    notifications: function () {
      return this.$store.getters.messages
    },
    showNotifyError () {
      return this.$store.getters.notifError
    },
    selectedRound: {
      get () {
        return this.$store.getters.roundId
      },
      set (value) {
        if (value !== '' && value !== false) return this.$store.commit('setRoundId', value)
      }
    }
  },
  components: {
    IonSelect,
    IonSelectOption,
    IonItem,
    IonList,

    Message
  }
}
</script>

<style scoped>
  .filter-container {
    border-bottom: 2px solid var(--ion-color-primary, 'transparent');
  }
</style>