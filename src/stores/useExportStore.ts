import { defineStore } from 'pinia';
import axios from '@/plugins/axios';
import dayjs from 'dayjs';
import {message} from "ant-design-vue";
import { v4 as uuidv4 } from 'uuid';

export const useExportStore = defineStore('export', {
    state: () => ({
        isExportLoading: false,
    }),

    actions: {
        async exportExcel({ startDate, endDate, status, query }:
                              { startDate: string; endDate: string; status: string; query: string }) {
            if (this.isExportLoading) return;
            try {
                this.isExportLoading = true;
                const exportId = uuidv4();
                // ✅ Format the dates to Y-m-d
                // const formattedStartDate = startDate ? dayjs(startDate).format('YYYY-MM-DD') : null;
                // const formattedEndDate = endDate ? dayjs(endDate).format('YYYY-MM-DD') : null;
                const formattedStartDate = startDate
                    ? dayjs(startDate).format('YYYY-MM-DD')
                    : null;

                const formattedEndDate = endDate
                    ? dayjs(endDate).format('YYYY-MM-DD')
                    : null;

                const body = {
                    start_date: formattedStartDate,
                    end_date: formattedEndDate,
                    export_id: exportId,
                    status,
                    q: query,
                };
                // ✅ Fix headers and responseType to handle binary data correctly
                const res = await axios.post('/v1/auth/users/me/shipments/exports/orders', body, {
                    responseType: 'blob', // Important for binary files
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    },
                });
                console.log('Axios baseURL:', axios.defaults.baseURL);
                if (res) {
                    const blob = new Blob([res.data], {
                        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `ລາຍການພັດສະດຸຂາເຂົ້າ (List-Receiving) Shipment-Orders-${formattedStartDate || 'all'}-${formattedEndDate || 'all'}.xlsx`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                }
            } catch (error) {
                message.error(error);
              throw error;
            } finally {
                this.isExportLoading = false;
            }
        }

    },
});
