import { useCallback } from "react";
import useCurrentUser from "./useCurrentUser";
import useNotification from "./useNotification";
import { useGetNotification } from "../services/API/notification";



const useGetNotificationData = () => {
    const {mutateAsync:getNotification} = useGetNotification()
    const {updateData} = useNotification()
    const {userData} = useCurrentUser()



    
    const getAvailableNotification = useCallback( async () => {
            try {
                const json =  {
                        "staff_id": userData?.data?.STAFF_ID,
                        "company_id": userData?.data?.COMPANY_ID
                }
               const res = await getNotification(json)
               if(res){
                const awaiting_approval   = res?.data?.data['awaiting my_approval']
                const treated_requests   = res?.data?.data['my_treated_requests']
                const result = {awaiting_approval, treated_requests}
                updateData(result)
               }
            } catch (error) { 
                console.log(error)
            }
      }, [getNotification, userData?.data, updateData]);


  return {getAvailableNotification}
}

export default useGetNotificationData
