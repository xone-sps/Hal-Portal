export declare const useImportExcelStore: import("pinia").StoreDefinition<"importExcelStore", {
    isLoading: boolean;
    isExportLoading: boolean;
    isExportTemplate: boolean;
    isImportLoading: boolean;
    isDirty: boolean;
    importId: File | null;
    fileExcel: File | null;
    excelFilename: string;
    groupedRows: any[];
    rowWatchers: Map<any, any>;
    current: number;
    excelErrors: {
        column_names: never[];
        rows: never[];
    };
    eventSource: EventSource | null;
    importProgress: number;
    importValidateProgress: number;
    isInitialImportProgress: boolean;
    userStore: any;
}, {}, {
    previewExcelUpload(file: File, router: any): Promise<void>;
    onUploadValidateData(body: any): Promise<void>;
    saveUploadedData(router: any): Promise<void>;
    onSavePayloadData(body: any, router: any): Promise<void>;
    handleRemove(): void;
    cleanUp(): Promise<void>;
    showValidateDialogExcel(): Promise<void>;
    mapGroupedRows(rows: any): any[];
    isFormValid(): boolean;
    isRowValid(row: any): boolean;
    validateRow(row: any): void;
    watchRowsData(): void;
}>;
