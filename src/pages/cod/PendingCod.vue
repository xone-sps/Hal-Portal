<template>
  <div class="px-3">
    <!-- Pending COD Table -->
    <a-card>
      <div class="flex justify-between items-center !mb-4">
       <div class="">
         <h2 class="text-lg font-semibold">ລາຍການລໍຖ້າການໂອນ</h2>
         <p class="text-gray-500">ສະແດງ 1-10 ຈາກ 100 ລາຍການ</p>
       </div>

        <!-- Pagination & Search -->
        <div class="flex items-center gap-4">
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
      </div>

      <!-- Table -->
      <a-table :columns="columns" :data-source="data" :pagination="false">

        <template #bodyCell="{ column, record }">
          <!-- Customize Detail Column -->
          <template v-if="column.key === 'details'">
            <a-button type="link" @click="viewDetails(record)">
              <EyeOutlined class="!text-red-500 text-xl cursor-pointer" />
            </a-button>
          </template>
        </template>

      </a-table>

    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { EyeOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";

const router = useRouter();
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
    dataIndex:"details"
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

const pagination = ref({
  current: 1,
  total: 100,
  pageSize: 30,
});


const viewDetails = (record: any) => {
  router.push({
    name: "pending-detail", // ✅ Correct route name
    query: { transferId: record.tracking }, // ✅ Pass tracking number as query param
  });
};
</script>

<style scoped>
</style>
