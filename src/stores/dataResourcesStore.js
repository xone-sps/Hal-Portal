import { defineStore } from 'pinia';
import { api } from '@/plugins/axios';
export const useDataResourcesStore = defineStore('dataResourcesStore', {
    actions: {
        async manage(body) {
            try {
                const response = await api({
                    url: body.actionUri,
                    method: body._method || 'post',
                    data: body.formData ? createFormData(body) : body,
                    headers: body.formData ? { 'Content-Type': 'multipart/form-data' } : {},
                });
                return response.data;
            }
            catch (error) {
                console.error("Failed to manage data:", error);
                throw error;
            }
        },
    },
});
// helper to convert payload to FormData if needed
function createFormData(data) {
    const formData = new FormData();
    for (const key in data) {
        if (data[key] != null) {
            formData.append(key, data[key]);
        }
    }
    return formData;
}
