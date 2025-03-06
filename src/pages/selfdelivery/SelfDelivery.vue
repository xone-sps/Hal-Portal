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
    <a-form layout="vertical">
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
          <a-form-item label="ຊື່">
            <a-input placeholder="ຊື່ຜູ້ສົ່ງ" v-model:value="form.senderName"/>
          </a-form-item>
          <a-form-item label="ເບີໂທ" class="!pl-2">
            <a-input placeholder="ເບີໂທ" v-model:value="form.senderPhone"/>
          </a-form-item>
          <a-form-item label="ທີ່ຢູ່ຜູ້ສົ່ງ">
            <a-input placeholder="ທີ່ຢູ່ຜູ້ສົ່ງ" v-model:value="form.senderAddress"/>
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
              <a-form-item label="ປະເພດພັສະດຸ">
                <a-radio-group v-model:value="parcelType">
                  <a-radio value="general">ພັດສະດຸທົ່ວໄປ</a-radio>
                  <a-radio value="document">ເອກະສານ</a-radio>
                </a-radio-group>
              </a-form-item>
            </div>
          </a-card>
        </div>
        <div class="w-3/5">
          <a-card class="custom-card">
            <a-form-item label="ບໍລິການເສີມ">
              <!-- Checkbox Group -->
              <a-checkbox-group v-model:value="selectedServices" class="flex">
                <div v-for="service in serviceMore" :key="service.value" class="pr-6">
                  <a-checkbox :value="service.value">
                    {{ service.label }}
                    <p class="text-xs">{{ service.detail }}</p>
                  </a-checkbox>
                </div>
              </a-checkbox-group>
            </a-form-item>
          </a-card>
        </div>
      </div>

      <a-card class="!mb-2 custom-card">
        <div class="flex items-center">
          <!-- Origin Branch Select -->
          <a-form-item label="ສາຂາຕົ້ນທາງ" class="w-full">
            <a-select v-model:value="originValue" placeholder="ເລືອກສາຂາຕົ້ນທາງ" show-search
                      :options="originBranch"
                      :filter-option="filterOption"
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
          <a-form-item label="ສາຂາປາຍທາງ" class="w-full">
            <a-select v-model:value="destinationValue" placeholder="ເລືອກສາຂາປາຍທາງ" show-search
                      :options="destinationBranch"
                      :filter-option="filterOption"
                      class="w-full custom-select"
            ></a-select>
          </a-form-item>
        </div>
      </a-card>
      <a-card class="!mb-2 custom-card">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <!-- Origin Branch Select -->
          <a-form-item label="ເລືອກປະເພດພັດສະດຸ" class="w-full">
            <a-select v-model:value="parcelValue" placeholder="ເລືອກປະເພດພັດສະດຸ" show-search
                      :options="parcelCategory"
                      :filter-option="filterOption"
                      class="w-full custom-select"
            ></a-select>
          </a-form-item>
          <a-form-item label="ກວ້າງ + ສູງ + ຍາວ">
            <a-input placeholder="ກວ້າງ + ສູງ + ຍາວ" v-model:value="form.length" class="custom-select"/>
          </a-form-item>
          <a-form-item label="ນໍ້າໜັກ (kg)">
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
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from "vue";
import {EditOutlined, SaveOutlined, ArrowRightOutlined} from "@ant-design/icons-vue";
import box_fill from "@/assets/icons/box-fill.svg";

const form = ref({
  senderName: "",
  senderPhone: "",
  senderAddress: "",
  receiverName: "",
  receiverPhone: "",
  receiverAddress: "",
  packageType: "",
  length: "",
  weight: "",
});
const parcelType = ref<String>('');
const selectedServices = ref([]);
const serviceMore = ref([
  {value: "cdc", label: "CDC", detail: "ເກັບຄ່າຂົນສົ່ງປາຍທາງ"},
  {value: "cod", label: "COD", detail: "ເກັບຄ່າເຄື່ອງປາຍທາງ"},
  {value: "insurance", label: "ປະກັນໄພ", detail: "ຄຸມຄອງພັດສະດຸຂອງທ່ານ"},
]);


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

const submitForm = () => {
  console.log("Submitting: ", form.value);
};
onMounted(() => {
      console.log("hi")
    }
)
const filterOption = (input: string, option: any) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
const parcelValue = ref<string | undefined>(undefined);
const destinationValue = ref<string | undefined>(undefined);
const originValue = ref<string | undefined>(undefined);
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
