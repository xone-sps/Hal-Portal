<template>
  <div class="px-2">
    <!-- Header Section -->
    <div class="mb-2">
      <a-card class="custom-card">
        <div class="flex justify-between items-center">
          <!-- Sender Info -->
          <div class="flex items-center gap-3">
            <!-- Avatar -->
            <a-avatar size="small" class="!bg-red-500 text-white font-bold"
              >S</a-avatar
            >

            <!-- Name and Edit Option -->
            <div class="flex items-center gap-2">
              <p class="text-lg font-semibold">ຜູ້ສົ່ງ</p>
              <span class="text-blue-500 cursor-pointer flex items-center">
                <EditOutlined class="!mr-1" /> ແກ້ໄຂຂໍ້ມູນ
              </span>
            </div>
          </div>
          <!-- Save Button -->
          <a-button
            type="default"
            class="!flex !items-center !gap-2 !bg-gray-100"
          >
            <SaveOutlined />
            <span>ບັນທຶກໄວ້</span>
          </a-button>
        </div>

        <!-- Sender Details -->
        <div class="mt-4 space-y-2">
          <div class="flex">
            <p class="text-gray-500 w-24">ຊື່</p>
            <p class="font-semibold">{{ profile?.userName || "No Name" }}</p>
          </div>
          <div class="flex">
            <p class="text-gray-500 w-24">ເບີໂທລະສັບ</p>
            <p class="font-semibold">{{ profile?.userTel || "N/A" }}</p>
          </div>
          <div class="flex">
            <p class="text-gray-500 w-24">ທີ່ຢູ່</p>
            <p class="font-semibold">
              {{ profile?.userProfile?.addresss || "N/A" }}
            </p>
          </div>
        </div>
      </a-card>
    </div>

    <!-- Form Section -->
    <a-form layout="vertical" ref="formRef" :model="form" :rules="rules">
      <a-card class="!mb-3 custom-card">
        <!-- Receiver Info -->
        <div class="flex items-center gap-3">
          <!-- Avatar -->
          <a-avatar size="small" class="u-receiver text-white font-bold"
            >R</a-avatar
          >

          <!-- Name and Edit Option -->
          <div class="flex items-center gap-2">
            <h3 class="text-lg font-semibold">ຂໍ້ມູນຜູ້ຮັບ</h3>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-2 mt-4">
          <a-form-item label="ຊື່" name="receiverName" class="!mr-2">
            <a-input
              placeholder="ຊື່ຜູ້ຮັບ"
              v-model:value="form.receiverName"
            />
          </a-form-item>

          <a-form-item label="ເບີໂທ" name="receiverPhone">
            <a-input-group compact>
              <!-- Prefix Select -->
              <a-form-item-rest>
                <a-select v-model:value="prefixPhone" style="width: 80px">
                  <a-select-option value="020">020</a-select-option>
                  <a-select-option value="030">030</a-select-option>
                </a-select>
              </a-form-item-rest>

              <!-- Phone Number Input -->
              <a-input
                v-model:value="form.receiverPhone"
                :maxlength="8"
                style="width:85%"
                placeholder="ເບີໂທ"
              />
            </a-input-group>
          </a-form-item>

          <a-form-item label="ທີ່ຢູ່ຜູ້ຮັບ" name="receiverAddress">
            <a-input
              placeholder="ທີ່ຢູ່ຜູ້ຮັບ"
              v-model:value="form.receiverAddress"
            />
          </a-form-item>
        </div>
        <div>
          <a-checkbox v-model:checked="isReceiverInfoSaved" name="type"
            >ບັນທຶກຂໍ້້ມູນຜູ້ຮັບ</a-checkbox
          >
        </div>
      </a-card>

      <div class="flex items-center gap-3 !mb-1">
        <!-- Avatar -->
        <img :src="box_fill" alt="Open Box Icon" class="w-6 h-6" />
        <!-- Parcel info -->
        <div class="flex items-center">
          <h3 class="text-lg font-semibold">ຂໍ້ມູນພັດສະດຸ</h3>
        </div>
      </div>

      <div class="flex justify-between items-center !mb-2">
        <div class="w-2/5">
          <a-card class="!mr-2 custom-card !py-1">
            <div>
              <a-form-item label="ປະເພດພັສະດຸ" name="parcelType">
                <a-radio-group
                  v-model:value="form.parcelType"
                  @change="parcelTypeChange"
                >
                  <a-radio value="parcel">ພັດສະດຸທົ່ວໄປ</a-radio>
                  <a-radio value="envelope">ເອກະສານ</a-radio>
                </a-radio-group>
              </a-form-item>
            </div>
          </a-card>
        </div>
        <div class="w-3/5">
          <a-card class="custom-card">
            <a-form-item label="ບໍລິການເສີມ">
              <div class="flex">
                <div class="pr-6">
                  <a-checkbox
                    v-model:checked="checkCDC"
                    @change="updateShipmentPayType"
                    >CDC
                    <p class="text-xs">ເກັບຄ່າຂົນສົ່ງປາຍທາງ</p>
                  </a-checkbox>
                </div>
                <div class="pr-6" v-if="form.parcelType !== 'envelope'">
                  <a-checkbox
                    v-model:checked="checkCOD"
                    @change="updateShipmentPayType"
                  >
                    COD
                    <p class="text-xs">ເກັບຄ່າເຄື່ອງປາຍທາງ</p>
                  </a-checkbox>
                </div>
                <div class="pr-6" v-if="form.parcelType !== 'envelope'">
                  <a-checkbox
                    v-model:checked="insuranceValue"
                    @change="insuranceChange"
                  >
                    ປະກັນໄພ
                    <p class="text-xs">ຄຸມຄອງພັດສະດຸຂອງທ່ານ</p>
                  </a-checkbox>
                </div>
              </div>
            </a-form-item>
          </a-card>
        </div>
      </div>

      <a-card class="!mb-2 custom-card">
        <a-form-item
          v-if="form.parcelType == 'envelope'"
          label="ປະເພດເອກະສານ"
          class="w-full"
          name="documentSizeValue"
        >
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
        <a-form-item label="ລາຄາສິນຄ້າ" name="parcelPrice" v-if="checkCOD">
          <a-input-number
            placeholder="ລາຄາສິນຄ້າ"
            type="number"
            style="width: 100%"
            :min="0"
            :max="10000000"
            v-model:value="form.parcelPrice"
          />
        </a-form-item>
        <div class="flex items-center">
          <!-- Origin Branch Select -->
          <a-form-item
            label="ສາຂາຕົ້ນທາງ"
            class="w-full"
            name="originBranchValue"
          >
            <a-select
              v-model:value="form.originBranchValue"
              placeholder="ເລືອກສາຂາຕົ້ນທາງ"
              show-search
              :options="manageOrderStore.originBranches"
              :filter-option="filterOptionOriginBranch"
              class="w-full custom-select"
            ></a-select>
          </a-form-item>

          <!-- Centered Arrow Icon with Reduced Space -->
          <div class="flex justify-center arrow-button">
            <a-avatar
              size="default"
              class="custom-avatar !bg-red-500 flex items-center justify-center"
            >
              <ArrowRightOutlined class="text-white text-base" />
            </a-avatar>
          </div>

          <!-- Destination Branch Select -->
          <a-form-item
            label="ສາຂາປາຍທາງ"
            class="w-full"
            name="destinationBranchValue"
          >
            <a-select
              v-model:value="form.destinationBranchValue"
              placeholder="ເລືອກສາຂາປາຍທາງ"
              show-search
              :options="manageOrderStore.destinationBranches"
              :filter-option="filterOptionDestinationBranch"
              class="w-full custom-select"
            ></a-select>
          </a-form-item>
        </div>
      </a-card>
      <a-card class="!mb-2 custom-card">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <!-- Origin Branch Select -->
          <a-form-item
            label="ເລືອກປະເພດພັດສະດຸ"
            class="w-full"
            name="parcelCategoryValue"
          >
            <a-select
              v-model:value="form.parcelCategoryValue"
              placeholder="ເລືອກປະເພດພັດສະດຸ"
              :options="manageOrderStore.parcelCategories"
              :filter-option="filterOptionCategory"
              show-search
              class="w-full custom-select"
            ></a-select>
          </a-form-item>
          <a-form-item label="ກວ້າງ + ສູງ + ຍາວ" name="parcelDimensions">
            <a-input-number
              placeholder="ກວ້າງ + ສູງ + ຍາວ"
              :min="0"
              type="number"
              :max="5000"
              style="width: 100%"
              v-model:value="form.parcelDimensions"
              class="custom-select"
            />
          </a-form-item>
          <a-form-item label="ນໍ້າໜັກ (kg)" name="weight">
            <a-input-number
              placeholder="ນໍ້າໜັກ (kg)"
              type="number"
              :min="0"
              :max="10000"
              style="width: 100%"
              v-model:value="form.weight"
            />
          </a-form-item>
        </div>
        <div class="text-right !mt-2">
          <a-button
            type="primary"
            class="!bg-red-600 !text-white"
            @click="submitForm"
            >ສ້າງບິນ</a-button
          >
        </div>
      </a-card>

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
            <span class="text-red-500">ໝາຍເຫດ: </span>
            ຄ່າບໍລິການແມ່ນຕ້ອງອ້າງອີງຕາມການຄິດໄລ່ຕົວຈິງຂອງພະນັກງານຮຸ່ງອາລຸນ
          </p>
        </div>
        <!-- Save Button -->
        <div class="text-right !mt-2">
          <a-button
            type="primary"
            class="!bg-red-600 !text-white"
            @click="submitForm"
            >ປິ້ນໃບບິນຕິດ</a-button
          >
        </div>
      </div>
    </a-form>

    <a-modal
      v-model:open="isModalOpen"
      :footer="null"
      title="ສ້າງບິນຂົນສົ່ງລ່ວງໜ້າ"
      centered
      :maskClosable="false"
      :closable="true"
    >
      <div class="divider"></div>
      <div class="p-2">
        <div class="flex flex-col items-center text-center p-6">
          <CheckCircleOutlined class="!text-green-600 text-5xl !mb-4" />
          <div class="flex items-center">
            <!-- Origin Branch Select -->

            <p class="text-gray-500 text-sm">
              {{ selectedOriginBranch?.label || "-" }}
            </p>
            <!-- Centered Arrow Icon with Reduced Space -->
            <div class="flex justify-center arrow-button">
              <a-avatar
                size="default"
                class="custom-avatar !bg-red-500 flex items-center justify-center"
              >
                <ArrowRightOutlined class="text-white text-base" />
              </a-avatar>
            </div>

            <!-- Destination Branch Select -->
            <p class="text-gray-500 text-sm">
              {{ selectedDestinationBranch?.label || "-" }}
            </p>
          </div>
          <div class="text-center">
            <p class="text-gray-500 text-sm !my-2">ຄ່າຂົນສົ່ງ</p>
            <p class="text-red-600 font-bold text-2xl">
              ຄ່າຂົນສົ່ງ: {{ preview.freight.toLocaleString() || "-" }} LAK
            </p>
          </div>

          <div class="dashed-line"></div>
          <div class="space-y-2 flex justify-between">
            <p>COD:</p>
            <p class="mt-2 text-gray-700">0 %</p>
          </div>

          <!-- Receive Date -->
          <div
            class="mt-4 space-y-2 flex justify-between rounded-lg bg-gray-100"
          >
            <WarningOutlined class="text-center p-3" />
            <p class="p-3 text-gray-500 text-center">ທ່ານຈະໄດ້ຮັບເຄື່ອງພາຍໃນ</p>
            <div class="p-3 font-semibold text-center">2-5 ວັນ</div>
          </div>
        </div>
        <a-button
          type="primary"
          block
          class="!mt-6 !bg-red-600 !text-white !text-lg w-full !h-10"
          @click="submitOrder"
        >
          ຢືນຢັນສ້າງບິນ
        </a-button>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useManageOrderStore } from "@/stores/parcel/manageOrderStore";
