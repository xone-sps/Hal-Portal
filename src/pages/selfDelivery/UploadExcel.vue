<template>
  <div class="p-2">
    <div class="flex flex-col items-center text-center p-6">
      <a-upload
          :before-upload="(file) => { importExcelStore.previewExcelUpload({ file }); return false; }"
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
          @click="importExcelStore.preUpload"
      >
        Import
      </a-button>
    </div>
  </div>
</template>


<script setup lang="ts">
import {ref, onMounted, watch} from "vue";
import {FileExcelOutlined} from "@ant-design/icons-vue";
import {message, notification, UploadChangeParam} from 'ant-design-vue';
import {useRouter} from "vue-router";
import {v4 as uuidv4} from "uuid";
import {useImportExcelStore} from "@/stores/parcel/useImportExcelStore";


const importExcelStore = useImportExcelStore();
const searchQuery = ref("");
const router = useRouter();


const props = defineProps(['fileList']);
const emit = defineEmits(['update:fileList']);

const fileList = ref(props.fileList);

const beforeUpload = (file: File) => {
  const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      || file.type === 'application/vnd.ms-excel';

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isExcel) {
    message.error('ກະລຸນາເລືອກໄຟລ໌ Excel (.xlsx or .xls)!');
    return Upload.LIST_IGNORE;
  }
  if (!isLt2M) {
    message.error('ໄຟລ໌ຕ້ອງນ້ອຍກວ່າ 2MB!');
    return Upload.LIST_IGNORE;
  }

  return true;
};


const onChange = (info: UploadChangeParam) => {
  fileList.value = [info.file];
  emit('update:fileList', fileList.value);
};

const onRemove = () => {
  fileList.value = [];
  emit('update:fileList', fileList.value);
};

watch(() => props.fileList, (newVal) => {
  fileList.value = newVal;
});


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

const viewDetails = (trackingId: string) => {
  router.push({name: "inbound-detail", params: {trackingId}});
};

function handleUpload() {
  ImportExcel();
}

const ImportExcel = async () => {
  const importId = uuidv4()
  try {
    const payload = {
      shipment_file: importExcelStore.fileExcel,
      import_id: importExcelStore.importId,
      formData: true,
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

onMounted(async () => {
});


</script>

