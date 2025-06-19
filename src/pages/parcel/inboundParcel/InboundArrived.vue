<template>
  <div class="px-3">
    <!-- Summary Section -->
    <a-card class="!mb-1">
      <div class="flex justify-between items-center">
        <div class="flex">
          <a-date-picker
            v-model:value="startDate"
            placeholder="ມື້ເລີ່ມຕົ້ນ"
            class="!mr-3"
            style="width: 200px"
            format="DD-MM-YYYY"
            :disabled-date="disableStartDate"
          />
          <a-date-picker
            v-model:value="endDate"
            placeholder="ມື້ສິ້ນສຸດ"
            class="!mr-3"
            style="width: 200px"
            format="DD-MM-YYYY"
            :disabled-date="disableEndDate"
          />
          <a-button
            type="primary"
            class="search-button !text-white !mr-4"
            @click="handleSearch"
          >
            ຄົ້ນຫາ
          </a-button>
          <a-button type="primary" class="clear-button" @click="clearSearch">
            ລົບການຄົ້ນຫາ
          </a-button>
        </div>

        <a-button
          type="primary"
          class="export-button !text-white"
          @click="handleExport"
          :loading="exportStore.isExportLoading"
        >
          Export Excel
        </a-button>
      </div>
    </a-card>
    <!-- COD Transactions Table -->
    <a-card class="custom-table-card">
      <div class="flex justify-between items-center !mb-4">
        <div>
          <p class="text-lg font-semibold">
            ລາຍການພັດສະດຸທີ່ສຳເລັດ
            <span
              class="text-red-500"
              v-if="inboundStore.inboundList?.length > 0"
              >{{ inboundStore.inboundList.length }}</span
            >
          </p>
        </div>
        <Pagination
          :pagination="inboundStore.pagination"
          @paginate="handlePaginate"
        />
        <div class="flex items-center gap-4">
          <!-- Search Input -->
          <div class="relative w-90">
            <a-input-search
              v-model:value="searchQuery"
              @keydown.enter="debouncedSearch"
              placeholder="ປ້ອນເລກບິນ"
              class="!w-full !pl-10 1text-left"
            />
          </div>
        </div>
      </div>
      <a-table
        :columns="columns"
        :data-source="inboundStore.inboundList"
        :pagination="false"
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
import { onMounted, ref } from "vue";
import { EyeOutlined } from "@ant-design/icons-vue";
import Pagination from "@/components/pagination.vue";
import { useRouter } from "vue-router";
import { useInboundParcelStore } from "@/stores/parcel/inboundStore.ts";
import { useExportStore } from "@/stores/useExportStore";
import dayjs, { Dayjs } from "dayjs";
import { debounce } from "lodash";
const inboundStore = useInboundParcelStore();
const exportStore = useExportStore();
const router = useRouter();

const searchQuery = ref("");
const startDate = ref<Dayjs>(dayjs().subtract(3, "month"));
const endDate = ref<Dayjs>(dayjs());

const columns = [
  { title: "ເລກພັດສະດຸ", dataIndex: "shipment_number", key: "shipment_number" },
  {
    title: "ປະເພດພັດສະດຸ",
    dataIndex: ["parcel", "parcel_category", "name"],
    key: "parcel_category",
  },
  {
    title: "ລາຄາຂົນສົ່ງ",
    dataIndex: "total_freight",
    key: "total_freight",
    customRender: ({ text }: { text: number }) =>
      `${text.toLocaleString()} ກີບ`,
  },
  {
    title: "ລາຄາ COD",
    dataIndex: "total_price",
    key: "cod",
    customRender: ({ text }: { text: number }) =>
      `${text.toLocaleString()} ກີບ`,
  },
  {
    title: "ສາຂາຕົ້ນທາງ",
    key: "start_branch",
    customRender: ({ record }: any) => {
      return `${record.start_branch?.name || ""} (${
        record.start_branch?.tel || ""
      })`;
    },
  },
  {
    title: "ສາຂາປາຍທາງ",
    key: "end_branch",
    customRender: ({ record }: any) => {
      return `${record.end_branch?.name || ""} (${
        record.end_branch?.tel || ""
      })`;
    },
  },
  // {title: "ວັນທີສົ່ງບິນ", dataIndex: "start_date_actual", key: "start_date_actual"},
  {
    title: "ລາຍລະອຽດ",
    key: "details",
    align: "center",
  },
];

// Disable dates for the Start Date picker
const disableStartDate = (current: Date) => {
  if (!endDate.value) {
    return false; // If no endDate is selected, allow all dates
  }
  return current > new Date(endDate.value); // Disable dates after the selected endDate
};

// Disable dates for the End Date picker
const disableEndDate = (current: Date) => {
  if (!startDate.value) {
    return false; // If no startDate is selected, allow all dates
  }
  return current < new Date(startDate.value); // Disable dates before the selected startDate
};
// Function to handle row detail view
const viewDetails = (trackingId: string) => {
  router.push({ name: "parcel-detail", params: { trackingId } });
};
const handlePaginate = (cursor: string) => {
  inboundStore.fetchInboundData({
    status: "arrived_status",
    cursor: cursor,
    startDate: startDate.value,
    endDate: endDate.value,
  });
};
const handleSearch = () => {
  if (startDate.value != "" && endDate.value != "") {
    inboundStore.fetchInboundData({
      status: "arrived_status",
      query: searchQuery.value,
      startDate: startDate.value,
      endDate: endDate.value,
    });
  }
};
const debouncedSearch = debounce(async () => {
  if (searchQuery.value.trim()) {
    await inboundStore.fetchInboundData({
      status: "arrived_status",
      query: searchQuery.value.trim(),
    });
  }
}, 300);
const handleExport = async () => {
  await exportStore.exportExcel({
    startDate: startDate.value,
    endDate: endDate.value,
    status: "arrived_status",
    query: "",
  });
};
const clearSearch = () => {
  startDate.value = <Dayjs>dayjs();
  endDate.value = <Dayjs>dayjs();
  searchQuery.value = "";
};
// const pagination = {pageSize: 10, total: data.length};
onMounted(async () => {
  await inboundStore.fetchInboundData({
    status: "arrived_status",
    startDate: startDate.value,
    endDate: endDate.value,
  });
});
</script>

<style scoped>
:deep(.ant-tabs-tab-active) {
  /*font-weight: bold !important;*/
}

:deep(.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn) {
  color: #e00c16 !important; /* Custom active tab color */
  font-size: 15px !important;
}

:deep(.ant-tabs-ink-bar) {
  height: 3px !important; /* Thicker bottom border */
  background-color: #e00c16 !important; /* Custom red border */
  border-radius: 2px;
}
</style>
