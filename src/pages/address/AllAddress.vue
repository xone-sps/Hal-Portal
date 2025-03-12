<template>
  <div>
    <a-tabs v-model:activeKey="activeTab" class="mb-4" @change="handleTabChange">
      <a-tab-pane key="sender" tab="ທີ່ຢູ່ຜູ້ສົ່ງ" />
      <a-tab-pane key="receiver" tab="ທີ່ຢູ່ຜູ້ຮັບ" />
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

const tabMapping = ["sender", "receiver"];

const getActiveTab = (path: string) => {
  return tabMapping.find((tab) => path.includes(tab)) || "sender";
};
const activeTab = ref(getActiveTab(route.path));

watch(
    () => route.path,
    (newPath) => {
      activeTab.value = getActiveTab(newPath);
    }
);
const handleTabChange = (key: string) => {
  router.push(`/address/${key}`);
};
</script>


<style scoped>
:deep(.ant-tabs-tab-active) {
  /*font-weight: bold !important;*/
}

:deep(.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn) {
  color: #E00C16 !important; /* Custom active tab color */
  font-size: 15px !important;
}

:deep(.ant-tabs-ink-bar) {
  height: 6px !important;  /* Thicker bottom border */
  background-color: #E00C16 !important; /* Custom red border */
  border-radius: 4px;
}

</style>