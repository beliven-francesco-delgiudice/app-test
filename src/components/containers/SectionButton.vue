<template>
  <div
    @click="emitClick"
    :class="[
      classes,
      computedClass,
      ' rounded-8 py-2 px-4 flex justify-center items-center whitespace-nowrap'
    ]"
  >
    <span
      :class="[
        red ? 'text-white' : 'text-black',
        'font-helvetica-medium spacing-5 line-30 pointer-events-none'
      ]"
    >
      {{ label }}
    </span>
  </div>
</template>
<script>
export default {
  components: {},
  emits: ['onClick'],
  props: {
    classes: [String, Array],
    active: Boolean,
    red: Boolean,
    label: String
  },
  computed: {
    isActive () {
      return this.active
    },
    computedClass () {
      if (this.red) {
        if (this.isActive) {
          return 'bg-red elevated-shadow'
        } else {
          return 'bg-lighter-red'
        }
      } else {
        if (this.isActive) {
          return 'bg-white elevated-shadow'
        } else {
          return 'bg-light-grey'
        }
      }
    }
  },
  methods: {
    emitClick (e) {
      e.preventDefault()
      if (!this.isActive) {
        this.$emit('onClick')
      }
    }
  }
}
</script>
