import { api } from "@/plugins/axios";

export interface AddressResponse {
  provinces: { id: number; name: string }[];
  districts: { id: number; name: string; province_id: number }[];
  villages: { id: number; name: string; district_id: number }[];
}

/**
 * Fetch address data (provinces, districts, villages)
 * @returns Promise with the address data
 */
export const fetchAddressData = async (): Promise<AddressResponse> => {
  try {
    const response = await api.get<AddressResponse>("/list-address");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch address data:", error);
    throw error;
  }
};