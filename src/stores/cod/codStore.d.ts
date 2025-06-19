import { Dayjs } from "dayjs";
export declare const useCodStore: import("pinia").StoreDefinition<"codStore", {
    totalQty: number;
    codSummary: number;
    codFee: number;
    transferFee: number;
    cod_fee_percent: number;
    codList: any[];
    loading: boolean;
    codListStatus: any[];
    estimate_receive_date: string;
    successCOD: {};
    codDetail: {};
    pagination: {
        nextPageUrl: null;
        prevPageUrl: null;
        cursor: string;
        currentPage: number;
        pageSize: number;
        totalItems: number;
    };
    startDate: Dayjs | null;
    endDate: Dayjs | null;
}, {}, {
    fetchCodData(cursor?: string): Promise<void>;
    fetchCodStatusData({ status, cursor }?: {
        status?: string | undefined;
        cursor?: string | undefined;
    }): Promise<void>;
    generateRandomId(): number;
    downloadPdf(data: any): Promise<void>;
    confirmCOD(): Promise<void>;
    fetchCodDetail(id: string): Promise<void>;
    viewDetails(id: string, router: Router): Promise<void>;
    searchQuery(): Promise<void>;
    clearSearch(): Promise<void>;
}>;
