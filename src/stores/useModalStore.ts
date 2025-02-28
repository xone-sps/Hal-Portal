import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore("modalStore", () => {
    const isOpen = ref(false);
    const modalTitle = ref<string>("ຢືນຢັນຮັບຍອດ COD");
    const confirmed = ref(false);

    const modalData = ref({
        totalAmount: "14,981,000",
        codAmount: "5,000,000",
        codRate: "0",
        transferFee: "19,000",
        bankAccount: "182120001640922001",
        bankOwner: "Outhai VONGSA MS",
        receiveDate: "25/01/2025",
    });

    const showModal = (data: any) => {
        modalData.value = data;
        isOpen.value = true;
    };

    const closeModal = () => {
        isOpen.value = false;
        confirmed.value = false;
    };

    return { isOpen, modalTitle, modalData, confirmed, showModal, closeModal };
});
