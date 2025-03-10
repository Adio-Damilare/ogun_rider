import React from "react";
import { useGetRider } from "@/services/API";
import { useParams } from "react-router-dom";

const index = () => {
  const { rider } = useParams();
  const { data: riderData } = useGetRider({ rider_id: rider });
  console.log(riderData);
  return (
    <div>
      <h1>User Rider</h1>
    </div>
  );
};

export default index;
