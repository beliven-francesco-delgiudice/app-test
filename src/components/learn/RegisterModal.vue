<template>
  <div
    v-if="isOpened"
    class="fixed top-0 left-0 w-full h-full"
    style="z-index:50;"
  >
    <div class="w-full h-full relative pt-20 gradient-background">
      <div
        class="bg-transparent absolute top-0 left-0 flex px-8 w-full z-10"
        :style="
          isIos
            ? 'margin-top:35px;height:70px;min-height:70px;'
            : 'height:90px;min-height:90px;'
        "
      >
        <!-- close button -->
        <ion-button
          type="button"
          class="relative mr-auto my-auto back-button"
          @click="close"
        >
          <ion-img
            src="/assets/button-icons/close.svg"
            className="pointer-events-none"
          />
        </ion-button>
      </div>
      <form class="flex h-full flex-col justify-between" @submit="onSubmit">
        <div class="flex flex-col px-8">
          <Title titleClass="pb-8 text-black font-helvetica-bold text-28 block">
            Register to this course
          </Title>

          <div class="relative flex flex-col">
            <span
              class="block font-helvetica text-14 spacing-44 line-20 text-grey"
            >
              Select days<span class="text-red">*</span>
            </span>
            <div class="flex flex-wrap mt-1 mb-2 text-black">
              <div
                v-for="day in daysOptions"
                :key="day.label"
                :class="
                  (form.days || []).includes(day.value)
                    ? 'bg-white course-card-internal-shadow selected'
                    : 'bg-light-grey'
                "
                class="mr-2 mb-2 px-4 py-2 rounded-8 flex no-wrap items-center checkbox cursor-pointer"
                @click="selectDay(day)"
              >
                <div
                  class="square rounded-4 mr-2 width-24 height-24 relative flex"
                >
                  <ion-img
                    src="/assets/button-icons/check-white.svg"
                    class="check"
                  />
                </div>
                <span
                  class="block text-black font-helvetica-medium text-16 spacing-5 line-30"
                >
                  {{ day.label }}
                </span>
              </div>
            </div>
          </div>

          <div class="flex flex-col mb-2">
            <span
              class="block font-helvetica text-14 spacing-44 line-20 text-grey"
            >
              Your name<span class="text-red">*</span>
            </span>
            <ion-input
              required
              type="text"
              class="input-filled font-helvetica text-16 spacing-5 line-28 text-black my-2"
              v-model="form.name"
            ></ion-input>
          </div>
          <div class="flex flex-col mb-2">
            <span
              class="block font-helvetica text-14 spacing-44 line-20 text-grey"
            >
              Email<span class="text-red">*</span>
            </span>
            <ion-input
              required
              type="email"
              class="input-filled font-helvetica text-16 spacing-5 line-28 text-black my-2"
              v-model="form.email"
            ></ion-input>
          </div>
          <div class="flex flex-col mb-2">
            <span
              class="block font-helvetica text-14 spacing-44 line-20 text-grey"
            >
              Hospital
            </span>
            <ion-input
              type="text"
              class="input-filled font-helvetica text-16 spacing-5 line-28 text-black my-2"
              v-model="form.hospital"
            ></ion-input>
          </div>
          <div class="flex flex-col mb-2">
            <span
              class="block font-helvetica text-14 spacing-44 line-20 text-grey"
            >
              Category
            </span>
            <custom-select
              name="category"
              classes="input-filled font-helvetica text-16 spacing-5 line-28 text-black my-2"
              :value="form.category"
              :options="categoryOptions"
              @onChange="val => (form.category = val)"
            />
          </div>
        </div>

        <div class="mx-8">
          <div class="mb-4">
            <custom-checkbox required v-model="privacy">
              <template #label>
                <span
                  class="block text-black font-helvetica-normal text-14 spacing-4 line-18"
                >
                  I read the
                  <span
                    class="text-black font-helvetica-medium"
                    @click="routeToPrivacy"
                  >
                    Privacy Policy
                  </span>
                  and I authorize the use of personal data under the Reg.UE
                  2016/679 (GDPR)<span class="text-red">*</span>
                </span>
              </template>
            </custom-checkbox>
          </div>
          <div class="mb-4">
            <custom-checkbox required v-model="audio">
              <template #label>
                <span
                  class="block text-black font-helvetica-normal text-14 spacing-4 line-18"
                >
                  I read the
                  <span
                    class="text-black font-helvetica-medium"
                    @click="routeToPrivacy"
                  >
                    Privacy Policy
                  </span>
                  and I authorize the use of personal data under the Reg.UE
                  2016/679 (GDPR)<span class="text-red">*</span>
                </span>
              </template>
            </custom-checkbox>
          </div>
          <custom-checkbox
            v-model="form.newsletter"
            label="I would like to receive information about products, services and events"
          />
        </div>

        <div class="w-full px-8 pb-4">
          <big-button type="Register" label="Done" :disabled="!canSubmitForm" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Title from '../Title.vue'
