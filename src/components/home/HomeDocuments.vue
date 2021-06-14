<template>
  <div
    :class="[classes, 'home-big-container flex flex-col mr-4 -mt-4 pt-4 pb-4']"
  >
    <div
      class="bg-white w-full overflow-hidden rounded-12 flex flex-col justify-between elevated-shadow p-6"
    >
      <span class="font-helvetica-medium text-dark-grey text-16 mb-4">
        {{ title }}</span
      >

      <document-list-item
        v-for="(doc, i) in docs"
        :key="i"
        :classes="i > 0 ? 'mt-4' : ''"
        :document="doc"
      />
    </div>
  </div>
</template>
<script>
import DocumentListItem from '../DocumentListItem.vue'

export default {
  components: { DocumentListItem },
  props: {
    docs: [Array, Object],
    title: String,
    classes: [Array, String]
  }
}
</script>
<style scoped>
.docs-container {
  height: 125px;
  min-height: 125px;
}
</style>
