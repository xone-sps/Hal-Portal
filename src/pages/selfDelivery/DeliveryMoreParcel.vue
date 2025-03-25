<template>
  <div class="px-2">
    <!-- Header Section -->
    <div class="mb-2">
      <a-card class="custom-card">
        <div class="flex justify-between items-center">
          <!-- Sender Info -->
          <div class="flex items-center gap-3">
            <!-- Avatar -->
            <a-avatar size="small" class="!bg-red-500 text-white font-bold">S</a-avatar>

            <!-- Name and Edit Option -->
            <div class="flex items-center gap-2">
              <p class="text-lg font-semibold">ຜູ້ສົ່ງ</p>
              <span class="text-blue-500 cursor-pointer flex items-center">
            <EditOutlined class="!mr-1"/> ແກ້ໄຂຂໍ້ມູນ
          </span>
            </div>
          </div>
          <!-- Save Button -->
          <a-button type="default" class="!flex !items-center !gap-2 !bg-gray-100">
            <SaveOutlined/>
            <span>ບັນທຶກໄວ້</span>
          </a-button>
        </div>

        <!-- Sender Details -->
        <div class="mt-4 space-y-2">
          <div class="flex">
            <p class="text-gray-500 w-24">ຊື່</p>
            <p class="font-semibold">{{ profile?.userName || 'No Name' }}</p>
          </div>
          <div class="flex">
            <p class="text-gray-500 w-24">ເບີໂທລະສັບ</p>
            <p class="font-semibold">{{ profile?.userTel || 'N/A' }}</p>
          </div>
          <div class="flex">
            <p class="text-gray-500 w-24">ທີ່ຢູ່</p>
            <p class="font-semibold">{{ profile?.userProfile?.addresss || 'N/A' }}</p>
          </div>
        </div>
      </a-card>
    </div>

    <div class="!mb-2">
      <a-card>
        <div class="flex justify-between items-center !mb-4">
          <p class="text-gray-500">ລາຍການພັດສະດຸ</p>
          <!-- Pagination & Search -->
          <div class="flex items-center gap-4">
            <div>
              <a-button type="primary" class="!bg-red-500 !text-white !mr-1" @click="openAddModal">
                <PlusOutlined class="!text-white text-l cursor-pointer pr-1"/>
                ເພີມ
              </a-button>
              <a-button type="primary" class="!bg-blue-400 !text-white" @click="openAddModal">
                <FileExcelOutlined class="!text-white text-l cursor-pointer pr-1"/>
                ນໍາຂໍ້ມູນເຂົ້າ
              </a-button>
            </div>
          </div>
        </div>

        <div class="flex justify-between items-center !mb-4" v-if="outboundStore.outboundList.length">
          <div class="flex items-center">
            <div>
              <p class="text-gray-500 !mr-4">ສະແດງ {{outboundStore.outboundList.length}} ລາຍການ</p>
            </div>
            <Pagination :pagination="outboundStore.pagination"
                        @paginate="handlePaginate"/>
          </div>
          <!-- Pagination & Search -->
          <div class="relative w-80">
            <a-input-search
                placeholder="Search"
                class="!w-full !pl-10 1text-left"
            />
          </div>
        </div>

        <!-- Table -->
        <a-table v-if="outboundStore.outboundList.length" :columns="columns" :data-source="outboundStore.outboundList"
                 :pagination="false" :locale="{ emptyText: $emptyText() }">

          <template #bodyCell="{ column, record }">
            <!-- Customize Detail Column -->
            <template v-if="column.key === 'action'">
              <a-button type="link" @click="viewDetails(record)">
                <EditOutlined class="text-[#16A34A] text-xl cursor-pointer"/>
              </a-button>
              <a-button type="link" @click="deleteItem(record)">
                <DeleteOutlined class="!text-red-500 text-xl cursor-pointer"/>
              </a-button>
            </template>
          </template>
        </a-table>
        <div v-if="outboundStore.outboundList == 0">
          <div class="flex flex-col items-center justify-center p-6">
            <img :src="empty_box" alt="No Data" class="w-22 h-22 mb-2"/>
            <a-button type="dashed" class="!text-red-500 !mr-1 " @click="openAddModal">
              <PlusOutlined class="!text-red-500 text-l cursor-pointer pr-1"/>
              ເພີມລາຍການ
            </a-button>
          </div>
        </div>
      </a-card>
    </div>
    <!-- Print Options -->
    <a-card class="mb-4">
      <h3 class="text-lg font-semibold">ປິ້ນ</h3>
      <div class="flex gap-4 mt-4">
        <a-button>Web View</a-button>
        <a-button>A6 Sticker Label</a-button>
        <a-button>Sticker Label (4” x 3”)</a-button>
        <a-button>Mobile Printer</a-button>
      </div>
    </a-card>
    <div class="flex justify-between items-center">
      <!-- Remark Info -->
      <div class="flex items-center gap-3">
        <p>
            <span class="text-red-500">ໝາຍເຫດ:
            </span>
          ຄ່າບໍລິການແມ່ນຕ້ອງອ້າງອີງຕາມການຄິດໄລ່ຕົວຈິງຂອງພະນັກງານຮຸ່ງອາລຸນ
        </p>
      </div>
      <!-- Save Button -->
      <div class="text-right !mt-2">
        <a-button type="primary" class="!bg-red-600 !text-white" @click="submitForm">ຢືນຢັນ ແລະ ປິ້ນບິນ</a-button>
      </div>
    </div>
  </div>
  <!-- Use the modal component -->
  <AddAddressSenderModal
      v-model="isModalOpen"
      title="ເພີ່ມລາຍການພັດສະດຸ"
      @confirm="onConfirm"
  >
  </AddAddressSenderModal>

</template>

