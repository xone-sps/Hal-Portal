<template>
  <a-layout-sider
      collapsible
      v-model:collapsed="collapsed"
      class="h-screen !fixed left-0 top-0 !bg-white px-4 pt-6 w-[252px] z-50"
      width="252"
  >
    <!-- Logo & Branding -->
    <div class="flex mb-4">
      <img :src="logo" class="w-16 h-16 rounded-full object-contain" alt="Logo">
      <div v-if="!collapsed" class="!ml-2 !mt-2">
        <h2 class="text-lg font-bold">HAL Logistics</h2>
        <p class="text-sm text-gray-500">ຮັບສົ່ງສິນຄ້າ ທົ່ວປະເທດ</p>
      </div>
    </div>

    <!-- User Profile Dropdown -->
    <div v-if="!collapsed"
         class="flex items-center gap-2 !px-4 !py-2 bg-gray-100 rounded-lg !mb-6 cursor-pointer !mt-4">
      <a-avatar size="large" class="bg-gray-300 flex items-center justify-center custom-avatar-icon">
        <UserOutlined class="text-xl"/>
      </a-avatar>
      <div class="flex-1">
        <p class="font-semibold text-gray-800 text-memu">{{ profile?.userName || 'No Name' }}</p>
      </div>
      <DownOutlined class="text-gray-500"/>
    </div>

    <!-- Section Divider -->
    <div class="!my-4 border-t border-gray-200"></div>

    <!-- Primary Action Button -->
    <div v-if="!collapsed" class="px-4 !mb-4">
      <a-button block type="primary" @click="selfDelivery"
                class="!bg-red-600 hover:bg-red-700 text-white font-bold py-2 !text-2l text-menu !h-10">
        ຝາກເຄື່ອງເອງ
      </a-button>
    </div>

    <!-- Menu Sections -->
    <div class="!mb-4 !mt-6">
      <p v-if="!collapsed" class="px-4 !mb-2 group-text-menu">ເມນູ</p>
      <a-menu v-model:selectedKeys="selectedKeys" mode="inline" class="!border-none">
        <a-menu-item key="/">
          <router-link to="/" class="flex items-center gap-2">
            <img :src="dashboard_data" alt="Dashboard" class="w-6 h-6"/>
            <span v-if="!collapsed" class="text-menu">ແດຊບອດ</span>
          </router-link>
        </a-menu-item>

        <a-menu-item key="/cod">
          <router-link to="/cod/summary" class="flex items-center gap-2">
            <img :src="cod" alt="COD" class="w-6 h-6"/>
            <span v-if="!collapsed" class="text-menu">ລາຍການ COD</span>
          </router-link>
        </a-menu-item>

        <a-menu-item key="/self-service/one-parcel">
          <router-link to="/self-service/one-parcel" class="flex items-center gap-2">
            <img :src="self_delivery" alt="Self Delivery" class="w-6 h-6"/>
            <span v-if="!collapsed" class="text-menu">ຝາກເຄື່ອງເອງ</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </div>

    <!-- Tracking Section -->
    <div class="!mt-4 mb-6">
      <p v-if="!collapsed" class="px-4 !mb-2 group-text-menu">ຕິດຕາມພັດສະດຸ</p>
      <a-menu v-model:selectedKeys="selectedKeys" mode="inline" class="!border-none">
        <a-menu-item key="/parcel/outbound">
          <router-link to="/parcel/outbound" class="flex items-center gap-2">
            <img :src="box_fill" alt="Open Box Icon" class="w-6 h-6"/>
            <span v-if="!collapsed" class="text-menu">ພັດສະດຸອອກ</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="/parcel/inbound">
          <router-link to="/parcel/inbound" class="flex items-center gap-2">
            <img :src="open_box" alt="Open Box Icon" class="w-6 h-6"/>
            <span v-if="!collapsed" class="text-menu">ພັດສະດຸເຂົ້າ</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </div>

    <!-- Settings Section -->
    <div class="!mt-4 mb-6">
      <p v-if="!collapsed" class="px-4 !mb-2 group-text-menu">ຂໍ້ມູນສ່ວນຕົວ</p>
      <a-menu v-model:selectedKeys="selectedKeys" mode="inline" class="!border-none">
        <a-menu-item key="profile">
          <router-link to="/profile" class="flex items-center gap-2">
            <img :src="user" alt="Open Box Icon" class="w-6 h-6"/>
            <span v-if="!collapsed" class="text-menu">ຂໍ້ມູນທົ່ວໄປ</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="address">
          <router-link to="/address" class="flex items-center gap-2">
            <img :src="location" alt="Open Box Icon" class="w-6 h-6"/>
            <span v-if="!collapsed" class="text-menu">ທີ່ຢູ່</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="change-password">
          <router-link to="/change-password" class="flex items-center gap-2">
            <img :src="change_password" alt="Open Box Icon" class="w-6 h-6"/>
            <span v-if="!collapsed" class="text-menu">ປ່ຽນລະຫັດຜ່ານ</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </div>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { ref,computed,watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from '@/stores/useUserStore';
import {
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons-vue";


import box_fill from "@/assets/icons/box-fill.svg";
import open_box from "@/assets/icons/box-open.svg";
import self_delivery from "@/assets/icons/self_delivery.svg";
import cod from "@/assets/icons/cod.svg";
import dashboard_data from "@/assets/icons/dashboard.svg";
import user from "@/assets/icons/user.svg";
import location from "@/assets/icons/location.svg";
import change_password from "@/assets/icons/chang_password.svg";

import logo from "@/assets/images/logo2.png";
import router from "@/router";

const collapsed = ref(false);
const route = useRoute();
const selectedKeys = ref<string[]>([route.path]);
const userStore = useUserStore();
const profile = computed(() => userStore.user);

watchEffect(() => {
  const path = route.path;
  if (path.startsWith("/cod")) {
    selectedKeys.value = ["/cod"];
  } else if (path.startsWith("/self-service")) {
    selectedKeys.value = ["/self-service"];
  } else if (path.startsWith("/parcel/outbound")) {
    selectedKeys.value = ["/parcel/outbound"];
  } else if (path.startsWith("/parcel/inbound")) {
    selectedKeys.value = ["/parcel/inbound"];
  } else if (path.startsWith("/profile")) {
    selectedKeys.value = ["/profile"];
  }
  else {
    selectedKeys.value = ["/"];
  }
});

const selfDelivery = () =>{
  router.push({
    name: "one-parcel",
  });
}
</script>

<style scoped>
.ant-menu-vertical {
  border-inline-end: none;
  border: none;
}

.ant-menu-title-content {
  font-size: 16px;
}

/* Ensure sidebar takes full height */
.a-layout-sider {
  height: 100vh !important;
  transition: width 0.3s ease-in-out;
  position: fixed !important;
}

/* Collapsed Mode */
.a-layout-sider-collapsed {
  width: 80px !important;
}

.a-layout-sider:not(.a-layout-sider-collapsed) {
  width: 280px !important;
}

a:hover {
  background-color: transparent;
}

.router-link-active router-link-exact-active flex items-center gap-2 {
  width: 28px !important;
  height: 28px !important;
}

.ant-menu-item img {
  width: 22px !important;
  height: 22px !important;
  min-width: 24px;
  min-height: 24px;
}

</style>
