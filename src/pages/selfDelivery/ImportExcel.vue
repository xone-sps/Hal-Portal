<template>
  <div class="px-3">
    <a-steps :current="importExcelStore.current">
      <a-step
          v-for="(step, index) in stepRoutes"
          :key="index"
      >
        <template #title>
          <a
              :class="[
    'hover:underline',
    importExcelStore.current === index ? '!text-red-500 font-bold' : '!text-black'
  ]"
              @click="() => handleStepClick(index, step.name)"
          >
            {{ step.title }}
          </a>
        </template>
      </a-step>
    </a-steps>

    <div class="steps-content mt-6">
      <component :is="stepRoutes[importExcelStore.current]?.component" :file-list="importExcelStore.fileExcel"
                 @update:importExcelStore.fileExcel="val => importExcelStore.fileExcel = val"/>
    </div>

    <div class="steps-action mt-4">
<!--      <a-button v-if="importExcelStore.current < stepRoutes.length - 1" type="primary" @click="next">Next</a-button>-->
<!--      <a-button v-if="importExcelStore.current === stepRoutes.length - 1" type="primary" @click="finish">Done</a-button>-->
<!--      <a-button v-if="importExcelStore.current > 0" style="margin-left: 8px" @click="prev">Previous</a-button>-->
    </div>
  </div>
</template>
<script lang="ts" setup>
import {watch} from 'vue';
import {useImportExcelStore} from "@/stores/parcel/useImportExcelStore";
import UploadExcel from "@/pages/selfDelivery/UploadExcel.vue";
import UploadPreview from "@/pages/selfDelivery/UploadPreview.vue";
import Success from "@/pages/selfDelivery/Success.vue";
import {useRouter, useRoute} from 'vue-router';

const route = useRoute();
const importExcelStore = useImportExcelStore();
const router = useRouter();
const stepRoutes = [
  {title: 'ອັບໂຫຼດໄຟ', component: UploadExcel, name: 'import-excel'},
  {title: 'ກວດສອບຂໍ້ມູນ', component: UploadPreview, name: 'import-excel-preview'},
  {title: 'ສໍາເລັດ', component: Success, name: 'import-excel-success'}
];

const handleStepClick = (index: number, name: string) => {
  importExcelStore.current = index;
  router.push({ name });
};
const next = () => {
  if (importExcelStore.current < stepRoutes.length - 1) {
    importExcelStore.current++;
    router.push({ name: stepRoutes[importExcelStore.current].name });
  }
};

const prev = () => {
  if (importExcelStore.current > 0) {
    importExcelStore.current--;
    router.push({ name: stepRoutes[importExcelStore.current].name });
  }
};

watch(
    () => route.name,
    (newName) => {
      const index = stepRoutes.findIndex(step => step.name === newName);
      if (index !== -1) {
        importExcelStore.current = index;
      }
    },
    { immediate: true }
);

const items = stepRoutes.map((step, index) => ({
  key: step.title,
  title: () =>
      h(
          'a',
          {
            class: 'text-blue-500 hover:underline',
            onClick: () => {
              importExcelStore.current = index;
              router.push(step.path);
            }
          },
          step.title
      )
}));

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
