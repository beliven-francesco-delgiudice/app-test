<template>
  <div
    @click="emitClick"
    :class="[
      classes,
      isActive ? 'bg-white elevated-shadow' : 'bg-light-grey',
      ' rounded-8 py-2 px-4 flex justify-center items-center whitespace-nowrap'
    ]"
  >
    <span
      class="font-helvetica-medium text-black spacing-5 line-30 pointer-events-none"
      >{{ label }}</span
    >
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    classes: String,
    active: Boolean,
    label: String
  },
  computed: {
    isActive () {
      return this.active
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
