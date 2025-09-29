import { useRouteLoaderData } from "react-router-dom";
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
        return res.data;
    } catch (error) {
        console.error("Error fetching user friends in api:", error);
        return null;
    }
}

export async function getRecommendedUsers() {
  const res = await axiosInstance.get("/users");
  return res.data;
}

export async function getOutgoingFriendReqs() {
  const res = await axiosInstance.get("/users/outgoingFriendReqs");
  return res.data;   
}

export async function sendFriendRequest(userId) {
  const res = await axiosInstance.post(`/users/friend-request/${userId}`);
  return res.data;
}