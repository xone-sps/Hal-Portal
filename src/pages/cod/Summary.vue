<template>
  <div class="px-3">
    <!-- Summary Section -->
    <a-card class="!mb-4">
      <div class="flex justify-between items-center">
        <div>
          <p class="text-gray-500">ຍອດ COD ທັງໝົດ</p>
          <p
            class="text-red-600 text-base sm:text-lg md:text-lg lg:text-xl font-bold"
          >
            {{ codStore.codSummary.toLocaleString() || "-" }} LAK
          </p>
        </div>
        <div>
          <p class="text-gray-500">ຄ່າທໍານຽມ COD</p>
          <p class="text-base sm:text-lg md:text-lg lg:text-xl font-bold">
            {{ codStore.cod_fee_percent }} %
          </p>
        </div>
        <div>
          <p class="text-gray-500">ຄ່າທໍານຽມໂອນ</p>
          <p class="text-base sm:text-lg md:text-xl lg:text-xl font-bold">
            {{ codStore.transferFee.toLocaleString() || "-" }} LAK
          </p>
        </div>
        <a-button
          type="primary"
          class="ant-btn-primary"
          :class="{ 'btn-disabled': codStore.codSummary <= 0 }"
          @click="openCODModal"
          :disabled="codStore.codSummary <= 0"
        >
          ຢືນຢັນຮັບຍອດ COD
        </a-button>
      </div>
    </a-card>
    <!-- COD Transactions Table -->
    <a-card>
      <div class="flex justify-between items-center !mb-4">
        <div>
          <p class="text-lg font-semibold">
            ລາຍການ <span class="text-red-500">{{ codStore.totalQty }}</span>
          </p>
        </div>
        <div class="flex items-center gap-4">
          <!--          <div>-->
          <!--            <Pagination-->
          <!--                :pagination="codStore.pagination"-->
          <!--                :pageSize="codStore.pagination.pageSize"-->
          <!--                :currentPage="codStore.pagination.currentPage"-->
          <!--                :totalItems="10"-->
          <!--                @paginate="handlePaginate"-->
          <!--            />-->
          <!--          </div>-->
          <div>
            <Pagination
              :pagination="codStore.pagination"
              @paginate="handlePaginate"
            />
          </div>
          <!--          <a-pagination v-model:current="codStore.pagination.current" :total="codStore.pagination.total" :pageSize="codStore.pagination.pageSize" show-less-items />-->
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
      <a-table
        :columns="columns"
        :data-source="codStore.codList"
        :pagination="false"
        :loading="codStore.loading"
      >
        <template #bodyCell="{ column, record }">
          <!-- Shipment Number -->
          <template v-if="column.key === 'shipment_number'">
            {{ record.shipment?.shipment_number || "-" }}
          </template>

          <!-- Sender -->
          <template v-if="column.key === 'sender'">
            {{ record.shipment?.sender_customer?.account_name || "-" }}
          </template>

          <!-- End Branch -->
          <template v-if="column.key === 'end_branch'">
            {{ record.shipment?.end_branch?.name || "-" }}
          </template>

          <!-- Paid -->
          <template v-if="column.key === 'paid'">
            {{ record.paid ? `${record.paid.toLocaleString()} ກີບ` : "-" }}
          </template>

          <!--          &lt;!&ndash; Status &ndash;&gt;-->
          <!--          <template v-if="column.key === 'status'">-->
          <!--            <a-tag :color="record.status === 'complete' ? 'green' : 'red'">-->
          <!--              {{ record.status }}-->
          <!--            </a-tag>-->
          <!--          </template>-->
          <template v-if="column.key === 'parcel_category'">
            {{
              record?.shipment?.parcel_in_shipment?.parcel?.parcel_category
                ?.name || "-"
            }}
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Pagination from "@/components/Pagination.vue";
import { useModalStore } from "@/stores/useModalStore";
import { useCodStore } from "@/stores/cod/codStore";

const searchQuery = ref("");
const modalStore = useModalStore();
const codStore = useCodStore();

const openCODModal = () => {
  modalStore.showModal({
    totalAmount: codStore.codSummary,
    codAmount: codStore.codSummary,
    codRate: codStore.cod_fee_percent,
    transferFee: codStore.transferFee,
    bankAccount: codStore.codList[0]?.shipment?.sender_customer?.account_number,
    bankOwner: codStore.codList[0]?.shipment?.sender_customer?.account_name,
    receiveDate: codStore.estimate_receive_date,
  });
};

const columns = [
  {
    title: "ເລກພັດສະດຸ",
    dataIndex: ["shipment", "shipment_number"],
    key: "shipment_number",
  },
  {
    title: "ປະເພດພັດສະດຸ",
    dataIndex: [
      "shipment",
      "parcel_in_shipment",
      "parcel",
      "parcel_category",
      "name",
    ],
    key: "parcel_category",
  },
  {
    title: "ລາຄາຄ່າສົ່ງ",
    key: "paid",
    dataIndex: "paid",
    customRender: ({ text }: { text: number }) =>
      `${text.toLocaleString()} ກີບ`,
  },
  // { title: "ສາຂາຕົ້ນທາງ", dataIndex: "senderBranch", key: "senderBranch" },
  {
    title: "ສາຂາປາຍທາງ",
    dataIndex: ["shipment", "end_branch", "name"],
    key: "end_branch",
  },
  {
    title: "ຜູ້ຝາກ",
    dataIndex: ["shipment", "sender_customer", "account_name"],
    key: "sender",
  },
  {
    title: "ວັນທີສົ່ງບິນ",
    dataIndex: ["shipment", "start_date_actual"],
    key: "date",
  },
];
// ✅ Handle Page Change with Cursor
const handlePaginate = (cursor: string) => {
  codStore.fetchCodData(cursor);
};
const confirmCOD = (cursor: string) => {
  codStore.fetchCodData(cursor);
};
onMounted(async () => {
  await codStore.fetchCodData();
});
</script>

<style scoped>
:deep(.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn) {
  color: #e00c16 !important; /* Custom active tab color */
  font-size: 15px !important;
}

:deep(.ant-tabs-ink-bar) {
  height: 3px !important; /* Thicker bottom border */
  background-color: #e00c16 !important; /* Custom red border */
  border-radius: 2px;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
