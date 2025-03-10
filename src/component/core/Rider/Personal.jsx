import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import useRiderState from "@/hooks/newRider"
import { Button, DatePicker } from "antd";
const genders = [
  {
    value: "male",
    label: "Male",
  },
  {
    value: "female",
    label: "Female",
  },
  {
    value: "other",
    label: "Other",
  },
];
const marital = [
  {
    value: "single",
    label: "Single",
  },
  {
    value: "married",
    label: "Married",
  },
  {
    value: "divorce",
    label: "Divorce",
  },
];

const Personal = ({ onNext, onPrev, onClose } = {}) => {
  const updateData=useRiderState((state)=>state.updateData);
  const handleSubmit=()=>{
    updateData({step:"nationality"})
  }
  return (
    <section className=" py-4 px-6">
      <h1 className="text-bold text-2xl text-center">Personal Information</h1>
      <div className="space-y-6 pb-9">
        <div className=" flex flex-col space-y-1">
          <label htmlFor="email" className="font-medium text-gray-600 text-sm">
            First Name
          </label>
          <input
            type="text"
            id="email"
            name="fist_name"
            placeholder="First Name"
            className="mt-1 w-full border bg-white py-4 lg:py-[0.575rem] px-3 focus:outline-none text-gray-800 rounded text-[13px]"
          />
          {/* {errors.email && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )} */}
        </div>
        <div className=" flex flex-col space-y-1">
          <label htmlFor="email" className="font-medium text-gray-600 text-sm">
            Last Name
          </label>
          <input
            type="text"
            id="email"
            name="last_name"
            placeholder="Last Name"
            className="mt-1 w-full border bg-white py-4 lg:py-[0.575rem] px-3 focus:outline-none text-gray-800 rounded text-[13px]"
          />
          {/* {errors.email && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )} */}
        </div>
        <div className=" flex flex-col space-y-1">
          <label htmlFor="email" className="font-medium text-gray-600 text-sm">
            Other Name
          </label>
          <input
            type="text"
            id="email"
            name="other_name"
            placeholder="Other Name"
            className="mt-1 w-full border bg-white py-4 lg:py-[0.575rem] px-3 focus:outline-none text-gray-800 rounded text-[13px]"
          />
          {/* {errors.email && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )} */}
        </div>

        <div className=" flex flex-col space-y-1">
          <label htmlFor="email" className="font-medium text-gray-600 text-sm">
            Gender
          </label>
          <Select placeholder="Gender" options={genders} className="" />
          {/* {errors.email && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )} */}
        </div>

        <div className=" flex flex-col space-y-1">
          <label htmlFor="email" className="font-medium text-gray-600 text-sm">
            Marital Status
          </label>
          <Select placeholder="Marital status" options={marital} className="" />
          {/* {errors.email && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )} */}
        </div>

        <div className=" flex flex-col space-y-1">
          <label htmlFor="email" className="font-medium text-gray-600 text-sm">
            Maiden Name
          </label>
          <input
            type="text"
            id="email"
            name="maiden_name"
            placeholder="Maiden Name"
            className="mt-1 w-full border bg-white py-4 lg:py-[0.575rem] px-3 focus:outline-none text-gray-800 rounded text-[13px]"
          />
          {/* {errors.email && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )} */}
        </div>
        <div className=" flex flex-col space-y-1">
          <label htmlFor="email" className="font-medium text-gray-600 text-sm">
            Date of Birth
          </label>
          <DatePicker className=" py-2 focus:border-none" label="Birth date" />
          {/* {errors.email && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )} */}
        </div>
        <div className="mt-6">
          <Button
            size="middle"
            onClick={handleSubmit}
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Next
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Personal;
Personal.prototype = {
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  onClose: PropTypes.func,
};
