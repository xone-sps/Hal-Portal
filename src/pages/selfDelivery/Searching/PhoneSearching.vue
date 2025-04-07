<template>
  <div class="phone-search">
    <h2 class="text-xl">ຄົ້ນຫາຂໍ້ມູນສາຂາດ້ວຍເບີໂທລະສັບ</h2>
    <div class="input-group">
      <a-input
          style="width:400px"
          v-model:value="phoneQuery"
          placeholder="ປ້ອນເບີໂທລະສັບ"
          class="p-inputtext p-component"
          type="number"
          @input="onInputChange"
          @keyup.enter="onPhoneSearch"
      />
      <a-button
          label="ຄົ້ນຫາ"
          class="p-button-success ml-2 !bg-green-600"
          type=""
          @click="onPhoneSearch"
      >
        <SearchOutlined class="!text-white"/>

      </a-button>
    </div>
    <div v-if="selectedReceiverPhoneNumber"
         class="customer-info-display flex align-items-start justify-content-center gap-2 p-1 mb-1">
      <div class="flex align-items-center" style="margin-left: -10px;">
        <i class="pi pi-phone mr-2 text-blue-500"></i>
        <span class="text-sm font-bold">ຜົນການຄົ້ນຫາຈາກເບີ: </span>
        <span class="text-sm font-semibold ml-1"
              style="max-width: 200px;">
          {{ selectedReceiverPhoneNumber || 'ບໍ່ມີຂໍ້ມູນ' }}</span>
      </div>
      <div class="separator h-full border-right-1 border-gray-300"></div>
      <div class="flex align-items-start">
        <i class="pi pi-map-marker mt-1 mr-2 text-blue-500"></i>
        <span class="text-sm font-medium">ທີ່ຢູ່: </span>
        <span
            class="text-sm font-semibold ml-1"
            style="max-width: 200px;">
          {{ selectedReceiverAddress || 'ບໍ່ມີຂໍ້ມູນ' }}
        </span>
      </div>
    </div>
    <div v-if="phoneError" class="error-message">
      {{ phoneError }}
    </div>
    <div v-if="isLoading" class="loading">
      ກຳລັງຄົ້ນຫາ...
    </div>
    <div v-if="!isLoading && searchedPhone && customerData && customerData.length > 0">
      <div v-if="!selectedReceiverPhoneNumber" class="searched-phone text-xl font-bold text-center">
        ຜົນການຄົ້ນຫາຈາກເບີ: {{ searchedPhone }}
      </div>
      <ScrollPanel style="width:100%;height: 400px; min-width: 650px">
        <ul class="p-0 pl-1 text-base">
          <li
              v-for="(item, index) in customerData"
              :key="index"
              class="cursor-pointer border-bottom-1 py-3 flex justify-content-between"
              style="list-style: none; font-size: 14px"
              :style="{
                maxHeight: props.excelSearch ? '650px' : '',
              }">
            <div @click.stop="copyToClipboard(item)">
              <span
                  class="bg-red-500 px-3 text-white border-round-2xl font-bold">{{ item.name }}</span>
              {{ item.detail }}
            </div>
            <div @click.stop="copyToClipboard(item)" class="cursor-pointer mr-2">
              <i v-if="props.excelSearch" style="font-size: 22px !important;" class="fas fa-save text-primary"></i>
              <i v-else style="font-size: 22px !important;" class="pi pi-copy text-primary"></i>
            </div>
          </li>
        </ul>
      </ScrollPanel>
    </div>

    <div v-if="(customerData?.length ?? 0) <= 0" class="p-scrollpanel p-component" data-v-a6cbb031=""
         style="width: 100%; height: 400px; min-width: 650px;">
      <div></div>
    </div>

  </div>
</template>

<script setup>
import {ref, watch} from 'vue'
import debounce from 'lodash/debounce'
import bodyHelper from "@/utils/body/index.js";
import {api} from "@/plugins/axios.js";
import {SearchOutlined} from "@ant-design/icons-vue";

const props = defineProps([
  'excelSearch',
  'selectedReceiverPhoneNumber',
  'selectedReceiverAddress'
]);

const emit = defineEmits(['close'])
const phoneQuery = ref('')
const searchedPhone = ref('')
const isLoading = ref(false)
const customerData = ref([])
const phoneError = ref('')

watch(phoneQuery, (newVal, oldVal) => {
  if (newVal && newVal !== oldVal) {
    phoneError.value = ''
  }
})

const debouncedSearch = debounce(() => {
  onPhoneSearch()
}, 500)

function onInputChange() {
  debouncedSearch()
}

function doSearchPhone(phoneNumber) {
  phoneQuery.value = `${phoneNumber}`;
  onPhoneSearch();
}

async function onPhoneSearch() {
  console.log("Phone"+phoneQuery.value)
  const trimmedPhone = phoneQuery.value.trim();
  const isDigits = /^\d+$/.test(trimmedPhone);
  console.log(trimmedPhone)

  if (!isDigits || trimmedPhone.length < 6 || trimmedPhone.length > 14) {
    phoneError.value = "ເບີຕ້ອງ 6-14 ຕົວເລກ.";
    customerData.value = [];
    return;
  }

  phoneError.value = '';
  isLoading.value = true;

  try {
    // const body = bodyHelper([
    //   { phone_number: trimmedPhone },
    //   { is_active: 'true' },
    // ]);

    const query = {
      phone_number:trimmedPhone,
      is_active:true,
    }

    const res = await api.get('v2/auth/customer/store/search-branches',{params:query});

    if (res?.data?.length) {
      customerData.value = res.data;
      searchedPhone.value = trimmedPhone;
    } else {
      phoneError.value = 'ບໍ່ພົບຂໍ້ມູນ.';
      customerData.value = [];
      searchedPhone.value = '';
    }
  } catch (e) {
    phoneError.value =
        e?.response?.data?.errors?.phone_number?.[0] ||
        'An unexpected error occurred. Please try again.';
    customerData.value = [];
    searchedPhone.value = '';
  } finally {
    isLoading.value = false;
  }
}


const copyToClipboard = (item) => {
  const formattedText = `${item.name} ${item.detail}`;
  navigator.clipboard.writeText(formattedText)
      .then(() => {
        // Optional notification
        console.log('Copied:', formattedText);
      })
      .catch((err) => {
        console.error('Copy failed', err);
      });
}

// Expose the ref and methods to parent components
defineExpose({
  doSearchPhone,
});

</script>

<style scoped>
.phone-search {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.input-group {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.ml-2 {
  margin-left: 0.5rem;
}

.error-message {
  color: red;
  margin-top: 0.25rem;
}

.searched-phone {
  margin: 0.5rem 0;
  font-size: 1rem;
  color: #333;
}

.loading {
  margin-top: 1rem;
  font-weight: bold;
}

.no-results {
  padding: 1rem;
  text-align: center;
  color: #555;
}
</style>
