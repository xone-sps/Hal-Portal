<template>
  <div>
    <a-tabs v-model:activeKey="activeTab" @change="handleTabChange">
      <a-tab-pane key="one-parcel" tab="ຝາກເຄື່ອງເອງ"/>
      <a-tab-pane key="multiple-parcel" tab="ຝາກຫຼາຍພັດສະດຸ"/>
      <a-tab-pane key="my-parcel" tab="ບິນສ້າງເອງ"/>
      <a-tab-pane key="import-excel" tab="Import Excel"/>
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

const activeTab = ref(
    route.path.includes("one-parcel")
        ? "one-parcel"
        : route.path.includes("multiple-parcel")
            ? "multiple-parcel"
            : route.path.includes("my-parcel")
                ? "my-parcel"
                : route.path.includes("import-excel")
                    ? "import-excel"
                : "one-parcel"
);

watch(() => route.path, (newPath) => {
  activeTab.value = newPath.includes("one-parcel")
      ? "one-parcel"
      : newPath.includes("multiple-parcel")
          ? "multiple-parcel"
          : newPath.includes("my-parcel")
              ? "my-parcel"
              : route.path.includes("import-excel")
                  ? "import-excel"
          : "one-parcel";
});

const handleTabChange = (key: string) => {
  router.push(`/self-service/${key}`);
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