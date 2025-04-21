<template>
  <a-drawer
      :visible="modelValue"
      :width="680"
      placement="right"
      :closable="false"
  >
    <template #title>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <a-avatar size="small" class="!bg-orange-600 text-white font-bold">S</a-avatar>
          <h3 class="text-lg font-semibold">{{ title || 'ເພີ່ມຜູ້ຮັບ' }}</h3>
        </div>
        <CloseOutlined class="cursor-pointer" @click="handleCancel"/>
      </div>
    </template>

    <!-- Form -->
    <div class="">
      <a-form layout="horizontal" ref="formRef" :model="form" :rules="rules">
        <!-- Receiver Info -->
        <div class="flex items-center gap-3">
          <!-- Avatar -->
          <a-avatar size="small" class="u-receiver text-white font-bold">R</a-avatar>

          <!-- Name and Edit Option -->
          <div class="flex items-center gap-2">
            <h3 class="text-lg font-semibold">ຂໍ້ມູນຜູ້ຮັບ</h3>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-2 mt-1">
          <a-form-item label="ຊື່" name="receiverName">
            <a-input placeholder="ຊື່ຜູ້ສົ່ງ" v-model:value="form.receiverName"/>
          </a-form-item>
          <a-form-item label="ເບີໂທ" class="!pl-2" name="combinedPhone">
            <a-input-group compact>
              <a-select v-model:value="prefixPhone" class="custom-select-phone">
                <a-select-option value="020">020</a-select-option>
                <a-select-option value="030">030</a-select-option>
              </a-select>
              <a-input
                  v-model:value="receiverPhone"
                  type="tel"
                  :maxlength="8"
                  style="width:190px;"
                  placeholder="ເບີໂທ"
              />
            </a-input-group>
          </a-form-item>
        </div>
        <a-form-item label="ທີ່ຢູ່ຜູ້ສົ່ງ" name="receiverAddress">
          <a-input placeholder="ທີ່ຢູ່ຜູ້ສົ່ງ" v-model:value="form.receiverAddress"/>
        </a-form-item>
        <div class="">
          <a-checkbox value="1" name="type">ບັນທຶກຂໍ້້ມູນຜູ້ຮັບ</a-checkbox>
        </div>

        <div class="flex items-center gap-3 !my-6">
          <!-- Avatar -->
          <img :src="box_fill" alt="Open Box Icon" class="w-6 h-6"/>
          <!-- Parcel info -->
          <div class="flex items-center">
            <h3 class="text-lg font-semibold">ຂໍ້ມູນພັດສະດຸ</h3>
          </div>
        </div>

        <div class="items-center !mb-2">
          <div class="!py-1">
            <a-form-item label="ປະເພດພັສະດຸ" name="parcelType">
              <a-radio-group v-model:value="form.parcelType" @change="parcelTypeChange">
                <a-radio value="parcel">ພັດສະດຸທົ່ວໄປ</a-radio>
                <a-radio value="envelope">ເອກະສານ</a-radio>
              </a-radio-group>
            </a-form-item>
          </div>
          <!--           if document type-->
          <a-form-item v-if="form.parcelType =='envelope'" label="ປະເພດເອກະສານ" class="w-full" name="documentSizeValue">
            <a-select
                v-model:value="form.documentSizeValue"
                :options="documentType"
                :filter-option="filterOptionDocumentSize"
                placeholder="ເລືອກປະເພດເອກະສານ"
                allow-clear
                tree-default-expand-all
                class="w-full custom-select"
                show-search
            />
          </a-form-item>
          <div class="">
            <a-form-item label="ບໍລິການເສີມ">
              <div class="flex">
                <div class="pr-6">
                  <a-checkbox v-model:checked="checkCDC">
                    CDC
                    <p class="text-xs">ເກັບຄ່າຂົນສົ່ງປາຍທາງ</p>
                  </a-checkbox>
                </div>
                <div class="pr-6" v-if="form.parcelType !=='envelope'">
                  <a-checkbox v-model:value="form.codValue" @change="codChange">
                    COD
                    <p class="text-xs">ເກັບຄ່າເຄື່ອງປາຍທາງ</p>
                  </a-checkbox>
                </div>
                <div class="pr-6" v-if="form.parcelType !=='envelope'">
                  <a-checkbox v-model:value="form.insuranceValue">
                    ປະກັນໄພ
                    <p class="text-xs">ຄຸມຄອງພັດສະດຸຂອງທ່ານ</p>
                  </a-checkbox>
                </div>
              </div>
            </a-form-item>
          </div>
        </div>
        <a-form-item label="ມູນຄ່າພັດສະດຸ" name="parcelWeight" v-if="codStatus">
          <a-input-number placeholder="ມູນຄ່າພັດສະດຸ"
                          type="number" style="width: 100%"
                          :min="0"
                          :max="5" v-model:value="form.parcelPrice"/>
        </a-form-item>
        <div class="flex items-center">
          <!-- Origin Branch Select -->
          <a-form-item label="ສາຂາຕົ້ນທາງ" class="w-full !mr-2" name="originBranchValue">
            <a-select v-model:value="form.originBranchValue" placeholder="ເລືອກສາຂາຕົ້ນທາງ" show-search
                      :options="manageOrderStore.originBranches"
                      :filter-option="filterOptionOriginBranch"
                      class="w-full custom-select"
            ></a-select>
          </a-form-item>

          <!-- Centered Arrow Icon with Reduced Space -->
          <!--          <div class="justify-center arrow-button px-2">-->
          <!--            <a-avatar size="default" class="custom-avatar !bg-red-500 flex items-center justify-center">-->
          <!--              <ArrowRightOutlined class="text-white text-base"/>-->
          <!--            </a-avatar>-->
          <!--          </div>-->

          <!-- Destination Branch Select -->
          <a-form-item label="ສາຂາປາຍທາງ" class="w-full" name="destinationBranchValue">
            <a-select v-model:value="form.destinationBranchValue" placeholder="ເລືອກສາຂາປາຍທາງ" show-search
                      :options="manageOrderStore.destinationBranches"
                      :filter-option="filterOptionDestinationBranch"
                      class="w-full custom-select"
            ></a-select>
          </a-form-item>
        </div>
        <div class="!mt-4">
          <div class="flex items-center">
            <a-form-item label="ເລືອກປະເພດພັດສະດຸ" class="w-full !mr-2" name="parcelCategoryValue">
              <a-select
                  v-model:value="form.parcelCategoryValue"
                  placeholder="ເລືອກປະເພດພັດສະດຸ"
                  :options="manageOrderStore.parcelCategories"
                  :filter-option="filterOptionCategory"
                  show-search
                  class="w-full custom-select"
              ></a-select>
            </a-form-item>
          </div>
          <a-form-item label="ກວ້າງ + ສູງ + ຍາວ" name="parcelDimensions">
            <a-input-number placeholder="ກວ້າງ + ສູງ + ຍາວ" :min="0"
                            type="number"
                            :max="10000" style="width: 100%" v-model:value="form.parcelDimensions" class="custom-select"/>
          </a-form-item>
          <a-form-item label="ນໍ້າໜັກ (kg)" name="weight">
            <a-input-number placeholder="ນໍ້າໜັກ (kg)"
                            type="number"
                            :min="0"
                            :max="1000"
                            style="width: 100%"
                            v-model:value="form.weight" @keydown.enter="calculateFreight"  @change="calculateFreight"/>
          </a-form-item>
          <div class="" v-if="preview.freight">
            <p class="text-red-600 font-bold text-2xl">ຄ່າຂົນສົ່ງ: {{ preview.freight.toLocaleString() || '-' }} LAK</p>
          </div>
        </div>
      </a-form>
    </div>
    <!-- Footer -->
    <template #footer class="custom-drawer">
      <div class="flex justify-end gap-3">
        <a-button @click="handleCancel" type="primary" class="w-full">ຍົກເລີກ</a-button>
        <a-button @click="resetForm" type="primary" class="!bg-red-500 w-full text-white">ເຄຍຂໍ້ມູນ</a-button>
        <a-button type="primary" class="export-button w-full" @click="submitOrder">ເພີ່ມບິນ</a-button>
      </div>
    </template>
