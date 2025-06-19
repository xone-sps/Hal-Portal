export declare const useExportStore: import("pinia").StoreDefinition<"export", {
    isExportLoading: boolean;
    isExportTemplate: boolean;
    isImportLoading: boolean;
}, {}, {
    exportExcel({ startDate, endDate, status, query }: {
        startDate: string;
        endDate: string;
        status: string;
        query: string;
    }): Promise<void>;
    exportTemplate(): Promise<void>;
    importExcel(data: any): Promise<any>;
    onUploadValidateData(body: any): Promise<void>;
}>;
