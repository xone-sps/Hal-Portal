<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { UserOutlined } from "@ant-design/icons-vue";
import { validationRules } from "@/utils/validationRules";
import { notification } from "ant-design-vue";
import type { UserProfile } from "@/types/UserProfile";
import { fetchAddressData } from "@/api/address";
import { fetchUserProfile, updateUserProfile } from "@/api/userProfile";
import dayjs, { Dayjs } from "dayjs";
import { useUserStore } from "@/stores/useUserStore";

const userStore = useUserStore();

const formRef = ref();
const rules = ref(validationRules);

const open = ref(false);
const imageUrl = ref<string | null>(null);
const loading = ref(false);
const form = ref<Partial<UserProfile & { dob: string | Dayjs | null }>>({
  name: "",
  surname: "",
  tel: "",
  dob: null,
  gender: "male",
  province_id: null as number | null,
  district_id: null as number | null,
  village_id: null as number | null,
  profile_picture: "",
  profile_picture_path: null,// Added profile_picture_path
});

const provinces = ref<{ id: number; name: string }[]>([]);
const districts = ref<{ id: number; name: string; province_id: number }[]>([]);
const villages = ref<{ id: number; name: string; district_id: number }[]>([]);

const filteredDistricts = ref<{ id: number; name: string }[]>([]);
const filteredVillages = ref<{ id: number; name: string }[]>([]);

// Fetch user profile data on component mount
onMounted(async () => {
  try {
    // Fetch user profile
    const userProfile = await fetchUserProfile();
    form.value = {
      ...userProfile,
      dob: userProfile.dob ? dayjs(userProfile.dob, "YYYY-MM-DD") : null, // Convert dob to Dayjs
    };

    // Fetch address data
    const addressData = await fetchAddressData();
    provinces.value = addressData.provinces;
    districts.value = addressData.districts;
    villages.value = addressData.villages;

    // Filter districts based on the user's province_id
    if (form.value.province_id) {
      filteredDistricts.value = districts.value.filter(
        (district) => district.province_id === form.value.province_id
      );
    }

    // Filter villages based on the user's district_id
    if (form.value.district_id) {
      filteredVillages.value = villages.value.filter(
        (village) => village.district_id === form.value.district_id
      );
    }
  } catch (error) {
    notification.error({
      message: "Error",
      description: "Failed to load user profile data.",
      placement: "topRight",
      duration: 5,
    });
  }

  // Debugging logs
  console.log("Filtered Districts:", filteredDistricts.value);
  console.log("Filtered Villages:", filteredVillages.value);
  console.log("Province ID:", form.value.province_id);
  console.log("District ID:", form.value.district_id);
  console.log("Village ID:", form.value.village_id);
});

// Watch for changes in province and district to filter dependent data
watch(
  () => form.value.province_id,
  (newProvinceId) => {
    if (newProvinceId) {
      filteredDistricts.value = districts.value.filter(
        (district) => district.province_id === newProvinceId
      );
      form.value.district_id = null; // Reset district and village when province changes
      form.value.village_id = null;
      filteredVillages.value = [];
    }
  }
);
watch(
  () => form.value.district_id,
  (newDistrictId) => {
    if (newDistrictId) {
      filteredVillages.value = villages.value.filter(
        (village) => village.district_id === newDistrictId
      );
      form.value.village_id = null; // Reset village when district changes
    }
  }
);
const openUploadfile = () => {
  open.value = true;
};

const beforeUpload = (file: File) => {
  const isImage = file.type.startsWith("image/");
  if (!isImage) {
    notification.error({
      message: "Error",
      description: "Please upload a valid image file.",
      placement: "topRight",
      duration: 5,
    });
  }
  return isImage;
};

const handleChange = (info: any) => {
  if (info.file.status === "done") {
    imageUrl.value = URL.createObjectURL(info.file.originFileObj);
    form.value.profile_picture_path = info.file.originFileObj;
    loading.value = false;
  } else if (info.file.status === "uploading") {
    loading.value = true;
  } else if (info.file.status === "error") {
    loading.value = false;
    notification.error({
      message: "Error",
      description: "Failed to upload the image. Please try again.",
      placement: "topRight",
      duration: 5,
    });
  }
};
const filterProvince = (input: string, option: any) => {
  return option?.label.toLowerCase().includes(input.toLowerCase());
};

const filterSelectOption = (input: string, option: any) => {
  return option?.label?.toLowerCase().includes(input.toLowerCase());
};

