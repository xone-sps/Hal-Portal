<template>
  <div class="flex flex-col items-center justify-center p-6">
    <img :src="empty_box" alt="No Data" class="w-22 h-22 mb-2" />
    <p class="text-gray-500 text-sm">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import empty_box from "@/assets/icons/empty.svg";
defineProps({
  imageSrc: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    default: "ບໍ່ມີຂໍ້ມູນ", // Default empty message
  },
});
</script>
