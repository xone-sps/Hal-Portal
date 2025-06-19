import axios from "axios";
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // Use environment variables
    timeout: 10000, // 10 seconds timeout
    headers: {
        "Content-Type": "application/json",
    },
});
// Request Interceptor
apiClient.interceptors.request.use((config) => {
    // Add Authorization token if available
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));
// Response Interceptor
apiClient.interceptors.response.use((response) => response, (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
});
export default apiClient;
