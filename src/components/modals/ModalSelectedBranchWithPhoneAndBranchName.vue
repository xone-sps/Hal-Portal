<script setup>
import SearchPage from "@/pages/selfDelivery/Searching/SearchPage.vue";
import {computed, nextTick, ref, watch} from "vue";

const props = defineProps({
  isVisible: Boolean,
  selectedReceiverPhoneNumber: String,
  selectedReceiverAddress: String
});


const searchPage = ref(null)

const emit = defineEmits(['close', 'setNewBranch'])

function setModalClose(isVisible) {
  emit("close", isVisible)
}

function setNewBranch(value) {
  emit("setNewBranch", value)
}

watch(() => props.isVisible, (newVal) => {
  if (newVal && props.selectedReceiverPhoneNumber) {
    nextTick(() => {
      searchPage.value.doSearchPhone(props.selectedReceiverPhoneNumber)
    })
  }
})

const dialogVisible = computed({
  get() {
    return props.isVisible;
  },
  set(value) {
    setModalClose(value);
  }
});

</script>

<template>
  <div>
    <a-modal
        :base-z-index="1003"
        v-model:visible="dialogVisible"
        @hide="setModalClose(false)"
        width="1250px"
        class="custom-dialog-shadow w-full">
      <SearchPage
          ref="searchPage"
          :excelSearch="true"
          :selectedReceiverPhoneNumber="selectedReceiverPhoneNumber"
          :selectedReceiverAddress="selectedReceiverAddress"
          @onClose="setNewBranch"/>
    </a-modal>
  </div>
</template>

<style scoped>
/* Add any custom styles here */
</style>
