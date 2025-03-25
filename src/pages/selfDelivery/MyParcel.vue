<template>
  <div class="px-3">
    <!-- header Section -->
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

        <div class="flex">
          <a-button type="primary" class="export-button !text-white !mr-2" @click="handleExport"
                    :loading="exportStore.isExportLoading">
            Import Excel
          </a-button>
          <a-button type="primary" class="export-button !text-white" @click="handleExport"
                    :loading="exportStore.isExportLoading">
            Export Template
          </a-button>
        </div>
      </div>
    </a-card>

    <!-- Order Transactions Table -->
    <a-card class="custom-table-card">
      <div class="flex justify-between items-center !mb-4">
        <div>
          <p class="text-lg font-semibold">ລາຍການບິນຂົນສົ່ງ <span
              class="text-red-500">{{ outboundStore.outboundList.length }}</span></p>
        </div>
        <Pagination :pagination="outboundStore.pagination"
                    @paginate="handlePaginate"/>
        <div class="flex items-center gap-4">
          <!-- Search Input -->
          <div class="relative w-90">
            <a-input-search
                v-model:value="searchQuery"
                @keydown.enter="debouncedSearch"
                placeholder="Search"
                class="!w-full !pl-10 1text-left"
            />
          </div>
        </div>
      </div>

      <div style="margin-bottom: 6px">
        <a-button type="primary" :disabled="!hasSelected" :loading="state.loading" @click="ConfirmDelete(1,true)"
                  class="!mr-2 !bg-red-600 !text-white">
          ລຶບຂໍ້ມູນ
        </a-button>
        <span style="margin-left: 8px">
    <template v-if="hasSelected">
        {{ `ເລືອກ ${state.selectedRowKeys.length} ລາຍການ` }}
    </template>
  </span>
      </div>
      <a-table :columns="columns" :data-source="outboundStore.outboundList" :pagination="false"
               :loading="outboundStore.loading"
               :locale="{ emptyText: $emptyText() }"
               rowKey="id"
               :row-selection="{
    selectedRowKeys: state.selectedRowKeys,
    onChange: onSelectChange
  }">
        <template #bodyCell="{ column, record }">
          <!-- Customize Detail Column -->
          <template v-if="column.key === 'action'">
            <a-button type="link" @click="ConfirmDelete(record.id,false)">
              <DeleteOutlined class="!text-red-500 text-xl cursor-pointer"/>
            </a-button>
            <a-button type="link" @click="viewDetails(record.shipment_number)">
              <EyeOutlined class="!text-red-500 text-xl cursor-pointer"/>
            </a-button>
          </template>
        </template>
      </a-table>
    </a-card>

    <a-modal v-model:open="isModalOpen" :footer="null" title="ທ່ານຕ້ອງການລຶບຂໍ້ມູນບິນບໍ່" centered :maskClosable="false"
             :closable="true">
      <div class="divider"></div>
      <div class="p-2">
        <div class="flex flex-col items-center text-center p-6">
          <DeleteOutlined class="!text-red-600 text-5xl !mb-4"/>
          <!--          <div class="mt-4 space-y-2 flex justify-between rounded-lg bg-gray-100">-->
          <!--            <p class="p-3 text-gray-500 text-center">ທ່ານຈະໄດ້ຮັບເຄື່ອງພາຍໃນ</p>-->
          <!--            <div class="p-3 font-semibold text-center">-->
          <!--              2-5 ວັນ-->
          <!--            </div>-->
          <!--          </div>-->
        </div>
        <div class="flex">
          <a-button
              type="primary"
              block
              class="!mt-6 !bg-red-600 !text-white !text-lg w-full !h-10 !mr-2"
              @click="deleteItemOption"
          >
            ລຶບ
          </a-button>
          <a-button
              type="primary"
              block
              class="!mt-6 !text-white !text-lg w-full !h-10"
              @click="Cancel"
          >
            ຍົກເລີກ
          </a-button>
        </div>

      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, reactive, computed} from "vue";
import {EyeOutlined, DeleteOutlined} from "@ant-design/icons-vue";
import {useOutboundParcelStore} from "@/stores/parcel/outboundStore";
import {useManageOrderStore} from "@/stores/parcel/manageOrderStore";
import {notification} from "ant-design-vue";
import type {Dayjs} from 'dayjs';
import {useRouter} from "vue-router";
import {useExportStore} from "@/stores/useExportStore";
import Pagination from "@/components/pagination.vue";
import dayjs from "dayjs";
import {debounce} from 'lodash';

const searchQuery = ref("");
const router = useRouter();

const outboundStore = useOutboundParcelStore();
const manageOrderStore = useManageOrderStore();
const exportStore = useExportStore();
const startDate = ref<Dayjs>(dayjs().subtract(3, 'month'));
const endDate = ref<Dayjs>(dayjs());
const isModalOpen = ref(false);
const deleteMore = ref(false);
const billId = ref("");