<!--Notify Success Orders-->
<!--    <a-modal v-model:open="isModalOpen" :footer="null" title="ສ້າງບິນຂົນສົ່ງລ່ວງໜ້າ" centered :maskClosable="false"-->
<!--             :closable="true">-->
<!--      <div class="divider"></div>-->
<!--      <div class="p-2">-->
<!--        <div class="flex flex-col items-center text-center p-6">-->
<!--          <CheckCircleOutlined class="!text-green-600 text-5xl !mb-4"/>-->
<!--          <div class="flex items-center">-->
<!--            &lt;!&ndash; Origin Branch Select &ndash;&gt;-->

<!--            <p class="text-gray-500 text-sm"> {{ selectedOriginBranch?.label || '-' }}</p>-->
<!--            &lt;!&ndash; Centered Arrow Icon with Reduced Space &ndash;&gt;-->
<!--            <div class="flex justify-center arrow-button">-->
<!--              <a-avatar size="default" class="custom-avatar !bg-red-500 flex items-center justify-center">-->
<!--                <ArrowRightOutlined class="text-white text-base"/>-->
<!--              </a-avatar>-->
<!--            </div>-->

<!--            &lt;!&ndash; Destination Branch Select &ndash;&gt;-->
<!--            <p class="text-gray-500 text-sm"> {{ selectedDestinationBranch?.label || '-' }}</p>-->
<!--          </div>-->
<!--          <div class="text-center">-->
<!--            <p class="text-gray-500 text-sm !my-2">ຄ່າຂົນສົ່ງ</p>-->
<!--            <p class="text-red-600 font-bold text-2xl">{{ preview.freight.toLocaleString() || '-' }} LAK</p>-->
<!--          </div>-->

