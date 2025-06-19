import { defineStore } from 'pinia';
import { api } from '@/plugins/axios.ts';
import { notification } from "ant-design-vue";
export const useManageOrderStore = defineStore('manageOrderStore', {
    state: () => ({
        parcelCategories: [],
        originBranches: [],
        destinationBranches: [],
        provinces: [],
        districts: [],
        villages: [],
        packages: [],
        orderData: null,
        loading: false,
        pagination: {
            nextPageUrl: null,
            prevPageUrl: null,
            cursor: '',
            currentPage: 1, // ✅ Add currentPage
            pageSize: 50, // ✅ Add pageSize
            totalItems: 0,
        },
    }),
    actions: {
        async fetchOriginBranch() {
            this.loading = true;
            try {
                const response = await api.get('v1/listing/branches');
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
            }
            catch (error) {
                throw error;
            }
            finally {
                this.loading = false;
            }
        },
        async fetchFilterBranch() {
            this.loading = true;
            try {
                const response = await api.get('filter-branch');
                if (response.data && !response.data.error) {
                    this.provinces = response.data.provinces,
                        this.districts = response.data.districts;
                    this.villages = response.data.villages;
                }
            }
            catch (error) {
                throw error;
            }
            finally {
                this.loading = false;
            }
        },
        async fetchParcelCategory() {
            this.loading = true;
            try {
                const response = await api.get('customer/list-parcel-categories');
                if (response.data && !response.data.error) {
                    this.parcelCategories = response.data.listParcelCategories.map(item => ({
                        label: item.name, // Map "name" to "label"
                        value: item.id // Map "id" to "value"
                    }));
                }
            }
            catch (error) {
                throw error;
            }
            finally {
                this.loading = false;
            }
        },
        // ✅ Add cursor as a parameter and set a default value
        async calculateFreight({ weight = '', dimensionLength = '', parcelSize = '', startBranchId = '', endBranchId = '', calculateType = '', shipmentPayType = '' } = {}) {
            this.loading = true;
            try {
                const params = {
                    width: 0.1,
                    height: 0.1,
                    length: 0.1,
                    weight: weight || null,
                    dimension_length: dimensionLength || null,
                    size: parcelSize || null,
                    start_branch_id: startBranchId || null,
                    end_branch_id: endBranchId || null,
                    start_province_id: null,
                    end_province_id: null,
                    calc_type: calculateType === 'document' ? "document" : "parcel",
                    freight_type: shipmentPayType === "destination_freight_fees"
                        ? "destination"
                        : shipmentPayType === "origin_freight_fees_cod"
                            ? "destination"
                            : shipmentPayType === "destination_freight_fees_cod"
                                ? "destination"
                                : "origin",
                };
                const response = await api.get('v1/calculate/freight/branches', { params });
                if (response.data && !response.data.error) {
                    //show data
                    this.packages = response.data;
                    return response.data;
                }
            }
            catch (error) {
                console.error("Freight Calculation Error:", error.message);
                throw error;
            }
            finally {
                this.loading = false;
            }
        },
        // Create preorder
        async createOrder(orderData) {
            try {
                const response = await api.post('/v1/auth/users/me/shipments/orders/store', orderData);
                if (response.data) {
                    this.orderData = response.data;
                    return response.data;
                }
            }
            catch (error) {
                throw error;
            }
            finally {
                this.loading = false;
            }
        },
        async deleteParcel(data) {
            this.loading = true;
            try {
                const response = await api.post('v1/auth/users/me/shipments/orders/cancel/pre-order', data);
                if (response.data) {
                    return response;
                }
            }
            catch (error) {
                notification.error({
                    message: "ຜິດພາດ!",
                    description: error.data.message || "ກະລຸນາກວດຄືນຂໍ້ມູນຂອງທ່ານ",
                    placement: "topRight",
                    duration: 5,
                });
                throw error;
            }
            finally {
                this.loading = false;
            }
        },
        async deleteParcels(data) {
            this.loading = true;
            try {
                const response = await api.post('v1/auth/users/me/shipments/orders/cancel/pre-order/all', data);
                if (response.data) {
                    return response;
                }
            }
            catch (error) {
                notification.error({
                    message: "ຜິດພາດ!",
                    description: error.data.message || "ກະລຸນາກວດຄືນຂໍ້ມູນຂອງທ່ານ",
                    placement: "topRight",
                    duration: 5,
                });
                throw error;
            }
            finally {
                this.loading = false;
            }
        },
    },
});
