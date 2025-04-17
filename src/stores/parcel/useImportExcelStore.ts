import {defineStore} from 'pinia';
import {api, apiUrl} from '@/plugins/axios.ts';
import {notification, message} from "ant-design-vue";
import {v4 as uuidv4} from 'uuid';
import {reactive, watch} from "vue";
import AuthenticationEventSource from "@/hooks/custom-eventsource";
import {useUserStore} from '@/stores/useUserStore';
import {useRouter} from "vue-router";


export const useImportExcelStore = defineStore('importExcelStore', {
    state: () => ({
        isLoading: false,
        isExportLoading: false,
        isExportTemplate: false,
        isImportLoading: false,
        isDirty: false,
        importId: null as File | null,
        fileExcel: null as File | null,
        excelFilename: '',
        groupedRows: [] as any[],
        rowWatchers: new Map(),
        current: 0,
        excelErrors: {
            column_names: [],
            rows: [],
        },
        eventSource: null as EventSource | null,
        importProgress: 0,
        importValidateProgress: 0,
        isInitialImportProgress: false,
        userStore: useUserStore(),
    }),

    actions: {
        async previewExcelUpload(file: File,router:any) {
            // const router = useRouter(); // ✅ moved inside the function

            const allowedExtensions = [".xls", ".xlsx"];
            const lowerName = file.name.toLowerCase();
            const isExcelFile = allowedExtensions.some(ext => lowerName.endsWith(ext));

            if (!isExcelFile) {
                this.fileExcel = null;
                this.excelFilename = '';
                notification.warning({
                    message: "ໄຟລບໍ່ຖືກຕ້ອງ!",
                    description: "ກະລຸນາອັບໂຫລດ Excel (.xls ຫຼື .xlsx).",
                    placement: "topRight",
                    duration: 3,
                });
                return;
            }

            this.fileExcel = file;
            this.importId = file.uid;
            this.excelFilename = file.name;

            const payload = {
                formData: true,
                shipment_file: file,
                import_id: file.uid,
            }
            try {
                this.isImportLoading = true;
                // this.current++;
                await this.onUploadValidateData(payload);
                 router.push({
                    name: 'import-excel-preview',
                });
            } catch (error) {
                message.error("ຜິດພາດໃນການອັບໂຫລດ Excel");
            } finally {
                this.isImportLoading = false;
            }
        },
        async onUploadValidateData(body) {
            this.importProgress = 0;
            this.importValidateProgress = 0;
            this.isInitialImportProgress = true;
            try {
                this.eventSource = new AuthenticationEventSource(
                    `${apiUrl}/v1/auth/users/me/shipments/management/imports/pre-shipment/progress/${body.import_id}`,
                    `${this.userStore.token}`
                );

                this.eventSource.addEventListener('starting', () => {
                    this.isInitialImportProgress = true;
                })

                this.eventSource.addEventListener('progress', (event) => {
                    const data = JSON.parse(event.data)
                    if (data.use_validate) {
                        console.log(data)
                        this.isInitialImportProgress = true;
                        this.importValidateProgress = data.validate_progress;
                    } else {
                        this.isInitialImportProgress = false;
                        this.importProgress = data.progress;
                    }

                    if (data.error) {
                        this.isLoading = false;
                        console.log('Import progress failed:', data.error)
                    }
                    if (data.status === 'completed') {
                        notification.success({
                            message: "ສຳເລັດ!",
                            description: "ການໂຫລດ Excel ສຳເລັດ.",
                            placement: "topRight",
                            duration: 3,
                        });
                        console.log('Import progress completed at:', data.completed_at)
                        this.cleanUp()
                    }
                })

                this.eventSource.addEventListener('error', (event) => {
                    const data = JSON.parse(event.data)
                    console.log('Import progress error check:', data)
                    if (data.status_code !== 404) {
                        this.cleanUp()
                    }
                })

            } catch (error) {
                console.log('Check import progress axios errors: ', error);
            }

            try {
                this.isLoading = true;
                const res = await api.post(
                    "v1/auth/users/me/shipments/management/imports/pre-shipment",
                    body,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data", // Ensure it's multipart
                        },
                    }
                );
                // const response = await dataResourcesStore.manage(body);
                const validateData = res.data;
                this.excelErrors.column_names = validateData.data.column_names || [];
                this.excelErrors.rows = validateData.data.rows || [];
                // Reset map watcher
                this.rowWatchers = new Map();
                this.showValidateDialogExcel();
                this.groupedRows = this.mapGroupedRows(this.excelErrors.rows);
            } catch (e) {
                let mes = "ມີບາງຢ່າງຜິດພາດໃນການອັບໂຫລດ.";
                const responseData = e?.response?.data;

                if (responseData) {
                    const errorData = responseData.data;

                    if (errorData?.shipment_file?.invalid_file_columns) {
                        mes = "ໄຟລ Excel ບໍ່ຖືກຮູບແບບ: ຄໍລຳບໍ່ຖືກຕ້ອງ.";
                    }
                    // Optionally handle column_names and rows if present
                    this.excelErrors.column_names = errorData?.column_names || [];
                    this.excelErrors.rows.splice(0, this.excelErrors.rows.length, ...(errorData?.rows || []));
                    this.rowWatchers = new Map();
                    // Or use the main message if exists
                    mes = responseData.message || mes;
                }
                notification.error({
                    message: "ຜິດພາດ!",
                    description: mes,
                    placement: "topRight",
                    duration: 3,
                });
                this.cleanUp();
            }
            // this.groupedRows = this.mapGroupedRows(this.excelErrors.rows);
        },


        async saveUploadedData(router:any) {
            if (!this.isFormValid) {
                message.warning("ຂໍ້ມູນບໍ່ຖືກຕ້ອງ ກະລຸນາກວດສອບ ກ່ອນບັນທຶກ.",);
                return;
            }

            const payload = this.groupedRows.map(row => {
                return row.data;
            });

            // Generate unique import id
            const importId = uuidv4()
            const body = {
                formData: false,
                shipment_filename: this.excelFilename,
                shipment_payload: payload,
                import_id: importId,
            };
            this.onSavePayloadData(body,router);
        },

        async onSavePayloadData(body,router) {
            // const router = useRouter();
            this.importProgress = 0;
            this.importValidateProgress = 0;
            this.isInitialImportProgress = true;

            try {
                this.eventSource = new AuthenticationEventSource(
                    `${apiUrl}/v1/auth/users/me/shipments/management/imports/pre-shipment/progress/${body.import_id}`,
                    `${this.userStore.token}`
                );

                this.eventSource.addEventListener('starting', () => {
                    this.isInitialImportProgress = true;
                })

                this.eventSource.addEventListener('progress', (event) => {
                    const data = JSON.parse(event.data)
                    if (data.use_validate) {
                        this.isInitialImportProgress = true;
                        this.importValidateProgress = data.validate_progress;
                    } else {
                        this.isInitialImportProgress = false;
                        this.importProgress = data.progress;
                    }

                    if (data.error) {
                        this.isLoading = false;
                        console.log('Data payload progress failed:', data.error)
                    }
                    if (data.status === 'completed') {
                        notification.success({
                            message: "ສຳເລັດ!",
                            description: "ການບັນທຶກຂໍ້ມູນ ສຳເລັດ.",
                            placement: "topRight",
                            duration: 3,
                        });
                        this.excelErrors = {column_names: [], rows: []};
                        // Reset map watcher
                        this.rowWatchers = new Map();
                        this.excelFilename = null;
                        console.log('Data payload progress completed at:', data.completed_at)
                        this.cleanUp()
                        this.current++;
                        router.push({
                            name: 'import-excel-success', // force change
                        });
                    }
                })

                this.eventSource.addEventListener('error', (event) => {
                    const data = JSON.parse(event.data)
                    console.log('Data payload progress error check:', data)
                    if (data.status_code !== 404) {
                        this.cleanUp()
                    }
                })

            } catch (error) {
                console.log('Check data payload progress axios errors: ', error);
            }
            try {
                this.isLoading = true;
                const res = await api.post(
                    "v1/auth/users/me/shipments/management/imports/pre-shipment/payload",
                    body,
                );
                console.log(res)
                this.isDirty = false;
                notification.success({
                    message: "ສຳເລັດ!",
                    description: "ການບັນທຶກຂໍ້ມູນ ສຳເລັດ.",
                    placement: "topRight",
                    duration: 3,
                });
                router.push({
                    name: 'import-excel-success',
                });
                this.cleanUp();
            } catch (e) {
                let ms = "ມີບາງຢ່າງຜິດພາດໃນການບັນທຶກຂໍ້ມູນ.";
                const errorData = e?.response?.data?.data;
                if (errorData) {
                    if (!errorData.shipment_file) {
                        this.excelErrors.column_names = errorData.column_names || [];
                        // Update rows array in-place so its reference stays the same:
                        this.excelErrors.rows.splice(0, this.excelErrors.rows.length, ...(errorData.rows || []));
                        // Reset map watcher
                        this.rowWatchers = new Map();
                    }
                } else if (e?.response?.data) {
                    ms = e?.response?.data?.message ?? ms;
                }
                message.error("ມີບາງຢ່າງຜິດພາດໃນການບັນທຶກຂໍ້ມູນ");
                this.cleanUp()
            }
        },

        handleRemove() {
            this.fileExcel = null;
            this.excelFilename = '';
        },

        async cleanUp() {
            if (this.eventSource) {
                this.eventSource.close()
                this.eventSource = null
            }
            this.importProgress = 0;
            this.importValidateProgress = 0;
            this.isLoading = false;
            this.isInitialImportProgress = false;
            this.fileExcel = null;
            this.excelFilename = '';
        },
        async showValidateDialogExcel() {
            // this.showErrorDialog = true;
            // this.isDirty = true;
            // try {
            //     this.refModalError.maximizable = true;
            // } catch (e) {
            //     console.log('showValidateDialogExcel: ', e);
            // }
        },

        mapGroupedRows(rows) {
            const mapByRowIndex = {};
            rows.forEach((errorObj) => {
                const rIdx = errorObj?.row_index;
                if (rIdx === undefined || rIdx === null) return;

                if (!mapByRowIndex[rIdx]) {
                    mapByRowIndex[rIdx] = reactive({
                        data: [...(errorObj?.data || [])],
                        origin_data: [...(errorObj?.data || [])],
                        colErrors: {},
                        errorMessage: errorObj.message || "",
                        has_error: errorObj.has_error || false,
                        isValid: false,
                        rowIndex: rIdx,
                    });
                }

                if (errorObj.column_index !== undefined && errorObj.column_index !== null) {
                    mapByRowIndex[rIdx].colErrors[errorObj.column_index] = errorObj.message;
                }
            });

            const items = Object.entries(mapByRowIndex).map(([rowIndex, rowData]) => {
                return reactive({
                    ...rowData,
                    rowIndex: Number(rowIndex),
                });
            });

            items.sort((a, b) => b.has_error - a.has_error);
            return items;
        },
        // Computed property to check if the entire form is valid
        isFormValid() {
            const rows = this.groupedRows || [];
            if (rows.length === 0) return false;
            const validStates = rows.map(row => this.isRowValid(row));
            return validStates.every(valid => valid);
        },

        // Check if a row is valid
        isRowValid(row) {
            const hasErrors = row.colErrors && Object.values(row.colErrors).some((error) => {
                    return error !== null && error !== undefined && error !== ''
                }
            );

            const requiredIndices = [2, 3, 5, 6, 7, 8, 9];
            const hasAllRequiredFields = requiredIndices.every(index => row.data[index]);
            return !hasErrors && hasAllRequiredFields;
        },
        validateRow(row) {
            this.isDirty = true;
            // Clear errors if conditions are met
            const requiredIndices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12];

            // Special handling for index 11 (COD related field)
            if (row.data[10] && typeof row.data[10] === 'string' && row.data[10].includes('COD')) {
                // Index 11 is required if index 10 contains "COD"
                if (!row.data[11]) {
                    row.colErrors[11] = 'ຕ້ອງການຂໍ້ມູນເມື່ອເລືອກ COD';
                    row.isValid = false;
                } else if (row.colErrors[11]) {
                    // Clear error if value exists
                    row.colErrors[11] = '';
                }
            } else {
                // If index 10 does not contain "COD", clear any errors for index 11
                row.colErrors[11] = '';
            }

            // Handle other required fields
            for (const index of requiredIndices) {
                // Skip if no data or no error for this column
                if (!row.data[index] || !row.colErrors[index]) continue;

                // Clear error if there's no original data or if data has changed
                const hasOriginalData = !!row.origin_data[index];
                const dataHasChanged = hasOriginalData && row.data[index] !== row.origin_data[index];

                if (!hasOriginalData || dataHasChanged) {
                    row.colErrors[index] = '';
                }
            }

            // After processing all validations, update the row's validity status
            row.isValid = this.isRowValid(row);
            // row.isValid = importExcelStore.isRowValid(row);
        },
        watchRowsData() {
            // Clean up old watchers
            this.rowWatchers.forEach((unwatch, rowId) => {
                if (!this.groupedRows.some(row => row.rowIndex === rowId)) {
                    unwatch();
                    this.rowWatchers.delete(rowId);
                }
            });

            // Register new watchers
            this.groupedRows.forEach(row => {
                if (!this.rowWatchers.has(row.rowIndex)) {
                    const unwatch = watch(
                        () => [...row.data],
                        () => this.validateRow(row),
                        {deep: true}
                    );
                    this.rowWatchers.set(row.rowIndex, unwatch);
                }
            });
        },

    },
});
