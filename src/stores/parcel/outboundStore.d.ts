export declare const useOutboundParcelStore: import("pinia").StoreDefinition<"outboundStore", {
    totalQty: number;
    outboundList: any[];
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
}, {}, {
    fetchOutboundData({ status, cursor, query, startDate, endDate, }?: {
        status?: string | undefined;
        cursor?: string | undefined;
        query?: string | undefined;
        startDate?: string | undefined;
        endDate?: string | undefined;
    }): Promise<void>;
    fetchTrackingParcel(trackingId: string): Promise<void>;
}>;
