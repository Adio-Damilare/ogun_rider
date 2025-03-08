import { useMutation } from "@tanstack/react-query"
import { API } from "../axiosInstance"

export const useGetNotification  = () => {
  return useMutation({
    mutationFn: (json) => {
      return API.post('/memoai/notifications', json);
    },
  });
  }
  

  export const useSeenNotification = () => {
    return useMutation({
      mutationFn: (body) => {
        return API.post('memoai/check_approval', body);
      },
    });
  };    