const removeImage = () => {
  imageUrl.value = null;
  form.value.profile_picture_path = null;
};
// Submit form data
const submitForm = async () => {
  try {
    const formattedForm = {
      ...form.value,
      dob: form.value.dob
        ? (typeof form.value.dob === "string"
            ? form.value.dob
            : form.value.dob.format("YYYY-MM-DD"))
        : null,
    };
    await formRef.value.validate();
    await updateUserProfile(formattedForm); // Update the user profile
    notification.success({
      message: "ສຳເລັດ!",
      description: "ຂໍໍາູນຂອງທ່ານຖືກບັນທຶກສຳເລັດ",
      placement: "topRight", // Show at top right
      duration: 5, // Auto close in 5 seconds
    });
  } catch (error) {
    notification.error({
      message: "ຜິດພາດ!",
      description: "ກະລຸນາກວດຄືນຂໍໍາູນຂອງທ່ານ",
      placement: "topRight", // Show at top right
      duration: 5, // Auto close in 5 seconds
    });
  }
};
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Profile Header Section -->
    <div class="flex items-center gap-6 bg-white rounded-lg p-6">
      <!-- Profile Avatar -->
      <a-avatar
        size="large"
        class="bg-gray-300 text-white flex items-center justify-center rounded-full"
      >
        <img :src="form.profile_url ?? undefined" alt="Profile Picture" />
        <UserOutlined v-if="!form.profile_url" class="text-4xl" />
      </a-avatar>

      <!-- Profile Details -->
      <div>
        <h3 class="text-xl font-bold">{{ form.name }} {{ form.surname }}</h3>
        <p class="text-gray-500 text-sm">ລະຫັດ: {{ form.customer_id }}</p>
        <p class="text-gray-500 text-sm">ເບີໂທ: {{ form.tel }}</p>
      </div>

      <!-- Profile Actions -->
      <div class="ml-auto flex items-center gap-3">
        <a-button
          type="primary"
          danger
          class="!bg-red-500"
          @click="openUploadfile"
          >ອັບໂຫຼດໃໝ່</a-button
        >
        <a-button @click="removeImage">ລົບອອກ</a-button>
      </div>
    </div>

    <a-modal v-model:open="open" :footer="null" centered>
      <div class="flex flex-col items-center text-center p-6">
        <a-upload
          name="avatar"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
          <div v-else>
            <loading-outlined v-if="loading"></loading-outlined>
            <plus-outlined v-else></plus-outlined>
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        <a-button
          type="primary"
          block
          class="!mt-6 !bg-red-600 !text-white"
          @click="submitForm"
        >
          Save
        </a-button>
      </div>
    </a-modal>

    <div class="!mx-3">
      <a-form layout="vertical" ref="formRef" :model="form" :rules="rules">
        <!-- Form Section -->
        <a-card class="!mt-2">
          <h3 class="text-lg font-semibold mb-4">ຂໍ້ມູນໂປຣໄຟ</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Left Column -->
            <div>
              <!-- Sender Name -->
              <a-form-item label="ຊື່" name="userName">
                <a-input v-model:value="form.name" placeholder="ປ້ອນຊື່" />
              </a-form-item>

              <!-- Phone Number -->
              <a-form-item label="ວັນເດືອນປີເກີດ" name="dob">
                <a-date-picker
                  v-model:value="form.dob"
                  placeholder="ເລືອກວັນເດືອນປີເກີດ"
                  class="!mr-3"
                  style="width: 100%"
                  format="DD-MM-YYYY"
                />
              </a-form-item>
            </div>
            <!-- Right Column -->
            <div>
              <!-- Receiver Name -->
              <a-form-item label="ນາມສະກຸນ" name="surname">
                <a-input
                  v-model:value="form.surname"
                  placeholder="ປ້ອນນາມສະກຸນ"
                />
              </a-form-item>
              <a-form-item label="ເລືອກເພດ" name="gender">
                <a-radio-group v-model:value="form.gender">
                  <a-radio value="male">ຍິງ</a-radio>
                  <a-radio value="female">ຊາຍ</a-radio>
                </a-radio-group>
              </a-form-item>
              <!-- Receiver Address -->
              <!-- <a-form-item label="ທີ່ຢູ່ປະຈຸບັນ" name="userAddress">
                <a-input v-model:value="form.userAddress" placeholder="ປ້ອນທີ່ຢູ່"/>
              </a-form-item> -->
            </div>
          </div>
        </a-card>

        <!-- Address Section -->
        <a-card class="!mt-2">
          <h3 class="text-lg font-semibold mb-4">ທີ່ຢູ່</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Province -->
            <a-form-item label="ແຂວງ" name="province_id">
              <a-select
                v-model:value="form.province_id"
                placeholder="ເລືອກແຂວງ"
                class="w-full custom-select"
                showSearch
                :options="provinces.map(province => ({
                  value: province.id,
                  label: province.name,
                }))"
                :filterOption="filterSelectOption"
              />
            </a-form-item>
            <!-- City -->
            <a-form-item label="ເມືອງ" name="district_id">
              <a-select
                v-model:value="form.district_id"
                placeholder="ເລືອກເມືອງ"
                class="w-full custom-select"
                showSearch
                :options="filteredDistricts.map(district => ({
                  value: district.id,
                  label: district.name,
                }))"
                :filterOption="filterSelectOption"
              />
            </a-form-item>

            <!-- Village -->
            <a-form-item label="ບ້ານ" name="village_id">
              <a-select
                v-model:value="form.village_id"
                placeholder="ເລືອກບ້ານ"
                class="w-full custom-select"
                showSearch
                :options="filteredVillages.map((village) => ({
                  value: village.id,
                  label: village.name,
                }))"
                :filterOption="filterSelectOption"
              />
            </a-form-item>
          </div>
        </a-card>

        <!-- Submit Button -->
        <div class="flex justify-end mt-6">
          <a-button
            type="primary"
            class="!bg-red-500 !text-white"
            @click="submitForm"
          >
            ບັນທຶກ
          </a-button>
        </div>
      </a-form>
    </div>
  </div>
</template>
<style scoped></style>
