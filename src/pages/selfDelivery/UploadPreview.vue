<template>
  <div class="py-2">
    <div class="mt-1 ml-2 min-h-screen">
      <table class="min-w-full border-collapse border">
        <thead>
        <tr>
          <th>ລໍາດັບ</th>
          <th>ເລກບິນຈາກລະບົບລູກຄ້າ</th>
          <th>ຊື່ຜູ້ຮັບ*</th>
          <th>ເບີຜູ້ຮັບ*</th>
          <th>ທີ່ຢູ່ຜູ້ຮັບ</th>
          <th>ສາຂາປາຍທາງ*</th>
          <th>ປະເພດພັດສະດຸ*</th>
          <th>ຊື່/ຫມວດຫມູ່ພັດສະດຸ*</th>
          <th>ຂະໜາດ(CM)*</th>
          <th>ນ້ຳໜັກ(KG)*</th>
          <th>ບໍລິການເສີມ</th>
          <th>ຄ່າສິນຄ້າ(COD)</th>
          <th>ໝາຍເຫດ</th>
          <th>ຄໍາສັ່ງ</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(groupItem, idx) in importExcelStore.groupedRows" :key="idx">
          <td class="font-bold">
            <div class="flex align-items-center">
              <span>{{ groupItem.data[0] }}</span>
              <i v-if="groupItem.isValid" class="pi pi-check-circle text-green-500 ml-1"></i>
            </div>
          </td>
          <td>
            <a-input v-model="groupItem.data[1]" class="h-1rem"/>
            <div v-if="groupItem.colErrors[1]" class="text-red-600" style="font-size: 11px;">
              {{ groupItem.colErrors[1] }}
            </div>
          </td>
          <td>
            <InputText v-model="groupItem.data[2]" class="h-1rem w-full w-8rem"/>
            <div v-if="groupItem.colErrors[2]" class="text-red-600 text-xs">
              {{ groupItem.colErrors[2] }}
            </div>
          </td>
          <td>
            <div class="flex items-center">
              <a-input v-model="groupItem.data[3]" class="h-1rem w-full w-8rem"/>
              <div class="flex align-items-center" style="cursor: pointer"
                   @click.stop="copyToClipboard(groupItem.data[3])">
                <i v-if="groupItem.data[3]" style="font-size: 18px !important;cursor: pointer"
                   class="pi pi-copy text-primary ml-2"></i>
              </div>
            </div>
            <div v-if="groupItem.colErrors[3]" class="text-red-600 text-xs">
              {{ groupItem.colErrors[3] }}
            </div>
          </td>
          <td style="min-width: 200px; max-width: 200px; white-space: pre-wrap;">
            {{ groupItem.data[4] }}
            <div v-if="groupItem.colErrors[4]" class="text-red-600 text-xs">
              {{ groupItem.colErrors[4] }}
            </div>
          </td>
          <td class="relative">
            <div class="flex items-center flex-column">
              <div class="max-width-td" v-if="groupItem.data[5]">
                <span>
                  {{ groupItem.data[5] }}
                            <CloseOutlined class="!text-red-600"
                                           @click="clearDestinationBranch(groupItem.rowIndex, $event)"
                                           style="font-size: 18px; color: #f44336; margin-top: 0px; margin-left: 8px; cursor: pointer"/>
                </span>
              </div>
              <div class="flex align-items-center">
                <div v-if="groupItem.colErrors[5]" class="text-red-600 text-xs">
                  {{ groupItem.colErrors[5] }}
                </div>
                <div @click="openModalSelectedBranchWithPhoneAndName(groupItem.data, groupItem.rowIndex)">
                  <FileSearchOutlined
                                 @click="clearDestinationBranch(groupItem.rowIndex, $event)"
                                      :style="{
                      'font-size': '18px',
                      'color': groupItem.data[5] ? 'dodgerblue' : '#f44336',
                      'margin-top': '0px',
                      'margin-left': '8px',
                      'cursor': 'pointer',
                  }"/>
                </div>
              </div>
            </div>
          </td>
          <td>
            <a-select
                v-model="groupItem.data[6]"
                optionLabel="name"
                optionValue="code"
                class="w-full w-7rem custom-select"
                :options="documentTypeOptions"
                placeholder="ເລືອກ"
            />
            <div v-if="groupItem.colErrors[6]" class="text-red-600 text-xs">
              {{ groupItem.colErrors[6] }}
            </div>
          </td>
          <td>
            <a-input v-model="groupItem.data[7]" class="h-1rem w-full w-9rem"/>
            <div v-if="groupItem.colErrors[7]" class="text-red-600 text-xs">
              {{ groupItem.colErrors[7] }}
            </div>
          </td>
          <td>
            <a-input v-model="groupItem.data[8]" class="h-1rem w-full w-4rem"/>
            <div v-if="groupItem.colErrors[8]" class="text-red-600 text-xs">
              {{ groupItem.colErrors[8] }}
            </div>
          </td>
          <td>
            <a-input v-model="groupItem.data[9]" class="h-1rem w-full w-4rem"/>
            <div v-if="groupItem.colErrors[9]" class="text-red-600 text-xs">
              {{ groupItem.colErrors[9] }}
            </div>
          </td>
          <td>
                        <a-select
                            v-model="groupItem.data[10]"
                            optionLabel="name"
                            optionValue="code"
                            class="w-full w-9rem custom-select"
                            :options="paymentTypeOptions"
                            placeholder="ເລືອກ"
                        />
            <div v-if="groupItem.colErrors[10]" class="text-red-600 text-xs">
              {{ groupItem.colErrors[10] }}
            </div>
          </td>
          <td>
            <a-input v-model="groupItem.data[11]" class="h-1rem"/>
            <div v-if="groupItem.colErrors[11]" class="text-red-600 text-xs">
              {{ groupItem.colErrors[11] }}
            </div>
          </td>
          <td>
            <a-input v-model="groupItem.data[12]" class="h-1rem"/>
            <div v-if="groupItem.colErrors[12]" class="text-red-600 text-xs">
              {{ groupItem.colErrors[12] }}
            </div>
          </td>
          <td class="text-center">
            <div class="w-4rem">
              <ConfirmPopup></ConfirmPopup>
              <a-button
                  class=" p-button-rounded p-button-danger p-button-sm delete-button"
                  @click="confirmDelete(groupItem.rowIndex, $event)"
                  aria-label="ລຶບ"
                  tooltip="ລຶບຂໍ້ມູນ"
              >
                <DeleteOutlined class="!text-red-600"/>
              </a-button>
            </div>
          </td>
        </tr>

        </tbody>
      </table>
    </div>

    <div class="flex justify-content-end border-top-1 surface-border pt-1">
      <a-button @click="importExcelStore.saveUploadedData"
                :class="{'opacity-50 cursor-not-allowed': !isFormValid, 'bg-blue-500': isFormValid}"
                class="base-height bg-green-500 px-4 py-2 border-none rounded text-white flex items-center"
                severity="primary">
        <template #default>
          <span v-if="!importExcelStore.isLoading">ບັນທຶກຂໍ້ມູນ</span>
          <span v-else-if="importExcelStore.isInitialImportProgress && importExcelStore.importValidateProgress === 0"
                class="flex items-center align-items-center">
              <i class="pi pi-spinner animate-spin mr-2"></i>
              ກໍາລັງກວດສອບ...</span>
          <span v-else-if="importExcelStore.isInitialImportProgress && importExcelStore.importValidateProgress < 100"
                class="flex items-center align-items-center">
              <i class="pi pi-spinner animate-spin mr-2"></i>
              {{ importExcelStore.importValidateProgress }}% ກວດສອບແລ້ວ
            </span>
          <span v-else-if="!importExcelStore.isInitialImportProgress && importExcelStore.importProgress < 100"
                class="flex items-center align-items-center">
              <i class="pi pi-spinner animate-spin mr-2"></i>
              {{ importExcelStore.importProgress }}% ກະກຽມສໍາເລັດ
            </span>
          <span v-else>{{ importExcelStore.isInitialImportProgress ? 'ກວດສອບຂັ້ນສຸດທ້າຍ' : 'ບັນທຶກຂໍ້ມູນ' }}...</span>
        </template>
      </a-button>
    </div>
  </div>


    <ModalSelectedBranchWithPhoneAndBranchName
        @setNewBranch="setNewBranch"
        @close="() => isVisibleSelectedBranchWithPhoneAndName = false"
        :selectedReceiverPhoneNumber="selectedReceiverPhoneNumber"
        :selectedReceiverAddress="selectedReceiverAddress"
        :isVisible="isVisibleSelectedBranchWithPhoneAndName"/>
