<template>
  <div class="px-3">
    <!-- Summary Section -->
    <a-card class="!mb-1">
      <div class="flex justify-between items-center">
        <div class="flex">
          <a-date-picker
              v-model:value="inboundStore.startDate"
              placeholder="ມື້ເລີ່ມຕົ້ນ" class="!mr-3"
              style="width: 200px;"
              format="DD-MM-YYYY"
          />
          <a-date-picker v-model:value="inboundStore.endDate" placeholder="ມື້ສິ້ນສຸດ" class="!mr-3"
                         style="width: 200px;"
                         format="DD-MM-YYYY"/>
          <a-button type="primary" class="search-button !text-white !mr-4" @click="inboundStore.searchQuery">
            ຄົ້ນຫາ
          </a-button>
          <a-button type="primary" class="clear-button" @click="inboundStore.clearSearch">
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
      <a-table :columns="columns" :data-source="inboundStore.inboundList" :pagination="false" :loading="inboundStore.loading"
               :locale="{ emptyText: $emptyText() }"
      >
        <template #bodyCell="{ column, record }">
          <!-- Customize Detail Column -->
          <template v-if="column.key === 'details'">
            <a-button type="link" @click="viewDetails(record.shipment_number)">
              <EyeOutlined class="!text-red-500 text-xl cursor-pointer" />
            </a-button>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted} from "vue";
import { EyeOutlined } from "@ant-design/icons-vue";
import {useModalStore} from "@/stores/useModalStore";
import {useRouter} from "vue-router";
import {useInboundParcelStore} from "@/stores/parcel/inboundStore"

const searchQuery = ref("");
const modalStore = useModalStore();
const router = useRouter();
const inboundStore = useInboundParcelStore();

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
  {title: "ເລກພັດສະດຸ", dataIndex: "shipment_number", key: "shipment_number"},
  {title: "ປະເພດພັດສະດຸ", dataIndex: ["parcel","parcel_category","name"], key: "parcel_category"},
  {title: "ລາຄາຂົນສົ່ງ", dataIndex: "total_price", key: "total_price",  customRender: ({ text }: { text: number }) => `${text.toLocaleString()} ກີບ`},
  {title: "ລາຄາ COD", dataIndex: "cod", key: "cod"},
  {title: "ສາຂາຕົ້ນທາງ", dataIndex: ["start_branch","name",], key: "start_branch"},
  {title: "ສາຂາປາຍທາງ", dataIndex: ["end_branch","name"], key: "end_branch"},
  {title: "ວັນທີສົ່ງບິນ", dataIndex: "start_date_actual", key: "start_date_actual"},
  {
    title: "ລາຍລະອຽດ",
    key: "details",
    align: "center",
  },
];

// const fetchData = () => {
//   // Simulate API call
//   data.value = []; // No data found scenario
//   pagination.value.total = data.value.length;
// };
// Function to handle row detail view
const viewDetails = (trackingId: string) => {
  console.log(trackingId)
  router.push({ name: "inbound-detail", params: { trackingId } });
};
const clearSearch = () => {
  searchQuery.value = "";
  // fetchData();
};
const exportExcel = () => {
  console.log("Exporting data...");
};
const pagination = {pageSize: 10, total: 20};

onMounted(async () => {
  await inboundStore.fetchInboundData('processing');
});

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
