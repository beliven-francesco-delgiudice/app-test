<template>
  <ion-select
    interface="action-sheet"
    class="custom-select"
    cssClass="custom-select-sheet"
    :value="selectValue"
    :name="name"
    :disabled="isDisabled"
    :placeholder="placeholder"
    @ionChange="onChange"
  >
    <ion-select-option
      v-for="(option, i) in options"
      :key="i"
      :value="option.value"
    >
      {{ option.label }}
    </ion-select-option>
  </ion-select>
</template>
<script>
import { IonSelect, IonSelectOption } from '@ionic/vue'
export default {
  props: {
    name: String,
    placeholder: String,
    disabled: Boolean,
    options: Array,
    value: [String, Number, Object]
  },
  components: {
    IonSelect,
    IonSelectOption
  },
  data () {
    return {
      selectValue: this.value
    }
  },
  mounted () {
    console.log('mounted', this.value)
  },
  computed: {
    isDisabled () {
      return this.disabled || false
    }
  },
  methods: {
    onChange (event) {
      const { target } = event
      const { value } = target
      if (value !== this.selectValue) {
        this.selectValue = value
        this.$emit('onChange', value)
      }
    }
  },
  watch: {
    value: function (newValue) {
      console.log('value in select', newValue)
      if (this.selectValue !== newValue) {
        this.selectValue = newValue
      }
    }
  }
}
</script>
<style>
.custom-select {
  --color: #1c1c1b;
  color: #1c1c1b;
  font-family: 'Helvetica Neue', sans-serif;
  font-weight: 500;
  letter-spacing: 0.5px;
  line-height: 28px;
}
.custom-select .select-icon {
  opacity: 1;
  --opacity: 1;
}

.select-action-sheet {
  --background: white;
}

.select-action-sheet .action-sheet-group {
  padding-left: 2rem;
  padding-right: 2rem;
}
.select-action-sheet .action-sheet-group:first-child {
  border-radius: 24px 24px 0 0;
}
.select-action-sheet .action-sheet-group:last-child {
  margin-top: -2px;
}
.select-action-sheet .action-sheet-group:last-child > button {
  border-top: 1px solid #ededed;
}

.select-action-sheet button {
  padding: 1.5rem 0 1.5rem 0 !important;
  margin-bottom: 0.5rem !important;
  height: auto !important;
}
.select-action-sheet .action-sheet-group > button:first-child {
  margin-top: 1.5rem !important;
}
.select-action-sheet .action-sheet-group > button:last-child {
  margin-bottom: 1.5rem !important;
}
.select-action-sheet button > span {
  font-family: 'Helvetica Neue', sans-serif;
  font-weight: 500;
  letter-spacing: 0.025em;
  font-size: 16px;
  color: #1c1c1b;
}
</style>
