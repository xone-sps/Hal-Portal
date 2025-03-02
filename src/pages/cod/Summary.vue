<template>
  <div class="px-3">
    <!-- Summary Section -->
    <a-card class="!mb-4">
      <div class="flex justify-between items-center">
        <div>
          <p class="text-gray-500">ຍອດ COD ທັງໝົດ</p>
          <p class="text-red-600 text-3xl font-bold">5,000,000 LAK</p>
        </div>
        <div>
          <p class="text-gray-500">ຄ່າທໍານຽມ COD</p>
          <p class="text-xl font-bold">0%</p>
        </div>
        <div>
          <p class="text-gray-500">ຄ່າທໍານຽມໂອນ</p>
          <p class="text-xl font-bold">19,000 LAK</p>
        </div>
        <a-button type="primary" class="!bg-red-600 !text-white" @click="openCODModal">
          ຢືນຢັນຮັບຍອດ COD
        </a-button>
      </div>
    </a-card>
    <!-- COD Transactions Table -->
    <a-card>
      <div class="flex justify-between items-center !mb-4">
        <div>
          <p class="text-lg font-semibold">ລາຍການພັດສະດຸທີ່ສຳເລັດ <span class="text-red-500">100</span></p>
        </div>
        <div class="flex items-center gap-4">
          <a-pagination v-model:current="pagination.current" :total="pagination.total" :pageSize="pagination.pageSize" show-less-items />
          <!-- Search Input -->
          <div class="relative w-90">
            <a-input-search
                v-model:value="searchQuery"
                placeholder="Search"
                class="!w-full !pl-10 1text-left"
            />
          </div>
        </div>
      </div>
      <a-table :columns="columns" :data-source="data" :pagination="false" />
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useModalStore } from "@/stores/useModalStore";

const searchQuery = ref("");
const modalStore = useModalStore();

const openCODModal = () => {
  modalStore.showModal({
    totalAmount: "5,000,000",
    codAmount: "5,000,000",
    codRate: "0",
    transferFee: "19,000",
    bankAccount: "182120001640922001",
    bankOwner: "Outhai VONGSA MS",
    receiveDate: "25/01/2025",
  });
};

const columns = [
  { title: "ເລກພັດສະດຸ", dataIndex: "tracking", key: "tracking" },
  { title: "ປະເພດພັດສະດຸ", dataIndex: "type", key: "type" },
  { title: "ລາຄາຄ່າສົ່ງ", dataIndex: "price", key: "price" },
  { title: "ສາຂາສົ່ງອອກ", dataIndex: "senderBranch", key: "senderBranch" },
  { title: "ສາຂາປາຍທາງ", dataIndex: "receiverBranch", key: "receiverBranch" },
  { title: "ວັນທີສົ່ງບິນ", dataIndex: "date", key: "date" },
];

const data = [
  {
    key: "1",
    tracking: "VTE85688364229",
    type: "ເສື້ອຜ້າ",
    price: "8,000 ກີບ",
    senderBranch: "ດອນໂດກ (02055555555)",
    receiverBranch: "ສີສັດຕະນາກ (02055665555)",
    date: "30/01/2025",
  },
  {
    key: "2",
    tracking: "VTE85688364229",
    type: "ເສື້ອຜ້າ",
    price: "11,000 ກີບ",
    senderBranch: "ດອນໂດກ (02055555555)",
    receiverBranch: "ສີສັດຕະນາກ (02055665555)",
    date: "30/01/2025",
  },
];

const pagination = { pageSize: 10, total: data.length };
</script>

<style scoped>
:deep(.ant-tabs-tab-active) {
  /*font-weight: bold !important;*/
}

:deep(.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn) {
  color: #E00C16 !important; /* Custom active tab color */
  font-size: 15px !important;
}

:deep(.ant-tabs-ink-bar) {
  height: 3px !important;  /* Thicker bottom border */
  background-color: #E00C16 !important; /* Custom red border */
  border-radius: 2px;
}

</style>
