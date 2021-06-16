<template>
  <Page :label="segment.name" back>
    <ion-list class="bg-transparent">
      <div
        class="flex flex-row justify-between items-center bg-transparent pb-4 mb-4"
        v-for="(item, i) in segment.list"
        :key="i"
        @click="routeTo(item)"
      >
        <div
          class="flex flex-start items-center pointer-events-none px-8 w-full"
        >
          <square-container
            bgClass="bg-white"
            squareSize="64"
            classes="elevated-shadow mr-4 p-2"
          >
            <ion-img :src="item.image" />
          </square-container>
          <span
            class="font-helvetica-medium text-black text-16 spacing-5 line-28"
            >{{ item.name }}</span
          >
        </div>
      </div>
    </ion-list>
  </Page>
</template>

<script>
import Page from '../../components/Page.vue'
import { IonList, IonImg } from '@ionic/vue'
import SquareContainer from '../../components/containers/SquareContainer.vue'
export default {
  components: {
    Page,
    IonList,
    IonImg,
    SquareContainer
  },
  data () {
    return {
      segment: {
        id: 2,
        name: 'Hip',
        list: [
          {
            id: 3,
            name: 'Acetabular Cups',
            image: '/assets/test/acetabular.svg'
          },
          {
            id: 4,
            name: 'Femoral Stems',
            image: '/assets/test/stems.svg'
          }
        ]
      }
    }
  },
  computed: {
    isCategory () {
      return true
    }
  },
  methods: {
    routeTo (item) {
      // if category push to category
      let link = '/products/' + this.segment.id
      if (this.isCategory) {
        link += '/category/' + item.id
      } else {
        link += '/detail/' + item.id
      }
      this.$router.push(link)
    }
  }
}
</script>
