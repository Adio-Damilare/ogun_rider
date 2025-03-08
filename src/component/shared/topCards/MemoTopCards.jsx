/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { IoDocumentOutline } from "react-icons/io5";
import StarLoader from "../../core/loaders/StarLoader";
import { FaStore } from "react-icons/fa";

const TopCards = ({ setSelected, selected, grid, dataCount }) => {
  const handleSelect = (val) => {
    setSelected(val);
  };

  const memoData = [
    {
      name: "Instore Total",
      key: "total",
      icon: IoDocumentOutline,
      b_color: "bg-amber-100",
      t_color: "text-amber-600",
    },
    {
      name: "Outstore",
      key: "outstore",
      icon: FaStore,
      b_color: "bg-purple-100",
      t_color: "text-purple-700",
    },
  ];

  return (
    <>
      <div
        className={`grid grid-cols-1 gap-3 ${
          grid === 4 ? "lg:grid-cols-4 md:grid-cols-2" : "lg:grid-cols-2"
        } lg:gap-3`}
      >
        {memoData?.map((item, index) => {
          return (
            <div
              key={index}
              className={`py-4 -top border-[1px] border-[#dfe2e6] transition-background ${
                selected === item?.key ? "bg-default-100" : "bg-white"
              } shadow flex rounded-t-[0.5rem] items-center justify-between px-4 gap-3 cursor-pointer`}
              onClick={() => handleSelect(item?.key)}
              style={{
                boxShadow:
                  "0 3px 3px -2px rgba(39,44,51,.1), 0 3px 4px 0 rgba(39,44,51,.04), 0 1px 8px 0 rgba(39,44,51,.02)",
              }}
            >
              <div className="flex gap-2 items-center">
                <div
                  className={`rounded-full ${item?.b_color} w-[50px] h-[50px] flex justify-center items-center`}
                >
                  <item.icon
                    size={25}
                    className={`!font-bold ${item.t_color}`}
                  />
                </div>
                <span className="text-[13px] text-[rgb(39, 44, 51)] font-[500] leading-[19.5px]">
                  {item?.name}
                </span>
              </div>
              <span className="text-[16px] leading-[19.5px] text-[rgba(39, 44, 51, 0.5)] font-[400] font-Roboto">
                {dataCount?.[item?.key]?.loading ? (
                  <StarLoader />
                ) : (
                  dataCount?.[item?.key]?.count || 0
                )}
                {/* {item?.total} */}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TopCards;

TopCards.propTypes = {
  memos: PropTypes.array,
};