<!--          <div class="dashed-line"></div>-->
<!--          <div class="space-y-2 flex justify-between">-->
<!--            <p>COD: </p>-->
<!--            <p class="mt-2 text-gray-700">0 %</p>-->
<!--          </div>-->

<!--          &lt;!&ndash; Receive Date &ndash;&gt;-->
<!--          <div class="mt-4 space-y-2 flex justify-between rounded-lg bg-gray-100">-->
<!--            <WarningOutlined class="text-center p-3"/>-->
<!--            <p class="p-3 text-gray-500 text-center">ທ່ານຈະໄດ້ຮັບເຄື່ອງພາຍໃນ</p>-->
<!--            <div class="p-3 font-semibold text-center">-->
<!--              2-5 ວັນ-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <a-button-->
<!--            type="primary"-->
<!--            block-->
<!--            class="!mt-6 !bg-red-600 !text-white !text-lg w-full !h-10"-->
<!--            @click="submitOrder"-->
<!--        >-->
<!--          ຢືນຢັນສ້າງບິນ-->
<!--        </a-button>-->
<!--      </div>-->
<!--    </a-modal>-->

  </a-drawer>
</template>

<script setup lang="ts">
import {CloseOutlined} from '@ant-design/icons-vue';
import {computed, onMounted, ref} from "vue";
import {notification} from "ant-design-vue";
import {validationRules} from "@/utils/validationRules";
import box_fill from "@/assets/icons/box-fill.svg";
import {useManageOrderStore} from "@/stores/parcel/manageOrderStore";
import {useOutboundParcelStore} from "@/stores/parcel/outboundStore";
import {debounce} from 'lodash';
import dayjs, {Dayjs} from "dayjs";

const manageOrderStore = useManageOrderStore();
const outboundStore = useOutboundParcelStore();
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: ''
  }
});

const formRef = ref();
const rules = ref(validationRules);
const startDate = ref<Dayjs>(dayjs().subtract(3, 'month'));
const endDate = ref<Dayjs>(dayjs());
const emit = defineEmits(['update:modelValue', 'confirm']);


