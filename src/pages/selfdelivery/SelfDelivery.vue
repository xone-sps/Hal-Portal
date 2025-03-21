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
            <p class="font-semibold">Bebe</p>
          </div>
          <div class="flex">
            <p class="text-gray-500 w-24">ເບີໂທລະສັບ</p>
            <p class="font-semibold">020 55034921</p>
          </div>
          <div class="flex">
            <p class="text-gray-500 w-24">ທີ່ຢູ່</p>
            <p class="font-semibold">ກີໂດກ, ໄຊທານີ, ມ. ຖະໜົນລາວຣັບ</p>
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
          <a-avatar size="small" class="u-receiver text-white font-bold">R</a-avatar>

          <!-- Name and Edit Option -->
          <div class="flex items-center gap-2">
            <h3 class="text-lg font-semibold">ຂໍ້ມູນຜູ້ຮັບ</h3>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-2 mt-4">
          <a-form-item label="ຊື່" name="receiverName">
            <a-input placeholder="ຊື່ຜູ້ສົ່ງ" v-model:value="form.receiverName"/>
          </a-form-item>
          <a-form-item label="ເບີໂທ" class="!pl-2" name="combinedPhone">
            <a-input-group compact>
              <a-select v-model:value="prefixPhone" class="custom-select">
                <a-select-option value="020">020</a-select-option>
                <a-select-option value="030">030</a-select-option>
              </a-select>
              <a-input
                  v-model:value="receiverPhone"
                  style="width: 410px;"
                  placeholder="ເບີໂທ"
              />
            </a-input-group>
          </a-form-item>
          <a-form-item label="ທີ່ຢູ່ຜູ້ສົ່ງ" name="receiverAddress">
            <a-input placeholder="ທີ່ຢູ່ຜູ້ສົ່ງ" v-model:value="form.receiverAddress"/>
          </a-form-item>
        </div>
        <div>
          <a-checkbox value="1" name="type">ບັນທຶກຂໍ້້ມູນຜູ້ຮັບ</a-checkbox>
        </div>
      </a-card>

      <div class="flex items-center gap-3 !mb-1">
        <!-- Avatar -->
        <img :src="box_fill" alt="Open Box Icon" class="w-6 h-6"/>
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
                <a-radio-group v-model:value="form.parcelType" @change="parcelTypechange">
                  <a-radio value="parcel">ພັດສະດຸທົ່ວໄປ</a-radio>
                  <a-radio value="document">ເອກະສານ</a-radio>
                </a-radio-group>
              </a-form-item>
            </div>
          </a-card>
        </div>
        <div class="w-3/5">
          <a-card class="custom-card">
            <!--            <a-form-item label="ບໍລິການເສີມ" name="selectedServices">-->
            <!-- Checkbox Group -->
            <!--              <a-checkbox-group v-model:value="form.selectedServices" class="flex">-->
            <!--                <div v-for="service in serviceMore" :key="service.value" class="pr-6">-->
            <!--                  <a-checkbox :value="service.value">-->
            <!--                    {{ service.label }}-->
            <!--                    <p class="text-xs">{{ service.detail }}</p>-->
            <!--                  </a-checkbox>-->
            <!--                </div>-->
            <!--              </a-checkbox-group>-->
            <!--            </a-form-item>-->
            <a-form-item label="ບໍລິການເສີມ">
              <div class="flex">
                <div class="pr-6">
                  <a-checkbox v-model:checked="checkCDC">
                    CDC
                    <p class="text-xs">ເກັບຄ່າຂົນສົ່ງປາຍທາງ</p>
                  </a-checkbox>
                </div>
                <div class="pr-6" v-if="form.parcelType !=='document'">
                  <a-checkbox v-model:value="form.codValue" @change="codChange">
                    COD
                    <p class="text-xs">ເກັບຄ່າເຄື່ອງປາຍທາງ</p>
                  </a-checkbox>
                </div>
                <div class="pr-6" v-if="form.parcelType !=='document'">
                  <a-checkbox v-model:value="form.insuranceValue">
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
        <a-form-item v-if="form.parcelType =='document'" label="ປະເພດເອກະສານ" class="w-full" name="documentSizeValue">
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
        <a-form-item label="ມູນຄ່າພັດສະດຸ" name="parcelWeight" v-if="codStatus">
          <a-input placeholder="ມູນຄ່າພັດສະດຸ" v-model:value="form.parcelPrice"/>
        </a-form-item>
        <div class="flex items-center">
          <!-- Origin Branch Select -->
          <a-form-item label="ສາຂາຕົ້ນທາງ" class="w-full" name="originValue">
            <a-select v-model:value="form.originBranchValue" placeholder="ເລືອກສາຂາຕົ້ນທາງ" show-search
                      :options="manageOrderStore.originBranches"
                      :filter-option="filterOptionOriginBranch"
                      class="w-full custom-select"
            ></a-select>
          </a-form-item>

          <!-- Centered Arrow Icon with Reduced Space -->
          <div class="flex justify-center arrow-button">
            <a-avatar size="default" class="custom-avatar !bg-red-500 flex items-center justify-center">
              <ArrowRightOutlined class="text-white text-base"/>
            </a-avatar>
          </div>

          <!-- Destination Branch Select -->
          <a-form-item label="ສາຂາປາຍທາງ" class="w-full" name="destinationValue">
            <a-select v-model:value="form.destinationBranchValue" placeholder="ເລືອກສາຂາປາຍທາງ" show-search
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
          <a-form-item label="ເລືອກປະເພດພັດສະດຸ" class="w-full" name="parcelCategoryValue">
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
            <a-input placeholder="ກວ້າງ + ສູງ + ຍາວ" v-model:value="form.parcelDimensions" class="custom-select"/>
          </a-form-item>
          <a-form-item label="ນໍ້າໜັກ (kg)" name="weight">
            <a-input placeholder="ນໍ້າໜັກ (kg)" v-model:value="form.weight"/>
          </a-form-item>
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
            <span class="text-red-500">ໝາຍເຫດ:
            </span>
            ຄ່າບໍລິການແມ່ນຕ້ອງອ້າງອີງຕາມການຄິດໄລ່ຕົວຈິງຂອງພະນັກງານຮຸ່ງອາລຸນ
          </p>
        </div>
        <!-- Save Button -->
        <div class="text-right !mt-2">
          <a-button type="primary" class="!bg-red-600 !text-white" @click="submitForm">ປິ້ນໃບຕິດ</a-button>
        </div>
      </div>
    </a-form>
    <div class="text-right !mt-2">
      <a-button type="primary" class="!bg-red-600 !text-white" @click="submitOrder">Create Order</a-button>
    </div>
    <ConfirmOrderModal
        v-model="isModalOpen"
        title="ເພີ່ມລາຍການພັດສະດຸss"
        @confirm="submitOrder"
    >
    </ConfirmOrderModal>

