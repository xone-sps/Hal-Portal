<template>
  <div class="!py-8 p-6">
      <div class="!text-black">
                <span class="!px-2 !py-1 !mb-2 rounded-full text-md">
            ອັບໂຫຼດສໍາເລັດ {{ Intl.NumberFormat().format(importExcelStore.groupedRows?.length) }}
          </span>
        <span class="!ml-2">ລາຍການ</span>
      </div>

    <div class="flex justify-center border-top-1 pt-1 !mt-6">
      <a-button @click="BackImport"
                class="base-height !bg-green-500 px-4 py-2 border-none rounded !text-white flex items-center !mr-2"
                severity="primary">ນໍາເຂົ້າພັດສະດຸ
      </a-button>
      <a-button @click="listParcel"
                class="base-height !bg-green-500 px-4 py-2 border-none rounded !text-white flex items-center"
                severity="primary"> ລາຍການພັດສະດຸ
      </a-button>
    </div>
  </div>

</template>

<script setup>
import {onMounted} from "vue";
import {useImportExcelStore} from "@/stores/parcel/useImportExcelStore";
import {useRouter} from 'vue-router';

const importExcelStore = useImportExcelStore();
const router = useRouter();

const BackImport = () => {
  router.push({
    name: 'import-excel',
  });
};
const listParcel = () => {
  router.push({
    name: 'my-parcel'
  });

};

onMounted(() => {
})

</script>

<style scoped lang="scss">

.p-button-sm.delete-button {
  font-size: 0.875rem;
  padding: 4px;
  height: 1.6rem !important;
  width: 1.6rem;
}

.input-excel {
  display: block;
  width: 100%;
  font-size: 0.875rem;
  color: #64748b;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.5rem;
}

.input-excel::file-selector-button {
  margin-right: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: #eff6ff;
  color: #1d4ed8;
  cursor: pointer;
}

.input-excel::file-selector-button:hover {
  background-color: #dbeafe;
}

.input-excel:focus {
  outline: none;
  box-shadow: 0 0 0 2px #3b82f6;
  border-color: #3b82f6;
}

table {
  width: 100%;
  border-collapse: collapse;
  white-space: nowrap;
  border: 1px solid #dddddd;
  font-size: 13px;
}

th, td {
  border: 1px solid #dddddd;
  padding: 4px;
}

.bg-red-50 {
  background-color: #fef2f2;
}

.fullscreen-dialog .p-dialog {
  width: 100vw !important;
  height: 100vh !important;
  top: 0 !important;
  left: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  border-radius: 0 !important;
  z-index: 10000 !important; /* Ensure it's on top */
}

.fullscreen-dialog .p-dialog-content {
  height: 100% !important;
  overflow: auto;
}

.max-width-td {
  min-width: 360px;
  word-wrap: break-word;
  white-space: pre-wrap;
}

</style>

