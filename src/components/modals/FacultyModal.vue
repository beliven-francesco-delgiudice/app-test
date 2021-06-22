<template>
  <ion-modal
    animated
    showBackdrop
    css-class="custom-modal"
    :is-open="isOpened"
    @didDismiss="$emit('onClose')"
  >
    <div class="w-full h-full relative pt-20 gradient-background">
      <div
        class="bg-transparent absolute top-0 left-0 flex px-8 w-full z-10"
        style="height:90px"
      >
        <!-- close button -->
        <ion-button
          type="button"
          class="relative mr-auto my-auto back-button"
          @click="closeFaculty"
        >
          <ion-img
            src="/assets/button-icons/close.svg"
            className="pointer-events-none"
          />
        </ion-button>
      </div>
      <div class="mx-8 flex flex-col">
        <square-container bgClass="bg-white" squareSize="64" classes="mb-4">
          <ion-img :src="computedFaculty.preview" />
        </square-container>
        <Title titleClass="pb-4 text-black font-helvetica-bold text-28 block">
          {{ computedFaculty.name }}
        </Title>
        <span
          class="font-helvetica-medium text-16 text-dark-grey spacing-4 line-24 mb-8 block"
          >{{ computedFaculty.subtitle }}</span
        >
        <p
          class="m-0 font-helvetica text-16 spacing-1 line-24 text-mid-dark-grey"
          v-html="computedFaculty.description"
        ></p>
      </div>
    </div>
  </ion-modal>
</template>
<script>
import Title from '../Title.vue'
import { IonImg, IonModal } from '@ionic/vue'
import SquareContainer from '../containers/SquareContainer.vue'
export default {
  components: {
    Title,
    IonImg,
    IonModal,
    SquareContainer
  },
  props: {
    faculty: Object
  },
  data () {
    return {
      isOpened: false
    }
  },
  computed: {
    computedFaculty () {
      return this.faculty
    }
  },
  methods: {
    closeFaculty () {
      this.$emit('onClose')
    }
  },
  watch: {
    computedFaculty: function (newValue) {
      if (newValue && Object.keys(newValue).length) {
        this.isOpened = true
      } else {
        this.isOpened = false
      }
    }
  }
}
</script>
<style scoped>
.back-button {
  --background: transparent;
  --border: none;
  --box-shadow: none;
  left: -1rem;
}
p > p {
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  color: inherit;
  letter-spacing: inherit;
  line-height: inherit;
}
</style>
