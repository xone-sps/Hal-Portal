export declare const useManageOrderStore: import("pinia").StoreDefinition<"manageOrderStore", {
    parcelCategories: any[];
    originBranches: any[];
    destinationBranches: any[];
    provinces: never[];
    districts: never[];
    villages: never[];
    packages: never[];
    orderData: null;
    loading: boolean;
    pagination: {
        nextPageUrl: null;
        prevPageUrl: null;
        cursor: string;
        currentPage: number;
        pageSize: number;
        totalItems: number;
    };
}, {}, {
    fetchOriginBranch(): Promise<void>;
    fetchFilterBranch(): Promise<void>;
    fetchParcelCategory(): Promise<void>;
    calculateFreight({ weight, dimensionLength, parcelSize, startBranchId, endBranchId, calculateType, shipmentPayType }?: {
        weight?: string | undefined;
        dimensionLength?: string | undefined;
        parcelSize?: string | undefined;
        startBranchId?: string | undefined;
        endBranchId?: string | undefined;
        calculateType?: string | undefined;
        shipmentPayType?: string | undefined;
    }): Promise<any>;
    createOrder(orderData: any): Promise<any>;
    deleteParcel(data: any): Promise<import("axios").AxiosResponse<any, any> | undefined>;
    deleteParcels(data: any): Promise<import("axios").AxiosResponse<any, any> | undefined>;
}>;
