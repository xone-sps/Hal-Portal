import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore("modalStore", () => {
    const isOpen = ref(false);
    const modalTitle = ref<string>("ຢືນຢັນຮັບຍອດ COD");
    const confirmed = ref(false);

    const modalData = ref({
        totalAmount: "",
        codAmount: "",
        codRate: "0",
        transferFee: "",
        bankAccount: "",
        bankOwner: "",
        receiveDate: "",
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
