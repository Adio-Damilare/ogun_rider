import { useQuery } from "@tanstack/react-query"
import { API } from "../axiosInstance"
import { API_URL } from "../api_url"

export const useCheckSignature=(payload)=>{
    //payload include approving_staff_id
    return useQuery({
        queryKey: ["check_signature"],
        queryFn: async()=>{
            let res = await API.post(API_URL.check_signature_exist, payload)
            return res?.data
        }
    })
}