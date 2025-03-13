import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { PiSpinner } from "react-icons/pi";

const index = () => {
  const { rider } = useParams();
  useEffect(()=>{
    location.replace(`https://ogun-ride.netlify.app/rider/${rider}`);
  },[rider])
  // const { data: riderData } = useGetRider({ rider_id: rider });
  // console.log(riderData);
  return (
    <div>
      <div className="">
        <PiSpinner size={20} className=" animate-spin"/>
      </div>
    </div>
  );
};

export default index;
