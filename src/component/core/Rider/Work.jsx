import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { Button } from "antd";
import { useGetDistrict, useGetDistrictLGA } from "@/services/API";
import useRiderState from "@/hooks/newRider";
import AnimationWrapper from "@/component/core/Rider/AnimationWrapper.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";

const Work = ({ onNext, onPrev, onClose } = {}) => {
  const updateData = useRiderState((state) => state.updateData);
  const previousData = useRiderState((state) => state.data.data);
  const [districtLga, setDistrictLga] = useState([]);
  const { data: { data: districts = [] } = {}, isLoading: isLoadingDistrict } =
    useGetDistrict();
  const { mutateAsync: mutate, isPending: isLoadingDistrictLga } =
    useGetDistrictLGA();

  const formattedDistrict = districts.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const formik = useFormik({
    initialValues: {
      work_district: previousData.work_district ?? "",
      work_lga: previousData.work_lga ?? "",
      work_union: previousData.work_union ?? "",
    },
    onSubmit: (values) => {
      updateData({ step: "identity", data: { ...previousData, ...values } });
    },
    validationSchema: Yup.object().shape({
      work_district: Yup.string().required("Work District is required"),
      work_lga: Yup.string().required(
        "Work District Local Government is required"
      ),
      work_union: Yup.string().required("Work Union is required"),
    }),
  });
  useEffect(() => {
    (async () => {
      if (formik.values.work_district) {
        const value = formattedDistrict.find(
          (item) => item.label === formik.values.work_district
        )?.value;
        if(!value) return
        const { data = [] } = await mutate(value);
        setDistrictLga((prev) => {
          return data.map((item) => ({
            value: item.id,
            label: item.name,
          }));
        });
      }
    })();
  }, [formik.values.work_district]);

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
        <h1 className="text-bold text-2xl text-center">Work Detail's</h1>
        <div className="space-y-6 pb-9">
          <div className=" flex flex-col space-y-1">
            <label
              htmlFor="email"
              className="font-medium text-gray-600 text-sm"
            >
              Work District
            </label>
            <Select
              placeholder="Work District"
              isLoading={isLoadingDistrict}
              isDisabled={isLoadingDistrict}
              value={formattedDistrict.find(
                (item) => item.label === formik.values.work_district
              )}
              onChange={({ value }) => {
                setDistrictLga([]);
                const find = formattedDistrict.find(
                  (item) => item.value === value
                ).label;
                formik.setFieldValue("work_district", find);
              }}
              options={formattedDistrict}
              className=""
            />
            <ErrorMessage name="work_district" />
          </div>

          <div className=" flex flex-col space-y-1">
            <label
              htmlFor="email"
              className="font-medium text-gray-600 text-sm"
            >
              Work District Local Government
            </label>
            <Select
              isDisabled={
                isLoadingDistrictLga || formik.values.work_district === ""
              }
              isLoading={isLoadingDistrictLga}
              placeholder="Work District Local Government"
              options={districtLga}
              value={districtLga.find(
                (item) => item.label === formik.values.work_lga
              )}
              onChange={({ value }) => {
                const find = districtLga.find(
                  (item) => item.value === value
                ).label;
                formik.setFieldValue("work_lga", find);
              }}
              className=""
            />
            <ErrorMessage name="work_lga" />
          </div>

          <div className=" flex flex-col space-y-1">
            <label
              htmlFor="email"
              className="font-medium text-gray-600 text-sm"
            >
              Work Union
            </label>
            <input
              type="text"
              id="email"
              name="work_union"
              onChange={formik.handleChange}
              value={formik.values.work_union}
              onBlur={formik.handleBlur}
              placeholder="Work Union"
              className="mt-1 w-full border bg-white py-4 lg:py-[0.575rem] px-3 focus:outline-none text-gray-800 rounded text-[13px]"
            />
            <ErrorMessage name="work_union" />
          </div>

          <div className="mt-6 flex justify-between">
            <Button
              size="middle"
              onClick={()=>{
                updateData({step:"contact"})
              }}
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

export default Work;
Work.prototype = {
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  onClose: PropTypes.func,
};
