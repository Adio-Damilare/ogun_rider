import { Avatar, Button, ConfigProvider } from "antd";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoChevronForwardOutline } from "react-icons/io5";
import PropTypes from "prop-types";
import StarLoader from "../loaders/StarLoader";
import { useState } from "react";
import { formatNaira } from "../../../utils/formatNaira";
const RecentActivity = ({ latestData, title, isLoading }) => {
  const colors = [
    { color: "#f56a00" },
    { color: "#F2383A" },
    { color: "#5A6ACF" },
    { color: "#F99C30" },
    { color: "#FF4500" },
    { color: "#800080" },
    { color: "#20B2AA" },
  ];

  const itemsPerPage = 3; // Number of activities to show per page
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil((latestData?.length || 0) / itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const currentData = latestData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderItemDetails = (item) => {
    if (item?.UNIT_PRICE && item?.TOTAL) {
      // For the first data structure (inflows)
      return (
        <>
          <p className="text-[13px] text-[#273240] leading-[20px] tracking-[0.5px]">
            <span className="font-semibold">Quantity:</span> {item?.QUANTITY} |{" "}
            <span className="font-semibold">Unit Price:</span>{" "}
            {formatNaira(item?.UNIT_PRICE)} |{" "}
            <span className="font-semibold">Total:</span>{" "}
            {formatNaira(item?.TOTAL)}
          </p>
          <p className="text-[#273240] opacity-70 leading-[20px] tracking-[0.5px] text-[12px]">
            <span className="font-semibold">Supplier:</span> {item?.SUPPLIER} |{" "}
            <span className="font-semibold">LPO No:</span> {item?.LPO_NO} |{" "}
            <span className="font-semibold">Invoice No:</span>{" "}
            {item?.SUPPLIER_INVOICE_NO} |{" "}
            <span className="font-semibold">Remarks:</span> {item?.REMARKS}
          </p>
        </>
      );
    } else if (item?.QUANTITY_AVAILABLE && item?.QUANTITY_REQUIRED) {
      // For the second data structure (stock details)
      return (
        <>
          <p className="text-[13px] text-[#273240] leading-[20px] tracking-[0.5px]">
            <span className="font-semibold">Quantity Available:</span>{" "}
            {item?.QUANTITY_AVAILABLE || "N/A"} |{" "}
            <span className="font-semibold">Quantity Required:</span>{" "}
            {item?.QUANTITY_REQUIRED || "N/A"} |{" "}
            <span className="font-semibold">Quantity Approved:</span>{" "}
            {item?.QUANTITY_APPROVED || "N/A"}
          </p>
          <p className="text-[#273240] opacity-70 leading-[20px] tracking-[0.5px] text-[12px]">
            <span className="font-semibold">Unit of Issue:</span>{" "}
            {item?.UNIT_OF_ISSUE || "N/A"} |{" "}
            <span className="font-semibold">Recipient Department:</span>{" "}
            {item?.RECIPIENT_DEPARTMENT || "N/A"} |{" "}
            <span className="font-semibold">Store Issue Voucher No:</span>{" "}
            {item?.STORE_ISSUE_VOUCHER_NO || "N/A"}
          </p>
        </>
      );
    } else {
      // Fallback for unknown data structure
      return (
        <p className="text-[#273240] opacity-70 leading-[20px] tracking-[0.5px] text-[12px]">
          No details available.
        </p>
      );
    }
  };

  return (
    <>
      <div className="border w-full rounded-[5px] flex flex-col gap-y-5 pt-3 bg-white">
        <div className="flex justify-between items-center px-5">
          <div>
            <h3 className="text-[14px] text-black tracking-[0.5px] leading-[22px] capitalize">
              <span>{title}</span>
            </h3>
            <p className="text-[12px] tracking-[0.5px] leading-[22px] text-[#000000] opacity-50">
              Summary of your {title}
            </p>
          </div>
          <div className={`flex gap-x-1 ${isLoading && "hidden"}`}>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#5A6ACF",
                },
              }}
            >
              <Button
                shape="circle"
                type="primary"
                icon={<IoChevronBackOutline color="white" size={20} />}
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              />
              <Button
                shape="circle"
                type="primary"
                icon={<IoChevronForwardOutline color="white" size={20} />}
                onClick={handleNextPage}
                disabled={currentPage === totalPages || !latestData?.length}
              />
            </ConfigProvider>
          </div>
        </div>
        <div>
          {isLoading ? (
            <div className="flex justify-center">
              <StarLoader />
            </div>
          ) : currentData?.length === 0 ? (
            <div className="h-32 flex justify-center items-center">
              <h2 className="text-default-500 capitalize">
                <i>No {title}</i>
              </h2>
            </div>
          ) : (
            currentData?.map((item, index) => {
              const randomIndex = Math.floor(Math.random() * colors.length);
              return (
                <div
                  key={
                    index +
                    "_____latest_data" +
                    item?.SUPPLIER +
                    item?.STORE_ISSUE_VOUCHER_NO
                  }
                  className={` py-4 ${
                    index !== 0 && "border-t"
                  } border-[#DBE5EB] cursor-pointer transition-all hover:bg-[#f1f1f1] px-5`}
                >
                  <div className="flex items-start gap-x-3">
                    <div>
                      <Avatar
                        size={50}
                        style={{
                          backgroundColor: `${colors?.[randomIndex]?.color}`,
                          opacity: 0.7,
                        }}
                      >
                        {item?.PRODUCT_CODE?.trim() ||
                          item?.UNIT_OF_ISSUE?.trim()}
                      </Avatar>
                    </div>
                    <div className="flex-1">
                      {renderItemDetails(item)}
                      <p className="text-[#273240] opacity-70 leading-[15px] tracking-[0.5px] text-xs mt-1">
                        {item?.PRODUCT_DESCRIPTION}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default RecentActivity;

RecentActivity.propTypes = {
  latestData: PropTypes.array,
  title: PropTypes.string,
  isLoading: PropTypes.bool,
};
