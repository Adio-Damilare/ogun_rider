/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Fragment, useState } from "react";
import PropType from "prop-types";

export default function DrawerSideTab({
  tabs,
  onClose,
  children,
  showButton,
  title,
  setCurrentTab,
}) {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const setTab = (index) => {
    setSelectedTab(index);
    setCurrentTab(index);
  };

  return (
    <>
      <p className="font-Exotic font-semibold text-lg overflow-y-auto">
        {title}
      </p>
      <div className="grid grid-cols-1 h-fit md:grid-cols-5 gap-4">
        <div className="my- w-full pl-5 col-span-4 bg-white shadow-md rounded-lg mb-[1rem] form_drawer_body_container order-2 md:order-1 p-4">
          {tabs[selectedTab]?.component ?? children}
        </div>

        <div className="flex flex-col border-l py-10 text-sm gap-3 px-4 ms-8 md:ms-2 my-4 md:my-0 md:h-auto order-1 md:order-2 md:fixe right-10">
          {tabs.map((tab, index) => (
            <div
              key={index}
              onClick={() => setTab(index)}
              className={`${
                selectedTab === index ? "font-[500]" : "font-[400]"
              } relative cursor-pointer font-[13px] leading-[19.5px] text-[rgba(39, 44, 51, 0.7)]`}
            >
              <p className="whitespace-nowra">{tab?.title}</p>
              <span
                className={`w-3 h-3 rounded-full  ${
                  selectedTab === index ? "bg-blue-500/80" : "bg-gray-300"
                }  border-2 border-white absolute -left-[22px] top-1 duration-200 transition-all`}
              ></span>
            </div>
          ))}
          {showButton && (
            <button
              className="header_btnStyle bg-[#00bcc2] rounded text-white font-semibold py-[8px] leading-[19.5px] mx-2 my-1 md:my-0 px-[16px] uppercase"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </>
  );
}

DrawerSideTab.propTypes = {
  tabs: PropType.array,
  children: PropType.element,
  page: PropType.string,
  setCurrentTab: PropType.func,
};
