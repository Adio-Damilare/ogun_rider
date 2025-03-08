import { useQuery } from "@tanstack/react-query";
import { API } from "../axiosInstance";

export const useGetAsset = (json) => {
  return useQuery({
    queryKey: ["get_assets"],
    queryFn: async () => {
      const res = await API.post(`/inflow/get_parameters`, {
        staff_id: json?.staff_id,
        region_id: json?.region_id,
      });
      return res?.data?.assets_categories;
    },
  });
};

export const useGetProducts = (json) => {
  return useQuery({
    queryKey: ["get_products", json],
    queryFn: async () => {
      const res = await API.post(`/inflow/get_products`, {
        region_id: json?.region_id,
      });
      return res?.data?.data;
    },
  });
};
