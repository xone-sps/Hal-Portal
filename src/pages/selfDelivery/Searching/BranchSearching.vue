<template>
  <div class="branch-search !w-full">
    <h2 class="text-xl">ຄົ້ນຫາດ້ວຍຊື່ສາຂາ</h2>
    <div class="w-full flex justify-content-center">
      <div class="w-12">
        <div class="formgrid grid text-base">
          <div class="field col-6 md:col-6 lg:col-6">
            <label for="province">ເລືອກແຂວງ</label>
            <a-select
                class="w-full"
                v-model="selectedProvince"
                :options="provinces"
                option-label="name"
                option-value="id"
                @change="handleChangeProvince"
                show-clear
                clear-icon="pi pi-times-circle"
                placeholder="ເລືອກແຂວງ"
            />
          </div>
          <div class="field col-6 md:col-6 lg:col-6">
            <label for="district">ເລືອກເມືອງ</label>
            <a-select
                v-model="selectedDistrict"
                show-clear
                class="w-full"
                :options="district"
                option-value="id"
                option-label="name"
                @change="handleChangeDistrict"
                clear-icon="pi pi-times-circle"
                placeholder="ເລືອກເມືອງ"
                :disabled="!selectedProvince"
            />
          </div>
          <div class="field col-12 md:col-12 lg:col-12">
            <label for="branch">ຄົ້ນຫາຕາມຊື່ສາຂາ</label>
            <InputText
                v-model="selectBranch"
                @input="filterBranch"
                placeholder="ປ້ອນຊື່ສາຂາ..."
                class="w-full"
            />
          </div>
        </div>
        <h3 class="p-0 m-0 mt-1 text-base">ລາຍຊື່ສາຂາ</h3>
        <divider/>
        <ScrollPanel v-if="!isLoading" style="width:100%;height: 400px; min-width: 650px">
          <ul class="p-0 pl-1 text-base mt-0">
            <li
                v-for="(item, index) in allBranches"
                :key="index"
                @click="handleSelectedBranch(item)"
                class="cursor-pointer border-bottom-1 py-3 flex justify-content-between"
                style="list-style: none; font-size: 14px"
                :style="{
                maxHeight: props.excelSearch ? '650px' : '',
              }">
              <div @click.stop="copyToClipboard(item)">
                <span
                    class="bg-red-500 px-3 text-white border-round-2xl font-bold">ສາຂາ.{{ item.name }}</span>
                | ຂ.{{ item.province?.name }} | ມ.{{ item.district?.name }} | ບ.{{ item.village?.name }} |
                ລະຫັດສາຂາ.{{ item.code }}
              </div>
              <div @click.stop="copyToClipboard(item)" class="cursor-pointer mr-2">
                <i v-if="props.excelSearch" style="font-size: 22px !important;" class="fas fa-save text-primary"></i>
                <i v-else style="font-size: 22px !important;" class="pi pi-copy text-primary"></i>
              </div>
            </li>
          </ul>
        </ScrollPanel>
        <div v-if="allBranches.length <= 0" class="p-scrollpanel p-component" data-v-a6cbb031=""
             style="width: 100%; height: 400px; min-width: 650px;">
          <div></div>
        </div>
        <SkeletonSearchBranch v-if="isLoading"/>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { api } from '@/plugins/axios';

const emit = defineEmits(['change', 'selectedStartBranch'])
const props = defineProps(['excelSearch'])
const branchQuery = ref('')
const allBranches = ref([])
const allBranchesOriginal = ref([])
const provinces = ref([])
const selectedProvince = ref(null)
const allDistrict = ref([])
const district = ref([])
const selectedDistrict = ref(null)
const selectBranch = ref('')
const isLoading = ref(false)

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('branchDB', 1)
    request.onupgradeneeded = e => {
      const db = e.target.result
      if (!db.objectStoreNames.contains('branches')) {
        const objectStore = db.createObjectStore('branches', {keyPath: 'id', autoIncrement: true})
        objectStore.createIndex('name', 'name', {unique: false})
      }
    }
    request.onsuccess = e => {
      resolve(e.target.result)
    }
    request.onerror = e => {
      reject(e)
    }
  })
}

