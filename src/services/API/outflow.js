import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../axiosInstance";

export const useCreateOutflow = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post("/outflow/create", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["outstore_record"]);
    },
  });
};

export const useGetOutstoreRecord = (payload) => {
  return useQuery({
    queryKey: ["outstore_record", payload],
    queryFn: async () => {
      const res = await API.post("outflow/outstore", payload);
      return res?.data?.data;
    },
  });
};
export const useViewOutStore = (payload) => {
  return useQuery({
    queryFn: async () => {
      const res = await API.post("outflow/oustore_view", payload);
      return res?.data;
    },
    queryKey: ["view_outstore"],
  });
};
