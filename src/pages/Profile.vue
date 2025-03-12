<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Profile Header Section -->
    <div class="flex items-center gap-6 bg-white rounded-lg p-6">
      <!-- Profile Avatar -->
      <a-avatar size="large" class="bg-gray-300 text-white flex items-center justify-center w-24 h-24">
        <UserOutlined class="text-3xl"/>
      </a-avatar>

      <!-- Profile Details -->
      <div>
        <h3 class="text-xl font-bold">Phetphailin Muandounang</h3>
        <p class="text-gray-500 text-sm">ID: HAL-12345678</p>
      </div>

      <!-- Profile Actions -->
      <div class="ml-auto flex items-center gap-3">
        <a-button type="primary" danger class="!bg-red-500">ອັບໂຫຼດໃໝ່</a-button>
        <a-button>ລົບອອກ</a-button>
      </div>
    </div>
    <div class="!mx-3">
      <a-form layout="vertical" ref="formRef" :model="form" :rules="rules" >

        <!-- Form Section -->
        <a-card class="!mt-2">
          <h3 class="text-lg font-semibold mb-4">ຂໍ້ມູນໂປຣໄຟ</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Left Column -->
            <div>
              <!-- Sender Name -->
              <a-form-item label="ຊື່" name="userName">
                <a-input v-model:value="form.name" placeholder="ປ້ອນຊື່"/>
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
                      style="width: 410px;"
                      placeholder="ເບີໂທ"
                  />
                </a-input-group>
              </a-form-item>

              <!-- Parcel Type -->
              <a-form-item label="ເລືອກເພດ" name="gender">
                <a-radio-group v-model:value="form.gender">
                  <a-radio value="1">ຍິງ</a-radio>
                  <a-radio value="2">ຊາຍ</a-radio>
                </a-radio-group>
              </a-form-item>
            </div>

            <!-- Right Column -->
            <div>
              <!-- Receiver Name -->
              <a-form-item label="ນາມສະກຸນ" name="surname">
                <a-input v-model:value="form.surname" placeholder="ປ້ອນນາມສະກຸນ"/>
              </a-form-item>

              <!-- Receiver Address -->
              <a-form-item label="ທີ່ຢູ່ປະຈຸບັນ" name="userAddress">
                <a-input v-model:value="form.userAddress" placeholder="ປ້ອນທີ່ຢູ່"/>
              </a-form-item>
            </div>
          </div>
        </a-card>

        <!-- Address Section -->
        <a-card class="!mt-2">
          <h3 class="text-lg font-semibold mb-4">ທີ່ຢູ່</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Province -->
            <a-form-item label="ແຂວງ" name="province">
              <a-select v-model:value="form.province" placeholder="ເລືອກແຂວງ" class="w-full custom-select">
                <a-select-option value="Vientiane">Vientiane</a-select-option>
                <a-select-option value="Savannakhet">Savannakhet</a-select-option>
              </a-select>
            </a-form-item>

            <!-- City -->
            <a-form-item label="ເມືອງ" name="city">
              <a-select v-model:value="form.city" placeholder="ເລືອກເມືອງ" class="w-full custom-select">
                <a-select-option value="Chanthabuly">Chanthabuly</a-select-option>
                <a-select-option value="Sikhottabong">Sikhottabong</a-select-option>
              </a-select>
            </a-form-item>

            <!-- Village -->
            <a-form-item label="ບ້ານ" name="village">
              <a-select v-model:value="form.village" placeholder="ເລືອກບ້ານ" class="w-full custom-select">
                <a-select-option value="Ban Phonthan">Ban Phonthan</a-select-option>
                <a-select-option value="Ban Dongpaleb">Ban Dongpaleb</a-select-option>
              </a-select>
            </a-form-item>
          </div>
        </a-card>

        <!-- Submit Button -->
        <div class="flex justify-end mt-6">
          <a-button type="primary" class="!bg-red-500 !text-white" @click="submitForm">
            ບັນທຶກ
          </a-button>
        </div>
      </a-form>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UserOutlined } from '@ant-design/icons-vue';
import {validationRules} from "@/utils/validationRules";
import {notification} from "ant-design-vue";

const form = ref({
  userName: '',
  phonePrefix: '020',
  phoneNumber: '',
  gender: '1',
  surname: '',
  userAddress: '',
  province: '',
  city: '',
  village: ''
});
const formRef = ref();
const rules = ref(validationRules);
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
</script>