</template>

<script setup>
import {computed, defineEmits, defineProps, onBeforeUnmount, onMounted, onUnmounted, ref, watch} from "vue";
import {useImportExcelStore} from "@/stores/parcel/useImportExcelStore";
import {Modal, notification, message} from 'ant-design-vue';
import {CloseOutlined,FileSearchOutlined,DeleteOutlined} from "@ant-design/icons-vue";
import ModalSelectedBranchWithPhoneAndBranchName from "@/components/modals/ModalSelectedBranchWithPhoneAndBranchName.vue"

import {useRouter} from 'vue-router';

const importExcelStore = useImportExcelStore();
const router = useRouter();
const computedGroupedRows = computed(() => importExcelStore.computedGroupedRows);

const emit = defineEmits(["change", 'success']);
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const selectedRowIndexForBranch = ref(null);
const selectedReceiverPhoneNumber = ref('');
const selectedReceiverAddress = ref('');

const isVisibleSelectedBranchWithPhoneAndName = ref(false)
const refModalError = ref(null);
const modalImportExcel = ref(false);

const showErrorDialog = ref(true);
const excelErrors = ref({
  column_names: [],
  rows: []
});

const isDirty = ref(false);

// Define document type options
const documentTypeOptions = ref([
  {name: 'ພັດສະດຸທົ່ວໄປ', code: 'ພັດສະດຸທົ່ວໄປ'},
  {name: 'ເອກະສານ', code: 'ເອກະສານ'},
]);