import CustomSelect from '../CustomSelect.vue'
import CustomCheckbox from '../CustomCheckbox.vue'
import BigButton from '../containers/BigButton.vue'
import urls from '@/urls'
import messages from '@/messages'
import { Capacitor } from '@capacitor/core'
import { IonImg, IonButton, IonInput } from '@ionic/vue'

export default {
  components: {
    Title,
    IonImg,
    IonInput,
    BigButton,
    IonButton,
    CustomSelect,
    CustomCheckbox
  },

  props: {
    course: {
      type: Object
    },

    selectedDay: {
      type: Object
    },

    open: {
      type: Boolean
    }
  },

  data () {
    return {
      form: {},
      audio: false,
      privacy: false,
      isOpened: false,
      categoryOptions: [
        {
          value: 'surgeon',
          label: 'Surgeon'
        },
        {
          value: 'staff',
          label: 'Staff'
        }
      ]
    }
  },

  computed: {
    isIos () {
      if (
        Capacitor &&
        Capacitor.getPlatform() &&
        Capacitor.getPlatform() === 'ios'
      ) {
        return true
      }
      return false
    },

    daysOptions () {
      if (this.course && this.course.days) {
        return this.course.days.map(day => ({
          value: day.date_value,
          label: day.date_text
        }))
      }
      return []
    },

    canSubmitForm () {
      return (
        this.form.days &&
        this.form.days.length &&
        this.form.name &&
        this.form.email &&
        this.privacy &&
        this.audio
      )
    }
  },

  methods: {
    routeToPrivacy () {
      this.$store.commit('setModalOpen', false)
      this.$router.push('/privacy')
    },

    close () {
      this.$store.commit('setModalOpen', false)
      this.$emit('onClose')
    },

    async onSubmit (e) {
      e.preventDefault()
      const payload = {
        ...this.form,
        id: this.course.id
      }
      try {
        const saveResult = await this.$http({
          method: 'POST',
          url: urls.learn.register,
          data: payload
        })
        console.debug(saveResult)
        this.$toast({
          message: messages.learnRegisterSuccessful,
          color: 'dark'
        })
        this.close()
      } catch (e) {
        console.error(e)
        this.$toast({
          message: messages.errors.learnRegister,
          color: 'danger'
        })
      }
    },

    selectDay (day) {
      if (!this.form.days || !this.form.days.length) {
        this.form.days = [day.value]
      } else {
        const newArray = [...this.form.days]
        const dayIndex = this.form.days.indexOf(day.value)
        if (dayIndex > -1) {
          newArray.splice(dayIndex, 1)
        } else {
          newArray.push(day.value)
        }
        this.form.days = newArray
      }
    }
  },

  watch: {
    open: function (newValue) {
      this.$store.commit('setModalOpen', newValue)
      this.isOpened = newValue
      if (newValue && this.selectedDay && this.selectedDay.date_value) {
        this.form.days = [this.selectedDay.date_value]
      }
    }
  }
}
</script>
<style scoped></style>
