<template>
  <div class="!bg-white px-6 pb-2">
    <!-- Breadcrumb Component -->
    <Breadcrumb />
  </div>
  <div class="p-6">
    <!-- Header Section -->
    <a-card class="!mb-4">
      <div class="flex justify-between items-center">
        <div>
          <p class="text-lg font-bold">IN1234567890</p>
        </div>
        <a-button type="default" class="!bg-orange-500 !text-white rounded-md px-4 py-2">
          ລໍຖ້າການໂອນ
        </a-button>
      </div>
    </a-card>

    <!-- Summary Section -->
    <a-card class="!mb-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <p class="text-gray-500">ຍອດລວມສຸດທິ</p>
          <p class="text-blue-600 text-3xl font-bold">14,981,000 LAK</p>
        </div>
        <div>
          <p class="text-gray-500">ຍອດ COD ທັງໝົດ</p>
          <p class="text-xl font-bold">5,000,000 LAK</p>
        </div>
        <div>
          <p class="text-gray-500">ທ່ານຈະໄດ້ຮັບບັນຊີໃນວັນທີ</p>
          <p class="text-xl font-bold">25/01/2025</p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div>
          <p class="text-gray-500">ຄ່າທໍານຽມ COD</p>
          <p class="text-xl font-bold">0%</p>
        </div>
        <div>
          <p class="text-gray-500">ຄ່າທໍານຽມໂອນ</p>
          <p class="text-xl font-bold">19,000 LAK</p>
        </div>
      </div>
    </a-card>

    <!-- COD Transactions Table -->
    <a-card>
      <div class="flex justify-between items-center mb-4">
        <p class="text-lg font-semibold">ລາຍການພັດສະດຸທີ່ສຳເລັດ <span class="text-red-500">100</span></p>
        <div class="flex items-center gap-4">
          <a-pagination v-model:current="pagination.current" :total="pagination.total" :pageSize="pagination.pageSize" show-less-items />
          <a-input-search v-model:value="searchQuery" placeholder="Search" class="!w-72" />
        </div>
      </div>
      <a-table :columns="columns" :data-source="data" :pagination="false" />
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Breadcrumb from "@/components/breadcrumb.vue";

const searchQuery = ref("");
const pagination = { current: 1, pageSize: 10, total: 100 };

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
</script>

<style scoped>
:deep(.ant-tabs-tab-active) {
  font-weight: bold !important;
}

:deep(.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn) {
  color: #e00c16 !important; /* Custom active tab color */
  font-size: 15px !important;
}

:deep(.ant-tabs-ink-bar) {
  height: 3px !important;  /* Thicker bottom border */
  background-color: #e00c16 !important; /* Custom red border */
  border-radius: 2px;
}
</style>
