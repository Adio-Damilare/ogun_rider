import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import useRiderState from "@/hooks/newRider";
import { Button, DatePicker } from "antd";
import AnimationWrapper from "@/component/core/Rider/AnimationWrapper.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
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
  const updateData = useRiderState((state) => state.updateData);
  const data = useRiderState((state) => state.data.data);

  const form = useFormik({
    initialValues: {
      first_name: data.first_name ?? "",
      last_name: data.last_name ?? "",
      other_name: data.other_name ?? "",
      gender: data.gender ?? "",
      marital_status: data.marital_status ?? "",
      maiden_name: data.maiden_name ?? "",
      dob: data.dob ?? "",
    },
    onSubmit: (values) => {
      updateData({ step: "nationality", data: { ...data, ...values } });
    },
    validationSchema: Yup.object().shape({
      first_name: Yup.string().required("First Name is required"),
      last_name: Yup.string().required("Last Name is required"),
      other_name: Yup.string().required("Other Name is required"),
      gender: Yup.string().required("Gender is required"),
      marital_status: Yup.string().when("gender", {
        is: (gender) => gender === "female",
        then: (schema) =>
          schema.required("Maiden name is required for females"),
        otherwise: (schema) => schema.notRequired(),
      }),
      maiden_name: Yup.string().required("Maiden Name is required"),
      dob: Yup.string().required("Date of Birth is required"),
    }),
  });
  const handleSubmit = () => {
    form.handleSubmit();
    // updateData({ step: "nationality" });
  };

  const ErrorMessage = ({ name }) => {
    if (form.touched[name] && form.errors[name]) {
      return (
        <div className="text-red-500 italic text-[0.8rem] mt-1">
          {form.errors[name]}
        </div>
      );
    }
    return null;
  };
  return (
    <AnimationWrapper>
      <section className=" py-4 px-6">
        <h1 className="text-bold text-2xl text-center">Personal Detail's</h1>
        <div className="space-y-6 pb-9">
          <div className=" flex flex-col space-y-1">
            <label
              htmlFor="email"
              className="font-medium text-gray-600 text-sm"
            >
              First Name
            </label>
            <input
              type="text"
              id="email"
              name="first_name"
              onChange={form.handleChange}
              value={form.values.first_name}
              onBlur={form.handleBlur}
              placeholder="First Name"
              className="mt-1 w-full border bg-white py-4 lg:py-[0.575rem] px-3 focus:outline-none text-gray-800 rounded text-[13px]"
            />
            <ErrorMessage name="first_name" />
          </div>
          <div className=" flex flex-col space-y-1">
            <label
              htmlFor="email"
              className="font-medium text-gray-600 text-sm"
            >
              Last Name
            </label>
            <input
              type="text"
              id="email"
              name="last_name"
              onChange={form.handleChange}
              value={form.values.last_name}
              onBlur={form.handleBlur}
              placeholder="Last Name"
              className="mt-1 w-full border bg-white py-4 lg:py-[0.575rem] px-3 focus:outline-none text-gray-800 rounded text-[13px]"
            />
            <ErrorMessage name="last_name" />
          </div>
          <div className=" flex flex-col space-y-1">
            <label
              htmlFor="email"
              className="font-medium text-gray-600 text-sm"
            >
              Other Name
            </label>
            <input
              type="text"
              id="email"
              name="other_name"
              onChange={form.handleChange}
              value={form.values.other_name}
              onBlur={form.handleBlur}
              placeholder="Other Name"
              className="mt-1 w-full border bg-white py-4 lg:py-[0.575rem] px-3 focus:outline-none text-gray-800 rounded text-[13px]"
            />
            <ErrorMessage name="other_name" />
          </div>

          <div className=" flex flex-col space-y-1">
            <label
              htmlFor="email"
              className="font-medium text-gray-600 text-sm"
            >
              Gender
            </label>
            <Select
              placeholder="Gender"
              name="gender"
              onChange={({ value }) => form.setFieldValue("gender", value)}
              value={genders.find((item) => item.value === form.values.gender)}
              options={genders}
              className=""
            />
            <ErrorMessage name="gender" />
          </div>

          <div className=" flex flex-col space-y-1">
            <label
              htmlFor="email"
              className="font-medium text-gray-600 text-sm"
            >
              Marital Status
            </label>
            <Select
              placeholder="Marital status"
              name="marital_status"
              onChange={({ value }) =>
                form.setFieldValue("marital_status", value)
              }
              value={marital.find((val)=>val.value ===form.values.marital_status)}
              options={marital}
              className=""
            />
            <ErrorMessage name="marital_status" />
          </div>

          <div className=" flex flex-col space-y-1">
            <label
              htmlFor="email"
              className="font-medium text-gray-600 text-sm"
            >
              Maiden Name
            </label>
            <input
              type="text"
              id="email"
              name="maiden_name"
              onChange={form.handleChange}
              value={form.values.maiden_name}
              onBlur={form.handleBlur}
              placeholder="Maiden Name"
              className="mt-1 w-full border bg-white py-4 lg:py-[0.575rem] px-3 focus:outline-none text-gray-800 rounded text-[13px]"
            />
            <ErrorMessage name="maiden_name" />
          </div>
          <div className=" flex flex-col space-y-1">
            <label
              htmlFor="email"
              className="font-medium text-gray-600 text-sm"
            >
              Date of Birth
            </label>
            <DatePicker
              className=" py-2 focus:border-none"
              name="dob"
              onChange={(e) => {
                const formattedDate = dayjs(e).format('DD-MMM-YYYY');
                form.setFieldValue("dob", formattedDate);
              }}
              defaultValue={form.values.dob}
              onBlur={form.handleBlur}
              label="Birth of date"
            />
            <ErrorMessage name="dob" />
          </div>
          <div className="mt-6">
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
      </section>
    </AnimationWrapper>
  );
};

export default Personal;
Personal.prototype = {
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  onClose: PropTypes.func,
};
