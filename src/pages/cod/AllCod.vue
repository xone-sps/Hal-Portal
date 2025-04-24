<template>
  <div>
    <a-tabs
      v-model:activeKey="activeTab"
      class="mb-4"
      @change="handleTabChange"
    >
      <a-tab-pane key="summary" tab="ສະຫຼຸບຍອດ COD" />
      <a-tab-pane key="pending" tab="ລໍຖ້າການໂອນ" />
      <a-tab-pane key="completed" tab="ໂອນສຳເລັດ" />
    </a-tabs>

    <!-- Dynamic Content Based on Router -->
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const activeTab = ref(
  route.path.includes("pending")
    ? "pending"
    : route.path.includes("completed")
    ? "completed"
    : "summary"
);

watch(
  () => route.path,
  (newPath) => {
    activeTab.value = newPath.includes("pending")
      ? "pending"
      : newPath.includes("completed")
      ? "completed"
      : "summary";
  }
);

const handleTabChange = (key: string) => {
  router.push(`/cod/${key}`);
};
</script>

<style scoped>
:deep(.ant-tabs-tab-active) {
  /*font-weight: bold !important;*/
}

:deep(.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn) {
  color: #e00c16 !important; /* Custom active tab color */
  font-size: 15px !important;
}

:deep(.ant-tabs-ink-bar) {
  height: 6px !important; /* Thicker bottom border */
  background-color: #e00c16 !important; /* Custom red border */
  border-radius: 4px;
}
</style>
