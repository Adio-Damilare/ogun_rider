import { useMemo, useState } from "react";
import ExpandedDrawer from "../drawer/ExpandedDrawer";
import DrawerSideTab from "../drawer/DrawerSideTab";
import ProductList from "./ProductList";
import PropTypes from "prop-types";
import StarLoader from "../../core/loaders/StarLoader";
import ViewSupportDocument from "./ViewSupportDocument";
import { useViewOutStore } from "../../../services/API/outflow";

const ViewOutflowDrawer = ({ openDrawer, handleClose, userData }) => {
  const [currentTab, setCurrentTab] = useState(0);

  const itemData = openDrawer?.data;

  const {
    data: getOutStoreDetail,
    isPending,
    isLoading,
  } = useViewOutStore({
    region_id: userData?.data?.REGION,
    code: itemData?.OUTPUT_CODE,
  });

  console.log(getOutStoreDetail);

  const outstoreProduct = useMemo(
    () => getOutStoreDetail?.data,
    [getOutStoreDetail]
  );
  const outstoreAttachment = useMemo(
    () => getOutStoreDetail?.attachment,
    [getOutStoreDetail]
  );

  //   console.log();

  //   console.log(openDrawer?.data);

  return (
    <>
      <ExpandedDrawer
        isOpen={openDrawer.state}
        onClose={handleClose}
        maxWidth={currentTab === 0 ? 1400 : 850}
      >
        {/* <h1 className="text-xl px-4 py-2">Add Inventory</h1> */}
        <DrawerSideTab
          setCurrentTab={setCurrentTab}
          tabs={[
            {
              title: "Products",
              component: (
                <ProductList
                  products={outstoreProduct}
                  isLoading={isPending || isLoading}
                  productData={itemData}
                />
              ),
            },
            {
              title: "Support Documents",
              component: (
                <ViewSupportDocument
                  attachments={outstoreAttachment}
                  isLoading={isPending || isLoading}
                />
              ),
            },
          ]}
        >
          <div className="flex justify-center items-center min-h-32">
            <StarLoader />
          </div>
        </DrawerSideTab>
      </ExpandedDrawer>
    </>
  );
};

export default ViewOutflowDrawer;
ViewOutflowDrawer.propTypes = {
  //   openDrawer: PropTypes.objectOf({
  //     state: PropTypes.string,
  //     data: PropTypes.object,
  //   }),
  openDrawer: PropTypes.object,
  handleClose: PropTypes.func,
  userData: PropTypes.object,
};
