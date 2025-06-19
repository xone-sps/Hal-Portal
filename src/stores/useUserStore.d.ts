export declare const useUserStore: import("pinia").StoreDefinition<"user", {
    user: null;
    token: string;
    refreshToken: string;
    permissions: never[];
}, {}, {
    signIn(data: {
        phone: string;
        password: string;
    }): Promise<void>;
    logout(): Promise<void>;
    loadUser(): void;
}>;
