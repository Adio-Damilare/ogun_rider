import { NavLink } from "react-router-dom";
import { HiOutlineViewColumns } from "react-icons/hi2";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import { useState } from "react";

const NavItem = ({ icon, title, href, mini = false }) => {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        `flex items-center px-5 py-2 space-x-2  rounded-3xl text-base
          ${
            isActive
              ? `bg-black/5 dark:bg-white/10 font-semibold`
              : "hover:bg-black/5 opacity-80"
          }
            ${mini ? "w-12 h-12 p-0 justify-center" : ""}
          `
      }
    >
      <div className={`${mini? "mr-4": "" }`}>{icon}</div>
      {!mini && <span className="text-sm">{title}</span>}
    </NavLink>
  );
};
const Sidebar = () => {
  const [mini, setMini] = useState(false);

  return (
    <div
      className={`w-[260px] relative group transition-width bg-white h-screen '  ${
        mini ? "w-[90px]" : ""
      }  `}
    >
      <button
        onClick={() => setMini(!mini)}
        aria-label={mini ? "Hide" : "Show"}
        className="absolute top-1/2 left-[calc(100%)] -translate-y-1/2 z-10 bg-[#eff6fd] dark:bg-gray-950 border border-default-200/50 dark:border-default-50 h-[56px] rounded-r-full transition-all duration-200"
      >
        <div className="">
          {mini ? <TbChevronRight size="16" /> : <TbChevronLeft size="16" />}
        </div>
      </button>
      <div
        className={`w-[260px] h-full overflow-hidden  ${
          mini ? "w-[90px]" : ""
        }`}
      >
        <div className={"w-[260px] h-full overflow-hidden"}>
          <div
            className={`py-6 px-8 flex flex-col align-stretch w-[260px] relative h-full  ${
              mini ? "items-start" : ""
            }`}
          >
            <div className="px-3">
              {/* <Logo width={130} className="mb-8" /> */}
            </div>
            {/* <CreateDropdown mini={mini} /> */}
            <div
              className={`flex flex-col space-y-2 mt-6  ${mini ? "-ml-1" : ""}`}
            >
              {[
                {
                  name: "Dashboard",
                  href: "/",
                  icon: <HiOutlineViewColumns size="20" />,
                },
                {
                  name: "Rider",
                  href: "/rider",
                  icon: <HiOutlineViewColumns size="20" />,
                },
              ].map((item) => (
                <NavItem
                  key={item.href}
                  icon={item.icon}
                  title={item.name}
                  href={item.href}
                  mini={mini}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
