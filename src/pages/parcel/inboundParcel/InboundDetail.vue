<template>
  <div class="!bg-white px-6 pb-2">
    <!-- Breadcrumb Component -->
    <Breadcrumb/>
  </div>
  <div class="px-3 py-2">
    <!-- Header Section -->
    <div class="flex justify-between">
      <div class="w-1/3">
        <div class="p-4 max-w-md mx-auto bg-white">
          <!-- Header Section -->
          <div class="flex justify-between items-center pb-3">
            <div class="flex items-center gap-2">
              <img :src="logo" alt="Logo" class="w-12 h-12"/>
              <div>
                <h3 class="font-semibold text-gray-800">ຮຸ່ງອາລຸນຂົນສົ່ງດ່ວນ</h3>
                <p class="text-xs text-gray-500">ໂນ້ຍາດ່ວນ: 1419</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-xs text-gray-500">ວັນທີສົ່ງບິນ</p>
              <p class="font-semibold text-gray-800"> {{ inboundStore.shipmentInfo.pickup_date }} </p>
            </div>
          </div>
          <div class="dashed-line"></div>
          <!-- Tracking Info -->
          <div class="my-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-500 text-sm">ເລກພັດສະດຸ</span>
              <span class="font-semibold"> {{ inboundStore.shipmentInfo.bill_number }} </span>
              <CopyOutlined class="!text-red-500 text-lg cursor-pointer"
                            @click="copyToClipboard(inboundStore.shipmentInfo.bill_number)"/>
            </div>
            <div class="flex justify-center my-2">
              <Barcode :value="inboundStore.shipmentInfo.bill_number"/>
            </div>
            <div class="flex justify-between items-center text-gray-500 text-sm">
              <span> {{ inboundStore.shipmentInfo.from_branch_code }}{{
                  inboundStore.shipmentInfo.from_branch_prefix
                }}-{{ inboundStore.shipmentInfo.from_branch }} </span>
              <ArrowRightOutlined class="text-gray-400"/>
              <span> {{
                  inboundStore.shipmentInfo.destination_branch_code
                }}{{
                  inboundStore.shipmentInfo.destination_branch_prefix
                }}-{{ inboundStore.shipmentInfo.destination_branch }} </span>
            </div>
          </div>

          <h4 class="font-semibold text-gray-700 bg-gray-100 mb-2 p-3 rounded text-center">
            {{ inboundStore.shipmentInfo.parcel_category_name }}</h4>
          <!-- Sender/Receiver Info -->
          <div class="my-4 py-3">
            <div class="flex justify-between">
              <div>
                <p class="text-gray-500 text-sm">ຜູ້ສົ່ງ</p>
                <p class="font-semibold">{{ inboundStore.shipmentInfo.sender_name }} </p>
                <p class="text-gray-500 text-sm"> {{
                    inboundStore.shipmentInfo.sender_phone_number
                  }}</p>
              </div>
              <div class="text-right">
                <p class="text-gray-500 text-sm">ຜູ້ຮັບ</p>
                <p class="font-semibold"> {{ inboundStore.shipmentInfo.receiver_name }} </p>
                <p class="text-gray-500 text-sm"> {{ inboundStore.shipmentInfo.receiver_phone_number }} </p>
              </div>
            </div>
          </div>
          <div class="dashed-line"></div>
          <!-- Parcel Details -->
          <div class="my-4">

            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-500">ນ້ຳໜັກ</span>
                <span class="font-semibold"> {{
                    inboundStore.shipmentInfo.total_weight
                  }} {{ inboundStore.shipmentInfo.weight_unit }}  </span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">ຈຳນວນ</span>
                <span class="font-semibold"> {{ inboundStore.shipmentInfo.item_count }} </span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">ຂະໜາດ</span>
                <span class="font-semibold"> {{
                    inboundStore.shipmentInfo.total_dimension_length
                  }} {{ inboundStore.shipmentInfo.volume_unit }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">COD</span>
                <span class="font-semibold"> {{
                    inboundStore.shipmentInfo.total_price != null ? inboundStore.shipmentInfo.total_price.toLocaleString() : '-'
                  }}  LAK</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">ຄ່າຂົນສົ່ງ</span>
                <span class="font-semibold"> {{
                    inboundStore.shipmentInfo.total_freight != null ? inboundStore.shipmentInfo.total_freight.toLocaleString() : '-'
                  }}
  LAK</span>
              </div>
              <div class="dashed-line"></div>
              <div class="flex justify-between">
                <span class="text-gray-500">ຍອດທີ່ຕ້ອງຈ່າຍ</span>
                <span class="font-semibold text-red-500"> {{
                    inboundStore.shipmentInfo.total_price != null ? inboundStore.shipmentInfo.total_price.toLocaleString() : '-'
                  }}LAK</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="w-2/3 ml-4">
        <div class="p-4 bg-white">
          <h4 class="text-md font-semibold !mb-6 !text-gray-800">ການເຄື່ອນໄຫວຂອງພັດສະດຸ</h4>
          <!-- Tracking Timeline -->
          <a-timeline mode="left">
            <a-timeline-item
                v-for="(item, index) in reversedTrackingEvent"
                :key="index"
                :color="index === latestIndex ? 'green' : 'gray'"
                class="!flex !gap-4"
            >
              <div class="!flex !flex-col !items-start min-w-[120px]">
                <!-- Move Date and Time to Left -->
                <span class="text-sm font-semibold text-gray-800">{{ item.date }}</span>
              </div>

              <div>
                <div class="font-semibold text-gray-800">
                  {{ item.place }}
                  <span v-if="index === latestIndex" class="ml-1 text-green-500">●</span>
                </div>
                <div class="text-sm text-gray-600">
                  {{ item.message }}
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
import {watchEffect, ref, computed} from "vue";
import {useRoute} from "vue-router";
import {message} from "ant-design-vue";
import Breadcrumb from "@/components/breadcrumb.vue";
import Barcode from "@/components/barcode.vue"
import logo from "@/assets/images/logo.png";
import {CopyOutlined, CopyFilled} from "@ant-design/icons-vue";
import {useInboundParcelStore} from "@/stores/parcel/inboundStore";

const inboundStore = useInboundParcelStore();
const route = useRoute();
const copyToClipboard = async (value: string) => {
  if (!value) {
    message.warning(' No value to copy');
    return;
  }
  try {
    await navigator.clipboard.writeText(value);
    message.success(' Copied bill number!');
  } catch (err) {
    message.error(' Failed to copy');
  }
};
watchEffect(async () => {
  const trackingId = route.params.trackingId as string;
  if (trackingId) {
    await inboundStore.fetchTrackingParcel(trackingId);
  }
});
// ✅ Reverse order of tracking event (latest at the bottom)
const reversedTrackingEvent = computed(() => {
  return inboundStore.trackingEvent.slice().reverse();
});

// ✅ Get latest index based on highest delivery_state (in reversed order)
const latestIndex = computed(() => {
  const reversed = inboundStore.trackingEvent.slice().reverse();
  return reversed.reduce((maxIndex, item, index) => {
    return item.delivery_state > reversed[maxIndex].delivery_state ? index : maxIndex;
  }, 0);
});
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