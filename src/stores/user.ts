import { defineStore } from "pinia";
import { getUserProfile } from "@/api/user";

interface UserState {
    user: null | { id: string; name: string; email: string };
    isLoading: boolean;
}

export const useUserStore = defineStore("user", {
    state: (): UserState => ({
        user: null,
        isLoading: false,
    }),

    actions: {
        async fetchUser() {
            this.isLoading = true;
            try {
                this.user = await getUserProfile();
            } catch (error) {
                console.error("Failed to fetch user:", error);
            } finally {
                this.isLoading = false;
            }
        },
    },
});
