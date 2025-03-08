import { useState } from 'react'
import ExpandedDrawer from '../drawer/ExpandedDrawer'
import DrawerSideTab from '../drawer/DrawerSideTab'
import { Button, ConfigProvider } from 'antd'
// import OutputForm from './OutputForm'
import CreateOutputForm from './CreateOutputForm'

const CreateOutputButton = () => {

    const [openDrawer, setOpenDrawer] = useState("");
    
      const handleOpenCreateFolder = () => {
        setOpenDrawer(true);
      };
      const handleCloseCreateFolder = () => {
        setOpenDrawer(false);
      };


  return (
    <>
    <ConfigProvider
                      theme={{
                        token: {
                          colorPrimary: "#5A6ACF",
                        },
                      }}
                    >
                      <Button size='large' type='default' onClick={handleOpenCreateFolder}>Create Output</Button>
                    </ConfigProvider>
    <ExpandedDrawer
        isOpen={openDrawer}
        onClose={handleCloseCreateFolder}
        maxWidth={1500}
      >
        
        <DrawerSideTab
          tabs={[
            {
              title: "Create Output",
              component: <CreateOutputForm />,
            },
          ]}
        >
          <CreateOutputForm />
        </DrawerSideTab>
      </ExpandedDrawer>
    </>
  )
}

export default CreateOutputButton