import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        token: null,
    }),

    actions: {
        async login(email: string, password: string) {
            try {
                const response = await axios.post('/sign-in', {
                    email,
                    password
                });

                this.user = response.data.user;
                this.token = response.data.token;

                // Save token to local storage
                localStorage.setItem('token', response.data.token);

                // Set authorization header for future requests
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

                return response.data;
            } catch (error) {
                console.error('Login failed:', error);
                throw error;
            }
        },

        logout() {
            this.user = null;
            this.token = null;
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        },
    },
});
