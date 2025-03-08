// Date received, LPO No, Method of delivery,  Supplier Name, Supplier Invoice No and Waybill No

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "react-quill/dist/quill.snow.css";
import { DatePicker, Input, Select, Space } from "antd";

import useCurrentUser from "../../../hooks/useCurrentUser";
import { useListFolder } from "../../../services/API/folder";
import Label from "../common/Label";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import {
  useGetAllDepartment,
  useGetAllStaff,
} from "../../../services/get_data";
import { Avatar, cn } from "@nextui-org/react";
import { filePrefix } from "../../../utils/filePrefix";

const ItemInformation = ({
  register,
  getValues,
  setValue,
  watch,
  control,
  errors,
  touchedFields,
  trigger,
}) => {
  const { userData } = useCurrentUser();
  const { data: getFolderList, isLoading: getFolderLoading } = useListFolder(
    userData?.data?.STAFF_ID
  );

  const { data: getStaff, isLoading } = useGetAllStaff(
    userData?.data?.COMPANY_ID
  );

  const { data: getDepartment, isLoading: isGetDeptLoading } =
    useGetAllDepartment(userData?.data?.COMPANY_ID);

  const departmentList = getDepartment?.map((dept) => {
    return {
      ...dept,
      label: dept?.DEPARTMENT_NAME,
      value: dept?.DEPARTMENT_ID,
    };
  });

  const staffList = getStaff?.map((staff) => {
    return {
      ...staff,
      label: `${staff?.FIRST_NAME} ${staff?.LAST_NAME}`,
      value: staff?.STAFF_ID,
    };
  });

  const onChange = (value, fieldName) => {
    setValue(fieldName, value);
    trigger(fieldName);
  };

  return (
    <>
      <main className="px-5 pb-10">
        <div className="mb-4">
          <Label htmlFor="" className="tracking-[0.5px] leading-[22px]">
            Store Requisition Number
          </Label>
          <Input
            size="large"
            placeholder="Store requisition number"
            status={errors?.store_requisition_no ? "error" : ""}
            defaultValue={getValues("store_requisition_no")}
            {...register("store_requisition_no", {
              required: "This field is required",
            })}
            onChange={(e) => {
              trigger();
              setValue("store_requisition_no", e.target.value);
            }}
          />
          <small className="text-danger-500">
            {touchedFields.store_requisition_no &&
              errors?.store_requisition_no?.message}
          </small>
        </div>
        <div className="mb-4">
          <Label htmlFor="" className="tracking-[0.5px] leading-[22px]">
            Store Voucher Number
          </Label>
          <Input
            size="large"
            placeholder="Store voucher number"
            status={errors?.store_voucher_no ? "error" : ""}
            defaultValue={getValues("store_voucher_no")}
            {...register("store_voucher_no", {
              required: "This field is required",
            })}
            onChange={(e) => {
              trigger();
              setValue("store_voucher_no", e.target.value);
            }}
          />
          <small className="text-danger-500">
            {touchedFields.store_voucher_no &&
              errors?.store_voucher_no?.message}
          </small>
        </div>
        <div className="mb-4">
          <Label htmlFor="" className="tracking-[0.5px] leading-[22px]">
            Store Reciept voucher No
          </Label>
          <Input
            size="large"
            placeholder="Store receipt voucher number"
            status={errors?.store_receipt_voucher_no ? "error" : ""}
            defaultValue={getValues("store_receipt_voucher_no")}
            {...register("store_receipt_voucher_no", {
              required: "This field is required",
            })}
            onChange={(e) => {
              trigger();
              setValue("store_receipt_voucher_no", e.target.value);
            }}
          />
          <small className="text-danger-500">
            {touchedFields.store_receipt_voucher_no &&
              errors?.store_receipt_voucher_no?.message}
          </small>
        </div>
        <div className="mb-4">
          <Label>Store Requisition Number date</Label>
          <Controller
            name="store_requisition_no_date"
            control={control}
            render={({ field }) => (
              <>
                <DatePicker
                  defaultValue={
                    getValues("store_requisition_no_date")
                      ? dayjs(
                          getValues("store_requisition_no_date"),
                          "YYYY-MM-DD"
                        )
                      : ""
                  }
                  size={"large"}
                  className="w-full border-gray-300 rounded-md  focus:outline-none"
                  {...field}
                  value={field.value ? dayjs(field.value, "YYYY-MM-DD") : null}
                  onChange={(date, dateString) => {
                    field.onChange(dateString);
                    onChange(dateString, "store_requisition_no_date");
                  }}
                  status={
                    touchedFields.store_requisition_no_date &&
                    errors.store_requisition_no_date
                      ? "error"
                      : ""
                  }
                />
                <span className="text-red-500">
                  {touchedFields.store_requisition_no_date &&
                    errors?.store_requisition_no_date?.message}
                </span>
              </>
            )}
            rules={{ required: "This field is required" }}
          />
        </div>
        <div className="mb-4">
          <Label>Store Voucher Number date</Label>
          <Controller
            name="store_voucher_no_date"
            control={control}
            render={({ field }) => (
              <>
                <DatePicker
                  defaultValue={
                    getValues("store_voucher_no_date")
                      ? dayjs(getValues("store_voucher_no_date"), "YYYY-MM-DD")
                      : ""
                  }
                  size={"large"}
                  className="w-full border-gray-300 rounded-md  focus:outline-none"
                  {...field}
                  value={field.value ? dayjs(field.value, "YYYY-MM-DD") : null}
                  onChange={(date, dateString) => {
                    field.onChange(dateString);
                    onChange(dateString, "store_voucher_no_date");
                  }}
                  status={
                    touchedFields.store_voucher_no_date &&
                    errors.store_voucher_no_date
                      ? "error"
                      : ""
                  }
                />
                <span className="text-red-500">
                  {touchedFields.store_voucher_no_date &&
                    errors?.store_voucher_no_date?.message}
                </span>
              </>
            )}
            rules={{ required: "This field is required" }}
          />
        </div>
        <div className="mb-4">
          <Label>Store Reciept Voucher Number date</Label>
          <Controller
            name="store_receipt_voucher_no_date"
            control={control}
            render={({ field }) => (
              <>
                <DatePicker
                  defaultValue={
                    getValues("store_receipt_voucher_no_date")
                      ? dayjs(
                          getValues("store_receipt_voucher_no_date"),
                          "YYYY-MM-DD"
                        )
                      : ""
                  }
                  size={"large"}
                  className="w-full border-gray-300 rounded-md  focus:outline-none"
                  {...field}
                  value={field.value ? dayjs(field.value, "YYYY-MM-DD") : null}
                  onChange={(date, dateString) => {
                    field.onChange(dateString);
                    onChange(dateString, "store_receipt_voucher_no_date");
                  }}
                  status={
                    touchedFields.store_receipt_voucher_no_date &&
                    errors.store_receipt_voucher_no_date
                      ? "error"
                      : ""
                  }
                />
                <span className="text-red-500">
                  {touchedFields.store_receipt_voucher_no_date &&
                    errors?.store_receipt_voucher_no_date?.message}
                </span>
              </>
            )}
            rules={{ required: "This field is required" }}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="" className="tracking-[0.5px] leading-[22px]">
            Department
          </Label>
          <Select
            allowClear
            showSearch
            placeholder="Select Department"
            // labelInValue
            size="large"
            optionFilterProp="label"
            options={departmentList}
            loading={isGetDeptLoading}
            {...register(`department`)}
            className="w-full !m-0   rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
            value={watch(`department`)}
            onChange={(value) => {
              trigger();
              setValue("department", value);
            }}
          />
          <small className="text-danger-500">
            {touchedFields.department && errors?.department?.message}
          </small>
        </div>
        <div className="mb-4">
          <Label htmlFor="" className="tracking-[0.5px] leading-[22px]">
            Recipient
          </Label>
          <Select
            allowClear
            showSearch
            placeholder="Select Recipient"
            virtual
            size="large"
            optionFilterProp="label"
            options={staffList}
            optionRender={(option) => (
              <Space
                className={cn(
                  "cursor-pointer w-full px-2 rounded-xl flex justify-between",
                  option?.data?.ON_LEAVE ? "opacity-50 cursor-not-allowed" : ""
                )}
              >
                <div className={cn(`flex gap-2 items-center px-2 py-1`)}>
                  {option?.data?.FILE_NAME ? (
                    <Avatar
                      alt={option?.data?.name}
                      className="flex-shrink-0"
                      size="sm"
                      src={filePrefix + option?.data?.FILE_NAME}
                    />
                  ) : (
                    <Avatar
                      alt={option?.data?.name}
                      className="flex-shrink-0"
                      size="sm"
                      name={option?.data?.label?.trim()[0]}
                    />
                  )}

                  <div className="flex flex-col">
                    <span className="font-medium uppercase font-helvetica">
                      {option?.data?.label}
                    </span>
                    <p className="text-sm">{option?.data?.STAFF_NUMBER}</p>
                  </div>
                </div>
              </Space>
            )}
            loading={isLoading}
            {...register(`recipient`)}
            className="w-full !m-0   rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
            value={watch(`recipient`)}
            onChange={(value) => {
              trigger();
              setValue("recipient", value);
            }}
          />
          <small className="text-danger-500">
            {touchedFields.recipient && errors?.recipient?.message}
          </small>
        </div>
        <div className="mb-4">
          <Label htmlFor="" className="tracking-[0.5px] leading-[22px]">
            Requisition Officer
          </Label>
          <Select
            allowClear
            showSearch
            placeholder="Select Requisition officer"
            // labelInValue
            size="large"
            optionFilterProp="label"
            options={staffList}
            optionRender={(option) => (
              <Space
                className={cn(
                  "cursor-pointer w-full px-2 rounded-xl flex justify-between",
                  option?.data?.ON_LEAVE ? "opacity-50 cursor-not-allowed" : ""
                )}
              >
                <div className={cn(`flex gap-2 items-center px-2 py-1`)}>
                  {option?.data?.FILE_NAME ? (
                    <Avatar
                      alt={option?.data?.name}
                      className="flex-shrink-0"
                      size="sm"
                      src={filePrefix + option?.data?.FILE_NAME}
                    />
                  ) : (
                    <Avatar
                      alt={option?.data?.name}
                      className="flex-shrink-0"
                      size="sm"
                      name={option?.data?.label?.trim()[0]}
                    />
                  )}

                  <div className="flex flex-col">
                    <span className="font-medium uppercase font-helvetica">
                      {option?.data?.label}
                    </span>
                    <p className="text-sm">{option?.data?.STAFF_NUMBER}</p>
                  </div>
                </div>
              </Space>
            )}
            loading={isLoading}
            {...register(`requisition_officer`)}
            className="w-full !m-0   rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
            value={watch(`requisition_officer`)}
            onChange={(value) => {
              trigger();
              setValue("requisition_officer", value);
            }}
          />
          <small className="text-danger-500">
            {touchedFields.requisition_officer &&
              errors?.requisition_officer?.message}
          </small>
        </div>
        <div className="mb-4">
          <Label htmlFor="" className="tracking-[0.5px] leading-[22px]">
            Counter Officer
          </Label>
          <Select
            allowClear
            showSearch
            placeholder="Select Counter officer"
            // labelInValue
            size="large"
            optionFilterProp="label"
            options={staffList}
            optionRender={(option) => (
              <Space
                className={cn(
                  "cursor-pointer w-full px-2 rounded-xl flex justify-between",
                  option?.data?.ON_LEAVE ? "opacity-50 cursor-not-allowed" : ""
                )}
              >
                <div className={cn(`flex gap-2 items-center px-2 py-1`)}>
                  {option?.data?.FILE_NAME ? (
                    <Avatar
                      alt={option?.data?.name}
                      className="flex-shrink-0"
                      size="sm"
                      src={filePrefix + option?.data?.FILE_NAME}
                    />
                  ) : (
                    <Avatar
                      alt={option?.data?.name}
                      className="flex-shrink-0"
                      size="sm"
                      name={option?.data?.label?.trim()[0]}
                    />
                  )}

                  <div className="flex flex-col">
                    <span className="font-medium uppercase font-helvetica">
                      {option?.data?.label}
                    </span>
                    <p className="text-sm">{option?.data?.STAFF_NUMBER}</p>
                  </div>
                </div>
              </Space>
            )}
            loading={isLoading}
            {...register(`counter_officer`)}
            className="w-full !m-0   rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
            value={watch(`counter_officer`)}
            onChange={(value) => {
              trigger();
              setValue("counter_officer", value);
            }}
          />
          <small className="text-danger-500">
            {touchedFields.counter_officer && errors?.counter_officer?.message}
          </small>
        </div>
      </main>
    </>
  );
};

export default ItemInformation;
