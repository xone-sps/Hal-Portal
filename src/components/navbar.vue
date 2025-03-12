<template>
  <a-layout-header class="!bg-white flex items-center justify-between !px-7">
    <!-- Title aligned to start -->
    <a-typography-title :level="4" class="mb-0 text-black">
      <span class="text-xl">{{pageTitle}}</span>
      <p class="text-sub-title">{{pageDescription}}</p>
    </a-typography-title>
    <!-- Avatar aligned to end -->
    <div class="flex items-center">
      <a-avatar class="cursor-pointer bg-red !bg-red-500" @click="Logout">
        <LogoutOutlined/>
      </a-avatar>
    </div>
  </a-layout-header>

</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { LogoutOutlined } from "@ant-design/icons-vue";
import router from "@/router";
import {useUserStore} from "@/stores/useUserStore";

const route = useRoute();
const userStore = useUserStore();
// Dynamically update the title from meta
const pageTitle = computed(() => route.meta.title || "HAL Logistics");
// Get page description from meta
const pageDescription = computed(() => route.meta.description || "");
const Logout = () =>{
  userStore.logout();
  router.push({
    name: "login",
  });
}
</script>

<style scoped>
/* Ensure the navbar does not shrink */
.a-layout-header {
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
}
.bg-white {
  background-color: white;
}
.shadow {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