// Define payment type options
const paymentTypeOptions = ref([
  {name: 'ບໍ່ມີ', code: 'ບໍ່ມີ'},
  {name: 'CDC', code: 'CDC'},
  {name: 'COD', code: 'COD'},
  {name: 'CDC-COD', code: 'CDC-COD'},
  {name: 'ປະກັນໄພ', code: 'ປະກັນໄພ'},
  {name: 'COD-ປະກັນໄພ', code: 'COD-ປະກັນໄພ'}
]);
// Create a Map to store unwatch functions for each row keyed by a unique row identifier (e.g., rowIndex)
let rowWatchers = new Map();

function handleBeforeUnload(event) {
  if (!isDirty.value) {
    return;
  }
  event.preventDefault();
  event.returnValue = "ທ່ານຍັງບໍ່ໄດ້ບັນທຶກການປ່ຽນແປງ. ທ່ານແນ່ໃຈບໍທີ່ຈະອອກຈາກໜ້ານີ້?";
}

// Handle browser back/forward navigation
const handleLeavePage = () => {
  isDirty.value = false;
  isVisibleSelectedBranchWithPhoneAndName.value = false;
  setModalImportExcel(false);
  showErrorDialog.value = false;
};

// Using navigation guards
const unregisterGuard = router.beforeEach((to, from, next) => {
  if (from.path === '/parcel/shipment/status/out' && isDirty.value) {
    // Handle navigation away from this route
    const confirmNavigation = confirm('ທ່ານຍັງບໍ່ໄດ້ບັນທຶກການປ່ຽນແປງ. ທ່ານແນ່ໃຈບໍທີ່ຈະອອກຈາກໜ້ານີ້?');
    if (confirmNavigation) {
      handleLeavePage();
      next();
    } else {
      next(false);
    }
  } else {
    next();
  }
});

function confirmExcelModalClose() {
  // Ask for confirmation before closing
  if (isDirty.value && confirm('ທ່ານຍັງບໍ່ໄດ້ບັນທຶກການປ່ຽນແປງ. ທ່ານແນ່ໃຈບໍທີ່ຈະອອກຈາກໜ້ານີ້?')) {
    showErrorDialog.value = false;
  }
}

function openModalSelectedBranchWithPhoneAndName(data, rowIndex) {
  selectedRowIndexForBranch.value = rowIndex;
  isVisibleSelectedBranchWithPhoneAndName.value = true;
  selectedReceiverPhoneNumber.value = data[3];
  selectedReceiverAddress.value = data[4];
}

const copyToClipboard = (message) => {
  if (message) {
    navigator.clipboard.writeText(message)
        .then(() => {
          message.success({
            title: "ຄັດລອກຂໍ້ມູນສຳເລັດ",
            detail: "ການຄັດລອກຂໍ້ມູນ ສຳເລັດ."
          })
        })
        .catch((err) => {
          console.error('Failed to copy text: ', err)
        })
  }
}

