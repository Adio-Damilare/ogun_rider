import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { Button } from "antd";
import useRiderState from "@/hooks/newRider";
import AnimationWrapper from "@/component/core/Rider/AnimationWrapper.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";

const DocTypeList = [
  {
    value: "nin",
    label: "NIN",
  },
  {
    value: "bvn",
    label: "BVN",
  },
];

const Work = ({ onNext, onPrev, onClose } = {}) => {
  const ref = useRef(null);
  const updateData = useRiderState((state) => state.updateData);
  const [documentType, setDocumentType] = useState("");
  const formik=useFormik({
    initialValues: {
      document_type: "",
      document_number: "",
      identity: "",
      passport: "",
    },
    onSubmit: (values) => {
      updateData({ step: "contact", data: { ...previousData, ...values } });
    },
    validationSchema: Yup.object().shape({
      document_type: Yup.string().required("Document Type is required"),
      document_number: Yup.string().required("Document Number is required"),
      identity: Yup.string().required("Identity is required"),
      passport: Yup.string().required("Passport is required"),
    }),
  });

  const handleSubmit = () => {
    updateData({ step: "identity" });
  };
  return (
    <AnimationWrapper>
      <section className=" py-4 px-6">
        <h1 className="text-bold text-2xl text-center">Identity</h1>
        <div className="space-y-6 pb-9">
          <div className=" flex flex-col space-y-1">
            <label
              htmlFor="email"
              className="font-medium text-gray-600 text-sm"
            >
              Document Type
            </label>
            <Select
              placeholder="Document Type"
              defaultInputValue={documentType}
              onChange={({ value }) => {
                setDocumentType(value);
              }}
              options={DocTypeList}
              className=""
            />
            {/* {errors.email && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )} */}
          </div>

          <div className=" flex flex-col space-y-1">
            <label
              htmlFor="email"
              className="font-medium text-gray-600 text-sm"
            >
              Document {(documentType || "NIN").toUpperCase() + " Number"}
            </label>
            <input
              type="text"
              maxLength={11}
              inputMode="numeric"
              pattern="[0-9]*"
              onInput={(e) =>
                (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
              }
              disabled={documentType === null}
              id="email"
              name="maiden_name"
              placeholder={(documentType || "NIN").toUpperCase() + " Number"}
              className="mt-1 w-full border bg-white py-4 lg:py-[0.575rem] px-3 focus:outline-none text-gray-800 rounded text-[13px]"
            />
            {/* {errors.email && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )} */}
          </div>

          <div className=" flex flex-col space-y-1">
            <label
              htmlFor="email"
              className="font-medium text-gray-600 text-sm"
            >
              Identity
            </label>
            <div
              className="flex items-center justify-center h-20 border-2 border-dashed border-blue-500 rounded-xl cursor-pointer hover:bg-blue-50 transition duration-300"
              onClick={() => {
                ref.current.click();
              }}
            >
              <input
                type="file"
                ref={ref}
                onChange={() => {}}
                accept="image/*"
                className="hidden"
              />
              <div className="text-center text-gray-600">
                <p className="text-sm">Click or Drag & Drop</p>
                <span className="block text-sm font-semibold text-blue-500">
                  Upload file
                </span>
              </div>
            </div>
            {/* {errors.email && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )} */}
          </div>
          <div className=" flex flex-col space-y-1">
            <label
              htmlFor="email"
              className="font-medium text-gray-600 text-sm"
            >
              Passport
            </label>
            <div
              className="flex items-center justify-center h-20 border-2 border-dashed border-blue-500 rounded-xl cursor-pointer hover:bg-blue-50 transition duration-300"
              onClick={() => {
                ref.current.click();
              }}
            >
              <input
                type="file"
                ref={ref}
                accept="image/*"
                onChange={() => {}}
                className="hidden"
              />
              <div className="text-center text-gray-600">
                <p className="text-sm">Click or Drag & Drop</p>
                <span className="block text-sm font-semibold text-blue-500">
                  Upload Passport
                </span>
              </div>
            </div>
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
