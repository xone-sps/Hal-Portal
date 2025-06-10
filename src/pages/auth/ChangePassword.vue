<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { UserOutlined } from "@ant-design/icons-vue";
import { validationRules } from "@/utils/validationRules";
import { notification } from "ant-design-vue";
import {changePassword } from "@/api/userProfile";
import { useUserStore } from "@/stores/useUserStore";

const userStore = useUserStore();

const formRef = ref();
const rules = ref(validationRules);

const open = ref(false);

const loading = ref(false);
const form = ref({
  oldPassword: "",
  newPassword: "",
    confirmPassword: "",
});

// Submit form data
const submitForm = async () => {
  try {
    await formRef.value.validate();
    await changePassword(form.value); // Update the user profile
    notification.success({
      message: "ສຳເລັດ!",
      description: "ຂໍໍາູນຂອງທ່ານຖືກບັນທຶກສຳເລັດ",
      placement: "topRight", // Show at top right
      duration: 5, // Auto close in 5 seconds
    });
  } catch (error) {
    notification.error({
      message: "ຜິດພາດ!",
      description: "ກະລຸນາກວດສອບຂໍ້ມູນຂອງທ່ານ",
      placement: "topRight", // Show at top right
      duration: 5, // Auto close in 5 seconds
    });
  }
};
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Profile Header Section -->
    <div class="!mx-3">
      <a-form layout="vertical" ref="formRef" :model="form" :rules="rules">
        <!-- Form Section -->
        <a-card class="!mt-2">
          <h3 class="text-lg font-semibold mb-4">ປ່ຽນລະຫັດຜ່ານ</h3>
          <div class="grid grid-cols-1 md:grid-cols-1">
            <!-- Left Column -->
            <div>
              <!-- Sender Name -->
              <a-form-item label="ປ້ອນລະຫັດເກົ່າ" name="oldPassword">
                <a-input v-model:value="form.oldPassword" type="password" placeholder="ປ້ອນລະຫັດເກົ່າ" />
              </a-form-item>
            </div>
            <!-- Right Column -->
            <div>
              <!-- Sender Name -->
              <a-form-item label="ລະຫັດຜ່ານໃໝ່" name="newPassword">
                <a-input v-model:value="form.newPassword" type="password" placeholder="ລະຫັດຜ່ານໃໝ່" />
              </a-form-item>
            </div>
            <div>
              <!-- Receiver Name -->
              <a-form-item label="ຢືນຢັນລະຫັດເກຜ່ານ" name="confirmPassword">
                <a-input
                  v-model:value="form.confirmPassword"
                    type="password"
                  placeholder="ຢືນຢັນລະຫັດເກຜ່ານ"
                />
              </a-form-item>
            </div>
          </div>
        </a-card>
        <!-- Submit Button -->
        <div class="flex justify-end mt-6">
          <a-button
            type="primary"
            class="!bg-red-500 !text-white"
            @click="submitForm"
          >
            ປ່ຽນລະຫັດຜ່ານ
          </a-button>
        </div>
      </a-form>
    </div>
  </div>
</template>
<style scoped></style>