function setNewBranch(branch) {
  updateData(selectedRowIndexForBranch.value, 5, branch?.name ?? branch);

  isVisibleSelectedBranchWithPhoneAndName.value = false;
  selectedRowIndexForBranch.value = null;
  selectedReceiverPhoneNumber.value = '';
  selectedReceiverAddress.value = '';
}

const clearDestinationBranch = (rowIndex) => {
  Modal.confirm({
    title: 'ຢືນຢັນການລຶບ',
    content: 'ທ່ານຕ້ອງການລຶບຂໍ້ມູນນີ້ແທ້ບໍ?',
    okText: 'ຢືນຢັນ',
    cancelText: 'ຍົກເລີກ',
    okType: 'danger',
    onOk() {
      updateData(rowIndex, 5, '');
    },
    onCancel() {
      // optional: handle cancel
    },
  });
};

function setModalImportExcel(isVisible) {
  modalImportExcel.value = isVisible;
  excelErrors.value = {column_names: [], rows: []};
  // Reset dirty fields
  isDirty.value = false;
  // Reset map watcher
  rowWatchers = new Map();
  emit("change", isVisible);
  importExcelStore.cleanup();
}

function showValidateDialogExcel() {
  showErrorDialog.value = true;
  isDirty.value = true;
  try {
    refModalError.value.maximizable = true;
  } catch (e) {
    console.log('showValidateDialogExcel: ', e);
  }
}

// Initialize groupedRows State
// importExcelStore.groupedRows = importExcelStore.computedGroupedRows;

// Function to confirm deletion of a row
const confirmDelete = (rowIndex) => {
  Modal.confirm({
    title: 'ຢືນຢັນການລຶບ',
    content: 'ທ່ານຕ້ອງການລຶບຂໍ້ມູນແຖວນີ້ແທ້ບໍ?',
    okText: 'ຢືນຢັນ',
    cancelText: 'ຍົກເລີກ',
    okType: 'danger',
    onOk() {
      deleteRow(rowIndex);
    },
    onCancel() {
      // Optional cancel logic
    },
  });
};


const deleteRow = (rowIndex) => {
  // Find the index of the row to delete
  const indexToRemove = importExcelStore.groupedRows.findIndex(row =>
      row.rowIndex === rowIndex
  );

  // Remove the item using splice if found (maintains reactivity better than filter)
  if (indexToRemove !== -1) {
    importExcelStore.groupedRows.splice(indexToRemove, 1);
    notification.success({
      message: "ສຳເລັດ!",
      description: `ທ່ານໄດ້ລຶບຂໍ້ມູນແຖວທີ ${rowIndex + 1} ສໍາເລັດແລ້ວ` || "ດາວໂຫຼດສສໍາເລັດ",
      placement: "topRight", // Show at top right
      duration: 3, // Auto close in 5 seconds
    });
  }
};


// 3. Create a method to update the data for a specific row and index
function updateData(rowIndex, columnIndex, value) {
  const row = importExcelStore.groupedRows.value.find(row => row.rowIndex === rowIndex);
  if (row) {
    // Create a new array to ensure Vue detects the change
    const newData = [...row.data];
    newData[columnIndex] = value;
    row.data = newData;
  }
}

// Computed property to check if the entire form is valid
const isFormValid = computed(() => {
  const rows = importExcelStore.groupedRows || [];
  if (rows.length === 0) return false;
  const validStates = rows.map(row => isRowValid(row));
  return validStates.every(valid => valid);
});

const validFormCount = computed(() => {
  if (importExcelStore.groupedRows.length === 0) return false;
  const validStates = importExcelStore.groupedRows.filter(row => row.isValid);
  return validStates.length;
});

const watchRowsData = () => {
  // Remove watchers for rows that no longer exist
  rowWatchers.forEach((unwatch, rowId) => {
    if (!importExcelStore.groupedRows.some(row => row.rowIndex === rowId)) {
      unwatch(); // Unregister the watcher
      rowWatchers.delete(rowId);
    }
  });

  // Register watchers for new rows that don't have a watcher yet
  importExcelStore.groupedRows.forEach(row => {
    if (!rowWatchers.has(row.rowIndex)) {
      // Create a watcher for row.data
      const unwatch = watch(
          () => row.data,
          () => {
            validateRow(row);
          },
          {deep: true}
      );
      rowWatchers.set(row.rowIndex, unwatch);
    }
  });
};

