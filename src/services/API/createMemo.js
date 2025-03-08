import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../axiosInstance";
import { API_URL } from "../api_url";

export const useCreateMemo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(API_URL.create_memo, payload);
    },
    onSuccess:()=>{
      queryClient.invalidateQueries(["latest_memo"])
    }
  });
};
