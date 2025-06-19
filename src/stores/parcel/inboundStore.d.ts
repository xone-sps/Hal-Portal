import { Dayjs } from "dayjs";
export declare const useInboundParcelStore: import("pinia").StoreDefinition<"inboundStore", {
    totalQty: number;
    inboundList: any[];
    loading: boolean;
    trackingEvent: any[];
    shipmentInfo: {};
    query: string;
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
    fetchInboundData({ status, cursor, query, startDate, endDate, type }?: {
        status?: string | undefined;
        cursor?: string | undefined;
        query?: string | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
        type?: string | undefined;
    }): Promise<void>;
    fetchTrackingParcel(trackingId: string): Promise<void>;
}>;