// form validation function

const validateRow = (row) => {
  // Set is dirty to true
  isDirty.value = true;
  // Clear errors if conditions are met
  const requiredIndices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12];

  // Special handling for index 11 (COD related field)
  if (row.data[10] && typeof row.data[10] === 'string' && row.data[10].includes('COD')) {
    // Index 11 is required if index 10 contains "COD"
    if (!row.data[11]) {
      row.colErrors[11] = 'ຕ້ອງການຂໍ້ມູນເມື່ອເລືອກ COD';
      row.isValid = false;
    } else if (row.colErrors[11]) {
      // Clear error if value exists
      row.colErrors[11] = '';
    }
  } else {
    // If index 10 does not contain "COD", clear any errors for index 11
    row.colErrors[11] = '';
  }

  // Handle other required fields
  for (const index of requiredIndices) {
    // Skip if no data or no error for this column
    if (!row.data[index] || !row.colErrors[index]) continue;

    // Clear error if there's no original data or if data has changed
    const hasOriginalData = !!row.origin_data[index];
    const dataHasChanged = hasOriginalData && row.data[index] !== row.origin_data[index];

    if (!hasOriginalData || dataHasChanged) {
      row.colErrors[index] = '';
    }
  }

  // After processing all validations, update the row's validity status
  row.isValid = isRowValid(row);
};

// Check if a row is valid
const isRowValid = (row) => {
  const hasErrors = row.colErrors && Object.values(row.colErrors).some((error) => {
        return error !== null && error !== undefined && error !== ''
      }
  );

  const requiredIndices = [2, 3, 5, 6, 7, 8, 9];
  const hasAllRequiredFields = requiredIndices.every(index => row.data[index]);
  return !hasErrors && hasAllRequiredFields;
};

watch(() => props.visible,
    (value) => {
      modalImportExcel.value = value;
      if (!value) {
        importExcelStore.cleanup();
      }
    },
    {deep: true}
);

// Watch the groupedRows array deeply to re-run watchRowsData when new rows are added/removed
watch(
    importExcelStore.groupedRows,
    () => {
      watchRowsData();
    },
    {deep: true}
);

watch(
    computedGroupedRows,
    (newGroupedRows) => {
      importExcelStore.groupedRows = newGroupedRows;
    },
    {deep: true}
);

onUnmounted(() => {
  importExcelStore.cleanup()
})

onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", handleBeforeUnload);
  unregisterGuard(); // Remove the navigation guard
});

onMounted(() => {
  console.log('Hi', importExcelStore.groupedRows?.length);
  console.log('beforeunload', handleBeforeUnload);
  window.addEventListener("beforeunload", handleBeforeUnload);
})

</script>

<style scoped lang="scss">

.p-button-sm.delete-button {
  font-size: 0.875rem;
  padding: 4px;
  height: 1.6rem !important;
  width: 1.6rem;
}

.input-excel {
  display: block;
  width: 100%;
  font-size: 0.875rem;
  color: #64748b;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.5rem;
}

.input-excel::file-selector-button {
  margin-right: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: #eff6ff;
  color: #1d4ed8;
  cursor: pointer;
}

.input-excel::file-selector-button:hover {
  background-color: #dbeafe;
}

.input-excel:focus {
  outline: none;
  box-shadow: 0 0 0 2px #3b82f6;
  border-color: #3b82f6;
}

table {
  width: 100%;
  border-collapse: collapse;
  white-space: nowrap;
  border: 1px solid #dddddd;
  font-size: 13px;
}

th, td {
  border: 1px solid #dddddd;
  padding: 4px;
}

.bg-red-50 {
  background-color: #fef2f2;
}

.fullscreen-dialog .p-dialog {
  width: 100vw !important;
  height: 100vh !important;
  top: 0 !important;
  left: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  border-radius: 0 !important;
  z-index: 10000 !important; /* Ensure it's on top */
}

.fullscreen-dialog .p-dialog-content {
  height: 100% !important;
  overflow: auto;
}

.max-width-td {
  min-width: 360px;
  word-wrap: break-word;
  white-space: pre-wrap;
}

</style>

