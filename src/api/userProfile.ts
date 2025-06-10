import { api } from "../plugins/axios.ts"; // Adjusted the import path to match the project structure
import { UserProfile } from "../types/UserProfile.ts";
import dayjs, { Dayjs } from "dayjs";

// Fetch user profile data
export const fetchUserProfile = async (): Promise<UserProfile> => {
  try {
    const response = await api.get<UserProfile>("/user-info"); // Use `api` instead of `axios`
    return response.data;
  } catch (error) {
    throw error;
  }
};


/**
 * Update user info
 * @param userInfo - The user information to update
 * @returns Promise with the API response
 */
export const updateUserProfile = async (userInfo: Partial<UserProfile>): Promise<void> => {
    const url = "/edit-profile"; // Endpoint for updating user info
  
    // Prepare the form data
    const formData = new FormData();
    formData.append("_method", "PUT"); // Laravel-specific method override
    formData.append("name", userInfo.name || "");
    formData.append("surname", userInfo.surname || "");
    formData.append("dob", userInfo.dob ? dayjs(userInfo.dob).format("YYYY-MM-DD") : ""); // Format dob
    formData.append("gender", userInfo.gender || "");
    formData.append("province_id", userInfo.province_id?.toString() || "");
    formData.append("district_id", userInfo.district_id?.toString() || "");
    formData.append("village_id", userInfo.village_id?.toString() || "");
  
    // Add the profile picture if provided
    if (userInfo.profile_picture_path) {
      formData.append("profile_picture", userInfo.profile_picture_path as File);
    }
  
    try {
      // Send the request using the configured `api` instance
      await api.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure multipart form data is sent
        },
      });
    } catch (error) {
      console.error("Failed to update user info:", error);
      throw error;
    }
  };

   export const changePassword = async (data: { phone: string; password: string }) => {
            try {
                const response = await api.post('/change-password', {
                    tel: data.phone,
                    password: data.password,
                });

                if (response.data) {
                    const { access_token, refresh_token, authUser, permissionRole } = response.data;

                    // ✅ Save to localStorage
                    localStorage.setItem('token', access_token);
                    localStorage.setItem('refresh_token', refresh_token);
                    localStorage.setItem('user', JSON.stringify(authUser));
                    localStorage.setItem('permissions', JSON.stringify(permissionRole));

                    // ✅ Set api header
                    api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
                }
            } catch (error) {
                throw error;
            }
        };
