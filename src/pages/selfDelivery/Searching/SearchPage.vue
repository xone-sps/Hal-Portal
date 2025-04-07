<template>
  <div class="w-full minh-screen  bg-white h-full flex  justify-content-start align-items-start">
    <div class="flex flex-1 px-2 border-right-1 h-full py-3">
      <PhoneSearching
          ref="searchPhone"
          :excelSearch="excelSearch"
          :selectedReceiverPhoneNumber="selectedReceiverPhoneNumber"
          :selectedReceiverAddress="selectedReceiverAddress"
          @close="onClose"
      />
    </div>
    <div class="flex flex-1 px-4">
      <BranchSearching :excelSearch="excelSearch" @close="onClose"/>
    </div>

  </div>
</template>

<script setup>
import {ref, watch} from 'vue'
import BranchSearching from "@/pages/selfDelivery/Searching/BranchSearching.vue";
import PhoneSearching from "@/pages/selfDelivery/Searching/PhoneSearching.vue";


const searchPhone = ref(null)
const selectedKeyOption = ref('phone')
const props = defineProps([
  'excelSearch',
  'selectedReceiverPhoneNumber',
  'selectedReceiverAddress'
])

const emit = defineEmits(['onClose'])

// Function you want to expose
const doSearchPhone = (phoneNumber) => {
  if(phoneNumber) {
    searchPhone.value.doSearchPhone(phoneNumber)
  }
};

const onClose = async (value) => {
  emit('onClose', value)
}

// Expose the ref and methods to parent components
defineExpose({
  doSearchPhone,
});

watch(selectedKeyOption, (newVal) => {
  console.log('Selected search type:', newVal)
})
</script>

<style scoped>
.mt-4 {
  margin-top: 1rem;
}
</style>

