<template>
  <div class="px-3">
    <!-- Pending COD Table -->
    <a-card>
      <div class="flex justify-between items-center !mb-4">
        <!--       <div class="">-->
        <!--         <h2 class="text-lg font-semibold">ລາຍການລໍຖ້າການໂອນ</h2>-->
        <!--         <p class="text-gray-500">ສະແດງ 1-10 ຈາກ 100 ລາຍການ</p>-->
        <!--       </div>-->

        <div>
          <Pagination
            :pagination="codStore.pagination"
            @paginate="handlePaginate"
          />
        </div>

        <!-- Pagination & Search -->
        <div class="flex items-center gap-4">
          <!-- Pagination -->
          <div>
            <!--            <div>-->
            <!--              <Pagination  :pagination="codStore.pagination"-->
            <!--                           @paginate="handlePaginate"/>-->
            <!--            </div>-->
          </div>
          <div class="flex justify-between items-center">
            <div class="flex">
              <a-date-picker
                v-model:value="codStore.startDate"
                placeholder="ມື້ເລີ່ມຕົ້ນ"
                class="!mr-3"
                style="width: 200px"
                format="DD-MM-YYYY"
                :disabled-date="disableStartDate"
              />
              <a-date-picker
                v-model:value="codStore.endDate"
                placeholder="ມື້ສິ້ນສຸດ"
                class="!mr-3"
                style="width: 200px"
                format="DD-MM-YYYY"
                :disabled-date="disableEndDate"
              />
              <a-button
                type="primary"
                class="search-button !text-white !mr-4"
                @click="searching"
              >
                ຄົ້ນຫາ
              </a-button>
              <a-button
                type="primary"
                class="clear-button"
                @click="codStore.clearSearch"
              >
                ລົບການຄົ້ນຫາ
              </a-button>
            </div>
            <!--            <a-button type="primary" class="export-button !text-white" @click="exportExcel">-->
            <!--              Export Excel-->
            <!--            </a-button>-->
          </div>
          <!-- Search Input -->
          <!--          <div class="relative w-80">-->
          <!--            <a-input-search-->
          <!--                v-model:value="searchQuery"-->
          <!--                placeholder="Search"-->
          <!--                class="!w-full !pl-10 1text-left"-->
          <!--            />-->
          <!--          </div>-->
        </div>
      </div>

      <!-- Table -->
      <a-table
        :columns="columns"
        :data-source="codStore.codListStatus"
        :pagination="false"
        :loading="codStore.loading"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'details'">
            <a-button type="link" @click="handleViewDetails(record.id)">
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
import Pagination from "@/components/pagination.vue";
import { EyeOutlined } from "@ant-design/icons-vue";
import { useRouter,useRoute } from "vue-router";
import { useCodStore } from "@/stores/cod/codStore";

const router = useRouter();
const route = useRoute();
const searchQuery = ref("");
const codStore = useCodStore();

const columns = [
  {
    title: "ເລກບິນໂອນ",
    dataIndex: ["invoice_number"],
    key: "invoice_number",
  },
  {
    title: "ລວມຍອດສຸດທິ",
    dataIndex: "total_price",
    key: "total_price",
    customRender: ({ text }: { text: number }) =>
      `${new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(text)} ກີບ`,
  },
  {
    title: "ບໍລິການ COD",
    dataIndex: "cod_fee",
    key: "cod_fee",
    customRender: ({ text }: { text: number }) =>
      `${new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(text)} %`,
  },
  {
    title: "ຄ່າທໍານຽມການໂອນ",
    dataIndex: "transfer_fee",
    key: "transfer_fee",
    customRender: ({ text }: { text: number }) =>
      `${new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(text)} ກີບ`,
  },
  {
    title: "ວັນທີຈະໄດ້ຮັບເງິນ",
    dataIndex: "estimate_receive_date",
    key: "estimate_receive_date",
  },
  {
    title: "ລາຍລະອຽດ",
    key: "details",
    align: "center",
    dataIndex: "details",
  },
];

// Disable dates for the Start Date picker
const disableStartDate = (current: Date) => {
  if (!codStore.endDate) {
    return false; // If no endDate is selected, allow all dates
  }
  return current > new Date(codStore.endDate); // Disable dates after the selected endDate
};

// Disable dates for the End Date picker
const disableEndDate = (current: Date) => {
  if (!codStore.startDate) {
    return false; // If no startDate is selected, allow all dates
  }
  return current < new Date(codStore.startDate); // Disable dates before the selected startDate
};

const searching = () => {
  codStore.fetchCodStatusData({
    status: "pending",
    startDate: codStore.startDate,
    endDate: codStore.endDate,
  });
};
// ✅ Handle Page Change with Cursor
const handlePaginate = (cursor: string) => {
  codStore.fetchCodStatusData({ status: "pending", cursor: cursor });
};
onMounted(async () => {
  await codStore.fetchCodStatusData({ status: "pending" });
});

async function handleViewDetails(id: string) {
    await codStore.viewDetails(id, router);
}
// const viewDetails = (record: any) => {
//   console.log("Record ID:", record.id); // Log the record ID
//   router.push({
//     name: "cod-detail", // ✅ Correct route name
//     params: { id: record.id }, // ✅ Pass tracking number as query param
//   });
// };
</script>

<style scoped></style>
