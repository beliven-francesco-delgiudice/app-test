<template>
  <div class="relative">
    <ion-scroll
      direction="x"
      :id="id"
      :class="[
        height || '',
        classes || '',
        'flex w-full max-w-full overflow-x-auto overflow-y-visible carousel'
      ]"
    >
      <slot></slot>
    </ion-scroll>
  </div>
</template>

<script>
import { IonScroll } from '@ionic/vue'
export default {
  components: { IonScroll },
  props: {
    height: [Number, String],
    classes: [String, Array],
    id: String
  },
  methods: {
    scrollLeft () {}
  },
  mounted () {
    let slider = null
    if (this.id) {
      slider = document.querySelector('#' + this.id)
    } else {
      slider = document.querySelector('.carousel')
    }

    let isDown = false
    let startX
    let scrollLeft

    slider.addEventListener('mousedown', e => {
      isDown = true
      slider.classList.add('active')
      startX = e.pageX - slider.offsetLeft
      scrollLeft = slider.scrollLeft
    })
    slider.addEventListener('mouseleave', () => {
      isDown = false
      slider.classList.remove('active')
    })
    slider.addEventListener('mouseup', () => {
      isDown = false
      slider.classList.remove('active')
    })
    slider.addEventListener('mousemove', e => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - slider.offsetLeft
      const walk = (x - startX) * 3 //scroll-fast
      slider.scrollLeft = scrollLeft - walk
    })
  }
}
</script>
