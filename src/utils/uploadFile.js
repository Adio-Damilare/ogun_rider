import axios from "axios";
import { errorToast } from "./toastPopUp";


export const uploadFileData = async (file, userToken) => {


    const formData = new FormData();
    formData.append("file", file);

    const res = await uploadFile(formData, userToken);
    if (res) {
      // console.log(res)
      return res;
    }
  };


  const uploadFile = async (formData, token) => {
    try {
      const res = await axios({
        method: "post",
        url: "https://hr.ncaa.gov.ng/old_hr/apis/" +"attachment/addChatFile",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          token: token,
        },
      });

      if (res) {
        return res.data;
      }
    } catch (err) {
        errorToast(err?.response?.data?.message || err?.message);
    }
  };