<template>
  <a-layout class="h-screen">
    <!-- Sidebar -->
    <Sidebar />

    <a-layout class="flex flex-col min-h-screen">
      <!-- Navbar -->
      <Navbar />

      <!-- Content -->
      <a-layout-content class="flex-1 p-6 bg-gray-100">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";
</script>

<style scoped>
/* Ensure the layout takes full height */
.a-layout {
  min-height: 100vh;
}
</style>
