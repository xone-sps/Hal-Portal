import axios from 'axios';
import { useUserStore } from '@/stores/useUserStore';

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL
});

// Flag to prevent infinite loop
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (token) {
            prom.resolve(token);
        } else {
            prom.reject(error);
        }
    });
    failedQueue = [];
};

// Interceptor for requests
api.interceptors.request.use(
    (config) => {
        const userStore = useUserStore();
        if (userStore.token) {
            config.headers['Authorization'] = `Bearer ${userStore.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor for responses
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const userStore = useUserStore();

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                try {
                    const newToken = await new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    });
                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                    return api(originalRequest);
                } catch (err) {
                    return Promise.reject(err);
                }
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const success = await userStore.refreshTokenAction();
                if (success) {
                    originalRequest.headers['Authorization'] = `Bearer ${userStore.token}`;
                    processQueue(null, userStore.token);
                    return api(originalRequest);
                } else {
                    processQueue(new Error('Refresh token failed'));
                    return Promise.reject(error);
                }
            } catch (refreshError) {
                processQueue(refreshError);
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;
