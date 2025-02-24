<template>
  <a-layout-sider
      collapsible
      v-model:collapsed="collapsed"
      class="h-screen fixed left-0 top-0"
  >
    <div class="logo text-white text-center py-4 font-bold">
      <div>
        <img class="w-16 h-16 size-40" :src="logo" alt="Logo">
      </div>
     <span class="text-2xl">HAL-Portal</span>
    </div>
    <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
      <a-menu-item key="dashboard">
        <router-link to="/">
          <template #icon>
            <HomeOutlined/>
          </template>
          Dashboard
        </router-link>
      </a-menu-item>
      <a-menu-item key="settings">
        <router-link to="/settings">
          <template #icon>
            <SettingOutlined/>
          </template>
          Settings
        </router-link>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import {ref} from "vue";
import logo from "@/assets/images/logo2.png";

const collapsed = ref(false);
const selectedKeys = ref(["dashboard"]);
</script>

<style scoped>
/* Ensure sidebar takes full height */
.a-layout-sider {
  height: 100vh !important;
}
</style>
