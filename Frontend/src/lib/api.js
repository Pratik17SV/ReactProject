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