const form = ref({
  senderName: "",
  senderPhone: "",
  senderAddress: "",
  receiverName: "",
  receiverPhone: "",
  receiverAddress: "",
  packageType: "",
  selectedServices: [],
  shipmentPayType: "origin_freight_fees",
  originBranchValue: null,
  destinationBranchValue: null,
  parcelType: "parcel",
  originBranch: [],
  documentSizeValue: null,
  parcelCategoryValue: null,
  parcelDimensions: "",
  weight: "",
  codValue: "origin_freight_fees_cod",
  insuranceValue: "",
  parcelPrice: "",
});
const codStatus = ref(false);
const isModalOpen = ref(false);
const prefixPhone = ref<string>('020');
const receiverPhone = ref<string>('');
const documentType = ref([
  {value: "A3", label: "A3"},
  {value: "A4", label: "A4"},
  {value: "A5", label: "A5"},
]);
const preview = ref({});
const selectedOriginBranch = computed(() => {
  return manageOrderStore.destinationBranches.find(
      (branch) => branch.value === form.value.originBranchValue
  );
});
const selectedDestinationBranch = computed(() => {
  return manageOrderStore.destinationBranches.find(
      (branch) => branch.value === form.value.destinationBranchValue
  );
});
const filterOptionDocumentSize = (input: string, option: any) => {
  return option.label.toLowerCase().includes(input.toLowerCase());
};
const filterOptionOriginBranch = (input: string, option: any) => {
  return option.label.toLowerCase().includes(input.toLowerCase());
};
const filterOptionDestinationBranch = (input: string, option: any) => {
  return option.label.toLowerCase().includes(input.toLowerCase());
};
const filterOptionCategory = (input: string, option: any) => {
  return option.label.toLowerCase().includes(input.toLowerCase());
};

const handleOk = () => {
  emit('confirm'); // Emit confirm event
  emit('update:modelValue', false); // Close the modal
};

const handleCancel = () => {
  form.value = {
    senderName: "",
    senderPhone: "",
    senderAddress: "",
    receiverName: "",
    receiverPhone: "",
    receiverAddress: "",
    packageType: "",
    selectedServices: [],
    shipmentPayType: "origin_freight_fees",
    originBranchValue: null,
    destinationBranchValue: null,
    parcelType: "",
    originBranch: [],
    documentSizeValue: null,
    parcelCategoryValue: null,
    parcelDimensions: "",
    weight: "",
    codValue: "origin_freight_fees_cod",
    insuranceValue: "",
    parcelPrice: "",
  };
  receiverPhone.value = '';
  emit('update:modelValue', false); // Close the modal
};
const errorMessage = ref<string | null>(null);

const parcelTypeChange = (value) => {
  if (value.target.value) {
    form.value.parcelType = value.target.value;
    form.value.documentSizeValue = null;
  } else {
    form.value.parcelType.value = 'parcel';
  }
}

const codChange = (value) => {
  if (value.target.checked == true) {
    codStatus.value = true;
  } else {
    form.value.parcelPrice = '';
    codStatus.value = false;
  }
}
const checkCDC = computed({
  get: () => form.value.shipmentPayType === 'destination_freight_fees',
  set: (value) => {
    form.value.shipmentPayType = value ? 'destination_freight_fees' : 'origin_freight_fees';
  }
});

const calculateFreight = debounce(async () => {
  if (form.value.weight) {
  await submitForm();
  }
}, 300);
const submitForm = async () => {
  try {
    await formRef.value.validate();
    // ✅ Map form values to store parameters
    const payload = {
      weight: form.value.weight || 0,
      dimensionLength: form.value.parcelDimensions || null,
      parcelSize: form.value.documentSizeValue || null,
      startBranchId: form.value.originBranchValue || null,
      endBranchId: form.value.destinationBranchValue || null,
      calculateType: form.value.parcelType === 'document' ? 'document' : 'parcel',
      shipmentPayType: form.value.shipmentPayType || 'origin_freight_fees',
    };
    const result = await manageOrderStore.calculateFreight(payload);
    preview.value = result;
    isModalOpen.value = true;
  } catch (error) {
    if (error.response?.data) {
      // Extract message from response
      const errorMessage = error.response.data.message || "ກະລຸນາກວດຄືນຂໍ້ມູນຂອງທ່ານ";
      // Extract validation errors
      const validationErrors = Object.values(error.response.data.errors || {})
          .flat()
          .filter((err) => err !== errorMessage) // ✅ Filter out duplicate messages
          .join(', ');
      const fullErrorMessage = validationErrors
          ? `${errorMessage}: ${validationErrors}`
          : errorMessage;
      notification.error({
        message: "ຜິດພາດ!",
        description: fullErrorMessage,
        placement: "topRight",
        duration: 5, // Auto close in 5 seconds
      });
    } else {
      // Fallback message if no response is available
      notification.error({
        message: "ຜິດພາດ!",
        description: "ກະລຸນາກວດຄືນຂໍ້ມູນຂອງທ່ານ",
        placement: "topRight",
        duration: 5,
      });
    }
  } finally {
    isModalOpen.value = false;
  }
};

