<template>
  <div class="px-3">
    <a-steps :current="importExcelStore.current" :items="items" />
    <div class="steps-content mt-6">
      <component :is="steps[importExcelStore.current]?.component" :file-list="importExcelStore.fileExcel" @update:importExcelStore.fileExcel="val => importExcelStore.fileExcel = val" />
    </div>

    <div class="steps-action mt-4">
      <a-button v-if="importExcelStore.current < steps.length - 1" type="primary" @click="next">Next</a-button>
      <a-button v-if="importExcelStore.current === steps.length - 1" type="primary" @click="finish">Done</a-button>
      <a-button v-if="importExcelStore.current > 0" style="margin-left: 8px" @click="prev">Previous</a-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import {message, notification, UploadChangeParam} from 'ant-design-vue';
import {useImportExcelStore} from "@/stores/parcel/useImportExcelStore";
import UploadExcel from "@/pages/selfDelivery/UploadExcel.vue";
import UploadPreview from "@/pages/selfDelivery/UploadPreview.vue";
import {v4 as uuidv4} from "uuid";

const importExcelStore = useImportExcelStore();

const steps = [
  { title: 'Upload', component: UploadExcel },
  { title: 'Review', component: UploadPreview },
  { title: 'Confirm', component: UploadPreview },
];
const next = () => {
  importExcelStore.current++;
};
const prev = () => {
  importExcelStore.current--;
};

const handleChange = (info: UploadChangeParam) => {
  const status = info.file.status;
  if (status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (status === 'done') {
    message.success(`${info.file.name} file uploaded successfully.`);
  } else if (status === 'error') {
    message.error(`${info.file.name} file upload failed.`);
  }
};
function handleRemove() {
  fileList.value = [];
}
function handleUpload (){
  ImportExcel();
}

const ImportExcel = async () => {
  const importId = uuidv4()
  try {
    const payload = {
      shipment_file: fileList.value,
      import_id:importId,
      formData:true,
      download: true,
    };
    const res = await importExcelStore.importExcel(payload);
    if (res) {
      notification.success({
        message: "ສຳເລັດ!",
        description: res.data.message || "ດາວໂຫຼດສສໍາເລັດ",
        placement: "topRight", // Show at top right
        duration: 3, // Auto close in 5 seconds
      });
    }
  } catch (e) {
    console.error("Error downloading the Excel template:", e);
  }
};

const items = steps.map(item => ({ key: item.title, title: item.title }));
</script>
<style scoped>
.steps-content {
  /*margin-top: 16px;*/
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: auto;
  text-align: center;
  /*padding-top: 80px;*/
}

.steps-action {
  margin-top: 24px;
}

[data-theme='dark'] .steps-content {
  background-color: #2f2f2f;
  border: 1px dashed #404040;
}
</style>
