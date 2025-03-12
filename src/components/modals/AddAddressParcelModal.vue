<template>
  <a-drawer
      :visible="modelValue"
      :width="600"
      placement="right"
      :closable="false"
  >
    <template #title>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <a-avatar size="small" class="!bg-orange-600 text-white font-bold">S</a-avatar>
          <h3 class="text-lg font-semibold">{{ title || 'ເພີ່ມຜູ້ຮັບ' }}</h3>
        </div>
        <CloseOutlined class="cursor-pointer" @click="handleCancel" />
      </div>
    </template>

    <!-- Form -->
    <div class="">
      <a-form layout="vertical" ref="formRef" :model="form" :rules="rules">
          <!-- Receiver Info -->
          <div class="flex items-center gap-3">
            <!-- Avatar -->
            <a-avatar size="small" class="u-receiver text-white font-bold">R</a-avatar>

            <!-- Name and Edit Option -->
            <div class="flex items-center gap-2">
              <h3 class="text-lg font-semibold">ຂໍ້ມູນຜູ້ຮັບ</h3>
            </div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-2 mt-1">
            <a-form-item label="ຊື່" name="receiverName">
              <a-input placeholder="ຊື່ຜູ້ສົ່ງ" v-model:value="form.receiverName"/>
            </a-form-item>
            <a-form-item label="ເບີໂທ" class="!pl-2" name="receiverPhone">
              <a-input-group compact>
                <a-select v-model:value="prefixPhone" class="custom-select">
                  <a-select-option value="Sign Up">020</a-select-option>
                  <a-select-option value="Sign In">030</a-select-option>
                </a-select>
                <a-input
                    v-model:value="receiverPhone"
                    style="width: 200px;"
                    placeholder="ເບີໂທ"
                />
              </a-input-group>
            </a-form-item>
            <a-form-item label="ທີ່ຢູ່ຜູ້ສົ່ງ" name="receiverAddress">
              <a-input placeholder="ທີ່ຢູ່ຜູ້ສົ່ງ" v-model:value="form.receiverAddress"/>
            </a-form-item>
          </div>
          <div class="">
            <a-checkbox value="1" name="type">ບັນທຶກຂໍ້້ມູນຜູ້ຮັບ</a-checkbox>
          </div>

        <div class="flex items-center gap-3 !my-6">
          <!-- Avatar -->
          <img :src="box_fill" alt="Open Box Icon" class="w-6 h-6"/>
          <!-- Parcel info -->
          <div class="flex items-center">
            <h3 class="text-lg font-semibold">ຂໍ້ມູນພັດສະດຸ</h3>
          </div>
        </div>

        <div class="items-center !mb-2">
              <div class="!py-1">
                <a-form-item label="ປະເພດພັສະດຸ" name="parcelType">
                  <a-radio-group v-model:value="form.parcelType">
                    <a-radio value="general">ພັດສະດຸທົ່ວໄປ</a-radio>
                    <a-radio value="document">ເອກະສານ</a-radio>
                  </a-radio-group>
                </a-form-item>
              </div>

          <div class="">
              <a-form-item label="ບໍລິການເສີມ" name="selectedServices">
                <!-- Checkbox Group -->
                <a-checkbox-group v-model:value="form.selectedServices" class="flex">
                  <div v-for="service in serviceMore" :key="service.value" class="pr-6">
                    <a-checkbox :value="service.value">
                      {{ service.label }}
                      <p class="text-xs">{{ service.detail }}</p>
                    </a-checkbox>
                  </div>
                </a-checkbox-group>
              </a-form-item>
          </div>
        </div>

          <div class="flex items-center">
            <!-- Origin Branch Select -->
            <a-form-item label="ສາຂາຕົ້ນທາງ" class="w-full" name="originValue">
              <a-select v-model:value="form.originValue" placeholder="ເລືອກສາຂາຕົ້ນທາງ" show-search
                        :options="originBranch"
                        :filter-option="filterOption"
                        class="w-full custom-select"
              ></a-select>
            </a-form-item>

            <!-- Centered Arrow Icon with Reduced Space -->
            <div class="flex justify-center arrow-button px-2">
              <a-avatar size="default" class="custom-avatar !bg-red-500 flex items-center justify-center">
                <ArrowRightOutlined class="text-white text-base"/>
              </a-avatar>
            </div>

            <!-- Destination Branch Select -->
            <a-form-item label="ສາຂາປາຍທາງ" class="w-full" name="destinationValue">
              <a-select v-model:value="form.destinationValue" placeholder="ເລືອກສາຂາປາຍທາງ" show-search
                        :options="destinationBranch"
                        :filter-option="filterOption"
                        class="w-full custom-select"
              ></a-select>
            </a-form-item>
          </div>
          <div class="!mt-4">
            <div class="flex items-center">
            <a-form-item label="ເລືອກປະເພດພັດສະດຸ" class="w-full !pr-2" name="parcelCategoryValue">
              <a-select v-model:value="form.parcelCategoryValue" placeholder="ເລືອກປະເພດພັດສະດຸ" show-search
                        :options="parcelCategory"
                        :filter-option="filterOption"
                        class="custom-select"
              ></a-select>
            </a-form-item>
            <a-form-item label="ກວ້າງ + ສູງ + ຍາວ" name="parcelDimensions" class="w-full">
              <a-input placeholder="ກວ້າງ + ສູງ + ຍາວ" v-model:value="form.parcelDimensions" class="custom-select"/>
            </a-form-item>
            </div>
            <a-form-item label="ນໍ້າໜັກ (kg)" name="parcelWeight">
              <a-input placeholder="ນໍ້າໜັກ (kg)" v-model:value="form.parcelWeight"/>
            </a-form-item>
          </div>
      </a-form>

    </div>

    <!-- Footer -->
    <template #footer class="custom-drawer">
      <div class="flex justify-end gap-3">
        <a-button @click="handleCancel" class="w-full">ຍົກເລີກ</a-button>
        <a-button type="primary" class="!bg-red-500 w-full" @click="submitForm">ເພີ່ມ</a-button>
      </div>
    </template>
  </a-drawer>
