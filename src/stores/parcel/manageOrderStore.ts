import {defineStore} from 'pinia';
import axios from '@/plugins/axios';
export const useManageOrderStore = defineStore('manageOrderStore', {
    state: () => ({
        parcelCategories: [] as any [],
        originBranches: [] as any [],
        destinationBranches: [] as any [],
        provinces: [],
        districts: [],
        villages: [],
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
        async preOrder(data: {}) {

            try {
                // const data = {
                //     sender_branch_id: parcelDetail.value.sender_branch_id,
                //     receive_branch_id: parcelDetail.value.receive_branch_id,
                //     receiver: {
                //         full_name: parcelDetail.value.full_name,
                //         phone_number: parcelDetail.value.phone_number,
                //         location: parcelDetail.value.location,
                //     },
                //     payment_gateway: 'BCEL_ONE',
                //     shipment_pay_type: parcelDetail.value.shipment_pay_type,
                //     shipment_type: "express",
                //     parcel_type: parcelDetail.value.parcel_type,
                //     pieces: 1,
                //     parcels: [
                //         {
                //             size: parcelDetail.value.parcel_size ? parcelDetail.value.parcel_size : null,
                //             category_id: parcelDetail.value.category_id,
                //             dimension_length: JSON.parse(parcelDetail.value.dimension_length),
                //             weight: JSON.parse(parcelDetail.value.weight),
                //             price: parcelDetail.value.package.price,
                //             insurance_price: parcelDetail.value.insurance_price ? parcelDetail.value.insurance_price : null,
                //             freight: JSON.parse(parcelDetail.value.freight)
                //         }
                //     ]
                // }

                const response = await axios.post('/v1/auth/users/me/shipments/orders/store', data);

                if (response.data) {
                    //success

                }
            } catch (error) {
                throw error;
            }
        },

        // ✅ Add cursor as a parameter and set a default value
        async fetchInboundData({
                                   status = '',
                                   cursor = '',
                                   query = '',
                                   startDate = '',
                                   endDate = '',
                                   type = 'receive'
                               } = {}) {
            this.loading = true;
            try {
                const params: Record<string, any> = {
                    //Query data
                    // type,
                    // q: query || this.query, // Use query if provided, otherwise use this.query
                    // status,
                    // start_date: startDate ? dayjs(startDate).format('YYYY-MM-DD') : dayjs(this.startDate).format('YYYY-MM-DD'),
                    // end_date: endDate ? dayjs(endDate).format('YYYY-MM-DD') : dayjs(this.endDate).format('YYYY-MM-DD'),
                    // use_cursor: true,
                    // cursor,
                    // limit: this.pagination.pageSize,
                };

                const response = await axios.get('v1/auth/users/me/shipments/orders', {params});
                if (response.data && !response.data.error) {
                    //show data
                }
            } catch (error) {
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async fetchOriginBranch() {
            this.loading = true;
            try {
                const response = await axios.get('v1/listing/branches',);
                if (response.data && !response.data.error) {
                    this.originBranches = response.data.map(item => ({
                        label: item.name, // Map "name" to "label"
                        value: item.id // Map "id" to "value"
                    }));
                    this.destinationBranches = response.data.map(item => ({
                        label: item.name, // Map "name" to "label"
                        value: item.id // Map "id" to "value"
                    }));
                }
            } catch (error) {
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async fetchFilterBranch() {
            this.loading = true;
            try {
                const response = await axios.get('filter-branch',);
                if (response.data && !response.data.error) {
                    this.provinces = response.data.provinces,
                        this.districts = response.data.districts;
                        this.villages = response.data.villages,
                    console.log(this.provinces);
                }
            } catch (error) {
                throw error;
            } finally {
                this.loading = false;
            }
        },
        async fetchParcelCategory() {
            this.loading = true;
            try {
                const response = await axios.get('customer/list-parcel-categories',);
                if (response.data && !response.data.error) {
                    this.parcelCategories = response.data.listParcelCategories.map(item => ({
                        label: item.name, // Map "name" to "label"
                        value: item.id // Map "id" to "value"
                    }));
                }
            } catch (error) {
                throw error;
            } finally {
                this.loading = false;
            }
        },
    },
});
