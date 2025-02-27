<template>
  <a-layout class="h-screen">
    <!-- Sidebar: Controlled with CSS -->
    <Sidebar :collapsed="collapsed" @update:collapsed="collapsed = $event" />
    <!-- Main Content -->
    <a-layout :class="{'ml-[80px]': collapsed, 'ml-[252px]': !collapsed}" class="transition-all duration-300 flex flex-col min-h-screen">
      <Navbar :collapsed="collapsed" />
      <a-layout-content class="flex-1 p-6 bg-gray-100 overflow-auto">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";

const collapsed = ref(false);
</script>

<style scoped>
/* Ensure smooth transition when sidebar collapses */
.a-layout {
  transition: margin-left 0.3s ease-in-out;
}
</style>
