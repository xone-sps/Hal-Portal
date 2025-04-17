<template>
  <div class="p-2">
    <div class="flex flex-col items-center text-center p-6">
      <a-upload
          :before-upload="(file) => { importExcelStore.previewExcelUpload(file,router); return false; }"
          :file-list="importExcelStore.fileExcel ? [importExcelStore.fileExcel] : []"
          :max-count="1"
          name="file"
          @remove="importExcelStore.handleRemove"
          accept=".xls,.xlsx"
      >
        <p class="ant-upload-drag-icon">
          <FileExcelOutlined class="!text-green-600"/>
        </p>
        <p class="ant-upload-text !p-3">Click or drag file to this area to upload</p>
      </a-upload>
    </div>
    <div class="flex">
      <a-button
          type="primary"
          block
          class="!mt-6 !text-white !text-lg w-full !h-10"
          @click="handleUpload"
      >
        Import
      </a-button>
    </div>
  </div>
</template>


<script setup lang="ts">
import {FileExcelOutlined} from "@ant-design/icons-vue";
import {useImportExcelStore} from "@/stores/parcel/useImportExcelStore";
import {useRouter} from 'vue-router';
const router = useRouter();


const importExcelStore = useImportExcelStore();
const handleUpload = async (file: File) => {
  await importExcelStore.previewExcelUpload(file,router);
};
</script>

