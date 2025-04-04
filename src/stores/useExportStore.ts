import {defineStore} from 'pinia';
import {api} from '@/plugins/axios.ts';
import dayjs from 'dayjs';
import {message} from "ant-design-vue";
import {v4 as uuidv4} from 'uuid';

export const useExportStore = defineStore('export', {
    state: () => ({
        isExportLoading: false,
        isExportTemplate: false,
        isImportLoading: false,
    }),

    actions: {
        async exportExcel({startDate, endDate, status, query}:
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
                const res = await api.post('/v1/auth/users/me/shipments/exports/orders', body, {
                    responseType: 'blob', // Important for binary files
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    },
                });
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
        },
        async exportTemplate() {
            if (this.isExportTemplate) return;
            try {
                this.isExportTemplate = true;
                const body = {
                    formData: false,
                    download: true,
                };
                const res = await api.post('download/pre-shipment/template', body);
                if (res) {
                    const blob = new Blob([res.data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "pre-shipment-template.xlsx";
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                }
            } catch (error) {
                message.error(error);
                throw error;
            } finally {
                this.isExportTemplate = false;
            }
        },
        async importExcel(data: any) {
            if (this.isImportLoading) return;
            console.log(data);
            try {
                this.isImportLoading = true;
                const res = await api.post('v1/auth/users/me/shipments/management/imports/pre-shipment', data);
                if (res) {
                    console.log(res);
                    return res.data;
                }
            } catch (error) {
                message.error(error);
                throw error;
            } finally {
                this.isImportLoading = false;
            }
        },


        async onUploadValidateData(body) {

            importProgress.value = 0;
            importValidateProgress.value = 0;
            isInitialImportProgress.value = true;

            try {
                eventSource = new AuthenticationEventSource(
                    `${apiUrl}/v1/auth/users/me/shipments/management/imports/pre-shipment/progress/${body.import_id}`,
                    store.getters['auth/token']
                );

                eventSource.addEventListener('starting', () => {
                    isInitialImportProgress.value = true;
                })

                eventSource.addEventListener('progress', (event) => {
                    const data = JSON.parse(event.data)
                    if (data.use_validate) {
                        isInitialImportProgress.value = true;
                        importValidateProgress.value = data.validate_progress;
                    } else {
                        isInitialImportProgress.value = false;
                        importProgress.value = data.progress;
                    }

                    if (data.error) {
                        isLoading.value = false;
                        console.log('Import progress failed:', data.error)
                    }

                    if (data.status === 'completed') {
                        messageSuccess({
                            title: "ສຳເລັດ",
                            detail: "ການໂຫລດ Excel ສຳເລັດ."
                        }, {life: 1000});
                        console.log('Import progress completed at:', data.completed_at)
                        cleanup()
                    }
                })

                eventSource.addEventListener('error', (event) => {
                    const data = JSON.parse(event.data)
                    console.log('Import progress error check:', data)
                    if (data.status_code !== 404) {
                        cleanup()
                    }
                })

            } catch (error) {
                console.log('Check import progress axios errors: ', error);
            }

            try {
                isLoading.value = true;
                const response = await store.dispatch("data-resources/manage", body);
                const validateData = response.data;
                excelErrors.value.column_names = validateData.column_names || [];
                excelErrors.value.rows = validateData.rows || [];
                // Reset map watcher
                rowWatchers = new Map();
                showValidateDialogExcel();
            } catch (e) {
                let message = "ມີບາງຢ່າງຜິດພາດໃນການອັບໂຫລດ.";
                if (e?.response?.data?.data) {
                    const errorData = e.response.data.data;
                    excelErrors.value.column_names = errorData.column_names || [];
                    // Update rows array in-place so its reference stays the same:
                    excelErrors.value.rows.splice(0, excelErrors.value.rows.length, ...(errorData.rows || []));
                    // Reset map watcher
                    rowWatchers = new Map();
                } else if (e?.response?.data) {
                    message = e?.response?.data?.message ?? message;
                }
                messageError({
                    title: "ຜິດພາດ",
                    detail: message
                }, {life: 2000});
                cleanup()
            }
        }

    },
});