import {
  EditOutlined,
  SaveOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons-vue";
import { notification } from "ant-design-vue";
import box_fill from "@/assets/icons/box-fill.svg";
import { useUserStore } from "@/stores/useUserStore";
import { validationRules } from "@/utils/validationRules";

const userStore = useUserStore();
const profile = computed(() => userStore.user);
const manageOrderStore = useManageOrderStore();
const formRef = ref();
const isModalOpen = ref(false);
const checkCDC = ref(false);
const insuranceValue = ref(false);
const checkCOD = ref(false);
const isReceiverInfoSaved = ref(false);
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
  parcelType: "",
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
const prefixPhone = ref<string>("020");
const preview = ref({
  freight: 0, // Default value for freight
});
const documentType = ref([
  { value: "A3", label: "A3" },
  { value: "A4", label: "A4" },
  { value: "A5", label: "A5" },
]);
const filterOptionDocumentSize = (input: string, option: any) => {
  return option.label.toLowerCase().includes(input.toLowerCase());
};
const filterOptionOriginBranch = (input: string, option: any) => {
  return option.label.toLowerCase().includes(input.toLowerCase());
};
const selectedOriginBranch = computed(() => {
  return manageOrderStore.destinationBranches.find(
    (branch: any) => branch.value === form.value.originBranchValue
  );
});
const selectedDestinationBranch = computed(() => {
  return manageOrderStore.destinationBranches.find(
    (branch: any) => branch.value === form.value.destinationBranchValue
  );
});
const filterOptionDestinationBranch = (input: string, option: any) => {
  return option.label.toLowerCase().includes(input.toLowerCase());
};
const filterOptionCategory = (input: string, option: any) => {
  return option.label.toLowerCase().includes(input.toLowerCase());
};
const parcelTypeChange = (value: any) => {
  if (value.target.value) {
    form.value.parcelType = value.target.value;
  } else {
    form.value.parcelType = "parcel";
  }
};
// shipment type
const updateShipmentPayType = () => {
  if (checkCDC.value && checkCOD.value) {
    form.value.shipmentPayType = "destination_freight_fees_cod";
  } else if (!checkCDC.value && !checkCOD.value) {
    form.value.shipmentPayType = "origin_freight_fees";
  } else if (checkCDC.value) {
    form.value.shipmentPayType = "destination_freight_fees";
  } else if (checkCOD.value) {
    codStatus.value = true;
    form.value.parcelPrice = form.value.parcelPrice
      ? ""
      : form.value.parcelPrice;
    form.value.shipmentPayType = "origin_freight_fees_cod";
  }
};
// insurance type
const insuranceChange = (e: any) => {
  // checkCDC.value = e.target.checked; // Update checkbox state
  // form.value.insuranceValue = checkCDC.value ? "" : ""; // Update shipmentPayType based on checkbox state
};
//Calculate the freight
const rules = ref(validationRules); // Assign imported rules
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
      calculateType:
        form.value.parcelType === "document" ? "document" : "parcel",
      shipmentPayType: form.value.shipmentPayType || "origin_freight_fees",
    };
    const result = await manageOrderStore.calculateFreight(payload);
    preview.value = result;
    isModalOpen.value = true;
  } catch (error: any) {
    if (error.response?.data) {
      // Extract message from response
      const errorMessage =
        error.response.data.message || "ກະລຸນາກວດຄືນຂໍ້ມູນຂອງທ່ານ";
      // Extract validation errors
      const validationErrors = Object.values(error.response.data.errors || {})
        .flat()
        .filter((err) => err !== errorMessage) // ✅ Filter out duplicate messages
        .join(", ");
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
};

//Create Order
const submitOrder = async () => {
  try {
    const orderData = {
      sender_branch_id: form.value.originBranchValue,
      receive_branch_id: form.value.destinationBranchValue,
      receiver: {
        full_name: form.value.receiverName,
        phone_number: form.value.receiverPhone,
        location: form.value.receiverAddress,
      },
      payment_gateway: "BCEL_ONE",
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
          insurance_price: form.value.insuranceValue
            ? form.value.insuranceValue
            : null,
          freight: JSON.parse(manageOrderStore.packages.freight),
        },
      ],
    };
    const result = await manageOrderStore.createOrder(orderData);
    notification.success({
      message: "Order Created",
      description: `Order ${result.shipment_number} created successfully!`,
      duration: 3,
    });
    isModalOpen.value = false;
  } catch (error: any) {
    if (error.response?.data) {
      // Extract message from response
      const errorMessage =
        error.response.data.message || "ກະລຸນາກວດຄືນຂໍ້ມູນຂອງທ່ານ";
      // Extract validation errors
      const validationErrors = Object.values(error.response.data.errors || {})
        .flat()
        .filter((err) => err !== errorMessage) // ✅ Filter out duplicate messages
        .join(", ");
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
};

// const combinedPhone = computed(() => {
//   if (receiverPhone.value) {
//     return `${prefixPhone.value}${receiverPhone.value}`;
//   }
//   return "";
// });
onMounted(async () => {
  await manageOrderStore.fetchFilterBranch();
  await manageOrderStore.fetchOriginBranch();
  await manageOrderStore.fetchParcelCategory();
});
</script>

<style scoped>
.custom-avatar {
  /*width: 32px !important; !* Adjust size *!*/
  /*height: 32px !important; !* Adjust size *!*/
  /*line-height: 32px !important;*/
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

.divider {
  margin: 16px 0;
  width: 100%;
  height: 1px;
  background-color: #efefef;
}

.dashed-line {
  border-top: 1px dashed #d1d5db; /* Gray color */
  margin: 16px 0;
}
</style>