</template>

<script setup lang="ts">
import { CloseOutlined, ArrowRightOutlined } from '@ant-design/icons-vue';
import {ref} from "vue";
import {notification} from "ant-design-vue";
import {validationRules} from "@/utils/validationRules";
import box_fill from "@/assets/icons/box-fill.svg";

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: ''
  }
});

const formRef = ref();
const rules = ref(validationRules);
const emit = defineEmits(['update:modelValue', 'confirm']);


const form = ref({
  senderName: "",
  senderPhone: "",
  senderAddress: "",
  receiverName: "",
  receiverPhone: "",
  receiverAddress: "",
  packageType: "",
  selectedServices:[],
  originValue: undefined,
  destinationValue: undefined,
  parcelType:"",
  originBranch:[],
  parcelCategoryValue:undefined,
  parcelDimensions: "",
  weight: "",
});
const prefixPhone = ref<string>('020');
const receiverPhone = ref<string>('');
const serviceMore = ref([
  {value: "cdc", label: "CDC", detail: "ເກັບຄ່າຂົນສົ່ງປາຍທາງ"},
  {value: "cod", label: "COD", detail: "ເກັບຄ່າເຄື່ອງປາຍທາງ"},
  {value: "insurance", label: "ປະກັນໄພ", detail: "ຄຸມຄອງພັດສະດຸຂອງທ່ານ"},
]);
const originBranch = ref([
  {value: "dongdork", label: "DongDork"},
  {value: "hongkhar", label: "HongKhar"},
  {value: "chommarny", label: "Chommarny"},
])
const destinationBranch = ref([
      {value: "svk", label: "Savannakhet"},
      {value: "kayson", label: "Kaysone"},
      {value: "luk5", label: "Luk 5"},
    ])
;
const parcelCategory = ref([
  {value: "cloth", label: "ເສື້ອຍຜ້າ"},
  {value: "cosmetic", label: "ເຄື່ອງສໍາອາງ"},
]);

const filterOption = (input: string, option: any) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
const handleOk = () => {
  emit('confirm'); // Emit confirm event
  emit('update:modelValue', false); // Close the modal
};

const handleCancel = () => {
  emit('update:modelValue', false); // Close the modal
};
const errorMessage = ref<string | null>(null);

const submitForm = async () => {
  try {
    await formRef.value.validate();
    notification.success({
      message: "ສຳເລັດ!",
      description: "ຂໍ້ມູນຂອງທ່ານຖືກບັນທຶກສຳເລັດ",
      placement: "topRight", // Show at top right
      duration: 5, // Auto close in 5 seconds
    });
    console.log("Form Data:", form.value);
  } catch (error) {
    notification.error({
      message: "ຜິດພາດ!",
      description: "ກະລຸນາກວດຄືນຂໍ້ມູນຂອງທ່ານ",
      placement: "topRight", // Show at top right
      duration: 5, // Auto close in 5 seconds
    });
  }
};
const closeModal = () => {
  this.modelValue.value = false;
};
</script>

<style scoped>
.custom-drawer .ant-drawer .ant-drawer-footer {
  border-top: none;
}
</style>
