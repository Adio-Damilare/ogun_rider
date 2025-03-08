import { useMemo, useState } from "react";
import ExpandedDrawer from "../drawer/ExpandedDrawer";
import DrawerSideTab from "../drawer/DrawerSideTab";
import ProductList from "./ProductList";
import PropTypes from "prop-types";
import { useViewStock } from "../../../services/API/instock";
import StarLoader from "../../core/loaders/StarLoader";
import ViewSupportDocument from "./ViewSupportDocument";

const ViewStockDrawer = ({ openDrawer, handleClose, userData }) => {
  const [currentTab, setCurrentTab] = useState(0);

  const productData = openDrawer?.data;

  const {
    data: getStockDetail,
    isPending,
    isLoading,
  } = useViewStock({
    staff_id: userData?.data?.STAFF_ID,
    region_id: userData?.data?.REGION,
    code: productData?.CODE,
  });

  const stockProduct = useMemo(() => getStockDetail?.data, [getStockDetail]);
  const stockAttachment = useMemo(
    () => getStockDetail?.attachment,
    [getStockDetail]
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
                  products={stockProduct}
                  isLoading={isPending || isLoading}
                  productData={productData}
                />
              ),
            },
            {
              title: "Support Documents",
              component: (
                <ViewSupportDocument
                  attachments={stockAttachment}
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

export default ViewStockDrawer;
ViewStockDrawer.propTypes = {
  //   openDrawer: PropTypes.objectOf({
  //     state: PropTypes.string,
  //     data: PropTypes.object,
  //   }),
  openDrawer: PropTypes.object,
  handleClose: PropTypes.func,
  userData: PropTypes.object,
};
