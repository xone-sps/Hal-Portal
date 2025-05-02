<template>
  <a-modal v-model:open="modalStore.isOpen" :title="modalStore.modalTitle" width="450px" @ok="modalStore.closeModal" :maskClosable="false">
    <div class="divider"></div>
    <div class="p-2">
      <!-- Total Amount -->
      <div class="text-center">
        <p class="text-gray-500 text-sm">ຍອດລວມສຸດທິ</p>
        <p class="text-red-600 font-bold text-2xl">{{ modalStore.modalData.totalAmount }} LAK</p>
      </div>

      <!-- COD Details -->
      <div class="mt-4 space-y-2">
        <div class="flex justify-between">
          <p class="text-gray-500">ຍອດ COD ທັງໝົດ</p>
          <p class="font-semibold">{{ modalStore.modalData.codAmount }} LAK</p>
        </div>
        <div class="flex justify-between">
          <p class="text-gray-500">ຄ່າທໍານຽມ COD</p>
          <p class="font-semibold">{{ modalStore.modalData.codRate }}%</p>
        </div>
        <div class="flex justify-between">
          <p class="text-gray-500">ຄ່າທໍານຽມໂອນ</p>
          <p class="font-semibold">{{ modalStore.modalData.transferFee }} LAK</p>
        </div>
      </div>
      <div class="dashed-line"></div>
      <!-- Bank Info -->
      <div class="mt-4 space-y-2 flex justify-between">
        <p class="text-gray-500">ບັນຊີທະນາຄານ</p>
        <p class="text-gray-700">{{ modalStore.modalData.bankAccount }}</p>
      </div>
      <div class="space-y-2 flex justify-between">
        <p></p>
        <p class="mt-2 text-gray-700">{{ modalStore.modalData.bankOwner }}</p>
      </div>

      <!-- Receive Date -->
      <div class="mt-4 space-y-2 flex justify-between rounded-lg bg-gray-100">
        <p class="p-3 text-gray-500 text-center">ທ່ານຈະໄດ້ຮັບບັນຊີໃນວັນທີ</p>
        <div class="p-3 font-semibold text-center">
          {{ modalStore.modalData.receiveDate }}
        </div>
      </div>

      <!-- Confirmation Checkbox -->
      <div class="mt-4 flex items-center gap-2">
        <WarningOutlined/>
        <p class="text-gray-600 text-sm">ທ່ານສາມາດຢືນຢັນຮັບຍອດ COD 1 ຄັ້ງ / 1 ມື້</p>
      </div>
    </div>

    <template #footer>
      <a-button type="primary" class="w-full !bg-red-600 !text-white !h-10" @click="modalStore.confirmModal">
        ຢືນຢັນຮັບຍອດ COD
      </a-button>
    </template>
  </a-modal>
  <!-- COD Success Modal -->
  <CodSuccessModal ref="codSuccessModal" />
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useModalStore} from "@/stores/useModalStore";
import CodSuccessModal from "@/components/modals/CodSuccess.vue";
import {
  WarningOutlined,
} from "@ant-design/icons-vue";


const modalStore = useModalStore();
const codSuccessModal = ref();

const handleConfirm = () => {
  modalStore.closeModal();
  codSuccessModal.value?.showModal();
};

const confirmCod = () => {
  // Logic to confirm COD
  console.log("COD confirmed");
};

onMounted(() => {
  console.log("codSuccessModal:", codSuccessModal.value);
});
</script>

<style scoped>
.divider {
  margin: 16px 0;
  width: 100%;
  height: 1px;
  background-color: #EFEFEF;
}

.dashed-line {
  border-top: 1px dashed #d1d5db; /* Gray color */
  margin: 16px 0;
}

</style>