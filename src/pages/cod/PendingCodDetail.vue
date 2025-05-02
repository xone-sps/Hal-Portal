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
          <p class="text-lg font-bold">{{ codStore.codDetail.invoice_number}}</p>
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
          <p class="text-blue-600 text-3xl font-bold">{{ codStore.codDetail.total_price 
              ? new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(codStore.codDetail.total_price) 
              : '-' 
          }} LAK</p>
        </div>
        <div>
          <p class="text-gray-500">ຍອດ COD ທັງໝົດ</p>
          <p class="text-xl font-bold">{{ codStore.codDetail.sub_total_price 
              ? new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(codStore.codDetail.sub_total_price) 
              : '-' 
          }} LAK</p>
        </div>
        <div>
          <p class="text-gray-500">ທ່ານຈະໄດ້ຮັບບັນຊີໃນວັນທີ</p>
          <p class="text-xl font-bold">{{codStore.codDetail.estimate_receive_date }}</p>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div>
          <p class="text-gray-500">ຄ່າທໍານຽມ COD</p>
          <p class="text-xl font-bold">{{ codStore.codDetail.cod_fee_percent 
              ? new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(codStore.codDetail.cod_fee_percent) 
              : '-' 
          }} %</p>
        </div>
        <div>
          <p class="text-gray-500">ຄ່າທໍານຽມໂອນ</p>
          <p class="text-xl font-bold">{{ codStore.codDetail.transfer_fee 
              ? new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(codStore.codDetail.transfer_fee) 
              : '-' 
          }} LAK</p>
        </div>
      </div>
    </a-card>

    <!-- COD Transactions Table -->
    <a-card>
      <div class="flex justify-between items-center mb-4">
        <p class="text-lg font-semibold">ລາຍການພັດສະດຸທີ່ສຳເລັດ   <span class="text-red-500">
    {{ codStore.codDetail.data ? codStore.codDetail.data.length : 0 }}
  </span></p>
        <div class="flex items-center gap-4">
          <!-- <a-pagination v-model:current="pagination.current" :total="pagination.total" :pageSize="pagination.pageSize" show-less-items /> -->
          <a-input-search v-model:value="searchQuery" placeholder="Search" class="!w-72" />
        </div>
      </div>
      <a-table :columns="columns" :data-source="codStore.codDetail.data" :pagination="false" />
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref,onMounted} from "vue";
import { useRoute } from "vue-router";
import Breadcrumb from "@/components/breadcrumb.vue";
import { useCodStore } from "@/stores/cod/codStore";

const codStore = useCodStore();
const route = useRoute();
const searchQuery = ref("");
const pagination = { current: 1, pageSize: 10, total: 100 };

const columns = [
  { title: "ເລກພັດສະດຸ", dataIndex: ["shipment_payment","shipment","shipment_number"], key: "shipment" },
  { title: "ປະເພດພັດສະດຸ", dataIndex: ["shipment_payment","shipment","parcel_in_shipment","parcel","parcel_category","name"], key: "shipment" },
  { title: "ລາຄາຄ່າສົ່ງ", dataIndex: ["shipment_payment","paid"], key: "shipment",customRender: ({ text }: { text: number }) =>
      `${new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(text)} ກີບ`, },
  { title: "ສາຂາສົ່ງອອກ", dataIndex: ["shipment_payment","shipment","parcel_in_shipment","parcel","parcel_category","name"], key: "shipment" },
  { title: "ສາຂາປາຍທາງ", dataIndex: ["shipment_payment","shipment","end_branch","name"], key: "end_branch" },
  { title: "ວັນທີສົ່ງບິນ", dataIndex: ["shipment_payment","shipment","start_date_actual"], key: "start_date_actual" },
];
onMounted(async () => {
  await codStore.fetchCodDetail(route.params?.id);
});
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
