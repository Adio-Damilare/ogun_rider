import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import PropTypes from "prop-types";
import Select from "react-select";
import { Button } from "antd";
import useRiderState from "@/hooks/newRider";
import AnimationWrapper from "@/component/core/Rider/AnimationWrapper.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from 'react-hot-toast'
import { useSaveBase64, useVerifyDocument } from "@/services/API";
import axios from "axios";

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
  const updateData = useRiderState((state) => state.updateData);
  const previousData=useRiderState((state)=>state.data.data)
  const [takePhoto, setTakePhoto] = useState(false);
  const { mutateAsync: mutate, isPending: isLoading } = useVerifyDocument();
  const formik = useFormik({
    initialValues: {
      document_type: previousData.document_type?? "",
      document_number: previousData.document_number?? "",
      identity:  previousData.identity?? "",
      passport:previousData.passport?? "",
    },
    onSubmit: async (values) => {
      console.log(previousData)
      // const {data }= await mutate({
      //   type: values.document_type,
      //   number: values.document_number,
      // });
      // if(!data){
      //   toast.error("Invalid BVN")
      // }else{
      //   if(data.firstName.toUpperCase() === previousData.first_name.toUpperCase()&&data.lastName.toUpperCase() === previousData.last_name.toUpperCase()){
      //     updateData({step:"payment"})
      
      //   }else{
        //     toast.error("Invalid BVN")
        //   }
        // }
        updateData({step:"payment",data:{...previousData,...values}})
    },
    validationSchema: Yup.object().shape({
      document_type: Yup.string().required("Document Type is required"),
      document_number: Yup.string().required("Document Number is required"),
      identity: Yup.string().required("Identity is required"),
      passport: Yup.string().required("Passport is required"),
    }),
  });

  const handleSubmit = () => {
    console.log(formik.errors)
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
        <h1 className="text-bold text-2xl text-center">Identity</h1>
        <div className="space-y-6 pb-9">
          <div className=" flex flex-col">
            <label
              htmlFor="email"
              className="font-medium text-gray-600 text-sm"
            >
              Passport
            </label>

            {!takePhoto && !formik.values.passport && (
              <Button
                onClick={() => setTakePhoto(true)}
                className="bg-blue-600 text-white px-4 py-5 w-1/2 rounded hover:bg-blue-700 transition"
              >
                Take a passport
              </Button>
            )}
            {takePhoto && (
              <WebcamPassport
                passport={formik.values.passport}
                save={(e) => {
                  formik.setFieldValue("passport", e);
                }}
              />
            )}
            <ErrorMessage name="passport"/>
          </div>

          <div className=" flex flex-col space-y-1">
            <label
              htmlFor="email"
              className="font-medium text-gray-600 text-sm"
            >
              Document Type
            </label>
            <Select
              placeholder="Document Type"
              defaultInputValue={formik.values.document_number}
              onChange={({ value }) => {
                formik.setFieldValue("document_type", value);
              }}
              options={DocTypeList}
              className=""
            />
            <ErrorMessage name="document_type"/>
          </div>

          <div className=" flex flex-col space-y-1">
            <label
              htmlFor="email"
              className="font-medium text-gray-600 text-sm"
            >
              Document
              {(formik.values.document_type || "NIN").toUpperCase() + " Number"}
            </label>
            <input
              type="text"
              maxLength={11}
              inputMode="numeric"
              pattern="[0-9]*"
              name="document_number"
              onInput={(e) =>
                (e.target.value = e.target.value.replace(/[^0-9]/g, ""))
              }
              disabled={formik.values.document_type === null}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="email"
              value={formik.values.document_number}
              placeholder={
                (formik.values.document_number || "NIN").toUpperCase() +
                " Number"
              }
              className="mt-1 w-full border bg-white py-4 lg:py-[0.575rem] px-3 focus:outline-none text-gray-800 rounded text-[13px]"
            />
             <ErrorMessage name="document_number"/>
          </div>

          <div className=" flex flex-col space-y-1">
            <label
              htmlFor="email"
              className="font-medium text-gray-600 text-sm"
            >
              Identity card (BVN or NIN)
            </label>
          <FileUpload save={(fileName)=>{
            formik.setFieldValue("identity", fileName)
          }}/>
          <ErrorMessage name="identity"/>
          </div>

          <div className="mt-6 flex justify-between">
            <Button
              size="middle"
              onClick={() => {
                updateData({ step: "work" });
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

const videoConstraints = {
  width: 400,
  height: 500, // Passport photo-like dimensions
  facingMode: "user",
};

const WebcamPassport = ({ save: saveProp, passport }) => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const { mutateAsync, isPending } = useSaveBase64();

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  const reset = () => {
    setCapturedImage(null);
  };
  const save = async () => {
    // const data = await mutateAsync({ baseImage: capturedImage });
    // saveProp(data.file_name);
    saveProp(capturedImage);

  };

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      {/* Instructions */}
      {!capturedImage && (
        <div className="text-center max-w-md text-gray-700 text-sm">
          <p>
            <strong>Instructions for Passport Photo:</strong>
          </p>
          <ul className="text-left mt-2 list-disc list-inside">
            <li>Look straight at the camera.</li>
            <li>Use a plain light background (white is ideal).</li>
            <li>Make sure your face is centered inside the frame.</li>
            <li>No hats, glasses, or filters.</li>
          </ul>
        </div>
      )}

      {/* Webcam or Captured Image */}
      {!capturedImage ? (
        <div className="relative w-[250px]  rounded-full h-[250px] border-4 border-gray-300  overflow-hidden shadow-lg">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="border-4 border-white rounded-full w-[250px] h-[250px] opacity-70" />
          </div>
        </div>
      ) : (
        <div className="relative  w-[250px] h-[250px]  border-4 border-green-400 rounded-md overflow-hidden shadow-lg">
          <img
            src={capturedImage}
            alt="Passport"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Buttons */}
      {!capturedImage ? (
        <button
          onClick={capture}
          className="bg-blue-600 text-sm text-white rounded-2xl px-4 py-2 hover:bg-blue-700 transition"
        >
          Capture
        </button>
      ) : !passport ? (
        <div className="flex space-x-3">
          <button
            onClick={reset}
            disabled={isPending}
            className="bg-green-600 text-sm text-white  rounded-2xl px-4 py-2 hover:bg-green-700 transition"
          >
            Retake
          </button>

          <button
            onClick={save}
            disabled={isPending}
            className="bg-blue-600 text-sm text-white rounded-2xl px-4 py-2 hover:bg-blue-700 transition"
          >
            save
          </button>
        </div>
      ) : null}
    </div>
  );
};




const baseURl=import.meta.env.VITE_BASE_URL;
function FileUpload({save}) {
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState("");

  const uploadFile = async (e) => {
    const form=new FormData();
    form.append("file",e);
    const {data}=await axios.post(`${baseURl}/attachment/addFile`,form);
    save(data.file_name);
  };
  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      uploadFile(file)
    }
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      uploadFile(file);
      // You can handle the file upload here
    }
  };


  return (
    <div
      className={`flex items-center justify-center w- h-24 border-2 ${
        dragOver ? "border-blue-700 bg-blue-50" : "border-dashed"
      } border-blue-500 rounded-xl cursor-pointer transition duration-300`}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <div className="text-center text-gray-600">
        {fileName ? (
          <p className="text-sm font-medium text-green-600">{fileName}</p>
        ) : (
          <>
            <p className="text-base">
              {dragOver ? "Release to Upload" : "Click or Drag & Drop"}
            </p>
            <span className="block font-semibold text-blue-500">Upload File</span>
          </>
        )}
      </div>
    </div>
  );
}

