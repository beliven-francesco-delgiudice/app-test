<template>
  <Page :label="$route.name" withMargin>
    <div class="flex flex-wrap -mx-4">
      <div
        v-for="(segment, i) in segments"
        :key="i"
        @click="routeToSegment(segment)"
        class="w-1/2 pt-12 mt-4"
      >
        <grey-container
          vertical
          rounded="12"
          classes="mx-4 overflow-y-visible px-6 py-4 pointer-events-none"
        >
          <div
            class="relative w-auto mx-auto overflow-y-visible flex justify-center w-full pt-10"
          >
            <ion-img :src="segment.image" class="absolute bottom-0 w-auto" />
          </div>
          <span class="font-helvetica-medium text-black text-16 mt-4">{{
            segment.name
          }}</span>
        </grey-container>
      </div>
    </div>
  </Page>
</template>

<script>
import { IonImg } from '@ionic/vue'
import Page from '../../components/Page.vue'
import GreyContainer from '../../components/containers/GreyContainer.vue'
export default {
  components: {
    Page,
    GreyContainer,
    IonImg
  },
  data () {
    return {
      segments: [
        {
          name: 'Hip',
          id: 1,
          image: '/assets/test/hip.svg'
        },
        {
          name: 'Knee',
          id: 2,
          image: '/assets/test/knee.svg'
        },
        {
          name: 'Shoulder',
          id: 3,
          image: '/assets/test/shoulder.svg'
        },
        {
          name: 'Elbow',
          id: 4,
          image: '/assets/test/shoulder.svg'
        },
        {
          name: 'Fixation',
          id: 5,
          image: '/assets/test/hip.svg'
        }
      ],
      documents: [
        {
          image: '/assets/test/folder.jpg',
          type: 'folder',
          label: 'Lorem ipsum',
          size: '3.6MB',
          link: 'link'
        },
        {
          image: '/assets/test/file.jpg',
          type: 'file',
          label: 'Lorem ipsum',
          size: '3.6MB',
          link: 'link'
        }
      ]
    }
  },
  computed: {},
  methods: {
    routeToSegment (segment) {
      const link = `/products/${segment.id}`
      this.$router.push(link)
    }
  }
}
</script>
