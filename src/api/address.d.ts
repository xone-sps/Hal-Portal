export interface AddressResponse {
    provinces: {
        id: number;
        name: string;
    }[];
    districts: {
        id: number;
        name: string;
        province_id: number;
    }[];
    villages: {
        id: number;
        name: string;
        district_id: number;
    }[];
}
/**
 * Fetch address data (provinces, districts, villages)
 * @returns Promise with the address data
 */
export declare const fetchAddressData: () => Promise<AddressResponse>;
