import { useMutation, useQuery } from "@tanstack/react-query";
import { API } from "../axiosInstance";
// import { API_URL } from "../api_url";

export const useCreateFolder = () => {
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post("/memoai/create_folder", payload);
    },
  });
};

export const useListFolder  = (json) => {
    return useQuery({
        queryFn: async () => {
            const res = await API.post(`/memoai/list_folder`, json)
            return res?.data?.data
          },
          queryKey: ["list_folder"]
    })
  }

export const useListFolderStatus  = (json) => {
    return useQuery({
        queryFn: async () => {
            const res = await API.post(`/memoai/list_folder_status`, json)
            return res?.data?.data
          },
          queryKey: ["list_folder_status"]
    })
}

