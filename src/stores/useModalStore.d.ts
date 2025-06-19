export declare const useModalStore: import("pinia").StoreDefinition<"modalStore", Pick<{
    isOpen: import("vue").Ref<boolean, boolean>;
    modalTitle: import("vue").Ref<string, string>;
    modalData: import("vue").Ref<{
        totalAmount: string;
        codAmount: string;
        codRate: string;
        transferFee: string;
        bankAccount: string;
        bankOwner: string;
        receiveDate: string;
    }, {
        totalAmount: string;
        codAmount: string;
        codRate: string;
        transferFee: string;
        bankAccount: string;
        bankOwner: string;
        receiveDate: string;
    } | {
        totalAmount: string;
        codAmount: string;
        codRate: string;
        transferFee: string;
        bankAccount: string;
        bankOwner: string;
        receiveDate: string;
    }>;
    confirmed: import("vue").Ref<boolean, boolean>;
    showModal: (data: any) => void;
    closeModal: () => void;
}, "isOpen" | "modalTitle" | "modalData" | "confirmed">, Pick<{
    isOpen: import("vue").Ref<boolean, boolean>;
    modalTitle: import("vue").Ref<string, string>;
    modalData: import("vue").Ref<{
        totalAmount: string;
        codAmount: string;
        codRate: string;
        transferFee: string;
        bankAccount: string;
        bankOwner: string;
        receiveDate: string;
    }, {
        totalAmount: string;
        codAmount: string;
        codRate: string;
        transferFee: string;
        bankAccount: string;
        bankOwner: string;
        receiveDate: string;
    } | {
        totalAmount: string;
        codAmount: string;
        codRate: string;
        transferFee: string;
        bankAccount: string;
        bankOwner: string;
        receiveDate: string;
    }>;
    confirmed: import("vue").Ref<boolean, boolean>;
    showModal: (data: any) => void;
    closeModal: () => void;
}, never>, Pick<{
    isOpen: import("vue").Ref<boolean, boolean>;
    modalTitle: import("vue").Ref<string, string>;
    modalData: import("vue").Ref<{
        totalAmount: string;
        codAmount: string;
        codRate: string;
        transferFee: string;
        bankAccount: string;
        bankOwner: string;
        receiveDate: string;
    }, {
        totalAmount: string;
        codAmount: string;
        codRate: string;
        transferFee: string;
        bankAccount: string;
        bankOwner: string;
        receiveDate: string;
    } | {
        totalAmount: string;
        codAmount: string;
        codRate: string;
        transferFee: string;
        bankAccount: string;
        bankOwner: string;
        receiveDate: string;
    }>;
    confirmed: import("vue").Ref<boolean, boolean>;
    showModal: (data: any) => void;
    closeModal: () => void;
}, "showModal" | "closeModal">>;
