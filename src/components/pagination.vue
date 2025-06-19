<template>
  <a-button
    :disabled="pagination.prevPageUrl == null"
    class="!mr-1 flex items-center justify-center"
    @click="changePage(pagination.prevPageUrl)"
  >
    <LeftOutlined />
  </a-button>
  <!-- Next Button -->
<a-button
  :disabled="pagination.nextPageUrl == null"
  class="flex items-center justify-center"
  @click="changePage(pagination.nextPageUrl)"
>
  <RightOutlined />
</a-button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { LeftOutlined, RightOutlined } from "@ant-design/icons-vue";

// Define props
const props = defineProps({
  pagination: {
    type: Object,
    required: true,
  },
});

// Define emits
const emit = defineEmits(["paginate"]);

// Change page function
function changePage(page: string | null) {
  if (page) {
    const pattern = "cursor=";
    const cursor = page.slice(page.indexOf(pattern) + pattern.length);
    emit("paginate", cursor);
  }
}
</script>