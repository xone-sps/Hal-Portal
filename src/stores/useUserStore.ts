import { defineStore } from 'pinia';
import axios from '@/plugins/axios';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || '',
        refreshToken: localStorage.getItem('refresh_token') || '',
        permissions: [],
    }),
    actions: {
        async signIn(data: { phone: string; password: string }) {
            try {
                const response = await axios.post('/sign-in', {
                    tel: data.phone,
                    password: data.password,
                });

                if (response.data) {
                    const { access_token, refresh_token, authUser, permissionRole } = response.data;

                    this.token = access_token;
                    this.refreshToken = refresh_token;
                    this.user = authUser;
                    this.permissions = permissionRole;

                    // ✅ Save to localStorage
                    localStorage.setItem('token', access_token);
                    localStorage.setItem('refresh_token', refresh_token);
                    localStorage.setItem('user', JSON.stringify(authUser));
                    localStorage.setItem('permissions', JSON.stringify(permissionRole));

                    // ✅ Set axios header
                    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
                }
            } catch (error) {
                throw error;
            }
        },

        async logout() {
            this.token = '';
            this.refreshToken = '';
            this.user = null;
            this.permissions = [];

            // ✅ Clear storage
            localStorage.removeItem('token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
            localStorage.removeItem('permissions');

            delete axios.defaults.headers.common['Authorization'];
        },

        // ✅ Restore user data from localStorage on app startup
        loadUser() {
            const token = localStorage.getItem('token');
            const refreshToken = localStorage.getItem('refresh_token');
            const user = localStorage.getItem('user');
            const permissions = localStorage.getItem('permissions');

            if (token && user) {
                this.token = token;
                this.refreshToken = refreshToken || '';
                this.user = JSON.parse(user);
                this.permissions = JSON.parse(permissions || '[]');

                // ✅ Set token in axios
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
        },
    },
});