type Key = string | number;
const state = reactive<{
  selectedRowKeys: Key[];
  loading: boolean;
}>({
  selectedRowKeys: [],
  loading: false,
});

const onSelectChange = (selectedRowKeys: Key[]) => {
  state.selectedRowKeys = selectedRowKeys;
};

const hasSelected = computed(() => state.selectedRowKeys.length > 0);

const columns = [
  {title: "ເລກພັດສະດຸ", dataIndex: "shipment_number", key: "shipment_number"},
  {title: "ປະເພດພັດສະດຸ", dataIndex: ["parcel", "parcel_category", "name"], key: "parcel_category",},
  {
    title: "ລາຄາຂົນສົ່ງ",
    dataIndex: "total_freight",
    key: "total_freight",
    customRender: ({text}: { text: number }) => `${text.toLocaleString()} ກີບ`
  },
  {
    title: "ລາຄາ COD",
    dataIndex: "total_price",
    key: "cod",
    customRender: ({text}: { text: number }) => `${text.toLocaleString()} ກີບ`
  },
  {
    title: "ສາຂາຕົ້ນທາງ",
    key: "start_branch",
    customRender: ({record}: any) => {
      return `${record.start_branch?.name || ""} (${record.start_branch?.tel || ""})`;
    }
  },
  {
    title: "ສາຂາປາຍທາງ", key: "end_branch", customRender: ({record}: any) => {
      return `${record.end_branch?.name || ""} (${record.end_branch?.tel || ""})`;
    }
  },
  {title: "ວັນທີສົ່ງບິນ", dataIndex: "start_date_actual", key: "start_date_actual",
    sorter: (a, b) => new Date(a.start_date_actual).getTime() - new Date(b.start_date_actual).getTime(),
  },
  {
    title: "ລາຍລະອຽດ",
    key: "action",
    align: "center",
  },
];


const viewDetails = (trackingId: string) => {
  router.push({name: "inbound-detail", params: {trackingId}});
};

const handleExport = async () => {
  await exportStore.exportExcel({
    startDate: startDate.value,
    endDate: endDate.value,
    status: 'pending',
    query: '',
  });
};
const handlePaginate = (cursor: string) => {
  outboundStore.fetchOutboundData({
    status: 'pending',
    // cursor: cursor,
    startDate: startDate.value,
    endDate: endDate.value
  });
};
const handleSearch = () => {
  if (startDate.value != '' && endDate.value != '') {
    outboundStore.fetchOutboundData({
      status: 'pending',
      query: searchQuery.value,
      startDate: startDate.value,
      endDate: endDate.value
    },);
  }
};

const debouncedSearch = debounce(async () => {
  if (searchQuery.value.trim()) {
    await outboundStore.fetchOutboundData({
      status: 'pending',
      query: searchQuery.value.trim(),
    });
  }
}, 300);
const clearSearch = () => {
  startDate.value = <Dayjs>(dayjs());
  endDate.value = <Dayjs>(dayjs());
  searchQuery.value = '';
};

const ConfirmDelete = async (id, items) => {
  isModalOpen.value = true;
  deleteMore.value = items;
  billId.value = id;
};
const deleteItemOption = async () => {
  if (deleteMore.value == true) {
    await deleteItems();
  } else {
    await deleteItem();
  }
};
const Cancel = () => {
  isModalOpen.value = false;
  billId.value = '';
};
const deleteItem = async () => {
  try {
    const data = {
      id: billId.value,
    }
    const response = await manageOrderStore.deleteParcel(data);
    notification.success({
      message: "ສຳເລັດ!",
      description: response.data.message,
      placement: "topRight", // Show at top right
      duration: 3, // Auto close in 5 seconds
    });
    await outboundStore.fetchOutboundData({
      status: 'pending',
      startDate: startDate.value || '',
      endDate: endDate.value || ''
    });
  } catch (error) {
  } finally {
    isModalOpen.value = false;
  }
};

const deleteItems = async () => {
  if (state.selectedRowKeys.length === 0) return;
  state.loading = true;
  try {
    const data = {
      ids: state.selectedRowKeys,
    };
    const response = await manageOrderStore.deleteParcels(data);
    notification.success({
      message: "ສຳເລັດ!",
      description: response.data.message || "ລຶບລາຍການສຳເລັດ",
      placement: "topRight", // Show at top right
      duration: 3, // Auto close in 5 seconds
    });
    // ✅ Remove deleted items from the table
    outboundStore.outboundList = outboundStore.outboundList.filter(
        (item) => !state.selectedRowKeys.includes(item.id)
    );
    // ✅ Clear selection
    state.selectedRowKeys = [];
    isModalOpen.value = false;
    await outboundStore.fetchOutboundData({
      status: 'pending',
      startDate: startDate.value || '',
      endDate: endDate.value || ''
    });
  } catch (error) {
  } finally {
    state.loading = false;
  }
};

onMounted(async () => {
  await outboundStore.fetchOutboundData({status: 'pending', startDate: startDate.value, endDate: endDate.value});
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
