<template>
  <Page
    withMargin
    :label="updatedActivity.title"
    :aboveTitle="aboveTitle"
    :back="backPath"
  >
    <div
      class="bg-white rounded-12 relative mr-4 gallery-container elevated-shadow overflow-hidden"
    >
      <ion-img
        :src="updatedActivity.preview"
        class="h-full w-auto pointer-events-none"
      />
    </div>

    <div class="flex flex-col my-8 ">
      <span
        class="font-helvetica-bold text-20 spacing-2 line-28 text-black mb-2"
        >{{ updatedActivity.subtitle1 }}
      </span>
      <span
        class="font-helvetica-medium text-16 spacing-4 line-24 text-dark-grey mb-4"
        >{{ updatedActivity.subtitle2 }}
      </span>
      <div v-if="updatedActivity.location" class="flex flex-col">
        <span class="font-helvetica text-14 text-grey spacing-44 line-20"
          >Location</span
        >
        <span
          class="font-helvetica text-16 text-mid-dark-grey spacing-2 line-26 mb-8"
          >{{ updatedActivity.location }}</span
        >
      </div>

      <div class="flex flex-col bg-light-red rounded-12 p-6">
        <div class="flex justify-between items-start mb-4">
          <div class="flex flex-col">
            <span
              class="font-helvetica text-14 text-grey spacing-44 line-28 mb-4"
              >From</span
            >
            <span
              class="font-helvetica-medium text-16 text-red spacing-23 line-24 mb-2"
              >{{ updatedActivity.start_date_date }}</span
            >
            <span class="font-helvetica text-14 text-red spacing-2 line-24"
              >{{ updatedActivity.start_date_time }} UTC</span
            >
          </div>
          <div class="flex flex-col">
            <span
              class="font-helvetica text-14 text-grey spacing-44 line-28 mb-4"
              >To</span
            >
            <span
              class="font-helvetica-medium text-16 text-red spacing-23 line-24 mb-2"
              >{{ updatedActivity.end_date_date }}</span
            >
            <span class="font-helvetica text-14 text-red spacing-2 line-24"
              >{{ updatedActivity.end_date_time }} UTC</span
            >
          </div>
        </div>
        <big-button
          v-if="updatedActivity.save_event && updatedActivity.save_event.length"
          label="Save in calendar"
          @onClick="openLink(updatedActivity.save_event)"
        />
      </div>
    </div>

    <separator noYMargin />

    <detail-section label="Description" noPadding>
      <p
        class="p-children font-helvetica text-mid-dark-grey text-16 spacing-1 line-24 mb-4 mt-0"
        v-html="formattedDescription"
      />
      <div class="flex justify-start">
        <section-button
          :label="updatedReadMore ? 'Read less' : 'Read more'"
          @onClick="readMore"
        />
      </div>
    </detail-section>
    <detail-section
      v-if="updatedActivity.experts && updatedActivity.experts.length"
      label="Faculties"
      noPadding
    >
      <div
        :key="i"
        v-for="(faculty, i) in updatedActivity.experts"
        :class="[i > 0 ? 'mt-4' : '', ' flex justify-start items-center']"
        @click="openFaculty(faculty)"
      >
        <square-container
          bgClass="bg-white"
          squareSize="64"
          classes="mr-4 pointer-events-none"
        >
          <ion-img :src="faculty.preview" />
        </square-container>
        <div
          class="flex flex-col justify-between items-start pointer-events-none"
        >
          <span
            class="font-helvetica-medium text-16 spacing-5 line-28 text-black"
            >{{ faculty.name }}</span
          >
          <span class="font-helvetica text-14 spacing-44 line-24 text-grey">{{
            faculty.subtitle
          }}</span>
        </div>
      </div>
    </detail-section>
    <detail-section
      v-if="updatedActivity.files && updatedActivity.files.length"
      label="Download"
      noPadding
    >
      <document-list-item
        bgClass="bg-transparent"
        v-for="(file, j) in updatedActivity.files"
        :key="j"
        :document="file"
      />
    </detail-section>
    <faculty-modal :faculty="faculty" @onClose="closeFaculty" />
  </Page>
</template>

<script>
import { IonImg } from '@ionic/vue'
import Page from '../../components/Page.vue'
import Separator from '../../components/Separator.vue'
import DetailSection from '../../components/DetailSection.vue'
import SquareContainer from '../../components/containers/SquareContainer.vue'
import DocumentListItem from '../../components/DocumentListItem.vue'
import SectionButton from '../../components/containers/SectionButton.vue'
import BigButton from '../../components/containers/BigButton.vue'
import FacultyModal from '../../components/modals/FacultyModal.vue'
import messages from '@/messages'
import urls from '@/urls'
export default {
  components: {
    IonImg,
    Page,
    Separator,
    DetailSection,
    SquareContainer,
    DocumentListItem,
    SectionButton,
    BigButton,
    FacultyModal
  },
  data () {
    return {
      isReadMore: false,
      faculty: null,
      activity: {}
    }
  },
  computed: {
    updatedActivity () {
      return this.activity
    },
    updatedReadMore () {
      return this.isReadMore
    },
    aboveTitle () {
      return this.updatedActivity.parent_name + ' /'
    },
    formattedDescription () {
      if (this.updatedReadMore) {
        return this.updatedActivity.description
      }
      return this.updatedActivity.description_short
    },
    backPath () {
      const id = this.updatedActivity.parent_id
      return `/congresses/${id}?section=activities`
    },
    isFaculty () {
      return this.faculty
    }
  },
  methods: {
    readMore () {
      this.isReadMore = !this.isReadMore
    },
    openFaculty (faculty) {
      this.faculty = Object.assign({}, faculty)
    },
    closeFaculty () {
      this.faculty = null
    },
    openLink (link) {
      window.open(link)
    }
  },
  async created () {
    if (this.$route.params.id) {
      const activityID = this.$route.params.id
      try {
        const results = await this.$http({
          method: 'GET',
          url: urls.congresses.activity + '/' + activityID,
          params: {}
        })
        if (results && Object.keys(results).length) {
          this.activity = results
        }
        console.log(results)
      } catch (e) {
        console.error(e)
        this.$toast({
          message: messages.errors.activityDetail,
          color: 'danger'
        })
      }
    } else {
      console.error('No congress id in route')
      this.$toast({
        message: messages.errors.activityDetail,
        color: 'danger'
      })
      this.$router.push('/congresses')
    }
  }
}
</script>
<style scoped>
.gallery-container {
  width: calc(100vw - 4rem);
  min-width: calc(100vw - 4rem);
  height: 221px;
}
@media screen and (min-width: 1024px) {
  .gallery-container {
    width: calc(100% - 4rem);
    min-width: calc(100% - 4rem);
  }
}
p {
  margin: 0;
}
.p-children > p,
.p-children p {
  margin: 0;
}
</style>
