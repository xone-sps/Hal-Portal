<template>
  <a-modal v-model:open="open" :footer="null" centered>
    <div class="flex flex-col items-center text-center p-6">
      <CheckCircleOutlined class="text-green-600 text-5xl mb-4" />
      <h2 class="text-xl font-bold">ທ່ານໄດ້ຢືນຢັນຮັບຍອດ COD ສຳເລັດ</h2>
      <p class="text-gray-600 text-sm mt-2">ຈະໄດ້ຮັບເງິນໃນ 02 ມື້.</p>
      <a-button
          type="primary"
          block
          class="!mt-6 !bg-red-600 !text-white !text-lg"
          @click="open = false"
      >
        ຕົກລົງ
      </a-button>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { CheckCircleOutlined } from "@ant-design/icons-vue";

const open = ref(false);

const showModal = () => {
  open.value = true;
};

defineExpose({ showModal });
</script>
