<template>
  <a-layout-header class="bg-white shadow-md flex items-center justify-between px-6">
    <!-- Title aligned to start -->
    <a-typography-title :level="4" class="mb-0 text-black">
      Dashboard
    </a-typography-title>

    <!-- Avatar aligned to end -->
    <div class="flex items-center">
      <a-avatar class="cursor-pointer">U</a-avatar>
    </div>
  </a-layout-header>

</template>

<style scoped>
/* Ensure the navbar does not shrink */
.a-layout-header {
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
}
</style>
