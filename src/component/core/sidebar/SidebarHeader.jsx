import { Avatar, Button, ConfigProvider } from "antd";
import { useNavigate } from "react-router-dom";
// import DropdownNotification from "../../../layout/components/DropdownNotification.jsx";
import useCurrentUser from "../../../hooks/useCurrentUser.js";

const SidebarHeader = () => {
  const navigate = useNavigate();

  const { userData } = useCurrentUser();

  return (
    <>
      <div className="flex justify-between items-center py-3 shadow lg:px-20 px-5 bg-white">
        <div className="flex gap-x-4 items-center">
          <div className="flex items-center gap-x-1">
            <img
              src={'/logo2.jpeg'}
              alt="logo"
              width={40}
              className="cursor-pointer"
              onClick={() => navigate("/")}
            />
            <span className="font-bold leading-3 text-lg hidden sm:block text-[#2c3679]">
              Admin
            </span>
          </div>
          <div className="relative hidden md:block">
            <label htmlFor="Search" className="sr-only">
              Search
            </label>
            <input
              type="text"
              id="Search"
              placeholder="Search"
              className="rounded-full border w-72 border-gray-200 py-2 pe-10 shadow-sm sm:text-sm outline-none bg-gray- px-4 placeholder:text-[12px] placeholder:text-[#1F384C]"
            />

            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
              <button
                type="button"
                className="text-[#627B87] hover:text-[#627B87]"
              >
                <span className="sr-only">Search</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </button>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-x-4 pe-5">
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  defaultHoverBorderColor: "#DDE4F0",
                  defaultBg: "#FBFCFE",
                  defaultHoverBg: "#FBFCFE",
                  defaultHoverColor: "#5A6ACF",
                },
              },
            }}
          >
            <Button
              onClick={() => navigate("/output")}
              className="text-[13px] tracking-[0.5px] leading-[20px] font-medium rounded-[5px]"
            >
              Output Record
            </Button>
          </ConfigProvider>

          <div className="flex items-center gap-x-2">
            <div>
              <Avatar
                style={{
                  backgroundColor: "#555",
                  color: "#fff",
                }}
              >
                A
              </Avatar>
            </div>
            {/* <span>
              {userData?.data?.FIRST_NAME} {userData?.data?.LAST_NAME}
            </span> */}
          </div>
          {/* <DropdownNotification /> */}
        </div>
      </div>
    </>
  );
};

export default SidebarHeader;
