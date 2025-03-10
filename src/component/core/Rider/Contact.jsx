import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import useRiderState from "@/hooks/newRider";
import { Button } from "antd";
import { useGetState, useGetLGA } from "@/services/API";
import AnimationWrapper from "@/component/core/Rider/AnimationWrapper.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";

const Contact = ({ onNext, onPrev, onClose } = {}) => {
  const [state, setState] = useState("");
  const updateData = useRiderState((state) => state.updateData);
  const previousData = useRiderState((state) => state.data.data);
  const [states, setStates] = useState([]);
  const [lgas, setLgas] = useState([]);

  const [phone, setPhone] = useState("");
  const { mutateAsync: mutate, isPending: isLoadingStates } = useGetState();
  const { mutateAsync: mutateLGA, isPending: isLoadingLGA } = useGetLGA();
  useEffect(() => {
    (async () => {
      const { data = [] } = await mutate("161");
      setStates((prev) => {
        return data.map((item) => ({
          value: item.id,
          label: item.name,
        }));
      });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (state) {
        const { data = [] } = await mutateLGA(state);
        setLgas((prev) => {
          return data.map((item) => ({
            value: item.id,
            label: item.name,
          }));
        });
      }
    })();
  }, [state]);

  
  const formik = useFormik({
    initialValues: {
      email: "",
      primary_phone: "",
      other_phones: "",
      residential_state: "",
      residential_lga: "",
      residential_address: "",
    },
    onSubmit: (values) => {
      updateData({ step: "work", data: { ...previousData, ...values } });
    },
    validationSchema: Yup.object().shape({
      primary_phone: Yup.string().required("Phone Number is required"),
      email: Yup.string().required("Email is required").email("Invalid email"),
      other_phones: Yup.string(),
      residential_state: Yup.string().required("Residential State is required"),
      residential_lga: Yup.string().required(
        "Residential Local Government is required"
      ),
      residential_address: Yup.string().required(
        "Residential Address is required"
      ),
    }),
  });
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
        <h1 className="text-bold text-2xl text-center">Contact Detail's</h1>
        <div className="space-y-6 pb-9">
          <div className=" flex flex-col space-y-1">
            <label
              htmlFor="email"
              className="font-medium text-gray-600 text-sm"
            >
              Phone Number
            </label>
            <input
              type="text"
              maxLength={11}
              inputMode="numeric"
              name="primary_phone"
              onChange={formik.handleChange}
              value={formik.values.primary_phone}
              onBlur={formik.handleBlur}
              pattern="[0-9]*"
              onInput={(e) =>
                (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
              }
              placeholder="Phone Number"
              className="mt-1 w-full border bg-white py-4 lg:py-[0.575rem] px-3 focus:outline-none text-gray-800 rounded text-[13px]"
            />
            <ErrorMessage name="primary_phone" />
          </div>
          <div className=" flex flex-col space-y-1">
            <label
              htmlFor="email"
              className="font-medium text-gray-600 text-sm"
            >
              Other Phone number
            </label>
            <input
              type="text"
              maxLength={11}
              inputMode="numeric"
              name="other_phones"
              onChange={formik.handleChange}
              value={formik.values.other_phones}
              onBlur={formik.handleBlur}
              pattern="[0-9]*"
              onInput={(e) =>
                (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
              }
              placeholder="Other Phone number"
              className="mt-1 w-full border bg-white py-4 lg:py-[0.575rem] px-3 focus:outline-none text-gray-800 rounded text-[13px]"
            />
            <ErrorMessage name="other_phones" />
          </div>
          <div className=" flex flex-col space-y-1">
            <label
              htmlFor="email"
              className="font-medium text-gray-600 text-sm"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              placeholder="abc@gmail.com"
              className="mt-1 w-full border bg-white py-4 lg:py-[0.575rem] px-3 focus:outline-none text-gray-800 rounded text-[13px]"
            />
            <ErrorMessage name="email" />
          </div>

          <div className=" flex flex-col space-y-1">
            <label
              htmlFor="email"
              className="font-medium text-gray-600 text-sm"
            >
              Residential State
            </label>
            <Select
              isLoading={isLoadingStates}
              isDisabled={isLoadingStates}
              placeholder="Residential State"
              options={states}
              onChange={({ value }) => {
                setState(value);
                const find = states.find((item) => item.value === value).label;
                formik.setFieldValue("residential_state", find);
              }}
              className=""
            />
            <ErrorMessage name="residential_state" />
          </div>

          <div className=" flex flex-col space-y-1">
            <label
              htmlFor="email"
              className="font-medium text-gray-600 text-sm"
            >
              Residential Local Government
            </label>
            <Select
              isDisabled={!state || isLoadingLGA}
              isLoading={isLoadingLGA}
              placeholder="Residential Local Government"
              options={lgas}
              onChange={({ value }) => {
                const find = lgas.find((item) => item.value === value).label;
                formik.setFieldValue("residential_lga", find);
              }}
              className=""
            />
            <ErrorMessage name="residential_lga" />
          </div>

          <div className=" flex flex-col space-y-1">
            <label
              htmlFor="email"
              className="font-medium text-gray-600 text-sm"
            >
              Residential Address
            </label>
            <textarea
              type="text"
              id="email"
              name="residential_address"
              onChange={formik.handleChange}
              value={formik.values.residential_address}
              onBlur={formik.handleBlur}
              placeholder="Residential Address"
              className="mt-1 w-full border resize-none  bg-white py-4 lg:py-[0.575rem] px-3 focus:outline-none text-gray-800 rounded text-[13px]"
            />
            <ErrorMessage name="residential_address" />
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
    </AnimationWrapper>
  );
};

export default Contact;
Contact.prototype = {
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  onClose: PropTypes.func,
};
