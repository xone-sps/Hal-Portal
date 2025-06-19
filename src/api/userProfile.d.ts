import { UserProfile } from "../types/UserProfile.ts";
export declare const fetchUserProfile: () => Promise<UserProfile>;
/**
 * Update user info
 * @param userInfo - The user information to update
 * @returns Promise with the API response
 */
export declare const updateUserProfile: (userInfo: Partial<UserProfile>) => Promise<void>;
export declare const changePassword: (data: {
    phone: string;
    password: string;
}) => Promise<void>;
