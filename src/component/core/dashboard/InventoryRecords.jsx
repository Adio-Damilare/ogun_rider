/* eslint-disable no-unused-vars */
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { DeleteIcon, EditIcon, EyeIcon } from "../../shared/svg_icons";
import PropTypes from "prop-types";
import Label from "../../shared/common/Label";
import { Checkbox, DatePicker, Select } from "antd";
import { useMemo, useState } from "react";
import { useGetLatestMemo } from "../../../services/API/memo";
import {
  useGetInstockRecord,
  useViewStock,
} from "../../../services/API/instock";
import dayjs from "dayjs";
import moment from "moment";
import { useGetAsset } from "../../../services/API/getParameters";
import StarLoader from "../loaders/StarLoader";
import ViewStockDrawer from "../../shared/view_stock/ViewStockDrawer";

const category = [
  {
    value: 1,
    label: "category 1",
  },
  {
    value: 2,
    label: "category 2",
  },
  {
    value: 3,
    label: "category 3",
  },
  {
    value: 4,
    label: "category 4",
  },
  {
    value: 5,
    label: "category 5",
  },
  {
    value: 6,
    label: "category 6",
  },
  {
    value: 7,
    label: "category 7",
  },
  {
    value: 8,
    label: "category 8",
  },
  {
    value: 9,
    label: "category 9",
  },
];

const inventoryData = [
  {
    ITEM: "bag",
    ITEM_NO: 2123,
    CATEGORY: "CATEGORY 2",
    TYPE: "solid",
    QUANTITY: 32,
    FILES: [],
  },
  {
    ITEM: "car",
    ITEM_NO: 212344,
    CATEGORY: "CATEGORY 3",
    TYPE: "solid",
    QUANTITY: 12,
    FILES: [],
  },
];

const formatNaira = (amount) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(parseFloat(amount));
};

const InventoryRecords = ({ userData }) => {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const [openDrawer, setOpenDrawer] = useState({});

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const rowsPerPage = 10;
  const pages = Math.ceil(inventoryData?.length / rowsPerPage);

  const { data: getInstockRecord, isLoading: stockRecordLoading } =
    useGetInstockRecord({
      staff_id: userData?.data?.STAFF_ID,
      region_id: userData?.data?.REGION,
      start_date: startDate,
      end_date: endDate,
    });

  const { data: getAssets, isLoading } = useGetAsset({
    staff_id: userData?.data?.STAFF_ID,
    region_id: userData?.data?.REGION,
  });

  const assetList = getAssets?.map((asset) => {
    return {
      ...asset,
      label: asset?.ASSET_NAME,
      value: asset?.ASSETS_ID,
    };
  });

  const instockRecord = useMemo(() => {
    return getInstockRecord?.data;
  }, [getInstockRecord]);

  const onCategory = (e, id) => {
    e.preventDefault();
    if (selected === id) return;
    setSelected(id);
  };

  const handleSelectPackage = (value) => {
    setSelected(value);
  };

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 mx-5 flex justify-between items-center">
        <Pagination
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          page={page}
          total={pages}
          initialPage={1}
          variant="light"
          onChange={setPage}
        />
      </div>
    );
  }, [page, pages]);

  const handleOpenView = (data) => {
    setOpenDrawer({ state: true, data: data });
  };
  const handleCloseView = () => {
    setOpenDrawer({ state: false });
  };

  return (
    <div className="bg-white rounded-lg border mb-8 mt-2">
      <div className="border-b border-gray-100">
        <div className="flex flex-col sm:flex-row mt-4 mx-2">
          <div className="flex gap-2">
            <div className="m-2">
              <Label>From</Label>
              <DatePicker
                size="large"
                placeholder="Select Start Date"
                // value={dayjs(endDate)}
                onChange={(dateString, date) => setStartDate(date)}
                className="w-full border outline-none focus:border-transparent h-10 rounded-md focus:outline-none md:col-span-2 font-helvetica"
              />
            </div>
            <div className="m-2">
              <Label htmlFor="to">To</Label>
              <DatePicker
                size="large"
                placeholder="Select End Date"
                // value={dayjs(endDate)}
                onChange={(dateString, date) => setEndDate(date)}
                className=" w-full border outline-none focus:border-transparent h-10 rounded-md focus:outline-none md:col-span-2 font-helvetica"
              />
            </div>
          </div>
        </div>
      </div>

      <Table
        aria-label="Example static collection table"
        radius="none"
        isStriped
        isHeaderSticky
        shadow="none"
        bottomContent={bottomContent}
        className="w-full"
        classNames={{
          td: "!py-2",
          tbody: "!py-2",
          tr: "py-2",
        }}
        align="end"
      >
        <TableHeader>
          <TableColumn className="text-sm opacity-70 text-start">
            SUPPLIER
          </TableColumn>
          <TableColumn className="text-sm opacity-70 text-start">
            DELIVERY
          </TableColumn>
          <TableColumn className="text-sm opacity-70">LPO NO.</TableColumn>
          <TableColumn className="text-sm opacity-70">WAYBILL NO.</TableColumn>
          <TableColumn className="text-sm opacity-70 text-end">
            TOTAL AMOUNT
          </TableColumn>
          <TableColumn className="text-sm opacity-70">CREATED AT</TableColumn>
          <TableColumn className="text-sm opacity-70 text-center">
            ACTION
          </TableColumn>
        </TableHeader>
        <TableBody
          isLoading={stockRecordLoading}
          className=""
          emptyContent={"No Data to display."}
          loadingState={<StarLoader />}
        >
          {instockRecord?.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="text-[0.85rem] opacity-65 text-start">
                {item?.SUPPLIER}
              </TableCell>
              <TableCell className="text-[0.85rem] opacity-65 text-start">
                {item?.METHOD_OF_DELIVERY}
              </TableCell>
              <TableCell className="text-[0.85rem] opacity-65">
                {item?.LPO_NO}
              </TableCell>
              <TableCell className="text-[0.85rem] opacity-65">
                {item?.WAYBILL_NO}
              </TableCell>
              <TableCell className="text-[0.85rem] opacity-65 text-end">
                {formatNaira(item?.SUM_TOTAL)}
              </TableCell>
              <TableCell className="text-[0.85rem] opacity-65 whitespace-nowrap">
                {moment(item?.DATE_CREATED)?.format("LL")}
              </TableCell>
              <TableCell>
                <Action
                  files={item?.FILES}
                  rowData={item}
                  handleOpenView={handleOpenView}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {openDrawer?.state && (
        <ViewStockDrawer
          openDrawer={openDrawer}
          handleClose={handleCloseView}
          userData={userData}
        />
      )}
    </div>
  );
};

const Action = ({ rowData, handleOpenView }) => {
  return (
    <div className="relative flex items-center justify-center gap-2">
      <span
        className="text-lg text-default-400 cursor-pointer active:opacity-50"
        onClick={() => handleOpenView(rowData)}
      >
        <EyeIcon />
      </span>

      {/* <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
        <EditIcon />
      </span>

      <span className="text-lg text-danger cursor-pointer active:opacity-50">
        <DeleteIcon />
      </span> */}
    </div>
  );
};

export default InventoryRecords;

InventoryRecords.propTypes = {
  userData: PropTypes.object.isRequired,
};
Action.propTypes = {
  rowData: PropTypes.object,
  handleOpenView: PropTypes.func,
};
