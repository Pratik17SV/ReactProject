import { axiosInstance } from "../lib/axios";


export const getAuthUser = async () => {
    try {
            const res = await axiosInstance.get("/auth/me");
            return res.data;
    } catch (error) {
      console.error("Error fetching getauthuser in api:", error);
      return null;
    }
};

export const completeOnboarding = async (formData) => {
   const response = await axiosInstance.post("/auth/onboarding", formData)
   return response.data;
};
export const logout = async () => {
      const res = await axiosInstance.post("/auth/logout");
      return res.data;
}

export async function getUserFriends() {
    try {
        const res = await axiosInstance.get("/users/friends");
        // Return the friends array directly
        return res.data?.friends ?? [];
    } catch (error) {
        console.error("Error fetching user friends in api:", error);
        return null;
    }
}

export async function getRecommendedUsers() {
  const res = await axiosInstance.get("/users");
  // Return the users array directly
  return res.data?.users ?? [];
}

export async function getOutgoingFriendReqs() {
  const res = await axiosInstance.get("/users/outgoingFriendReqs");
  // Return the outgoingRequests array directly
  return res.data?.outgoingRequests ?? [];
}

export async function sendFriendRequest(userId) {
  const res = await axiosInstance.post(`/users/friend-request/${userId}`);
  return res.data;
}