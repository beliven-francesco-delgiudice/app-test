<template>
  <div class="flex flex-col pb-10">
    <div
      v-for="(msg, i) in congressMessages"
      :key="i"
      class="relative flex flex-col mb-16"
    >
      <div
        class="absolute ml-8 mt-8 bg-light-grey h-full"
        style="border-radius: 0 12px 12px 12px;width:calc(100% - 4rem);"
      ></div>
      <ion-img
        src="assets/button-icons/message-triangle.svg"
        class="absolute ml-8 mt-8"
        style="transform:translateY(-100%);width:16px;"
      />
      <div class="flex flex-col mx-16 mt-8 pt-8 relative z-10">
        <span
          class="font-helvetica-bold text-20 text-black spacing-2 line-28 mb-4"
          >{{ msg.title }}</span
        >
        <p
          class="m-0 font-helvetica text-16 text-mid-dark-grey spacing-1 line-24"
        >
          {{ msg.text }}
        </p>
      </div>
      <div v-if="msg.gallery && msg.gallery.length" class="mt-8">
        <image-gallery :gallery="msg.gallery" initMargin="ml-16" />
      </div>
    </div>
  </div>
</template>
<script>
import ImageGallery from '../ImageGallery.vue'
export default {
  components: {
    ImageGallery
  },
  props: {
    congress: Object
  },
  computed: {
    congressMessages () {
      if (
        this.congress &&
        this.congress.content &&
        this.congress.content.length
      ) {
        return this.congress.content
      }
      return []
    }
  }
}
</script>