function getBranchesFromIndexedDB() {
  return new Promise(async (resolve) => {
    const db = await openDB()
    const transaction = db.transaction('branches', 'readonly')
    const store = transaction.objectStore('branches')
    const getAllReq = store.getAll()
    getAllReq.onsuccess = () => {
      resolve(getAllReq.result)
    }
    getAllReq.onerror = () => {
      resolve([])
    }
  })
}

function storeBranchesInIndexedDB(data) {
  openDB().then(db => {
    const transaction = db.transaction('branches', 'readwrite')
    const store = transaction.objectStore('branches')
    store.clear().onsuccess = () => {
      data.forEach(item => {
        store.put(item)
      })
    }
  })
}

function handleChangeProvince(province) {
  if (province && province.value) {
    selectedDistrict.value = null
    district.value = []
    selectBranch.value = ''
    allBranches.value = []
    allBranchesOriginal.value = []
    const provinceId = province.value
    listingBranch(provinceId)
    getAllBranch(provinceId, null)
  } else {
    selectedDistrict.value = null
    district.value = allDistrict.value
    selectBranch.value = ''
    allBranches.value = allBranchesOriginal.value = []
    getAllBranch(null, null)
  }
}

function handleChangeDistrict(event) {
  const districtId = event.value
  const provinceId = selectedProvince.value
  getAllBranch(provinceId, districtId)
}

const copyToClipboard = (branch) => {
  const formattedText = `ສາຂາ.${branch.name} | ຂ.${branch?.province?.name} | ມ.${branch?.district?.name} | ບ.${branch?.village?.name} | ລະຫັດສາຂາ.${branch?.code}`
  navigator.clipboard.writeText(formattedText).then(() => {
    messageSuccess({title: 'ຄັດລອກຂໍ້ມູນສຳເລັດ', detail: 'ການຄັດລອກຂໍ້ມູນ ສຳເລັດ.'})
  })
  if (props.excelSearch) {
    emit('close', formattedText)
  }
}

async function getAllBranch(provinceId = null, districtId = null) {
  isLoading.value = true
  try {
    const res = await api.post('v1/listing/branches', {
      is_active: 'true',
      ...(provinceId && { province: provinceId }),
      ...(districtId && { district: districtId })
    });
    allBranchesOriginal.value = res.data
    allBranches.value = res.data
    storeBranchesInIndexedDB(res.data)
  } catch (error) {
    console.error('Get branch error:', error)
  } finally {
    isLoading.value = false
  }
}

async function listingBranch(provinceId = null) {
  try {
    const res = await api.post('filter-branch', {
      ...(provinceId && { province_id: provinceId })
    });
    provinces.value = res.data.provinces;
    allDistrict.value = res.data.districts;
    district.value = provinceId
        ? allDistrict.value.filter(item => item.province_id === provinceId)
        : allDistrict.value;
  } catch (error) {
    console.error('Filter branch error:', error)
  }
}

function filterBranch() {
  const query = selectBranch.value.trim().toLowerCase()
  if (query === '') {
    allBranches.value = allBranchesOriginal.value
  } else {
    allBranches.value = allBranchesOriginal.value.filter(branch =>
        branch.name.toLowerCase().includes(query)
    )
  }
}

function handleSelectedBranch(branch) {
  emit('selectedStartBranch', branch)
}

onMounted(async () => {
  const indexedData = await getBranchesFromIndexedDB()
  if (indexedData && indexedData.length > 0) {
    allBranchesOriginal.value = indexedData
    allBranches.value = indexedData
  } else {
    await getAllBranch()
  }
  listingBranch()
})
</script>


<style scoped>
.branch-search {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.mt-2 {
  margin-top: 0.5rem;
}
</style>

