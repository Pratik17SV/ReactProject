import { useRouteLoaderData } from "react-router-dom";
import { axiosInstance } from "../lib/axios";


export const getAuthUser = async () => {
      const res = await axiosInstance.get("/auth/me");
      return res.data;
};

export const completeOnboarding = async (formData) => {
   const response = await axiosInstance.post("/auth/onboarding", formData)
   return response.data;
};