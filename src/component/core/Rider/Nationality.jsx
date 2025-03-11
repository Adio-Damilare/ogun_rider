import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { Button } from "antd";
import { useGetCountry, useGetState } from "@/services/API";
import useRiderState from "@/hooks/newRider";
import AnimationWrapper from "@/component/core/Rider/AnimationWrapper.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";

const Nationality = ({ onNext, onPrev, onClose } = {}) => {
  const updateData = useRiderState((state) => state.updateData);
  const previousData = useRiderState((state) => state.data.data);
  const [states, setStates] = useState([]);
  const { data: { data: countries = [] } = {}, isLoading: isLoadingCountries } =
    useGetCountry();
  const { mutateAsync: mutate, isPending: isLoadingStates } = useGetState();

  const nationality = countries.map((item) => ({
    value: item.id,
    label: item.nationality,
  }));
  const handleGetStates = async (nationality_id) => {
    const { data = [] } = await mutate(nationality_id);
    setStates((prev) => {
      return data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
    });
  };


  const formik = useFormik({
    initialValues: {
      nationality:previousData.nationality??"",
      state_of_origin: previousData.state_of_origin??"",
      rider_id: previousData.rider_id??"",
    },
    onSubmit: (values) => {
      updateData({ step: "contact", data: { ...previousData, ...values } });
    },
    validationSchema: Yup.object().shape({
      nationality: Yup.string().required("Nationality is required"),
      state_of_origin: Yup.string().required("State of origin is required"),
      rider_id: Yup.string(),
    }),
  });

  useEffect(() => {
    if (formik.values.nationality) {
      const country=nationality.find((item) => item.label === formik.values.nationality)?.value;
      if(!country)return;
      console.log(country)
      handleGetStates(country);

    }
  }, [formik.values.nationality]);

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  const ErrorMessage = ({ name }) => {
    if (formik.touched[name] && formik.errors[name]) {
      return (
        <div className="text-red-500 italic text-[0.8rem] mt-1">
          {formik.errors[name]}
        </div>
      );
    }
    return null;
  };
  return (
    <AnimationWrapper>
      <section className=" py-4 px-6">
        <h1 className="text-bold text-2xl text-center">Nationality</h1>
        <div className="space-y-6 pb-9">
          <div className=" flex flex-col space-y-1">
            <label
              htmlFor="email"
              className="font-medium text-gray-600 text-sm"
            >
              Nationality
            </label>
            <Select
              placeholder="Nationality"
              isLoading={isLoadingCountries}
              isDisabled={isLoadingCountries}
              value={nationality.find((item) => item.label === formik.values.nationality)}
              onChange={({ value }) => {
                setStates([]);
                const find = nationality.find(
                  (item) => item.value === value
                ).label;
                formik.setFieldValue("nationality", find);
              }}
              options={nationality}
              className=""
            />
            <ErrorMessage name="nationality" />
          </div>

          <div className=" flex flex-col space-y-1">
            <label
              htmlFor="email"
              className="font-medium text-gray-600 text-sm"
            >
              State of origin
            </label>
            <Select
              isDisabled={isLoadingStates || !formik.values.nationality}
              isLoading={isLoadingStates}
              placeholder="State of origin"
              value={states.find((item) => item.label === formik.values.state_of_origin)}
              options={states}
              onChange={({ value }) => {
                const find = states.find((item) => item.value === value).label;
                formik.setFieldValue("state_of_origin", find);
              }}
              className=""
            />
            <ErrorMessage name="state_of_origin" />
          </div>

          <div className=" flex flex-col space-y-1">
            <label
              htmlFor="email"
              className="font-medium text-gray-600 text-sm"
            >
              Rider Identity
            </label>
            <input
              type="text"
              id="email"
              name="rider_id"
              placeholder="Rider Identity"
              onChange={formik.handleChange}
              value={formik.values.rider_id}
              onBlur={formik.handleBlur}
              className="mt-1 w-full border bg-white py-4 lg:py-[0.575rem] px-3 focus:outline-none text-gray-800 rounded text-[13px]"
            />
            <ErrorMessage name="rider_id" />
          </div>

          <div className="mt-6 flex justify-between">
            <Button
              size="middle"
              type="submit"
              onClick={()=>{
                updateData({step:"personal"})
              }}
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
                onClick={handleSubmit}
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-5 px-4 rounded"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default Nationality;
Nationality.prototype = {
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  onClose: PropTypes.func,
};
