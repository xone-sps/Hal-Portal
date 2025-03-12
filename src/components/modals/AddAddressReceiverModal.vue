<template>
  <a-drawer
      :visible="modelValue"
      :width="500"
      placement="right"
      :closable="false"
  >
    <template #title>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <a-avatar size="small" class="!bg-orange-600 text-white font-bold">R</a-avatar>
          <h3 class="text-lg font-semibold">{{ title || 'ເພີ່ມຜູ້ຮັບ' }}</h3>
        </div>
        <CloseOutlined class="cursor-pointer" @click="handleCancel" />
      </div>
    </template>

    <!-- Form -->
    <div class="p-6">
      <a-form layout="vertical" ref="formRef" :model="form" :rules="rules">
        <!-- Recipient Name -->
        <a-form-item label="ຊື່" name="receiverName">
          <a-input v-model:value="form.receiverName" placeholder="ປ້ອນຊື່" />
        </a-form-item>

        <!-- Phone Number -->
        <a-form-item label="ເບີໂທ" class="!pl-2" name="receiverPhone">
          <a-input-group compact>
            <a-select v-model:value="form.phonePrefix" class="custom-select">
              <a-select-option value="Sign Up">020</a-select-option>
              <a-select-option value="Sign In">030</a-select-option>
            </a-select>
            <a-input
                v-model:value="form.receiverPhone"
                style="width: 330px;"
                placeholder="ເບີໂທ"
            />
          </a-input-group>
        </a-form-item>

        <!-- Location -->
        <div class="grid grid-cols-3 gap-4">
          <a-form-item label="ແຂວງ" name="province">
            <a-select v-model:value="form.province" placeholder="ເລືອກແຂວງ" class="custom-select">
              <a-select-option value="vientiane">Vientiane</a-select-option>
              <a-select-option value="savannakhet">Savannakhet</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="ເມືອງ" name="city">
            <a-select v-model:value="form.city" placeholder="ເລືອກເມືອງ" class="custom-select">
              <a-select-option value="chanthabuly">Chanthabuly</a-select-option>
              <a-select-option value="sikhottabong">Sikhottabong</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="ບ້ານ" name="village">
            <a-select v-model:value="form.village" placeholder="ເລືອກບ້ານ" class="custom-select">
              <a-select-option value="ban phonthan">Ban Phonthan</a-select-option>
              <a-select-option value="ban dongpaleb">Ban Dongpaleb</a-select-option>
            </a-select>
          </a-form-item>
        </div>

        <!-- Branch Selection -->
        <a-form-item label="ເລືອກສາຂາຂົນສົ່ງ" name="branch">
          <a-select v-model:value="form.branch" placeholder="ເລືອກສາຂາ" class="custom-select">
            <a-select-option value="branch_1">Branch 1</a-select-option>
            <a-select-option value="branch_2">Branch 2</a-select-option>
          </a-select>
        </a-form-item>

        <!-- Option to Save as Default -->
        <a-form-item>
          <div class="flex justify-between items-center">
            <span class="text-gray-500">ເລືອກການປ້ອນຂໍ້ມູນແບບອັດຕະໂນມັດ</span>
            <a-switch v-model:checked="form.saveAsDefault" />
          </div>
        </a-form-item>
      </a-form>
      <!-- Recipient Name -->
      <a-form-item  name="detail">
        <a-textarea
            v-model:value="form.detail"
            placeholder="ຕົວຢ່າງ: ຮຸ່ງອາລຸນ 020 5555 5555 ນະຄອນຫຼວງວຽງຈັນ ຈັນທະບູລີ ສີສະຫວາດ ຮຸ່ງອາລຸນສາຂາສີສະຫວາດ"
            :auto-size="{ minRows: 2, maxRows: 5 }"
        />
      </a-form-item>

      <!-- Error Message -->
      <div v-if="errorMessage" class="text-red-500 mt-2">
        {{ errorMessage }}
      </div>
      <div class="!mt-2">
        <a-checkbox value="1" name="type" class="!text-red-500">ຕັ້ງເປັນຄ່າເລີ່ມຕົ້ນ</a-checkbox>
      </div>
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
import { CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
import {ref} from "vue";
import {notification} from "ant-design-vue";
import {validationRules} from "@/utils/validationRules";
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

const handleOk = () => {
  emit('confirm'); // Emit confirm event
  emit('update:modelValue', false); // Close the modal
};

const handleCancel = () => {
  emit('update:modelValue', false); // Close the modal
};


const form = ref({
  receiverName: '',
  phonePrefix: '020',
  phoneNumber: '',
  province: '',
  city: '',
  village: '',
  branch: '',
  detail:'',
  saveAsDefault: false,
});

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
