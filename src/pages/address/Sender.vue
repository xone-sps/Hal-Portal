<template>
  <div class="px-3">
    <!-- Pending COD Table -->
    <a-card>
      <div class="flex justify-between items-center !mb-4">
        <div class="">
          <p class="text-gray-500">ສະແດງ ລາຍການ</p>
        </div>

        <!-- Pagination & Search -->
        <div class="flex items-center gap-4">
          <!-- Pagination -->
          <a-pagination v-model:current="pagination.current" :total="pagination.total" :pageSize="pagination.pageSize" show-less-items />

          <!-- Search Input -->
          <div class="relative w-80">
            <a-input-search
                v-model:value="searchQuery"
                placeholder="Search"
                class="!w-full !pl-10 1text-left"
            />
          </div>
          <div>
            <a-button type="primary" class="!bg-red-500 !text-white" @click="openAddModal">
              <PlusOutlined class="!text-white text-xl cursor-pointer" />
            </a-button>
          </div>
        </div>
      </div>

      <!-- Table -->
      <a-table :columns="columns" :data-source="data" :pagination="false">

        <template #bodyCell="{ column, record }">
          <!-- Customize Detail Column -->
          <template v-if="column.key === 'action'">
            <a-button type="link" @click="viewDetails(record)">
              <EditOutlined class="text-[#16A34A] text-xl cursor-pointer" />
            </a-button>
            <a-button type="link" @click="deleteItem(record)">
              <DeleteOutlined class="!text-red-500 text-xl cursor-pointer" />
            </a-button>
          </template>
        </template>
      </a-table>
    </a-card>
    <!-- Use the modal component -->
    <AddAddressSenderModal
        v-model="isModalOpen"
        title="ເພີ່ມທີ່ຢູ່ຜູ້ສົ່ງ"
        @confirm="onConfirm"
    >
    </AddAddressSenderModal>

  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { DeleteOutlined,EditOutlined,PlusOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
import AddAddressSenderModal from "@/components/modals/AddAddressSenderModal.vue";

const router = useRouter();
const searchQuery = ref("");
const isModalOpen = ref(false);

const columns = [
  { title: "ລໍາດັບ", dataIndex: "key", key: "key" },
  { title: "ຊື່", dataIndex: "name", key: "name" },
  { title: "ເບີໂທ", dataIndex: "phone", key: "phone" },
  { title: "ທີ່ຢູ່", dataIndex: "address", key: "address" },
  { title: "ສາຂາຈັດສົ່ງ", dataIndex: "receiverBranch", key: "receiverBranch" },
  {
    title: "ຈັດການຂໍ້ມູນ",
    key: "action",
    align: "center",
    dataIndex:"action"
  },
];

const data = [
  {
    key: "1",
    name: "Thinnakone",
    phone: "020 5555 5555",
    address: "020 5555 5555",
    receiverBranch: "ສີສະຫວາດ (02052525252)",
  },
  {
    key: "1",
    name: "Thinnakone",
    phone: "020 5555 5555",
    address: "020 5555 5555",
    receiverBranch: "ສີສະຫວາດ (02052525252)",
  },
];

const pagination = ref({
  current: 1,
  total: 100,
  pageSize: 30,
});
const deleteItem = () =>{

}
const openAddModal = () =>{
  isModalOpen.value = true;
}
const onConfirm = () => {
  console.log('Confirmed!');
};
const viewDetails = (record: any) => {
  isModalOpen.value = true;
};
</script>

<style scoped>
</style>
