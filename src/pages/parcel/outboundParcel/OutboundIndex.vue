<template>
  <div>
    <a-tabs v-model:activeKey="activeTab" @change="handleTabChange" class="custom-tab">
      <a-tab-pane key="processing" tab="ກໍາລັງຈັສົ່ງ"/>
      <a-tab-pane key="arrived" tab="ຮອດສາຂາປາຍທາງ"/>
      <a-tab-pane key="delivered" tab="ຈັດສົ່ງສໍາເລັດ"/>
      <a-tab-pane key="return" tab="ຕີກັບ"/>
      <a-tab-pane key="returned" tab="ຕີກັບສໍາເລັດ"/>
    </a-tabs>
    <!-- Dynamic Content Based on Router -->
    <router-view/>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();
const tabMapping = ["returned", "arrived", "delivered", "return"];

const getActiveTab = (path: string) => {
  return tabMapping.find((tab) => path.includes(tab)) || "processing";
};

const activeTab = ref(getActiveTab(route.path));

watch(
    () => route.path,
    (newPath) => {
      activeTab.value = getActiveTab(newPath);
    }
);
const handleTabChange = (key: string) => {
  router.push(`/parcel/outbound/${key}`);
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
  height: 6px !important; /* Thicker bottom border */
  background-color: #E00C16 !important; /* Custom red border */
  border-radius: 4px;
}
</style>