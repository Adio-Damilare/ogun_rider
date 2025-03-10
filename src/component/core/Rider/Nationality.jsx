import React, { useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { Button } from "antd";
import { useGetCountry, useGetState } from "@/services/API";
import useRiderState from "@/hooks/newRider";

const Nationality = ({ onNext, onPrev, onClose } = {}) => {
  const updateData = useRiderState((state) => state.updateData);
  const [country, setCountry] = useState(null);
  const { data: { data:countries = [] } = {}, isLoading: isLoadingCountries } =
    useGetCountry();
  const { data: { data:states = [] } = {}, isLoading: isLoadingStates } =
  useGetState(country);
  const nationality = countries.map((item) => ({
    value: item.id,
    label: item.nationality,
  }));
  const formatedstates = states.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const handleSubmit = () => {
    updateData({ step: "personal" });
  };
  return (
    <section className=" py-4 px-6">
      <h1 className="text-bold text-2xl text-center">
        Nationality Information
      </h1>
      <div className="space-y-6 pb-9">
        <div className=" flex flex-col space-y-1">
          <label htmlFor="email" className="font-medium text-gray-600 text-sm">
            Nationality
          </label>
          <Select
            placeholder="Nationality"
            isLoading={isLoadingCountries}
            isDisabled={isLoadingCountries}
            onChange={({ value }) => setCountry(value)}
            options={nationality}
            className=""
          />
          {/* {errors.email && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )} */}
        </div>

        <div className=" flex flex-col space-y-1">
          <label htmlFor="email" className="font-medium text-gray-600 text-sm">
            State of origin
          </label>
          <Select
            // isDisabled={}
            // isLoading
            placeholder="State of origin"
            options={formatedstates}
            className=""
          />
          {/* {errors.email && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )} */}
        </div>

        <div className=" flex flex-col space-y-1">
          <label htmlFor="email" className="font-medium text-gray-600 text-sm">
            Rider Identity
          </label>
          <input
            type="text"
            id="email"
            name="maiden_name"
            placeholder="Rider Identity"
            className="mt-1 w-full border bg-white py-4 lg:py-[0.575rem] px-3 focus:outline-none text-gray-800 rounded text-[13px]"
          />
          {/* {errors.email && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )} */}
        </div>

        <div className="mt-6 flex justify-between">
          <Button
            size="middle"
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-5 px-4 rounded"
          >
            Back
          </Button>
          <div className="space-x-5">
            <Button
              size="middle"
              type="submit"
              className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-5 px-4 rounded"
            >
              Save Draft
            </Button>
            <Button
              size="middle"
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-5 px-4 rounded"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Nationality;
Nationality.prototype = {
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  onClose: PropTypes.func,
};
