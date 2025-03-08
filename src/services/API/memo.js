import { useQuery, useMutation } from "@tanstack/react-query"
import {API} from "../axiosInstance"
import { API_URL } from "../api_url"


export const useGetLatestMemo  = (payload) => {
    //payload will be {staff_id: `value`}
    return useQuery({
        queryFn: async () => {
            const res = await API.post(API_URL.latestMemo, payload)
            return res?.data?.data
          },
          queryKey: ["latest_memo"]
    })
  }
export const useGetActivities  = (payload) => {
    //payload will be {staff_id: `value`}
    return useQuery({
        queryFn: async () => {
            const res = await API.post(API_URL.activityTimeline, payload)
            return res?.data?.data
          },
          queryKey: ["get_activities"]
    })
  }
export const useViewFolder  = () => {
    const viewFolder = useMutation({
        mutationFn:async(payload)=>{
            return await API.post(API_URL.view_folder, payload)
        }
    })
    return viewFolder
  }
export const useViewMemo  = (payload) => {
    //payload will be {memo_id: `value`}
    return useQuery({
        queryFn: async () => {
            const res = await API.post(API_URL.view_memo, payload)
            return res?.data
          },
          queryKey: ["view_memo"]
    })
  }

  export const useGetMyApprovals  = () => {
    const getMyApprovals = useMutation({
        mutationFn:async(payload)=>{
            return await API.post(API_URL.my_approvals, payload)
        }
    })
    return getMyApprovals
  }
  export const useApproveMemo  = (isApprove) => {
    const approveOrDeclineMemo = useMutation({
        mutationFn:async(payload)=>{
            const res = await API.post(isApprove?API_URL.approve_memo: API_URL.decline_memo, payload)
            return res?.data
        }
    })
    return approveOrDeclineMemo
  }
