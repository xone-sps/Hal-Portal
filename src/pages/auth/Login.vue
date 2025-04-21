<template>
  <div class="flex h-screen">
    <!-- Left Section - Logo & Branding -->
    <div class="hidden lg:flex flex-col justify-center items-center !w-1/2 bg-gray-100">
      <div class="px-3">
        <img :src="brandImage" alt="HAL Logistics" class="!w-full h-auto rounded-lg object-cover"/>
      </div>
    </div>
    <!-- Right Section - Login Form -->
    <div class="flex flex-col justify-center items-center w-full lg:w-1/2 p-6">
      <div class="!w-full max-w-md">
        <!-- Logo -->
        <div class="flex justify-center mb-6">
          <img :src="logo" alt="Logo" class="w-24 h-24"/>
        </div>

        <!-- Title -->
        <h2 class="text-2xl font-semibold text-center mb-6">ເຂົ້າສູ່ລະບົບ</h2>

        <!-- Login Form -->
        <a-form
            :model="form"
            layout="vertical"
            @finish="onSubmit"
            class="space-y-4"
            ref="formRef"
            :rules="rules"

        >
          <!-- Phone Number -->
          <a-form-item name="phone" label="ເບີໂທລະສັບ">
            <a-input
                v-model:value="form.phone"
                placeholder="ປ້ອນເບີໂທລະສັບ ບໍ່ໃສ່(020)"
            >
              <template #prefix>
                <PhoneOutlined class="!mr-2"/>
              </template>
            </a-input>
          </a-form-item>
          <a-form-item name="password" label="ລະຫັດຜ່ານ">
            <a-input-password
                v-model:value="form.password"
                placeholder="ປ້ອນລະຫັດ"
            >
              <template #prefix>
                <LockOutlined class="!mr-2"/>
              </template>
            </a-input-password>
          </a-form-item>

          <!-- Submit Button -->
          <a-form-item>
            <a-button
                type="primary"
                block
                class="!bg-red-600 hover:bg-red-700 h-12 font-semibold"
                html-type="submit"
                :loading="loading"
            >
              ເຂົ້າສູ່ລະບົບ
            </a-button>
          </a-form-item>
        </a-form>

        <!-- Forgot Password & Register -->
        <div class="text-center mt-4">
          <a class="!text-blue-500 cursor-pointer">ລືມລະຫັດຜ່ານ?</a>
          <span class="!mx-2 text-gray-400">|</span>
          <a class="!text-blue-500 cursor-pointer">ສະໝັກສະມາຊິກ</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, inject} from "vue";
import {LockOutlined, PhoneOutlined} from "@ant-design/icons-vue";
import brandImage from "@/assets/images/brandImage.jpg";
import logo from "@/assets/images/logo.png";
import {validationRules} from "@/utils/validationRules";
import {useUserStore} from '@/stores/useUserStore';
import {useRouter} from "vue-router";
import {Form} from 'ant-design-vue';

const notification = inject('notification') as ReturnType<typeof useNotificationStore>;
const userStore = useUserStore();
const loading = ref(false);
const formRef = ref<InstanceType<typeof Form> | null>(null);
const rules = ref(validationRules);
const form = ref({
  phone: "",
  password: ""
});
const router = useRouter();
const onSubmit = async () => {
  try {
    loading.value = true;
    await userStore.signIn(form.value);

    notification.success(
        "ສຳເລັດ!",
        "ເຂົ້າສູ່ລະບົບສຳເລັດ"
    );

    // ✅ Redirect AFTER state updates
    await router.push('/');
  } catch (error: any) {
    if (error.response && error.response.data.errors) {
      const backendErrors = error.response.data.errors;
      notification.error(
          "ຜິດພາດ!",
          backendErrors || "ກະລຸນາກວດຄືນຂໍ້ມູນຂອງທ່ານ"
      );
    }
  } finally {
    loading.value = false;
  }
};

</script>

<style scoped>
a {
  transition: color 0.2s ease-in-out;
}

a:hover {
  color: #e00c16;
}

.login-container {
  max-width: 400px;
  margin: 0 auto;
}
</style>
