import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";

const useLogin = () => {
  const queryClient = useQueryClient();
  
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post("auth/login", data);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  return { error, isPending, loginMutation: mutate };
};

export default useLogin;
