import apiClient from "./http";

export const getUserProfile = async () => {
    const response = await apiClient.get("/user/profile");
    return response.data;
};

export default {
    getUserProfile,
};
