/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Spinner } from "@heroui/react";
import { useCallback, useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import { Trash2Icon } from "lucide-react";
import { GrDocumentCsv, GrDocumentZip } from "react-icons/gr";
import { IoCloudUploadOutline } from "react-icons/io5";

import {
  BsFileEarmarkPdfFill,
  BsFiletypeDoc,
  BsFiletypeDocx,
} from "react-icons/bs";
import PropTypes from "prop-types";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { filePrefix } from "../../../utils/filePrefix";

const AdvanceAttachments = ({ setValue, getValues, watch, handleSubmit }) => {
  const [uploadLoading, setUploadLoading] = useState(false);

  const { userData } = useCurrentUser();

  const attachments = watch("attachment") || [];

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file?.name.trim() !== "" && file) {
        console.log({
          name: file?.name,
          file: file,
          file_url: URL.createObjectURL(file),
        });
        setValue("attachment", [
          ...attachments,
          { name: file?.name, file: file, file_url: URL.createObjectURL(file) },
        ]);
      }
    }
  };

  const handleDeleteAttachment = (index) => {
    const updatedAttachments = attachments?.filter((_, i) => i !== index);
    setValue("attachment", updatedAttachments);
  };

  const uploadFile = async (formData) => {
    setUploadLoading(true);
    try {
      const res = await axios({
        method: "post",
        // url: filePrefix + "addChatFile",
        url: "http://lamp3.ncaa.gov.ng/" + "attachment/addFile",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          token: userData?.token,
        },
      });
      setUploadLoading(false);

      if (res) {
        return res.data;
      }
    } catch (err) {
      setUploadLoading(false);
      if (
        err?.response?.data?.message !==
        "There was an error uploading your file"
      )
        toast.error(err?.response?.data?.message);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    var attachments = getValues().attachment;
    setUploadLoading(true);
    try {
      const uploadedAttachmentIDs = await Promise.all(
        attachments?.map(async (attachment, index) => {
          const formData = new FormData();
          formData.append("file", attachment.file);

          const res = await uploadFile(formData);

          return res?.file_url_id;
        })
      );
      setUploadLoading(false);

      //step 1: split the IDs and join first
      const reversedArray = uploadedAttachmentIDs.map((item) =>
        item?.split("")?.join("")
      );

      // Step 2: Join the reversed strings with a comma
      const resultIDs = reversedArray.join(",");

      // console.log(uploadedAttachmentIDs);

      setValue(
        "uploadedAttachment",
        uploadedAttachmentIDs.map((item, index) => ({
          ...getValues().attachment[index], // Preserve other existing properties
          file_url_id: item, // Update the file_url
        }))
      );

      handleSubmit();
    } catch (error) {
      console.log("Error:", error);
      setUploadLoading(false);
    }
  };

  const fileExtension = useCallback((filePath) => {
    return filePath?.split(".")?.pop()?.toLowerCase();
  }, []);

  const checkFileType = (fileName, extensions) => {
    return extensions.some((ext) => fileName?.toLowerCase().includes(ext));
  };

  return (
    <>
      <div className="">
        <form onSubmit={onSubmit}>
          <div className="bg-white rounded mb-3">
            <h1 className="font-helvetica text-[#212529]">Attachment</h1>
            <p className="font-helvetica opacity-70">
              Upload supporting document files
            </p>
          </div>

          <div className="w-full px-8 bg-white rounded">
            <div
              className={`border-2 border-dashed rounded-xl p-4 min-h-[15rem]`}
            >
              <div>
                <div className="flex flex-col justify-center items-center">
                  <div className="inline-block p-4 my-5 rounded-full bg-slate-100">
                    <IoCloudUploadOutline color="gray" size={32} />
                  </div>
                  <p>
                    <label htmlFor="onboardFile">
                      <span className="text-blue-400 font-medium cursor-pointer">
                        Click to upload
                      </span>{" "}
                      <input
                        type="file"
                        hidden
                        name=""
                        id="onboardFile"
                        onChange={handleFileInputChange}
                      />
                    </label>
                  </p>
                  <p className="text-gray-300">SVG, PNG, JPG or GIF</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            {attachments?.map((data, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-white shadow p-2 my-2"
              >
                {data?.file_url ? (
                  <div className="group w-full">
                    {checkFileType(data?.name || data?.file_url, [
                      ".jpg",
                      ".jpeg",
                      ".png",
                    ]) ? (
                      <div className="relative">
                        <img
                          alt="Image"
                          height="80"
                          width="80"
                          // onClick={() =>
                          //   setImageModalOpen({
                          //     status: true,
                          //     file: data?.file_url,
                          //   })
                          // }
                          src={data.file_url}
                          className="
                                      object-cover 
                                      cursor-zoom-in 
                                      hover:scale-110 
                                      transition 
                                      translate
                                      flex items-center gap-2
                                    "
                        />
                        <div
                          onClick={() => handleDeleteAttachment(i)}
                          className="absolute bottom-1 right-1 group-hover:block   rounded-full bg-gray-100 p-1 cursor-pointer items-center gap-2"
                        >
                          <Trash2Icon className="text-red-500" />
                        </div>
                      </div>
                    ) : (
                      checkFileType(data?.name || data?.file_url, [
                        ".pdf",
                        ".doc",
                        ".csv",
                        ".docx",
                        ".zip",
                      ]) && (
                        <div className="flex gap-x-4 flex-wrap space-y-1 mt-5 items-center w-full">
                          <div className="relative w-full flex">
                            <div className=" flex gap-1 px-2 pr-4 cursor-pointer items-center flex-1 truncate ">
                              {checkFileType(data?.name || data?.file_url, [
                                ".pdf",
                              ]) ? (
                                <BsFileEarmarkPdfFill
                                  size={35}
                                  className="text-red-500"
                                />
                              ) : checkFileType(data?.name || data?.file_url, [
                                  ".doc",
                                ]) ? (
                                <BsFiletypeDoc
                                  size={35}
                                  className="text-blue-500"
                                />
                              ) : checkFileType(data?.name || data?.file_url, [
                                  ".docx",
                                ]) ? (
                                <BsFiletypeDocx
                                  size={35}
                                  className="text-blue-500"
                                />
                              ) : checkFileType(data?.name || data?.file_url, [
                                  ".csv",
                                ]) ? (
                                <GrDocumentCsv
                                  size={35}
                                  className="text-blue-500"
                                />
                              ) : (
                                checkFileType(data?.name || data?.file_url, [
                                  ".zip",
                                ]) && (
                                  <GrDocumentZip
                                    size={35}
                                    className="text-blue-500"
                                  />
                                )
                              )}

                              <span className=" line-clamp-1 truncate w-full">
                                {data?.name}
                              </span>
                            </div>
                            <div
                              onClick={() => handleDeleteAttachment(i)}
                              className=" ml-auto w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 p-1 cursor-pointer  gap-2"
                            >
                              <Trash2Icon className="text-red-500" />
                            </div>
                          </div>
                        </div>
                      )
                    )}

                    <div></div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          {/* {attachments.length > 0 && 
        ( */}

          <div className="flex justify-end py-3">
            <button
              type="submit"
              className="bg-[#5A6ACF] px-6 py-2 header_h3 outline-none text-white rounded hover:bg-btnColor/70 flex gap-2"
            >
              {uploadLoading ? <Spinner color="default" size="sm" /> : ""}
              Submit
            </button>
          </div>
          {/* )} */}
        </form>
      </div>
    </>
  );
};

export default AdvanceAttachments;

AdvanceAttachments.propTypes = {
  setValue: PropTypes.func,
  getValues: PropTypes.func,
  goToNextTab: PropTypes.func,
};
