import { useMutation, useQuery } from "@tanstack/react-query"
import http  from "../axiosInstance"

export const useLogin = ()=>{
    return useMutation({
        mutationFn: async(payload)=>{
            return await http.post('/og_login/user_login', payload,{intercept:false})
        }
    })
}

export const useGetRider  = (payload) => {
    return useQuery({
        queryFn: async () => {
            const res = await http.post('/users/view_rider', payload)
            return res?.data
          },
          queryKey: ["rider"]
    })
  }