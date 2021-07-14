<template>
  <ion-modal
    animated
    showBackdrop
    css-class="custom-modal"
    :is-open="isOpened"
    @didDismiss="closeNotification"
  >
    <div
      class="w-full h-full relative pt-20 login-background relative"
      style="min-width:100%;"
    >
      <ion-img
        src="/assets/login-bg.png"
        class="fixed bottom-0 left-0 z-0 w-full"
      />
      <div
        class="bg-transparent absolute top-0 left-0 flex px-8 w-full z-10"
        style="height:90px"
      >
        <!-- close button -->
        <ion-button
          type="button"
          class="relative mr-auto my-auto back-button"
          @click="closeNotification"
        >
          <ion-img
            src="/assets/button-icons/close.svg"
            className="pointer-events-none"
          />
        </ion-button>
      </div>
      <div class="mx-8 flex flex-col relative z-10">
        <Title titleClass="pb-4 text-black font-helvetica-bold text-28 block">
          {{ updatedNotification.title }}
        </Title>
        <div
          v-if="updatedNotification.preview"
          class="bg-white rounded-12 relative mr-4 gallery-container elevated-shadow overflow-hidden"
        >
          <ion-img
            :src="updatedNotification.preview || ''"
            class="h-full w-auto pointer-events-none"
          />
        </div>
        <div class="flex my-8 justify-between items-start">
          <p
            class="m-0 paragraph font-helvetica text-16 line-24 spacing-1 text-mid-dark-grey"
            v-html="updatedNotification.message"
          ></p>
        </div>
        <div v-if="isLink" class="flex">
          <big-button label="Read more" @onClick="routeToElement" />
        </div>
      </div>
    </div>
  </ion-modal>
</template>

<script>
import { IonImg } from '@ionic/vue'
import messages from '@/messages'
import urls from '@/urls'
import BigButton from '../containers/BigButton.vue'
import Title from '../Title.vue'
export default {
  components: {
    IonImg,
    Title,
    BigButton
  },
  props: {
    notificationID: Number
  },
  data () {
    return {
      notification: {},
      isOpened: false
    }
  },
  computed: {
    updatedNotification () {
      return this.notification
    },
    isLink () {
      if (
        this.notification &&
        this.notification.link &&
        Object.keys(this.notification).length
      ) {
        return true
      }
      return false
    }
  },
  methods: {
    routeToElement () {
      const link = `/${
        this.notification.link.type === 'congress'
          ? 'congresses'
          : this.notification.link.type
      }/${this.notification.link.id}`

      this.$router.push(link)
    },
    closeNotification () {
      this.isOpened = false
      this.$emit('onClose')
    },
    async getNotification () {
      if (this.notificationID) {
        try {
          const resNotification = await this.$http({
            method: 'GET',
            url: urls.notifications.list + '/' + this.notificationID,
            params: {}
          })
          this.notification = resNotification
        } catch (e) {
          console.error(e)
          this.$toast({
            message: messages.errors.notificationDetail,
            color: 'danger'
          })
        }
      } else {
        this.$emit('onClose')
        console.error('No id notification')
        this.$toast({
          message: messages.errors.notificationDetail,
          color: 'danger'
        })
      }
    }
  },
  created () {
    console.log('id', this.notificationID)
    if (this.notificationID) {
      this.getNotification()
    }
  },
  watch: {
    updatedNotification: function (newValue) {
      if (newValue && Object.keys(newValue).length) {
        this.isOpened = true
      } else {
        this.isOpened = false
      }
    },
    notificationID: function (newValue) {
      console.log('value', newValue)
      if (newValue) {
        this.isOpened = true
        this.getNotification()
      }
    }
  }
}
</script>
