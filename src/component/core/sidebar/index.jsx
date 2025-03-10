import { NavLink, useNavigate } from "react-router-dom";
import { TbChevronLeft, TbChevronRight, TbCrown } from "react-icons/tb";
import { cn } from "@heroui/react";
import PropTypes from "prop-types";
import { useState } from "react";
import { HiViewList } from "react-icons/hi";
import { RiMotorbikeFill } from "react-icons/ri";

const NavItem = ({ icon, title, href, mini = false }) => {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        cn(
          "flex items-center px-5 py-2 rounded-3xl text-base",
          isActive
            ? `bg-black/5 dark:bg-white/10 font-semibold`
            : "hover:bg-black/5 opacity-80",
          { "w-12 h-12 p-0 justify-center": mini }
        )
      }
    >
      <div className={cn({ "mr-4": !mini })}>{icon}</div>
      {!mini && <span>{title}</span>}
    </NavLink>
  );
};

NavItem.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  mini: PropTypes.bool,
};

const Sidebar = () => {
  const [mini, setMini] = useState(false);
  const navigate=useNavigate()
  return (
    <div
      className={cn("w-[260px] relative bg-white group transition-width", {
        "w-[90px]": mini,
      })}
    >
      <button
        onClick={() => setMini(!mini)}
        aria-label={mini ? "Hide" : "Show"}
        className="absolute top-1/2 left-[calc(100%)] -translate-y-1/2 z-10 bg-white  border border-default-200/50 dark:border-default-50 h-[56px] rounded-r-full transition-all duration-200"
      >
        <div className="">
          {mini ? <TbChevronRight size="16" /> : <TbChevronLeft size="16" />}
        </div>
      </button>
      <div
        className={cn("w-[260px] h-full overflow-hidden", { "w-[90px]": mini })}
      >
        <div className={cn("w-[260px] h-full overflow-hidden")}>
          <div
            className={cn(
              "py-6 px-8 flex flex-col align-stretch w-[260px] relative h-full",
              { "items-start": mini }
            )}
          >
            <div className="text-center flex mb-6 justify-center">
            <img
              src={'/logo2.jpeg'}
              alt="logo"
              width={mini?40:60}
              className="cursor-pointer"
              onClick={() => navigate("/")}
            />
            </div>
            <div
              className={cn("flex flex-col space-y-2 mt-6", { "-ml-1": mini })}
            >
              {[
                {
                  name: "Dashboard",
                  href: "/",
                  icon: <HiViewList size="20" />,
                },
                {
                  name: "Rider",
                  href: "/rider",
                  icon: <RiMotorbikeFill size="20" />,
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
            <div
              className={cn("flex flex-col space-y-2 mt-auto", {
                "-ml-1": mini,
              })}
            >
              {[
                {
                  name: "Logout",
                  href: `/logout`,
                  icon: <TbCrown className="text-red-500" size="20" />,
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
