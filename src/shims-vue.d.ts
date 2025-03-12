import { useNotificationStore } from "@/stores/useNotificationStore";

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $notification: ReturnType<typeof useNotificationStore>;
    }
}
