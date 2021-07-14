<template>
  <Page withMargin back="/new" :label="updatedNotification.title">
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
  </Page>
</template>

<script>
import { IonImg } from '@ionic/vue'
import Page from '../../components/Page.vue'
import messages from '@/messages'
import urls from '@/urls'
import BigButton from '../../components/containers/BigButton.vue'
export default {
  components: {
    IonImg,
    Page,
    BigButton
  },
  data () {
    return {
      notification: {}
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
    }
  },
  async created () {
    if (this.$route.params.id) {
      try {
        const resNotification = await this.$http({
          method: 'GET',
          url: urls.notifications.list + '/' + this.$route.params.id,
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
      console.error('No notification id in route')
      this.$toast({
        message: messages.errors.notificationDetail,
        color: 'danger'
      })
      this.$router.back()
    }
  }
}
</script>
