<template>
  <div class="p-6">
    <a-card class="max-w-lg mx-auto">
      <p v-if="userStore.isLoading">Loading...</p>
      <p v-else-if="userStore.user">
        Welcome, {{ userStore.user.name }} ({{ userStore.user.email }})
      </p>
      <p v-else>No user data</p>
      <a-button type="primary" @click="userStore.fetchUser">Fetch User</a-button>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/useUserStore";
const userStore = useUserStore();

</script>
