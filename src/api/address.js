import { api } from "@/plugins/axios";
/**
 * Fetch address data (provinces, districts, villages)
 * @returns Promise with the address data
 */
export const fetchAddressData = async () => {
    try {
        const response = await api.get("/list-address");
        return response.data;
    }
    catch (error) {
        console.error("Failed to fetch address data:", error);
        throw error;
    }
};
