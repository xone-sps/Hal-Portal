<template>
  <a-breadcrumb separator=">" class="!mb-2 text-gray-600">
    <a-breadcrumb-item v-for="(breadcrumb, index) in breadcrumbs" :key="index">
      <router-link v-if="breadcrumb.path" :to="breadcrumb.path">
        {{ breadcrumb.label }}
      </router-link>
      <span v-else>{{ breadcrumb.label }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// Breadcrumb map
const breadcrumbMap: Record<string, string> = {
  "/cod": "ລາຍການ COD",
  "/cod/summary": "ສະຫຼຸບຍອດ COD",
  "/cod/pending": "ລໍຖ້າການໂອນ",
  "/cod/completed": "ໂອນສຳເລັດ",
  "/cod/pending/detail": "ລາຍລະອຽດ ລໍຖ້າການໂອນ",
  "/cod/completed/detail": "ລາຍລະອຽດ ໂອນສຳເລັດ",
  "/parcel": "ພັດສະດຸ",
  "/parcel/outbound": "ພັດສະດຸ ຂາອອກ",
  "/parcel/inbound": "ພັດສະດຸ ຂາເຂົ້າ",
  "/parcel/outbound/detail": "ລາຍລະອຽດ ພັດສະດຸຂາອອກ",
  "/parcel/inbound/detail": "ລາຍລະອຽດ ພັດສະດຸຂາເຂົ້າ",
};

// Generate breadcrumbs dynamically
const breadcrumbs = computed(() => {
  const paths = route.path.split("/").filter(Boolean);
  let fullPath = "";
  return paths.map((segment, index) => {
    fullPath += `/${segment}`;
    return {
      label: breadcrumbMap[fullPath] || segment,
      path: index !== paths.length - 1 ? fullPath : null,
    };
  });
});
</script>
