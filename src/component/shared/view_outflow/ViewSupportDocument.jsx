/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import React from 'react'
import { BsEnvelopePaper, BsFiletypeDoc, BsFiletypeDocx } from "react-icons/bs";
import { MdOutlineFileDownload } from "react-icons/md";
import { useMemo, useState } from "react";
import { GrDocumentCsv, GrDocumentZip } from "react-icons/gr";
import { TbFileTypePdf } from "react-icons/tb";
import ImageModal from "./ImageModal";

const VeiwSupportDocument = ({ attachments }) => {
  const [imageModalOpen, setImageModalOpen] = useState({
    status: false,
    file: null,
  });

  const percent = 30;
  const color = percent === 100 ? "#52c41a" : "#3385ff";

  const fileName = useMemo(() => {
    return "Attachment";
  }, []);

  const downloadFile = async (url, fileName, fileType) => {
    try {
      // Fetch the file
      const response = await fetch(url);

      if (!response.ok) {
        // throw new Error(`HTTP error! status: ${response.status}`);
        onDocClick(url, fileName);
      }

      // Get the blob from the response
      const blob = await response.blob();

      // Create a new blob with the correct MIME type if provided
      const file = fileType ? new Blob([blob], { type: fileType }) : blob;

      // Create a URL for the blob
      const blobUrl = window.URL.createObjectURL(file);

      // Create a temporary anchor element
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;

      // Append to the document, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the blob URL
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const onDocClick = (url, name) => {
    try {
      const pdfUrl = url;
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.setAttribute("target", "_blank");
      link.download = name; // specify the filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="mt-6">
        <div className=" flex gap-4 flex-wrap">
          {attachments?.length > 0 ? (
            [...attachments]?.map((data, i) => (
              <div
                key={i}
                className="flex justify-between w-[40%] items-center bg-white"
              >
                {data?.FILE_NAME ? (
                  <div className="group w-full">
                    {data?.FILE_NAME?.includes(".jpg") ||
                    data?.FILE_NAME?.includes(".jpeg") ||
                    data?.FILE_NAME?.includes(".png") ||
                    data?.FILE_NAME?.includes(".PNG") ? (
                      <div className="relative border hover:border-gray-400 rounded-lg shadow-sm">
                        <img
                          alt="Image"
                          height="100"
                          width="100"
                          onClick={() =>
                            setImageModalOpen({
                              status: true,
                              file: data?.FILE_NAME,
                            })
                          }
                          src={data.FILE_NAME}
                          className="
                                  object-cover 
                                  cursor-zoom-in 
                                  hover:scale-110 
                                  transition 
                                  translate
                                  flex items-center gap-2
                                  rounded
                                "
                        />
                        <div
                          onClick={() =>
                            downloadFile(
                              data?.FILE_NAME.includes("http") &&
                                data?.FILE_NAME,
                              data?.FILE_NAME
                            )
                          }
                          className="absolute bottom-1 right-1 group-hover:block   rounded-full bg-gray-100 p-1 cursor-pointer items-center gap-2"
                        >
                          <MdOutlineFileDownload size={20} />
                        </div>
                      </div>
                    ) : data.FILE_NAME.includes(
                        "pdf" || "doc" || "csv" || "docx" || "zip"
                      ) ? (
                      <div className="flex gap-x-4 flex-wrap space-y-1   border hover:border-gray-400 rounded-lg shadow-sm  items-center w-full  p-2 py-3">
                        <div className="relative w-full flex">
                          <div
                            className=" flex gap-1 px-2 pr-4 cursor-pointer items-center flex-1 truncate "
                            onClick={() => {
                              setImageModalOpen({
                                status: true,
                                file: data?.FILE_NAME,
                                isDoc: true,
                              });
                            }}
                          >
                            {data?.FILE_NAME.includes("pdf") ? (
                              <TbFileTypePdf
                                // BsFileEarmarkPdfFill
                                size={35}
                                className="text-red-500"
                              />
                            ) : data?.FILE_NAME.includes("doc") ? (
                              <BsFiletypeDoc
                                size={35}
                                className="text-blue-500"
                              />
                            ) : data?.FILE_NAME.includes("docx") ? (
                              <BsFiletypeDocx
                                size={35}
                                className="text-blue-500"
                              />
                            ) : data?.FILE_NAME.includes("csv") ? (
                              <GrDocumentCsv
                                size={35}
                                className="text-blue-500"
                              />
                            ) : (
                              data?.FILE_NAME.includes("zip") && (
                                <GrDocumentZip
                                  size={35}
                                  className="text-blue-500"
                                />
                              )
                            )}

                            <span className=" line-clamp-1 truncate w-full">
                              {" "}
                              {fileName} {i + 1}
                            </span>
                            {/* {data?.FILE_NAME} */}
                          </div>
                          <div
                            onClick={() =>
                              downloadFile(
                                data?.FILE_NAME.includes("http") &&
                                  data?.FILE_NAME,
                                `${fileName} ${i + 1}` //|| data?.FILE_NAME
                              )
                            }
                            className=" ml-auto w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 p-1 cursor-pointer  gap-2"
                          >
                            <MdOutlineFileDownload size={20} />
                          </div>
                        </div>
                      </div>
                    ) : (
                      data.FILE_NAME.includes("zip") && (
                        <div className="flex gap-x-4 flex-wrap space-y-1   border hover:border-gray-400 rounded-lg shadow-sm  items-center w-full  p-2 py-3">
                          <div className="relative w-full flex">
                            <div
                              className=" flex gap-1 px-2 pr-4 cursor-pointer items-center flex-1 truncate "
                              onClick={() => {
                                downloadFile(
                                  data?.FILE_NAME.includes("http") &&
                                    data?.FILE_NAME,
                                  `${fileName} ${i + 1}` //|| data?.FILE_NAME
                                );
                              }}
                            >
                              {data?.FILE_NAME.includes("zip") && (
                                <GrDocumentZip
                                  size={35}
                                  className="text-blue-500"
                                />
                              )}

                              <span className=" line-clamp-1 truncate w-full">
                                {" "}
                                {fileName} {i + 1}
                              </span>
                              {/* {data?.FILE_NAME} */}
                            </div>
                            <div
                              onClick={() =>
                                downloadFile(
                                  data?.FILE_NAME.includes("http") &&
                                    data?.FILE_NAME,
                                  `${fileName} ${i + 1}` //|| data?.FILE_NAME
                                )
                              }
                              className=" ml-auto w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 p-1 cursor-pointer  gap-2"
                            >
                              <MdOutlineFileDownload size={20} />
                            </div>
                          </div>
                        </div>
                      )
                    )}

                    <div></div>
                  </div>
                ) : null}
              </div>
            ))
          ) : (
            <div className="flex flex-col gap-2 w-full  items-center justify-center h-full pt-5 ">
              <BsEnvelopePaper className="text-gray-300" size={40} />
              <span className=" text-default-400 font-bold text-lg">
                Empty Records
              </span>
            </div>
          )}
        </div>
      </div>

      <ImageModal
        src={imageModalOpen.file}
        isOpen={imageModalOpen.status}
        isDoc={imageModalOpen?.isDoc}
        onClose={() => setImageModalOpen({ status: false, file: null })}
      />
    </div>
  );
};

export default VeiwSupportDocument;
