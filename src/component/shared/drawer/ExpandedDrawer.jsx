/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */

import { useLocation } from "react-router-dom";
import { Drawer } from "antd";

const ExpandedDrawer = ({
  isOpen,
  onClose,
  children,
  maxWidth,
  title,
  round,
  closable = true,
  maskClosable = true,
  withBg = true 
}) => {
  const location = useLocation().pathname;

  return (
    <>
    

      <Drawer
        maskClosable={maskClosable}
        closable={closable}
        width={maxWidth ?? 920}  //620 for shopping and services
        onClose={onClose}
        open={isOpen}
        title={title}
        className="bg-[#F5F7FA] z-[10]"
        classNames={{
          body: `${withBg ? 'bg-[#F7F7F7]' : ''}    `,
          header: "font-helvetica bg-[#F7F7F7]",
        }}
      >
        <div className="h-full mx-3 ">{children}</div>
      </Drawer>
    </>
  );
};

export default ExpandedDrawer;
