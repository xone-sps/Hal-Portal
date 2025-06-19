export declare const validationRules: {
    phone: {
        required: boolean;
        message: string;
        trigger: string;
    }[];
    password: {
        required: boolean;
        message: string;
        trigger: string;
    }[];
    receiverName: {
        required: boolean;
        message: string;
        trigger: string;
    }[];
    receiverPhone: ({
        required: boolean;
        message: string;
        trigger: string;
        validator?: undefined;
    } | {
        validator: (_rule: any, value: any) => Promise<void>;
        trigger: string;
        required?: undefined;
        message?: undefined;
    })[];
    receiverAddress: {
        required: boolean;
        message: string;
        trigger: string;
    }[];
    originBranchValue: {
        required: boolean;
        message: string;
        trigger: string;
    }[];
    destinationBranchValue: {
        required: boolean;
        message: string;
        trigger: string;
    }[];
    parcelType: {
        required: boolean;
        message: string;
        trigger: string;
    }[];
    parcelCategoryValue: {
        required: boolean;
        message: string;
        trigger: string;
    }[];
    parcelDimensions: {
        required: boolean;
        message: string;
        trigger: string;
    }[];
    weight: {
        required: boolean;
        message: string;
        trigger: string;
    }[];
    parcelPrice: {
        required: boolean;
        message: string;
        trigger: string;
    }[];
    selectedServices: {
        validator: (value: any) => Promise<void>;
        trigger: string;
    }[];
    name: {
        required: boolean;
        message: string;
        trigger: string;
    }[];
    surname: {
        required: boolean;
        message: string;
        trigger: string;
    }[];
    userAddress: {
        required: boolean;
        message: string;
        trigger: string;
    }[];
    province_id: {
        required: boolean;
        message: string;
        trigger: string;
    }[];
    district_id: {
        required: boolean;
        message: string;
        trigger: string;
    }[];
    village_id: {
        required: boolean;
        message: string;
        trigger: string;
    }[];
    branch: {
        required: boolean;
        message: string;
        trigger: string;
    }[];
    oldPassword: {
        required: boolean;
        message: string;
        trigger: string;
    }[];
    newPassword: {
        required: boolean;
        message: string;
        trigger: string;
    }[];
    confirmPassword: {
        required: boolean;
        message: string;
        trigger: string;
    }[];
};
export declare const getValidationRules: (prefixGetter: () => string) => {
    receiverPhone: ({
        required: boolean;
        message: string;
        trigger: string;
        validator?: undefined;
    } | {
        validator: (_rule: any, value: string) => Promise<unknown>;
        trigger: string;
        required?: undefined;
        message?: undefined;
    })[];
};
