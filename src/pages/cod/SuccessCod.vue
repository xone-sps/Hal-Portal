<template>
  <div class="px-3">
    <!-- Pending COD Table -->
    <a-card>
      <div class="flex justify-between items-center mb-4">
        <div class="">
          <p class="text-lg font-semibold">ລາຍການລໍຖ້າການໂອນ</p>
          <p class="text-gray-500">ສະແດງ 1-10 ຈາກ 100 ລາຍການ</p>
        </div>
        <!-- Pagination -->
        <a-pagination v-model:current="pagination.current" :total="pagination.total" :pageSize="pagination.pageSize" show-less-items />
        <!-- Search Input -->
        <div class="relative w-80">
          <a-input-search
              v-model:value="searchQuery"
              placeholder="Search"
              class="!w-full !pl-10 1text-left"
          />
        </div>
      </div>

      <!-- Table -->
      <a-table :columns="columns" :data-source="data" :pagination="false" bordered />
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { SearchOutlined } from "@ant-design/icons-vue";

const searchQuery = ref("");

const columns = [
  { title: "ເລກບິນໂອນ", dataIndex: "transferId", key: "transferId" },
  { title: "ຍອດລວມສຸດທິ", dataIndex: "totalAmount", key: "totalAmount" },
  { title: "ລາຍການ COD", dataIndex: "codItems", key: "codItems" },
  { title: "ຄ່າທໍານຽມໂອນ", dataIndex: "transferFee", key: "transferFee" },
  { title: "ໄດ້ຮັບບິນເມື່ອໃດ", dataIndex: "receiveDate", key: "receiveDate" },
  {
    title: "ລາຍລະອຽດ",
    key: "details",
    align: "center",
    render: (record: any) =>
        `<a-button type="link" @click="viewDetails(record)">
        <EyeOutlined class="text-red-500 text-xl cursor-pointer" />
      </a-button>`,
  },
];

const data = [
  {
    key: "1",
    transferId: "VTE85688364229",
    totalAmount: "14,981,000 ກີບ",
    codItems: "100 ລາຍການ",
    transferFee: "3,000 ກີບ",
    receiveDate: "30/01/2025",
  },
  {
    key: "2",
    transferId: "VTE85688364229",
    totalAmount: "14,981,000 ກີບ",
    codItems: "100 ລາຍການ",
    transferFee: "3,000 ກີບ",
    receiveDate: "26/01/2025",
  },
];

// const pagination = { pageSize: 10, total: data.length };
const pagination = ref({
  current: 1,
  total: 100,
  pageSize: 30,
});

// Function to handle row detail view
const viewDetails = (record: any) => {
  console.log("Viewing details for:", record);
};

</script>

<style scoped>
</style>
