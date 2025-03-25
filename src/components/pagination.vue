<template>
  <div class="flex justify-content-between align-items-center">
    <!-- Previous Button -->
<!--    <p class="!mr-2 flex !my-auto">ສະແດງ {{pagination.currentPage}} - {{pagination.pageSize}} ຈາກ {{pagination.totalItems}} ລາຍການ</p>-->
    <a-button
        :disabled="pagination.prevPageUrl == null"
        class="p-button-sm btn-pre !mr-1"
        @click="changePage(pagination.prevPageUrl)"
    >
    <LeftOutlined/>
    </a-button>

    <!-- Next Button -->
    <a-button
        :disabled="pagination.nextPageUrl == null"
        class="btn-next p-button-sm p-button-secondary"
        @click="changePage(pagination.nextPageUrl)"
    >
   <RightOutlined/>
    </a-button>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue';

const emit = defineEmits();

const props = defineProps({
  pagination: Object
});

function changePage(page) {
  if (page) {
    const pattern = "cursor=";
    const cursor = page.slice(page.indexOf(pattern) + pattern.length);
    emit("paginate", cursor);
  }
}
</script>

<style scoped lang="scss">
.btn-next, .btn-pre {
  //height: 25px;
  //border-radius: 30px;
  border: none;
  box-shadow: none;
}
</style>