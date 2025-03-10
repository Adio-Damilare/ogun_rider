import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "../../assets/styles/mainLayout.css";
import useWindowSize from "@/hooks/useWindowSize";
import SidebarHeader from "@/component/core/sidebar/SidebarHeader";
import Sidebar from "@/component/core/sidebar";
import useCurrentUser from "@/hooks/useCurrentUser";
import NewRider from "@/component/core/Rider/NewRider";

const MainLayout = () => {
  const [navIsOpen, setNavIsOpen] = useState(true);
  const windowSize = useWindowSize({});
  const { userData } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      navigate("/login");
    }
  }, [userData, navigate]);

  // const handleOpenNav = (param) => {
  //   setNavIsOpen(param);
  // };
  useEffect(() => {
    if (window.innerWidth < 768) {
      setNavIsOpen(false);
    }
  }, []);

  return (
    <>
      <main>
        <section
          className={` h-screen overflow-hidden grid grid-cols-[auto_1fr]`}
        >
          <Sidebar />
          <div className="space-y-4   overflow-auto">
            <SidebarHeader />
            <div className="px-4 py-2 ">
              <Outlet />
            </div>
          </div>
        </section>
      </main>
      <NewRider />
    </>
  );
};

export default MainLayout;
