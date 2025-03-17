<template>
  <a-breadcrumb separator=">" class="!mb-2 text-gray-600">
    <a-breadcrumb-item
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="index"
    >
      <router-link
          v-if="breadcrumb.path && breadcrumb.clickable"
          :to="breadcrumb.path"
      >
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

// ✅ Static breadcrumb map for named routes
const breadcrumbMap: Record<string, string> = {
  "/cod": "ລາຍການ COD",
  "/cod/summary": "ສະຫຼຸບຍອດ COD",
  "/cod/pending": "ລໍຖ້າການໂອນ",
  "/cod/completed": "ໂອນສຳເລັດ",
  "/parcel": "ພັດສະດຸ",
  "/parcel/outbound": "ພັດສະດຸ ຂາອອກ",
  "/parcel/inbound": "ພັດສະດຸ ຂາເຂົ້າ",
  "/parcel/outbound/detail": "ລາຍລະອຽດ ພັດສະດຸຂາອອກ",
  "/parcel/inbound/detail": "ລາຍລະອຽດ ພັດສະດຸຂາເຂົ້າ",
};

// ✅ Generate breadcrumbs dynamically
const breadcrumbs = computed(() => {
  const paths = route.path.split("/").filter(Boolean);
  let fullPath = "";
  const breadcrumbList = paths
      .map((segment, index) => {
        fullPath += `/${segment}`;

        // ✅ Skip the dynamic trackingId from path
        if (segment === route.params.trackingId) return null;

        const label = breadcrumbMap[fullPath] || segment;

        return {
          label,
          path:
              label !== "ພັດສະດຸ" &&
              label !== "ລາຍລະອຽດ ພັດສະດຸຂາເຂົ້າ" &&
              label !== "ລາຍລະອຽດ ພັດສະດຸຂາອອກ"
                  ? fullPath
                  : null,
          clickable:
              label !== "ພັດສະດຸ" &&
              label !== "ລາຍລະອຽດ ພັດສະດຸຂາເຂົ້າ" &&
              label !== "ລາຍລະອຽດ ພັດສະດຸຂາອອກ",
        };
      })
      .filter(Boolean); // ✅ Remove skipped values

  // ✅ Add trackingId at the end (if present)
  if (route.params.trackingId) {
    breadcrumbList.push({
      label: route.params.trackingId as string,
      path: null,
      clickable: false, // ✅ Not clickable since it's a reference value
    });
  }

  return breadcrumbList;
});
</script>

<style scoped>
a {
  transition: color 0.2s ease-in-out;
}

a:hover {
  color: #e00c16;
}
</style>
