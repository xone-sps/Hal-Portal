<script setup lang="ts">
import {RouterView} from 'vue-router'
import ViewModal from "@/components/modals/ViewModal.vue";
import CodSuccess from "@/components/modals/CodSuccess.vue";
</script>

<template>
<div>
  <CodSuccess />
  <ViewModal />
  <RouterView/>
</div>
</template>

<style scoped>
</style>
