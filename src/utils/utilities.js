
import moment from "moment";


export const toStringDate =(value)=>{
    if(!value) return null;
   const res = moment(value)?.format('Do [of] MMMM, YYYY')

   if( !res || res === "1st of January, 1900") {
    return null
   }else{
    return res
   }
  } 