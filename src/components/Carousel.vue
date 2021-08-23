<template>
  <div class="relative">
    <div
      ref="carousel"
      :class="[
        height || '',
        classes || '',
        'flex w-full max-w-full overflow-x-auto carousel overflow-y-visible carousel'
      ]"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    height: [Number, String],
    classes: [String, Array]
  },
  methods: {
    scrollLeft () {}
  },
  mounted () {
    const slider = document.querySelector('.carousel')

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
