import { useMutation, useQuery } from "@tanstack/react-query";
import http from "../axiosInstance";
import axios from "axios";
const IDENTITY_URL= import.meta.env.VITE_IDENTITY_URL;

export const useLogin = () => {
  return useMutation({
    mutationFn: async (payload) => {
      return await http.post("/og_login/user_login", payload, {
        intercept: false,
      });
    },
  });
};

export const useGetRider = (payload) => {
  return useQuery({
    queryFn: async () => {
      const res = await http.post("/users/view_rider", payload, {
        intercept: false,
      });
      return res?.data;
    },
    queryKey: ["rider"],
  });
};

export const useGetCountry = () => {
  return useQuery({
    queryKey: ["country"],
    queryFn: async () => {
      const res = await http.get("/og_resources/get_nationality", {
        intercept: false,
      });
      return res.data;
    },
  });
};

export const useGetState = () => {
  return useMutation({
    mutationFn: async (nationality_id) => {
      const res = await http.get(
        `/og_resources/get_state/${nationality_id}`,
        {
          intercept: false,
        }
      );
      return res?.data;
    },
  });
};
export const useGetLGA = () => {
  return useMutation({
    mutationFn: async (state_id) => {
      const res = await http.get(
        `/og_resources/get_nigeria_lga/${state_id}`,
        {
          intercept: false,
        }
      );
      return res?.data;
    },
  });
};

export const useGetDistrict= () => {
  return useQuery({
    queryKey: ["district"],
    queryFn: async () => {
      const res = await http.get("/og_resources/get_district", {
        intercept: false,
      });
      return res.data;
    },
  });
};
export const useGetDistrictLGA = () => {
  return useMutation({
    mutationFn: async (district_id) => {
      const res = await http.get(
        `/og_resources/get_district_lga/${district_id}`,
        {
          intercept: false,
        }
      );
      return res?.data;
    },
  });
};

export const useSaveBase64 = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const res = await http.post(
        `/attachment/baseConversion`,
        payload,
        {
          intercept: false,
        }
      );
      return res?.data;
    },
  });
};
export const useVerifyDocument = () => {
  return useMutation({
    mutationFn: async ({type,number}) => {
      const res= await axios.post(`${IDENTITY_URL}${type}`,{number})
      return res.data;
    },
  });
};
