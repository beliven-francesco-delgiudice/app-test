<template>
  <ion-modal
    animated
    showBackdrop
    css-class="custom-modal"
    :is-open="isOpened"
    @didDismiss="closeSubsidiary"
  >
    <div
      class="w-full h-full relative pt-20 gradient-background relative"
      style="min-width:100%;"
    >
      <div
        class="bg-transparent absolute top-0 left-0 flex px-8 w-full z-10"
        style="height:90px"
      >
        <!-- close button -->
        <ion-button
          type="button"
          class="relative mr-auto my-auto back-button"
          @click="closeSubsidiary"
        >
          <ion-img
            src="/assets/button-icons/close.svg"
            className="pointer-events-none"
          />
        </ion-button>
      </div>
      <div class="mx-8 flex flex-col relative z-10">
        <Title titleClass="pb-4 text-black font-helvetica-bold text-28 block">
          {{ updatedSubsidiary.title }}
        </Title>
        <div class="flex flex-col mb-4">
          <span class="font-helvetica text-14 text-grey spacing-44 line-24 mb-2"
            >Address</span
          >
          <p
            class="m-0 paragraph font-helvetica text-16 text-mid-dark-grey spacing-1 line-24"
            v-html="
              updatedSubsidiary && updatedSubsidiary.contacts
                ? updatedSubsidiary.contacts.address
                : ''
            "
          ></p>
        </div>
        <div class="flex flex-col">
          <div
            v-if="
              updatedSubsidiary &&
                updatedSubsidiary.contacts &&
                updatedSubsidiary.contacts.phone
            "
            class="relative flex mb-4"
          >
            <a
              :href="'tel:' + updatedSubsidiary.contacts.phone"
              title="phone"
              class="absolute top-0 left-0 w-full h-full"
            ></a>
            <square-container
              bgClass="bg-light-grey"
              squareSize="44"
              classes="pointer-events-none flex"
            >
              <ion-img
                src="/assets/button-icons/phone-black.svg"
                class="m-auto"
              />
            </square-container>
            <div
              class="ml-4 flex flex-col justify-between items-start pointer-events-none"
            >
              <span
                class="font-helvetica-medium text-16 text-black spacing-5 line-28"
                >{{ updatedSubsidiary.contacts.phone }}</span
              >
              <span class="font-helvetica text-14 text-grey spacing-44 line-24">
                Phone
              </span>
            </div>
          </div>

          <div
            v-if="
              updatedSubsidiary &&
                updatedSubsidiary.contacts &&
                updatedSubsidiary.contacts.fax
            "
            class="relative flex mb-4"
          >
            <square-container
              bgClass="bg-light-grey"
              squareSize="44"
              classes="pointer-events-none flex"
            >
              <ion-img
                src="/assets/button-icons/phone-black.svg"
                class="m-auto"
              />
            </square-container>
            <div
              class="ml-4 flex flex-col justify-between items-start pointer-events-none"
            >
              <span
                class="font-helvetica-medium text-16 text-black spacing-5 line-28"
                >{{ updatedSubsidiary.contacts.fax }}</span
              >
              <span class="font-helvetica text-14 text-grey spacing-44 line-24">
                Fax
              </span>
            </div>
          </div>

          <div
            v-if="
              updatedSubsidiary &&
                updatedSubsidiary.contacts &&
                updatedSubsidiary.contacts.mail
            "
            class="relative flex mb-4"
          >
            <a
              :href="'mailto:' + updatedSubsidiary.contacts.mail"
              title="mail to"
              class="absolute top-0 left-0 w-full h-full"
            ></a>
            <square-container
              bgClass="bg-light-grey"
              squareSize="44"
              classes="pointer-events-none flex"
            >
              <ion-img
                src="/assets/button-icons/mail-black.svg"
                class="m-auto"
              />
            </square-container>
            <div
              class="ml-4 flex flex-col justify-between items-start pointer-events-none"
            >
              <span
                class="font-helvetica-medium text-16 text-black spacing-5 line-28"
                >{{ updatedSubsidiary.contacts.mail }}</span
              >
              <span class="font-helvetica text-14 text-grey spacing-44 line-24">
                E-mail
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ion-modal>
</template>

<script>
import { IonImg } from '@ionic/vue'
import Title from './Title.vue'
import SquareContainer from './containers/SquareContainer.vue'
export default {
  components: {
    IonImg,
    Title,
    SquareContainer
  },
  props: {
    subsidiary: Object
  },
  data () {
    return {
      isOpened: false
    }
  },
  computed: {
    updatedSubsidiary () {
      return this.subsidiary
    }
  },
  methods: {
    closeSubsidiary () {
      this.isOpened = false
      this.$emit('onClose')
    }
  },
  watch: {
    updatedSubsidiary: function (newValue) {
      if (newValue && Object.keys(newValue).length) {
        this.isOpened = true
      } else {
        this.isOpened = false
      }
    }
  }
}
</script>
