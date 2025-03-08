<template>
  <div class="!bg-white px-6 pb-2">
    <!-- Breadcrumb Component -->
    <Breadcrumb />
  </div>
  <div class="px-3 py-2">
    <!-- Header Section -->
    <div class="flex justify-between">
      <div class="w-1/3">
        <div class="p-4 max-w-md mx-auto bg-white">
          <!-- Header Section -->
          <div class="flex justify-between items-center pb-3">
            <div class="flex items-center gap-2">
              <img :src="logo" alt="Logo" class="w-12 h-12" />
              <div>
                <h3 class="font-semibold text-gray-800">ຮຸ່ງອາລຸນຂົນສົ່ງດ່ວນ</h3>
                <p class="text-xs text-gray-500">ໂນ້ຍາດ່ວນ: 1419</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-xs text-gray-500">ວັນທີສົ່ງບິນ</p>
              <p class="font-semibold text-gray-800"> {{ date }} </p>
            </div>
          </div>
          <div class="dashed-line"></div>
          <!-- Tracking Info -->
          <div class="my-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-500 text-sm">ເລກພັດສະດຸ</span>
              <span class="font-semibold"> {{ trackingNumber }} </span>
              <ScanOutlined class="text-red-500 text-lg cursor-pointer" />
            </div>
            <div class="flex justify-center my-2">
              <img :src="barcode" alt="Barcode" class="w-full h-16 object-contain" />
            </div>
            <div class="flex justify-between items-center text-gray-500 text-sm">
              <span> {{ fromBranch }} </span>
              <ArrowRightOutlined class="text-gray-400" />
              <span> {{ toBranch }} </span>
            </div>
          </div>
          <div class="dashed-line"></div>
          <!-- Sender/Receiver Info -->
          <div class="my-4 py-3">
            <div class="flex justify-between">
              <div>
                <p class="text-gray-500 text-sm">ຜູ້ສົ່ງ</p>
                <p class="font-semibold">{{ sender.name }} </p>
                <p class="text-gray-500 text-sm"> {{ sender.phone }}</p>
              </div>
              <div class="text-right">
                <p class="text-gray-500 text-sm">ຜູ້ຮັບ</p>
                <p class="font-semibold"> {{ receiver.name }} </p>
                <p class="text-gray-500 text-sm"> {{ receiver.phone }} </p>
              </div>
            </div>
          </div>
          <div class="dashed-line"></div>
          <!-- Parcel Details -->
          <div class="my-4">
            <h4 class="font-semibold text-gray-700 mb-2">ເລື່ອງລາຍ</h4>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-500">ນ້ຳໜັກ</span>
                <span class="font-semibold"> {{ weight }}  Kg</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">ຈຳນວນ</span>
                <span class="font-semibold"> {{ quantity }} </span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">ຂະໜາດ</span>
                <span class="font-semibold"> {{ size }}  cm</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">COD</span>
                <span class="font-semibold"> {{ cod }}  LAK</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">ຄ່າຂົນສົ່ງ</span>
                <span class="font-semibold"> {{ shippingCost }}  LAK</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">ຍອດທີ່ຕ້ອງຈ່າຍ</span>
                <span class="font-semibold text-red-500"> {{ totalAmount }}  LAK</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-2/3 ml-4">
        <div class="p-4 bg-white">
          <h4 class="text-md font-semibold !mb-4 !text-gray-800">ຄວາມເຄື່ອນໄຫວຂອງພັດສະດຸ</h4>
          <!-- Tracking Timeline -->
          <a-timeline mode="left">
            <a-timeline-item
                v-for="(item, index) in trackingData"
                :key="index"
                :color="item.isCompleted ? 'green' : 'gray'"
                class="!flex !gap-4"
            >
              <div class="!flex !flex-col !items-start min-w-[120px]">
                <!-- Move Date and Time to Left -->
                <span class="text-sm font-semibold text-gray-800">{{ item.date }}</span>
                <span class="text-xs text-gray-500">{{ item.time }}</span>
              </div>

              <div>
                <div class="font-semibold text-gray-800">
                  {{ item.location }}
                  <span v-if="item.isCompleted" class="ml-1 text-green-500">●</span>
                </div>
                <div class="text-sm text-gray-600">
                  {{ item.details }}
                </div>
              </div>
            </a-timeline-item>
          </a-timeline>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Breadcrumb from "@/components/breadcrumb.vue";
import logo from "@/assets/images/logo.png";
import barcode from "@/assets/images/barcode.png";

const date = ref('2024-03-03 14:14:36');
const trackingNumber = ref('VTE1234567890');
const fromBranch = ref('0055VTE - ດອນປາເກົາ');
const toBranch = ref('0055VTE - ສີມຸນ');
const sender = ref({
  name: 'Shopping',
  phone: '59281479'
});
const receiver = ref({
  name: 'Shopping',
  phone: '59281479'
});

const weight = ref(0.28);
const quantity = ref(1);
const size = ref(60);
const cod = ref(0);
const shippingCost = ref(11000);
const totalAmount = ref(11000);

const trackingData = ref([
  {
    date: '02/03/2024',
    time: '07:01:37',
    location: 'ສູນຄັດແຍກນະຄອນຫຼວງ',
    details: 'ພັດສະດຸ ຖຶກຮັບເຂົ້າສູ່ສູນຄັດແຍກນະຄອນຫຼວງ',
    isCompleted: true
  },
  {
    date: '02/03/2024',
    time: '12:05:23',
    location: 'ສາຂາວຽງຈັນ',
    details: 'ກຳລັງດຳເນີນງານສົ່ງພັດສະດຸ',
    isCompleted: false
  },
  {
    date: '02/03/2024',
    time: '12:05:23',
    location: 'ສາຂາວຽງຈັນ',
    details: 'ພັດສະດຸຖຶກສົ່ງອອກໄປສາຂາປາຍທາງ',
    isCompleted: false
  },
  {
    date: '02/03/2024',
    time: '12:05:22',
    location: 'ສາຂາວຽງຈັນ',
    details: 'ຮັບພັດສະດຸແລ້ວ',
    isCompleted: false
  }
]);

const data = [
  {
    key: "1",
    tracking: "VTE85688364229",
    type: "ເສື້ອຜ້າ",
    price: "8,000 ກີບ",
    senderBranch: "ດອນໂດກ (02055555555)",
    receiverBranch: "ສີສັດຕະນາກ (02055665555)",
    date: "30/01/2025",
  },
  {
    key: "2",
    tracking: "VTE85688364229",
    type: "ເສື້ອຜ້າ",
    price: "11,000 ກີບ",
    senderBranch: "ດອນໂດກ (02055555555)",
    receiverBranch: "ສີສັດຕະນາກ (02055665555)",
    date: "30/01/2025",
  },
];
</script>
<style scoped>
/* Timeline item alignment */
.a-timeline-item {
  padding-left: 10px !important;
}

/* Adjust the spacing and alignment of the circle and text */
.a-timeline-item-head-green {
  background-color: #10b981 !important;
}

.a-timeline-item-head-gray {
  background-color: #d1d5db !important;
}
</style>