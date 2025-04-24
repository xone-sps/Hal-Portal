<template>
  <div className="flex justify-center items-center mt-4">
    <!-- Ant Design Pagination -->
    <a-pagination
        :current="currentPage"
        :total="totalItems"
        :page-size="pageSize"
        :show-less-items="true"
        :show-size-changer="false"
        :item-render="itemRender"
        @change="handlePageChange"
    />
  </div>
</template>

<script setup>
import {h} from 'vue';
import {LeftOutlined, RightOutlined} from '@ant-design/icons-vue';

const emit = defineEmits();

const props = defineProps({
  pagination: Object,
  pageSize: {
    type: Number,
    default: 5, // Default to 5 items per page
  },
  currentPage: {
    type: Number,
    default: 1, // Start from page 1
  },
  totalItems: {
    type: Number,
    default: 0,
  },
});

// ✅ Extract cursor value correctly
const extractCursor = (url) => {
  if (url) {
    const pattern = 'cursor=';
    const cursorIndex = url.indexOf(pattern);
    if (cursorIndex !== -1) {
      return url.slice(cursorIndex + pattern.length);
    }
  }
  return null;
};

// ✅ Handle page change
const handlePageChange = (page) => {
  let cursor = null;

  if (page > props.currentPage) {
    // ✅ Use `nextPageUrl`
    cursor = extractCursor(props.pagination?.nextPageUrl);
  } else {
    // ✅ Use `prevPageUrl`
    cursor = extractCursor(props.pagination?.prevPageUrl);
  }

  if (cursor) {
    console.log('New Cursor:', cursor);
    emit('paginate', cursor);
  }
};

// ✅ Customize Next/Prev Buttons with Ant Design Icons
const itemRender = (page, type, originalElement) => {
  if (type === 'prev') {
    return h(
        'a',
        {class: 'custom-pagination-prev'},
        [
          h(LeftOutlined, {class: 'pagination-icon'}),
          h('span', {}, 'ກັບຄືນ'),
        ]
    );
  }
  if (type === 'next') {
    return h(
        'a',
        {class: 'custom-pagination-next'},
        [
          h('span', {}, 'ໜ້າຕໍ່ໄປ'),
          h(RightOutlined, {class: 'pagination-icon'}),
        ]
    );
  }

  return originalElement;
};
</script>

<style scoped>
/* ✅ Active Page Style */
:deep(.ant-pagination-item-active) {
  background-color: #e00c16 !important;
  border-color: #e00c16 !important;
  color: white !important;
}

/* ✅ Default Page Item Style */
:deep(.ant-pagination-item) {
  border-radius: 8px !important;
  font-size: 14px !important;
}

/* ✅ Customize Next and Prev Buttons */
.custom-pagination-prev, .custom-pagination-next {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* ✅ Hover Effect */
:deep(.ant-pagination-item:hover) {
  border-color: #e00c16 !important;
}

:deep(.ant-pagination-prev:hover), :deep(.ant-pagination-next:hover) {
  border-color: #e00c16 !important;
}

/* ✅ Icon Size and Color */
.pagination-icon {
  font-size: 16px;
  color: #e00c16;
}
</style>
