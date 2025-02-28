<script setup lang="ts">
import {RouterView} from 'vue-router'
import ViewModal from "@/components/modals/ViewModal.vue";
</script>

<template>
<div>
  <ViewModal />
  <RouterView/>
</div>
</template>

<style scoped>
</style>
