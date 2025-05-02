<template>
  <div class="">

    <div class="container">
      <!-- Hero Section -->
      <div class="relative w-full overflow-hidden">
        <img :src="cover" alt="Dashboard Banner" class="w-full h-full object-contain" />
      </div>
    </div>

    <div class="bg-gray-100 dashboard-container">
      <!-- Filters & Date Range -->
      <div class="flex flex-wrap items-center !mt-4 p-4 rounded-lg justify-end">
        <!-- Buttons and Date Picker aligned to the end -->
        <div class="flex gap-2 ml-auto">
          <p class="text-gray-600 !my-auto text-lg mr-4">ສະຖິຕິພາບລວມ</p>
          <a-button type="default" class="!bg-gray-200 !text-black rounded-md px-4 py-2">7 ມື້</a-button>
          <a-button type="default" class="!bg-gray-200 !text-black rounded-md px-4 py-2">1 ເດືອນ</a-button>
          <a-button type="default" class="!bg-gray-200 !text-black rounded-md px-4 py-2">ລ່າສຸດ</a-button>
          <a-range-picker v-model:value="date" class="w-72"/>
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 !mt-2">
        <a-card class="p-4">
          <template #title>
            <div class="flex justify-between items-center">
              <span class="font-semibold text-lg">ພັດສະດຸເຂົ້າ</span>
              <a @click="inboundParcel" class="text-red-500 text-sm">ເພີ່ມເຕີມ</a>
            </div>
          </template>
          <div class="flex justify-between text-lg">
            <div>
              <p class="text-gray-600">ຈັດສົ່ງສຳເລັດ</p>
              <p class="font-bold text-xl">5</p>
            </div>
            <div>
              <p class="text-gray-600">ກຳລັງຈັດສົ່ງ</p>
              <p class=" font-bold text-xl">10</p>
            </div>
            <div>
              <p class="text-gray-600">ພັດສະດຸຕີກັບ</p>
              <p class="font-bold text-xl">-</p>
            </div>
          </div>
        </a-card>

        <a-card class="p-4">
          <template #title>
            <div class="flex justify-between items-center">
              <span class="font-semibold text-lg">ພັດສະດຸອອກ</span>
              <a @click="outboundParcel" class="text-red-500 text-sm">ເພີ່ມເຕີມ</a>
            </div>
          </template>
          <div class="flex justify-between text-lg">
            <div>
              <p class="text-gray-600">ຈັດສົ່ງສຳເລັດ</p>
              <p class="  text-xl">200</p>
            </div>
            <div>
              <p class="text-gray-600">ກຳລັງຈັດສົ່ງ</p>
              <p class="font-bold text-xl">92</p>
            </div>
            <div>
              <p class="text-gray-600">ພັດສະດຸຕີກັບ</p>
              <p class="font-bold text-xl">-</p>
            </div>
          </div>
        </a-card>
      </div>

      <!-- COD Section -->
      <a-card class="!mt-4 p-6">
        <span class="font-semibold text-lg">ສະຫຼຸບຍອດເກັບເງິນປາຍທາງ COD</span>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div>
            <p class="text-gray-600">ຍອດ COD ທັງໝົດ</p>
            <p class="text-red-600 text-3xl font-bold py-2">{{codStore.codSummary.toLocaleString()}} LAK</p>
            <p class="text-gray-600 pt-6 pb-4">ຄ່າທຳນຽມ {{codStore.cod_fee_percent.toLocaleString()}} % <span class="pl-4">ຄ່າທຳນຽມໂອນ {{codStore.transferFee.toLocaleString()}} LAK</span></p>
          </div>
          <div>
            <p class="text-gray-600">ລໍຖ້າການໂອນ</p>
            <p class="text-black text-2xl font-bold py-2">3,402,000 LAK</p>
          </div>
          <div>
            <p class="text-gray-600">ໂອນສຳເລັດ</p>
            <p class="text-black text-2xl font-bold py-2">1,493,000 LAK</p>
          </div>
        </div>
        <div class="divider !mt-2"></div>
        <a-button type="primary" class="!mt-6 px-6 py-3 text-lg rounded-md !h-10 ant-btn-primary" :class="{ 'btn-disabled': codStore.codSummary <= 0 }" @click="openCODModal" :disabled="codStore.codSummary <= 0">ຢືນຢັນຮັບຍອດເງິນ COD</a-button>
      </a-card>
    </div>
  </div>

</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import dayjs, { type Dayjs } from 'dayjs';
import { useModalStore } from "@/stores/useModalStore";
type RangeValue = [Dayjs, Dayjs];
import cover from "@/assets/images/dashboard-image.png";
import {useRouter} from "vue-router";
import { useCodStore } from '@/stores/cod/codStore';
const date = ref<RangeValue>([dayjs(), dayjs()]);
const modalStore = useModalStore();

const router = useRouter();
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
const inboundParcel = () => {
  router.push({
    name: "inbound-processing",
  });
};
const outboundParcel = () => {
  router.push({
    name: "outbound-processing",
  });
};
onMounted(async () => {
  await codStore.fetchCodData();
});
</script>

<style scoped>
.divider {
  width: 100%;
  height: 1px;
  background-color:#EFEFEF;
}
.a-btn[disabled] {
  background-color: #ccc !important; /* Gray background */
  color: #666 !important; /* Gray text */
  cursor: not-allowed !important; /* Not-allowed cursor */
  border-color: #ccc !important; /* Gray border */
}
</style>