const submitOrder = async () => {
  try {
    const orderData = {
      sender_branch_id: form.value.originBranchValue,
      receive_branch_id: form.value.destinationBranchValue,
      receiver: {
        full_name: form.value.receiverName,
        phone_number: `${receiverPhone.value}`,
        location: form.value.receiverAddress,
      },
      payment_gateway: 'BCEL_ONE',
      shipment_pay_type: form.value.shipmentPayType,
      shipment_type: "express",
      parcel_type: form.value.parcelType,
      pieces: 1,
      parcels: [
        {
          size: null,
          category_id: form.value.parcelCategoryValue,
          dimension_length: JSON.parse(form.value.parcelDimensions),
          weight: JSON.parse(form.value.weight),
          price: form.value.parcelPrice,
          insurance_price: form.value.insuranceValue ? form.value.insuranceValue : null,
          freight: JSON.parse(manageOrderStore.packages.freight)
        }
      ]
    }
    const result = await manageOrderStore.createOrder(orderData);
    notification.success({
      message: 'Order Created',
      description: `Order ${result.shipment_number} created successfully!`,
      duration: 2
    });
    isModalOpen.value = false;
    await outboundStore.fetchOutboundData({
      status: 'pending',
      startDate: startDate.value || '',
      endDate: endDate.value || ''
    });
  } catch (error) {
    if (error.response?.data) {
      // Extract message from response
      const errorMessage = error.response.data.message || "ກະລຸນາກວດຄືນຂໍ້ມູນຂອງທ່ານ";
      // Extract validation errors
      const validationErrors = Object.values(error.response.data.errors || {})
          .flat()
          .filter((err) => err !== errorMessage) // ✅ Filter out duplicate messages
          .join(', ');
      const fullErrorMessage = validationErrors
          ? `${errorMessage}: ${validationErrors}`
          : errorMessage;
      notification.error({
        message: "ຜິດພາດ!",
        description: fullErrorMessage,
        placement: "topRight",
        duration: 5, // Auto close in 5 seconds
      });
    } else {
      // Fallback message if no response is available
      notification.error({
        message: "ຜິດພາດ!",
        description: "ກະລຸນາກວດຄືນຂໍ້ມູນຂອງທ່ານ",
        placement: "topRight",
        duration: 5,
      });
    }
  }
}

const debouncedFreight = debounce(async () => {
  if (searchQuery.value.trim()) {
    await inboundStore.fetchInboundData({
      status: 'arrived_status',
      query: searchQuery.value.trim(),
    });
  }
}, 300);

const combinedPhone = computed(() => {
  if (receiverPhone.value) {
    return `${prefixPhone.value}${receiverPhone.value}`;
  }
  return '';
});

const resetForm = () => {
  form.value = {
    senderName: "",
    senderPhone: "",
    senderAddress: "",
    receiverName: "",
    receiverPhone: "",
    receiverAddress: "",
    packageType: "",
    selectedServices: [],
    shipmentPayType: "origin_freight_fees",
    originBranchValue: null,
    destinationBranchValue: null,
    parcelType: "",
    originBranch: [],
    documentSizeValue: null,
    parcelCategoryValue: null,
    parcelDimensions: "",
    weight: "",
    codValue: "origin_freight_fees_cod",
    insuranceValue: "",
    parcelPrice: "",
  };
  receiverPhone.value = '';
  preview.value = '',
  notification.success({
    message: "Success!",
    description: "Form has been cleared.",
    placement: "topRight",
    duration: 2,
  });
};

const closeModal = () => {
  this.modelValue.value = false;
};
onMounted(async () => {
      await manageOrderStore.fetchFilterBranch();
      await manageOrderStore.fetchOriginBranch();
      await manageOrderStore.fetchParcelCategory();
    }
)
</script>

<style scoped>
.custom-drawer .ant-drawer .ant-drawer-footer {
  border-top: none;
}
</style>
