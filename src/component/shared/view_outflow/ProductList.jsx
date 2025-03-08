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
  {
    name: "Product Description",
    key: "PRODUCT_DESCRIPTION",
  },
  {
    name: "Available Quantity",
    key: "QUANTITY_AVAILABLE",
    align: "text-center",
  },

  {
    name: "Required Quantity",
    key: "QUANTITY_REQUIRED",
    align: "text-center",
  },

  {
    name: "Approved Quantity",
    key: "QUANTITY_APPROVED",
    align: "text-center",
  },
  {
    name: "Quantity",
    key: "QUANTITY",
    align: "text-center",
  },
  {
    name: "Unit of Issue",
    key: "UNIT_OF_ISSUE",
    // align: "text-center",
  },
  {
    name: "Ledger Number",
    key: "LEDGER_NO",
    align: "text-center",
  },
];

const headerData = [
  {
    name: "Store Number",
    key: "STORE_NO",
    align: "text-center",
  },
  {
    name: "Store Number Date",
    key: "STORE_NO_DATE",
    align: "text-center",
    typeDate: true,
  },
  {
    name: "Recipient",
    key: "RECIPIENT",
    align: "text-center",
  },

  {
    name: "Store Voucher Number",
    key: "STORE_ISSUE_VOUCHER_NO",
    align: "text-center",
  },
  {
    name: "Store Voucher Number Date",
    key: "STORE_ISSUE_VOUCHER_NO_DATE",
    align: "text-center",
    typeDate: true,
  },
  {
    name: "Recipient Department",
    key: "RECIPIENT_DEPARTMENT",
    align: "text-center",
  },

  {
    name: "Store Receipt Voucher Number",
    key: "STORE_RECEIPT_VOUCHER_NO",
    align: "text-center",
  },
  {
    name: "Store Receipt Voucher Number Date",
    key: "STORE_RECEIPT_VOUCHER_NO_DATE",
    align: "text-center",
    typeDate: true,
  },
  {
    name: "Requisition Officer",
    key: "REQUISITION_OFFICER",
    align: "text-center",
  },

  {
    name: "Countersigned Officer",
    key: "COUNTERSIGNED_OFFICER",
    align: "text-center",
  },
];

const ProductList = ({ products = [], isLoading, productData }) => {
  return (
    <div className="mx-auto p-6">
      <div className="mb-5 grid gric-cols-1 md:grid-cols-3 gap-x-4 gap-y-3">
        {headerData?.map((head, index) => (
          <DetailItem
            key={index + "________product_head" + (index % 2)}
            label={head?.name}
            value={productData?.[head?.key]}
            typeDate={head?.typeDate}
          />
        ))}
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
            label={"GRANT TOTAL :"}
            value={formatNaira(productData?.SUM_TOTAL)}
            className={"flex gap-x-2"}
          />
        </div>
      </div>
    </div>
  );
};

// Reusable DetailItem Component
const DetailItem = ({ label, value, typeDate, className }) => (
  <div className={cn(className ?? "flex flex-col")}>
    <span className="opacity-70">{label}</span>
    <span className="font-medium text-sm">
      {typeDate ? moment(value).format("MMMM DD YYYY") : value}
    </span>
  </div>
);

export default ProductList;

DetailItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  typeDate: PropTypes.bool,
};

ProductList.propTypes = {
  products: PropTypes.array,
  isLoading: PropTypes.bool,
  productData: PropTypes.object,
};
