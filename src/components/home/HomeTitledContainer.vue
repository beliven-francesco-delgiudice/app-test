<template>
  <div :class="divClass">
    <div
      @click="routeToPath"
      :class="[
        headClass,
        'px-8 flex justify-between items-center cursor-pointer pb-4'
      ]"
    >
      <span :class="[titleClass, 'font-helvetica-bold text-black text-20']">
        {{ label }}
      </span>
      <ion-img
        src="/assets/button-icons/forward.svg"
        className="width-12 height-12 pointer-events-none"
      />
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { IonImg } from '@ionic/vue'
export default {
  components: {
    IonImg
  },
  props: {
    path: String,
    label: String,
    pt: String,
    classes: [String, Array],
    titleClass: [String, Array],
    headClass: [String, Array]
  },
  computed: {
    divClass () {
      let classString = `pt-${this.pt || 12} `
      classString += this.classes || ''
      return classString
    }
  },
  methods: {
    routeToPath () {
      this.$router.push(this.path)
    }
  }
}
</script>
