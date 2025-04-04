<template>
  <SelectButton
      v-model="selectedValue"
      :options="options"
      option-label="label"
      option-value="value"
      class="p-mb-3"
  />
</template>

<script setup>
import {defineProps, defineEmits, ref, watch} from 'vue'
import SelectButton from "primevue/selectbutton";

const props = defineProps({
  modelValue: {
    type: String,
    default: 'phone',
  }
})

const emit = defineEmits(['update:modelValue'])

// Define the options with label and value
const options = [
  {label: 'ຄົ້ນຫາດ້ວຍເບີໂທ', value: 'phone'},
  {label: 'ຄົ້ນຫາດ້ວຍຊື່ສາຂາ', value: 'branch'},
]

const selectedValue = ref(props.modelValue)
watch(selectedValue, (newVal) => {
  emit('update:modelValue', newVal)
})
watch(() => props.modelValue, (newVal) => {
  selectedValue.value = newVal
})
</script>

<style scoped>
/* Optional: Add any styles if needed */
</style>