<!--    <a-modal v-model:open="open" :footer="null" centered :maskClosable="false" :closable="false">-->
<!--      <div class="flex flex-col items-center text-center p-6">-->
<!--        <CheckCircleOutlined class="!text-green-600 text-5xl !mb-4"/>-->
<!--        <h2 class="text-xl font-bold">ທ່ານໄດຢືນຢັນຮຽກເກັບເງິນ COD ສຳເລັດ</h2>-->
<!--        <p class="text-gray-600 text-sm !mt-2">ຈະໄດ້ຮັບເງິນພາຍໃນ 02 ວັນ ນັບຈາກມື້ກົດຮຽກເກັບເງິນ-->
<!--          ເປັນຕົ້ນໄປ</p>-->
<!--        <a-button-->
<!--            type="primary"-->
<!--            block-->
<!--            class="!mt-6 !bg-red-600 !text-white !text-lg w-full !h-10"-->
<!--            @click="submitOrder"-->
<!--        >-->
<!--          Create-->
<!--        </a-button>-->
<!--      </div>-->
<!--    </a-modal>-->

  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, computed} from "vue";
import {useManageOrderStore} from "@/stores/parcel/manageOrderStore";
import {validationRules} from "@/utils/validationRules"; // Import validation rules
import {EditOutlined, SaveOutlined, ArrowRightOutlined} from "@ant-design/icons-vue";
import {notification} from "ant-design-vue";
import box_fill from "@/assets/icons/box-fill.svg";
import ConfirmOrderModal from "@/components/modals/ConfirmOrderModal.vue";
import {useModalStore} from "@/stores/useModalStore";
const modalStore = useModalStore();
const manageOrderStore = useManageOrderStore();
const formRef = ref();
const isModalOpen = ref(false);
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
const prefixPhone = ref<string>('020');
const receiverPhone = ref<string>('');
const serviceMore = ref([
  {value: "destination_freight_fees", label: "CDC", detail: "ເກັບຄ່າຂົນສົ່ງປາຍທາງ"},
  {value: "destination_freight_fees_cod", label: "COD", detail: "ເກັບຄ່າເຄື່ອງປາຍທາງ"},
  {value: "insurance", label: "ປະກັນໄພ", detail: "ຄຸມຄອງພັດສະດຸຂອງທ່ານ"},
]);
const documentType = ref([
  {value: "A3", label: "A3"},
  {value: "A4", label: "A4"},
  {value: "A5", label: "A5"},
]);
const openCODModal = () => {
  modalStore.showModal({
    totalAmount: "5,000,000",
    codAmount: "5,000,000",
    codRate: "0",
    transferFee: "19,000",
    bankAccount: "182120001640922001",
    bankOwner: "Outhai VONGSA MS",
    receiveDate: "25/01/2025",
  });
};

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
const parcelTypechange = (value) => {
  if(value.target.value){
    form.value.parcelType = value.target.value;
  } else {
    form.value.parcelType.value = 'parcel';
  }
}
const codChange = (value) => {
  if (value.target.checked == true) {
    codStatus.value = true;
  } else {
    codStatus.value = false;
  }
}
const checkCDC = computed({
  get: () => form.value.shipmentPayType === 'destination_freight_fees',
  set: (value) => {
    form.value.shipmentPayType = value ? 'destination_freight_fees' : 'origin_freight_fees';
  }
});

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
      calculateType: form.value.parcelType === 'document' ? 'document' : 'parcel',
      shipmentPayType: form.value.shipmentPayType || 'origin_freight_fees',
    };
    console.log("Mapped Payload:", payload);
    // openCODModal();
    // ✅ Call store function with mapped payload
    await manageOrderStore.calculateFreight(payload);
    notification.success({
      message: "ສຳເລັດ!",
      description: "ຂໍ້ມູນຂອງທ່ານຖືກບັນທຶກສຳເລັດ",
      placement: "topRight", // Show at top right
      duration: 5, // Auto close in 5 seconds
    });
    isModalOpen.value = true;
  } catch (error) {
    notification.error({
      message: "ຜິດພາດ!",
      description: "ກະລຸນາກວດຄືນຂໍ້ມູນຂອງທ່ານ",
      placement: "topRight", // Show at top right
      duration: 5, // Auto close in 5 seconds
    });
  }
};
const submitOrder = async () =>{
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
            size: manageOrderStore.packages.size.id ? manageOrderStore.packages.size.id : null,
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
      description: `Order ${result.order_number} created successfully!`,
      duration: 3
    });
  } catch (error){
    notification.error({
      message: 'Order Creation Failed',
      description: error.message || 'An error occurred while creating the order.',
      duration: 3
    });
  }
}

const combinedPhone = computed(() => {
  if (receiverPhone.value) {
    return `${prefixPhone.value}${receiverPhone.value}`;
  }
  return '';
});
onMounted(() => {
      manageOrderStore.fetchFilterBranch();
      manageOrderStore.fetchOriginBranch();
      manageOrderStore.fetchParcelCategory();
    }
)
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
</style>
