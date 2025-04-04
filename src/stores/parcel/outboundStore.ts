import {defineStore} from 'pinia';
import {api} from '@/plugins/axios.ts';
import dayjs, {Dayjs} from "dayjs";

export const useOutboundParcelStore = defineStore('outboundStore', {
    state: () => ({
        totalQty: 0,
        outboundList: [] as any[], // COD list array
        loading: false,
        trackingEvent: [] as any[],
        shipmentInfo: {},
        query: '',
        pagination: {
            nextPageUrl: null,
            prevPageUrl: null,
            cursor: '',
            currentPage: 1,  // ✅ Add currentPage
            pageSize: 50,     // ✅ Add pageSize
            totalItems: 0,
        },
    }),
    actions: {
        // ✅ Add cursor as a parameter and set a default value
        async fetchOutboundData({
                                    status = '',
                                    cursor = '',
                                    query = '',
                                    startDate = '',
                                    endDate = '',
                                } = {}) {
            this.loading = true;
            try {
                const params: Record<string, any> = {
                    q: query || this.query, // Use query if provided, otherwise use this.query
                    start_date: startDate ? dayjs(startDate).format('YYYY-MM-DD') : dayjs(this.startDate).format('YYYY-MM-DD'),
                    end_date: endDate ? dayjs(endDate).format('YYYY-MM-DD') : dayjs(this.endDate).format('YYYY-MM-DD'),
                    use_cursor: true,
                    cursor,
                    status:status,
                    limit: this.pagination.pageSize,
                    sort_order:'asc'
                };
                const response = await api.get('v1/auth/users/me/shipments/orders', {params});
                if (response.data && !response.data.error) {
                    const data = response.data;
                    this.totalQty = data.per_page;
                    this.outboundList = data.data;
                    // ✅ Update Pagination State
                    this.pagination.nextPageUrl = data.next_page_url || null;
                    this.pagination.prevPageUrl = data.prev_page_url || null;
                    this.pagination.cursor = data.next_cursor;
                    this.pagination.totalItems = data.total_qty;
                }
            } catch (error) {
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async fetchTrackingParcel(trackingId: string) {
            this.loading = true;
            try {
                const response = await api.get('v1/orders/tracking/' + trackingId,);
                if (response.data && !response.data.error) {
                    this.shipmentInfo = response.data.shipment_info;
                    this.trackingEvent = response.data.tracking_events;
                }
            } catch (error) {
                throw error;
            } finally {
                this.loading = false;
            }
        },
    },
});
