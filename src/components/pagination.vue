<template>
  <!-- Pagination Info -->
  <!-- <p class="!mr-2 flex !my-auto">ສະແດງ {{ pagination.currentPage }} - {{ pagination.pageSize }} ຈາກ {{ pagination.totalItems }} ລາຍການ</p> -->

  <!-- Previous Button -->
  <a-button
    :disabled="pagination.prevPageUrl == null"
    class="p-button-sm btn-pre !mr-1"
    @click="changePage(pagination.prevPageUrl)"
  >
    <LeftOutlined />
  </a-button>

  <!-- Next Button -->
  <a-button
    :disabled="pagination.nextPageUrl == null"
    class="btn-next p-button-sm p-button-secondary"
    @click="changePage(pagination.nextPageUrl)"
  >
    <RightOutlined />
  </a-button>
</template>

<script setup>
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
function changePage(page) {
  if (page) {
    const pattern = "cursor=";
    const cursor = page.slice(page.indexOf(pattern) + pattern.length);
    emit("paginate", cursor);
  }
}
</script>