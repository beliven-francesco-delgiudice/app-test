<template>
  <div
    :class="[classes, 'home-big-container flex flex-col mr-4 -mt-4 pt-4 pb-4']"
  >
    <div
      class="bg-white w-full overflow-hidden rounded-12 flex flex-col justify-between elevated-shadow p-6"
    >
      <span
        :class="[
          titleClass || 'text-dark-grey mb-4',
          'py-1 font-helvetica-medium text-16'
        ]"
      >
        {{ title }}</span
      >

      <document-list-item
        v-for="(doc, i) in docs"
        small
        :key="i"
        :type="type"
        :document="doc"
        :actions="doc.actions"
        :classes="i > 0 ? 'mt-4' : ''"
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
    titleClass: [Array, String],
    classes: [Array, String],
    type: [String]
  }
}
</script>
<style scoped>
.docs-container {
  height: 125px;
  min-height: 125px;
}
</style>
