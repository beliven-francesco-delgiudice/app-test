<template>
  <Page withMargin back="/menu" label="Let's L.E.A.R.N. together">
    <div
      class="bg-black rounded-12 relative mr-4 gallery-container elevated-shadow overflow-hidden flex justify-center items-center cursor-pointer"
      @click="openVideo"
    >
      <ion-img
        src="/assets/learn.jpeg"
        class="w-full opacity-50 pointer-events-none"
      />
      <ion-img
        src="/assets/button-icons/play-white.svg"
        class="m-auto absolute z-10 elevated-shadow pointer-events-none"
      />
    </div>

    <big-button
      color="secondary"
      bgClass="mt-8"
      label="Go to L.E.A.R.N. calendar"
      @click="routeToCalendar"
    />

    <div class="my-8">
      <p
        class="m-0 paragraph font-helvetica-bold text-black mb-2 text-20 pb-1 line-24 spacing-1"
      >
        We believe in offering Surgeons more than just a simple course.
      </p>
      <p
        class="m-0 paragraph font-helvetica-medium text-16 mb-2 pb-1 line-24 spacing-1 text-dark-grey"
        v-html="subtitle"
      />
      <p
        class="m-0 paragraph font-helvetica text-16 line-24 spacing-1 text-mid-dark-grey"
        v-html="text"
      />
    </div>
    <video-modal
      direct
      :video="video"
      :open="isVideoOpen"
      @onClose="closeVideo"
    />
  </Page>
</template>

<script>
import Page from '../../components/Page.vue'
import BigButton from '../../components/containers/BigButton'
import VideoModal from '../../components/modals/VideoModal.vue'

export default {
  components: {
    Page,
    BigButton,
    VideoModal
  },

  data () {
    return {
      video: {
        url:
          'https://limacorporate.com/video/learn/learn_for_surgeon_limacorporate_web_app.mp4'
      },
      subtitle:
        "WHAT IS L.E.A.R.N.?<br/>LimaCorporate's Education and Resource Network is a new medical education experience.",
      text:
        'We are all driven by the same goal: to restore the eMotion of Motion and together we always look for the best outcomes for patients.<br>Accordingly to your personal educational needs you will be able to establish your own pathway, choose virtual or in person training and establish a new network.<br>So let’s L.E.A.R.N. together, let’s L.E.A.R.N. from each other.',
      isVideoOpen: false
    }
  },

  methods: {
    routeToCalendar () {
      this.$router.push('/learn/list')
    },

    openVideo () {
      this.isVideoOpen = true
    },
    closeVideo () {
      this.isVideoOpen = false
    }
  }
}
</script>
<style scoped>
.gallery-container {
  width: 100%;
  min-width: 100%;
}
@media screen and (min-width: 1024px) {
  .gallery-container {
    width: 100%;
    min-width: 100% - 4rem;
  }
}
</style>
