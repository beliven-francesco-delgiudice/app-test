<template>
  <Page label="Useful Links" back="/menu">
    <ion-list class="bg-transparent">
      <div
        class="flex flex-row justify-between items-center bg-transparent pb-4 mb-4"
        v-for="(item, i) in linksArray"
        :key="i"
        @click="openLink(item.link)"
      >
        <div
          class="flex flex-start items-start pointer-events-none px-8 w-full"
        >
          <square-container
            bgClass="bg-white"
            squareSize="64"
            rounded="12"
            classes="mr-4 overflow-hidden bg-no-repeat bg-cover bg-center"
            :styles="`background-image:url('${item.image}')`"
          >
          </square-container>
          <div class="flex flex-col justify-between py-2">
            <span
              class="font-helvetica-medium text-black text-16 spacing-5 line-28"
              >{{ item.title }}
            </span>
            <span class="font-helvetica text-grey text-14 spacing-44 line-24">
              {{ item.formattedLink }}
            </span>
          </div>
        </div>
      </div>
    </ion-list>
  </Page>
</template>

<script>
import Page from '../components/Page.vue'
import { IonList } from '@ionic/vue'
import SquareContainer from '../components/containers/SquareContainer.vue'
import messages from '@/messages'
import urls from '@/urls'
export default {
  components: {
    Page,
    IonList,
    SquareContainer
  },
  data () {
    return {
      links: []
    }
  },
  computed: {
    linksArray () {
      if (this.links && this.links.length) {
        return this.links.map(link => ({
          ...link,
          formattedLink: this.cutLink(link.link)
        }))
      }
      return this.links
    }
  },
  created () {
    this.getUsefulLinks()
  },
  methods: {
    cutLink (string) {
      if (string && string.length > 30) {
        return string.substring(0, 30) + '...'
      }
      return string
    },
    openLink (link) {
      window.open(link)
    },
    async getUsefulLinks () {
      try {
        const results = await this.$http({
          method: 'GET',
          url: urls.usefulLinks,
          params: {}
        })
        this.links = results
      } catch (e) {
        console.error(e)
        this.$toast({
          message: messages.errors.usefulLinks,
          color: 'danger'
        })
      }
    }
  }
}
</script>
