<template>
  <a-modal v-model:open="open" :footer="null" centered :maskClosable="false" :closable="false">
    <div class="flex flex-col items-center text-center p-6">
      <CheckCircleOutlined class="!text-green-600 text-5xl !mb-4"/>
      <h2 class="text-xl font-bold">ທ່ານໄດຢືນຢັນຮຽກເກັບເງິນ COD ສຳເລັດ</h2>
      <p class="text-gray-600 text-sm !mt-2">ຈະໄດ້ຮັບເງິນພາຍໃນ 02 ວັນ ນັບຈາກມື້ກົດຮຽກເກັບເງິນ
        ເປັນຕົ້ນໄປ</p>
      <a-button
          type="primary"
          block
          class="!mt-6 !bg-red-600 !text-white !text-lg w-full !h-10"
          @click="hideModal"
      >
        ຕົກລົງ
      </a-button>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {CheckCircleOutlined} from "@ant-design/icons-vue";
import { useCodStore } from '@/stores/cod/codStore';

const codStore = useCodStore();

const open = ref(false);
const showModal = () => {
  open.value = true;
};
const hideModal = () => {
  open.value = false;
  window.location.reload();
};
defineExpose({showModal});

// {error: false, message: "ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ.", code: 200,…}
// code
// : 
// 200
// data
// : 
// {invoice_number: "INV-8685495061", sub_total_price: 23019000, transfer_fee: 19000, total_fee: 19000,…}
// created_at
// : 
// "29-04-2025 17:44:57"
// customer_id
// : 
// 229
// estimate_receive_date
// : 
// "30-04-2025 00:00:00"
// id
// : 
// 8
// invoice_number
// : 
// "INV-8685495061"
// qty
// : 
// 48
// request_id
// : 
// "1745923497235603"
// sub_total_price
// : 
// 23019000
// total_fee
// : 
// 19000
// total_price
// : 
// 23000000
// transfer_fee
// : 
// 19000
// updated_at
// : 
// "29-04-2025 17:44:57"
// error
// : 
// false
// message
// : 
// "ບັນທຶກຂໍ້ມູນສຳເລັດແລ້ວ."

</script>
