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
          <a-button type="primary" class="search-button !text-white !mr-4" @click="handleSearch">
            ຄົ້ນຫາ
          </a-button>
          <a-button type="primary" class="clear-button" @click="clearSearch">
            ລົບການຄົ້ນຫາ
          </a-button>
        </div>

        <a-button type="primary" class="export-button !text-white" @click="handleExport" :loading="exportStore.isExportLoading">
          Export Excel
        </a-button>
      </div>
    </a-card>
    <!-- COD Transactions Table -->
    <a-card class="custom-table-card">
      <div class="flex justify-between items-center !mb-4">
        <div>
          <p class="text-lg font-semibold">ລາຍການພັດສະດຸຕີກັບ <span class="text-red-500">{{ outboundStore.outboundList?.length }}</span></p>
        </div>
        <div class="flex items-center gap-4">
          <!-- <a-pagination v-model:current="pagination.current" :total="pagination.total" :pageSize="pagination.pageSize"
                        show-less-items/> -->
          <!-- Search Input -->
          <div class="relative w-90">
                              <Pagination  :pagination="outboundStore.pagination"
                     @paginate="handlePaginate"/>
            <a-input-search
                     v-model:value="searchQuery"
                @keydown.enter="debouncedSearch"
                placeholder="Search"
                class="!w-full !pl-10 1text-left"
            />
          </div>
        </div>
      </div>
      <a-table :columns="columns" :data-source="outboundStore.outboundList" :pagination="false" :loading="outboundStore.loading"
               :locale="{ emptyText: $emptyText() }"
      >
        <template #bodyCell="{ column, record }">
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
import {ref,onMounted} from "vue";
import {EyeOutlined} from "@ant-design/icons-vue";
import type {Dayjs} from 'dayjs';
import {useModalStore} from "@/stores/useModalStore";
import {useRouter} from "vue-router";
import {useOutboundParcelStore} from "@/stores/parcel/outboundStore";
import {useExportStore} from "@/stores/useExportStore";
import Pagination from "@/components/pagination.vue";
import dayjs from "dayjs";
import { debounce } from 'lodash';


const searchQuery = ref("");
const outboundStore = useOutboundParcelStore();
const exportStore = useExportStore();
const startDate= ref<Dayjs>(dayjs().subtract(3, 'month'));
const endDate = ref<Dayjs>(dayjs());
const router = useRouter();



const columns = [
  {title: "ເລກພັດສະດຸ", dataIndex: "shipment_number", key: "shipment_number"},
  {title: "ປະເພດພັດສະດຸ", dataIndex: ["parcel","parcel_category","name"], key: "parcel_category"},
  {title: "ລາຄາຂົນສົ່ງ", dataIndex: "total_freight", key: "total_freight",  customRender: ({ text }: { text: number }) => `${text.toLocaleString()} ກີບ`},
  {title: "ລາຄາ COD", dataIndex: "total_price", key: "cod",customRender: ({ text }: { text: number }) => `${text.toLocaleString()} ກີບ`},
  {
    title: "ສາຂາຕົ້ນທາງ",
    key: "start_branch",
    customRender: ({ record }: any) => {
      return `${record.start_branch?.name || ""} (${record.start_branch?.tel || ""})`;
    }},
  {title: "ສາຂາປາຍທາງ", key: "end_branch", customRender: ({ record }: any) => {
      return `${record.end_branch?.name || ""} (${record.end_branch?.tel || ""})`;
    }},
  {title: "ວັນທີສົ່ງບິນ", dataIndex: "start_date_actual", key: "start_date_actual"},
  {
    title: "ລາຍລະອຽດ",
    key: "details",
    align: "center",
  },
];

// Function to handle row detail view
const viewDetails = (trackingId: string) => {
  router.push({ name: "inbound-detail", params: { trackingId } });
};

const handleExport = async () => {
  await exportStore.exportExcel({
    startDate: startDate.value.format('YYYY-MM-DD'),
    endDate: endDate.value.format('YYYY-MM-DD'),
    status: 'returned_processing',
    query: '',
  });
};
const handlePaginate = (cursor: string) => {
  outboundStore.fetchOutboundData({
    status: 'returned_processing',
    cursor: cursor,
    startDate: startDate.value.format('YYYY-MM-DD'),
    endDate: endDate.value.format('YYYY-MM-DD')
  });
};
const handleSearch = () => {
  if(startDate.value != null && endDate.value != null){
    outboundStore.fetchOutboundData({status: 'returned_processing',query:searchQuery.value,startDate:startDate.value.format('YYYY-MM-DD'),endDate:endDate.value.format('YYYY-MM-DD')},);
  }
};

const debouncedSearch = debounce(async () => {
  if (searchQuery.value.trim()) {
    await outboundStore.fetchOutboundData({
      status: 'returned_processing',
      query: searchQuery.value.trim(),
    });
  }
}, 300);
const clearSearch = () =>{
  startDate.value =<Dayjs>(dayjs());
  endDate.value = <Dayjs>(dayjs());
  searchQuery.value = '';
};
onMounted(async () => {
  await outboundStore.fetchOutboundData({status: 'returned_processing',startDate:startDate.value.format('YYYY-MM-DD'),endDate:endDate.value.format('YYYY-MM-DD')});
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
