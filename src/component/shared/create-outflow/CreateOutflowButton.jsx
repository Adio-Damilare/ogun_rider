import { useState } from "react";
import { Button, ConfigProvider } from "antd";
import CreateDrawer from "./CreateOutflowDrawer";

const CreateOutflowButton = () => {
  const [openDrawer, setOpenDrawer] = useState("");

  const handleOpenCreateMemo = () => {
    setOpenDrawer(true);
  };
  const handleCloseCreateMemo = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#5A6ACF",
          },
          components: {
            Button: {
              defaultBg: "#5A6ACF",
              colorText: "#D8D9DB",
            },
          },
        }}
      >
        <Button type="primary" size="large" onClick={handleOpenCreateMemo}>
          Create Outflow
        </Button>
      </ConfigProvider>
      <CreateDrawer
        openDrawer={openDrawer}
        handleClose={handleCloseCreateMemo}
      />
    </>
  );
};

export default CreateOutflowButton;
