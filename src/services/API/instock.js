import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../axiosInstance";

export const useCreateInflow = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post("/inflow/create", payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["instock_record"]);
    },
  });
};

export const useGetInstockRecord = (payload) => {
  //payload will be {staff_id: `value`}
  return useQuery({
    queryKey: ["instock_record", payload],
    queryFn: async () => {
      const res = await API.post("/inflow/instore", payload);
      return res?.data;
    },
  });
};
export const useViewStock = (payload) => {
  //payload will be {memo_id: `value`}
  console.log(payload);
  return useQuery({
    queryFn: async () => {
      const res = await API.post("/inflow/instore_view", payload);
      return res?.data;
    },
    queryKey: ["view_stock"],
  });
};
// export const useGetActivities  = (payload) => {
//     //payload will be {staff_id: `value`}
//     return useQuery({
//         queryFn: async () => {
//             const res = await API.post(API_URL.activityTimeline, payload)
//             return res?.data?.data
//           },
//           queryKey: ["get_activities"]
//     })
//   }
// export const useViewFolder  = () => {
//     const viewFolder = useMutation({
//         mutationFn:async(payload)=>{
//             return await API.post(API_URL.view_folder, payload)
//         }
//     })
//     return viewFolder
//   }

//   export const useGetMyApprovals  = () => {
//     const getMyApprovals = useMutation({
//         mutationFn:async(payload)=>{
//             return await API.post(API_URL.my_approvals, payload)
//         }
//     })
//     return getMyApprovals
//   }
//   export const useApproveMemo  = (isApprove) => {
//     const approveOrDeclineMemo = useMutation({
//         mutationFn:async(payload)=>{
//             const res = await API.post(isApprove?API_URL.approve_memo: API_URL.decline_memo, payload)
//             return res?.data
//         }
//     })
//     return approveOrDeclineMemo
//   }
