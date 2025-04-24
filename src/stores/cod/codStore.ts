import { defineStore } from 'pinia';
import {api} from '@/plugins/axios.ts';
import {ref} from "vue";
import dayjs,{Dayjs} from "dayjs";

export const useCodStore = defineStore('codStore', {
    state: () => ({
        totalQty:0,
        codSummary: 0,
        codFee: 0,
        transferFee: 0,
        cod_fee_percent: 0,
        codList: [] as any[], // COD list array
        loading: false,
        codListStatus: [] as any[],
        pagination: {
            nextPageUrl: null,
            prevPageUrl: null,
            cursor: '',
            currentPage: 1,  // ✅ Add currentPage
            pageSize: 25,     // ✅ Add pageSize
            totalItems: 0,
        },
        startDate: dayjs().subtract(3, "month") as Dayjs | null, // ✅ Initialize as Dayjs object
        endDate: dayjs() as Dayjs | null, // ✅ Initialize as Dayjs object
    }),
    actions: {
        // ✅ Add cursor as a parameter and set a default value
        async fetchCodData(cursor = '') {
            this.loading = true;
            try {
                const response = await api.get('/summarize/cod/owner/list', {
                    params: {
                        use_cursor: true,
                        cursor,
                        per_page: this.pagination.pageSize,
                        current_page: this.pagination.currentPage,
                    }
                });

                if (response.data && !response.data.error) {
                    const data = response.data.data;
                    this.totalQty = data.total_qty;
                    this.codSummary = data.total_price;
                    this.codFee = data.cod_fee;
                    this.transferFee = data.transfer_fee;
                    this.cod_fee_percent = data.cod_fee_percent;
                    this.codList = data.data;
                    // ✅ Update Pagination State
                    this.pagination.nextPageUrl = data.next_page_url || null;
                    this.pagination.prevPageUrl = data.prev_page_url || null;
                    this.pagination.cursor = cursor;
                    this.pagination.totalItems = data.total_qty; // ✅ S
                }
            } catch (error) {
                throw error;
            } finally {
                this.loading = false;
            }
        },
        async fetchCodStatusData({status='',cursor='',}={}) {
            this.loading = true;
            try {
                const response = await api.get('/cod/shipment/owner/list', {
                    params: {
                        status:status,
                        start_date:dayjs(this.startDate).format('YYYY-MM-DD'),
                        end_date:dayjs(this.endDate).format('YYYY-MM-DD'),
                        use_cursor: true,
                        cursor,
                        per_page: this.pagination.pageSize,
                        current_page: this.pagination.currentPage,
                    }
                });

                if (response.data && !response.data.error) {
                    console.log(response.data)
                    const data = response.data.data;
                    // this.totalQty = data.total_qty;
                    // this.codSummary = data.total_price;
                    // this.codFee = data.cod_fee;
                    // this.transferFee = data.transfer_fee;
                    // this.cod_fee_percent = data.cod_fee_percent;
                    this.codListStatus = data?.data;
                    // ✅ Update Pagination State
                    this.pagination.nextPageUrl = data?.next_page_url || null;
                    this.pagination.prevPageUrl = data?.prev_page_url || null;
                    this.pagination.cursor = cursor;
                    this.pagination.totalItems = data?.total_qty;
                    console.log(data)
                }
            } catch (error) {
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async searchQuery (){
            if(this.startDate != null && this.endDate != null){
                this.fetchCodStatusData({status:'success'});
            }
        },
        async clearSearch (){
            this.startDate = null;
            this.endDate = null;
        },
        // ✅ Next Page
        // async fetchNextPage() {
        //     if (this.pagination.nextPageUrl) {
        //         const pattern = 'cursor=';
        //         const cursor = this.pagination.nextPageUrl.slice(
        //             this.pagination.nextPageUrl.indexOf(pattern) + pattern.length
        //         );
        //         this.pagination.currentPage++; // ✅ Increment page number
        //         await this.fetchCodData(cursor);
        //     }
        // },
        //
        // // ✅ Previous Page
        // async fetchPreviousPage() {
        //     if (this.pagination.prevPageUrl) {
        //         const pattern = 'cursor=';
        //         const cursor = this.pagination.prevPageUrl.slice(
        //             this.pagination.prevPageUrl.indexOf(pattern) + pattern.length
        //         );
        //         this.pagination.currentPage--; // ✅ Decrement page number
        //         await this.fetchCodData(cursor);
        //     }
        // },
    },
});