<script setup lang="ts">
import {ref, onMounted, computed} from "vue";
import {validationRules} from "@/utils/validationRules";
import {EditOutlined, SaveOutlined, PlusOutlined, FileExcelOutlined,DeleteOutlined} from "@ant-design/icons-vue";
import Pagination from "@/components/pagination.vue"
import {useOutboundParcelStore} from "@/stores/parcel/outboundStore";
import {notification} from "ant-design-vue";
import empty_box from "@/assets/icons/empty.svg";
import AddAddressSenderModal from "@/components/modals/AddParcelModal.vue";
import {useUserStore} from "@/stores/useUserStore";
import dayjs, {Dayjs} from "dayjs";

const formRef = ref();
const isModalOpen = ref(false);
const outboundStore = useOutboundParcelStore();
const userStore = useUserStore();
const startDate = ref<Dayjs>(dayjs().subtract(3, 'month'));
const endDate = ref<Dayjs>(dayjs());
const profile = computed(() => userStore.user);
const form = ref({
  senderName: "",
  senderPhone: "",
  senderAddress: "",
  receiverName: "",
  receiverPhone: "",
  receiverAddress: "",
  packageType: "",
  selectedServices: [],
  originValue: undefined,
  destinationValue: undefined,
  parcelType: "",
  originBranch: [],
  parcelCategoryValue: undefined,
  parcelDimensions: "",
  weight: "",
});
const prefixPhone = ref<string>('020');
const receiverPhone = ref<string>('');
const serviceMore = ref([
  {value: "cdc", label: "CDC", detail: "ເກັບຄ່າຂົນສົ່ງປາຍທາງ"},
  {value: "cod", label: "COD", detail: "ເກັບຄ່າເຄື່ອງປາຍທາງ"},
  {value: "insurance", label: "ປະກັນໄພ", detail: "ຄຸມຄອງພັດສະດຸຂອງທ່ານ"},
]);


const columns = [
  {title: "ເລກພັດສະດຸ", dataIndex: "shipment_number", key: "shipment_number"},
  {title: "ປະເພດພັດສະດຸ", dataIndex: ["parcel", "parcel_category", "name"], key: "parcel_category",},
  {
    title: "ລາຄາຂົນສົ່ງ",
    dataIndex: "total_freight",
    key: "total_freight",
    customRender: ({text}: { text: number }) => `${text.toLocaleString()} ກີບ`
  },
  {
    title: "ລາຄາ COD",
    dataIndex: "total_price",
    key: "cod",
    customRender: ({text}: { text: number }) => `${text.toLocaleString()} ກີບ`
  },
  {
    title: "ສາຂາຕົ້ນທາງ",
    key: "start_branch",
    customRender: ({record}: any) => {
      return `${record.start_branch?.name || ""} (${record.start_branch?.tel || ""})`;
    }
  },
  {
    title: "ສາຂາປາຍທາງ", key: "end_branch", customRender: ({record}: any) => {
      return `${record.end_branch?.name || ""} (${record.end_branch?.tel || ""})`;
    }
  },
  {
    title: "ວັນທີສົ່ງບິນ", dataIndex: "start_date_actual", key: "start_date_actual",
    sorter: (a, b) => new Date(a.start_date_actual).getTime() - new Date(b.start_date_actual).getTime(),
  },
  {
    title: "ຈັດການຂໍ້ມູນ",
    key: "action",
    align: "center",
  },
];
const openAddModal = () => {
  isModalOpen.value = true;
}
const handlePaginate = (cursor: string) => {
  outboundStore.fetchOutboundData({
    status: 'pending',
    // cursor: cursor,
    startDate: startDate.value,
    endDate: endDate.value
  });
};

const originBranch = ref([
  {value: "dongdork", label: "DongDork"},
  {value: "hongkhar", label: "HongKhar"},
  {value: "chommarny", label: "Chommarny"},
])
const destinationBranch = ref([
      {value: "svk", label: "Savannakhet"},
      {value: "kayson", label: "Kaysone"},
      {value: "luk5", label: "Luk 5"},
    ])
;
const parcelCategory = ref([
  {value: "cloth", label: "ເສື້ອຍຜ້າ"},
  {value: "cosmetic", label: "ເຄື່ອງສໍາອາງ"},
]);
const filterOption = (input: string, option: any) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
const rules = ref(validationRules); // Assign imported rules
const submitForm = async () => {
  try {
    await formRef.value.validate();
    notification.success({
      message: "ສຳເລັດ!",
      description: "ຂໍ້ມູນຂອງທ່ານຖືກບັນທຶກສຳເລັດ",
      placement: "topRight", // Show at top right
      duration: 5, // Auto close in 5 seconds
    });
    console.log("Form Data:", form.value);
  } catch (error) {
    notification.error({
      message: "ຜິດພາດ!",
      description: "ກະລຸນາກວດຄືນຂໍ້ມູນຂອງທ່ານ",
      placement: "topRight", // Show at top right
      duration: 5, // Auto close in 5 seconds
    });
  }
};
onMounted(async () => {
      await outboundStore.fetchOutboundData({status: 'pending', startDate: startDate.value, endDate: endDate.value});
    }
)

const deleteItem = () => {

}
const viewDetails = (record: any) => {
  isModalOpen.value = true;
};
const onConfirm = () => {
  console.log('Confirmed!');
};
</script>

<style scoped>
.custom-avatar {
  font-size: 14px !important; /* Adjust icon size */
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  margin: auto;
  border-radius: 40%;
  padding: 0px 12px;
  margin: 0px 12px;
  vertical-align: 0px !important;
}

.arrow-button {
  /*height: 40px;*/
  margin-top: 6px;
  padding: 0px 16px;
  border-radius: 40%;
}
</style>
