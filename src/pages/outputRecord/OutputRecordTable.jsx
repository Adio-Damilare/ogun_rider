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
import PropTypes from "prop-types";
import { DatePicker, Empty } from "antd";
import { useMemo, useState } from "react";
import Label from "../../component/shared/common/Label";
import { EyeIcon } from "../../component/shared/svg_icons";
import { useGetOutstoreRecord } from "../../services/API/outflow";
import { formatNaira } from "../../utils/formatNaira";
import ViewOutflowDrawer from "../../component/shared/view_outflow/ViewOutflowDrawer";

const OutputRecordTable = ({ userData }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [openDrawer, setOpenDrawer] = useState({});
  const [page, setPage] = useState(1);

  const { data, isLoading: isLoading } = useGetOutstoreRecord({
    staff_id: userData?.data?.STAFF_ID,
    region_id: userData?.data?.REGION,
    start_date: startDate,
    end_date: endDate,
  });

  const outflowData = useMemo(() => data, [data]);

  const rowsPerPage = 10;
  const pages = Math.ceil(outflowData?.length / rowsPerPage);

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
    <div className="bg-white rounded-lg border my-8 ">
      <div className="border-b border-gray-100">
        <div className="flex flex-col sm:flex-row mt-4 mx-2">
          <div className="flex gap-2">
            <div className="m-2">
              <Label>From</Label>
              <DatePicker
                size="large"
                placeholder="Select Start Date"
                onChange={(dateString, date) => setStartDate(date)}
                className="w-full border outline-none focus:border-transparent h-10 rounded-md focus:outline-none md:col-span-2 font-helvetica"
              />
            </div>
            <div className="m-2">
              <Label htmlFor="to">To</Label>
              <DatePicker
                size="large"
                placeholder="Select End Date"
                onChange={(dateString, date) => setEndDate(date)}
                className=" w-full border outline-none focus:border-transparent h-10 rounded-md focus:outline-none md:col-span-2 font-helvetica"
              />
            </div>
            {/* <div className="m-2">
              <Label htmlFor="to">Select Category</Label>
              <Select
                size="large"
                allowClear
                showSearch
                placeholder="Select Package"
                optionFilterProp="label"
                options={category}
                value={selected}
                className="w-full rounded-md"
                onChange={handleSelectPackage}
              />
            </div> */}
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
          <TableColumn className="text-sm opacity-70" align="start">
            DATE CREATED
          </TableColumn>
          <TableColumn className="text-sm opacity-70">STORE NO</TableColumn>
          <TableColumn className="text-sm opacity-70">
            STORE VOUCHER NO
          </TableColumn>
          <TableColumn className="text-sm opacity-70">
            RECEIPT VOUCHER NO
          </TableColumn>
          <TableColumn className="text-sm opacity-70" align="end">
            TOTAL
          </TableColumn>
          <TableColumn className="text-sm opacity-70 text-end">
            ACTION
          </TableColumn>
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          emptyContent={
            <div className="text-center">
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={"No Data to display."}
              />
            </div>
          }
        >
          {outflowData?.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="text-[0.85rem] opacity-65">
                {item?.DATE_CREATED}
              </TableCell>
              <TableCell className="text-[0.85rem] opacity-65">
                {item?.STORE_NO}
              </TableCell>
              <TableCell className="text-[0.85rem] opacity-65">
                {item?.STORE_ISSUE_VOUCHER_NO}
              </TableCell>
              <TableCell className="text-[0.85rem] opacity-65">
                {item?.STORE_RECEIPT_VOUCHER_NO}
              </TableCell>
              <TableCell className="text-[0.85rem] opacity-65">
                {formatNaira(item?.SUM_TOTAL)}
              </TableCell>
              <TableCell>
                <Action rowData={item} handleOpenView={handleOpenView} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {openDrawer?.state && (
        <ViewOutflowDrawer
          openDrawer={openDrawer}
          handleClose={handleCloseView}
          userData={userData}
        />
      )}
    </div>
  );
};

const Action = ({ files, rowData, handleOpenView }) => {
  return (
    <div className="relative flex items-center justify-end gap-2">
      <span
        className="text-lg text-default-400 cursor-pointer active:opacity-50"
        onClick={() => handleOpenView(rowData)}
      >
        <EyeIcon />
      </span>

      {/* <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
        <EditIcon />
      </span> */}
    </div>
  );
};

export default OutputRecordTable;

OutputRecordTable.propTypes = {
  userData: PropTypes.object.isRequired,
};
Action.propTypes = {
  files: PropTypes.array.isRequired,
  rowData: PropTypes.object,
  handleOpenView: PropTypes.func,
};
