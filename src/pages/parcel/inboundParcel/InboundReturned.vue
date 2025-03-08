<template>
  <div class="px-3">
    <!-- Summary Section -->
    <a-card class="!mb-1">
      <div class="flex justify-between items-center">
        <div class="flex">
          <a-date-picker
              v-model:value="startDate"
              placeholder="ມື້ເລີ່ມຕົ້ນ" class="!mr-3"
              style="width: 200px;"
              format="DD-MM-YYYY"
          />
          <a-date-picker v-model:value="endDate" placeholder="ມື້ສິ້ນສຸດ" class="!mr-3"
                         style="width: 200px;"
                         format="DD-MM-YYYY"/>
          <a-button type="primary" class="search-button !text-white !mr-4" @click="searchQuery">
            ຄົ້ນຫາ
          </a-button>
          <a-button type="primary" class="clear-button" @click="clearSearch">
            ລົບການຄົ້ນຫາ
          </a-button>
        </div>

        <a-button type="primary" class="export-button !text-white" @click="exportExcel">
          Export Excel
        </a-button>
      </div>
    </a-card>
    <!-- COD Transactions Table -->
    <a-card class="custom-table-card">
      <div class="flex justify-between items-center !mb-4">
        <div>
          <p class="text-lg font-semibold">ລາຍການພັດສະດຸທີ່ສຳເລັດ <span class="text-red-500">100</span></p>
        </div>
        <div class="flex items-center gap-4">
          <a-pagination v-model:current="pagination.current" :total="pagination.total" :pageSize="pagination.pageSize"
                        show-less-items/>
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
      <a-table :columns="columns"
               :data-source="data"
               :pagination="false"
               :locale="{ emptyText: $emptyText() }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'details'">
            <a-button type="link" @click="viewDetails(record)">
              <EyeOutlined class="!text-red-500 text-xl cursor-pointer"/>
            </a-button>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {EyeOutlined} from "@ant-design/icons-vue";
import type {Dayjs} from 'dayjs';
import {useModalStore} from "@/stores/useModalStore";
import {useRouter} from "vue-router";


const searchQuery = ref("");
const modalStore = useModalStore();
const startDate = ref<Dayjs>();
const endDate = ref<Dayjs>();
const router = useRouter();
const pagination = ref({current: 1, total: 0, pageSize: 10});

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
  {title: "ເລກພັດສະດຸ", dataIndex: "tracking", key: "tracking"},
  {title: "ປະເພດພັດສະດຸ", dataIndex: "type", key: "type"},
  {title: "ລາຄາຂົນສົ່ງ", dataIndex: "price", key: "price"},
  {title: "ລາຄາ COD", dataIndex: "cod", key: "cod"},
  {title: "ສາຂາສົ່ງອອກ", dataIndex: "senderBranch", key: "senderBranch"},
  {title: "ສາຂາປາຍທາງ", dataIndex: "receiverBranch", key: "receiverBranch"},
  {title: "ວັນທີສົ່ງບິນ", dataIndex: "date", key: "date"},
  {
    title: "ລາຍລະອຽດ",
    key: "details",
    align: "center",
  },
];

const data = ref([]);

// const fetchData = () => {
//   // Simulate API call
//   data.value = []; // No data found scenario
//   pagination.value.total = data.value.length;
// };

// Function to handle row detail view
const viewDetails = (record: any) => {
  router.push({name: "outbound-detail", query: {transferId: record.transferId}});
};
const clearSearch = () => {
  searchQuery.value = "";
  // fetchData();
};
const exportExcel = () => {
  console.log("Exporting data...");
};

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
  height: 3px !important; /* Thicker bottom border */
  background-color: #E00C16 !important; /* Custom red border */
  border-radius: 2px;
}

</style>
