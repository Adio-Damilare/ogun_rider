import PropTypes from "prop-types";
import { formatNaira } from "../../../utils/formatNaira";
import {
  cn,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import StarLoader from "../../core/loaders/StarLoader";
import moment from "moment";

const tableHead = [
  // {
  //   name: "Asset Name",
  //   key: "ASSET_NAME",
  //   minWidth: "min-w-64",
  // },
  {
    name: "Product Description",
    key: "PRODUCT_DESCRIPTION",
  },
  {
    name: "BIN Card No",
    key: "BIN_CARD_NO",
  },

  {
    name: "Quantity",
    key: "QUANTITY",
    align: "text-center",
  },
  {
    name: "Unit Price",
    key: "UNIT_PRICE",
    isMoney: true,
    align: "text-end",
  },
  {
    name: "Balance",
    key: "BALANCE",
    align: "text-center",
  },

  {
    name: "Total Cost",
    key: "TOTAL",
    isMoney: true,
    align: "text-end",
  },

  // {
  //   name: "Stock Alert",
  //   key: "PRODUCT_DESCRIPTION"
  // },

  {
    name: "Remarks",
    key: "REMARKS",
  },
];

const ProductList = ({ products = [], isLoading, productData }) => {
  return (
    <div className="mx-auto p-6">
      <div className="mb-5 grid gric-cols-1 md:grid-cols-3 gap-4">
        <DetailItem label={"Supplier"} value={productData?.SUPPLIER} />
        <DetailItem label={"LPO Number"} value={productData?.LPO_NO} />
        {/* <div className="col-span-1"></div> */}
        <DetailItem
          label={"Delivery"}
          value={productData?.METHOD_OF_DELIVERY}
        />
        <DetailItem label={"Way Bill Number"} value={productData?.WAYBILL_NO} />
        <DetailItem
          className={"col-span-2"}
          label={"Created At"}
          value={moment(productData?.DATE_CREATED).format("MMMM DD YYYY")}
        />
      </div>
      <div className="mt-7">
        <h1 className="text-lg font-medium text-gray-800 pb-1 border-b-2 border-[#5A6ACF]">
          Product List
        </h1>

        <Table
          aria-label="Example static collection table"
          radius="none"
          isStriped
          isHeaderSticky
          // bottomContent={bottomContent}
          className="w-full"
          classNames={{
            td: "!py-4",
            tbody: "!py-2",
            tr: "py-2",
          }}
          // align="end"
        >
          <TableHeader>
            {tableHead?.map((head, index) => (
              <TableColumn
                key={index + "_____" + head?.key}
                className={cn(
                  "text-sm opacity-90 !text-start font-normal tracking-wide",
                  head.align
                )}
              >
                {head?.name}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody
            isLoading={isLoading}
            className=""
            emptyContent={"No Data to display."}
            loadingState={<StarLoader />}
          >
            {products?.map((item, index) => (
              <TableRow key={index}>
                {tableHead?.map((head, index) => (
                  <TableCell
                    key={index + "_____" + head?.key}
                    className={cn(
                      "text-[0.85rem] opacity-65 font-normal",
                      head?.minWidth,
                      head?.align
                    )}
                  >
                    {head?.isMoney
                      ? formatNaira(item?.[head?.key])
                      : item?.[head?.key] || "N/A"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="my-3">
          <DetailItem
            label={"GRANT TOTAL"}
            value={formatNaira(productData?.SUM_TOTAL)}
          />
        </div>
      </div>
    </div>
  );
};

// Reusable DetailItem Component
const DetailItem = ({ label, value, className }) => (
  <div className={className}>
    <span className="opacity-70">{label}:</span>
    <span className="ml-2 text-gray font-medium">{value}</span>
  </div>
);

export default ProductList;

DetailItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

ProductList.propTypes = {
  products: PropTypes.array,
  isLoading: PropTypes.bool,
  productData: PropTypes.object,
};
