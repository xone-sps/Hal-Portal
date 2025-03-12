import { defineStore } from "pinia";
import { notification } from "ant-design-vue";

export const useNotificationStore = defineStore("notification", () => {
    // Success Notification
    const success = (message: string, description?: string) => {
        notification.success({
            message,
            description,
            placement: "topRight",
            duration: 5, // Auto close in 5 seconds
        });
    };

    // Error Notification
    const error = (message: string, description?: string) => {
        notification.error({
            message,
            description,
            placement: "topRight",
            duration: 5,
        });
    };

    // Warning Notification
    const warning = (message: string, description?: string) => {
        notification.warning({
            message,
            description,
            placement: "topRight",
            duration: 5,
        });
    };

    // Info Notification
    const info = (message: string, description?: string) => {
        notification.info({
            message,
            description,
            placement: "topRight",
            duration: 5,
        });
    };

    return { success, error, warning, info };
});
