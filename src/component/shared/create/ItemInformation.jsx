// Date received, LPO No, Method of delivery,  Supplier Name, Supplier Invoice No and Waybill No

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "react-quill/dist/quill.snow.css";
import { DatePicker, Input, Select } from "antd";

import useCurrentUser from "../../../hooks/useCurrentUser";
import { useListFolder } from "../../../services/API/folder";
import Label from "../common/Label";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import { useGetAllStaff } from "../../../services/get_data";

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

  const staffList = getStaff?.map((staff) => {
    return {
      ...staff,
      label: `${staff?.FIRST_NAME} ${staff?.LAST_NAME}`,
      value: staff?.STAFF_ID,
    };
  });

  const folderList = getFolderList?.map((folder) => {
    return {
      ...folder,
      value: folder?.NAME,
      label: folder?.NAME,
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
          <Label>Date Received</Label>
          <Controller
            name="date_received"
            control={control}
            render={({ field }) => (
              <>
                <DatePicker
                  defaultValue={
                    getValues("date_received")
                      ? dayjs(getValues("date_received"), "YYYY-MM-DD")
                      : ""
                  }
                  size={"large"}
                  className="w-full border-gray-300 rounded-md  focus:outline-none"
                  {...field}
                  value={field.value ? dayjs(field.value, "YYYY-MM-DD") : null}
                  onChange={(date, dateString) => {
                    field.onChange(dateString);
                    onChange(dateString, "date_received");
                  }}
                  status={
                    touchedFields.date_received && errors.date_received
                      ? "error"
                      : ""
                  }
                />
                <span className="text-red-500">
                  {touchedFields.date_received &&
                    errors?.date_received?.message}
                </span>
              </>
            )}
            rules={{ required: "This field is required" }}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="" className="tracking-[0.5px] leading-[22px]">
            LPO No
          </Label>
          <Input
            size="large"
            type="number"
            min={0}
            placeholder="lpo number"
            status={errors?.subject ? "error" : ""}
            defaultValue={getValues("lpo_number")}
            {...register("lpo_number", {
              required: "This field is required",
            })}
            onChange={(e) => {
              trigger();
              setValue("lpo_number", e.target.value);
            }}
          />
          <small className="text-danger-500">
            {touchedFields.lpo_number && errors?.lpo_number?.message}
          </small>
        </div>
        <div className="mb-4">
          <Label htmlFor="" className="tracking-[0.5px] leading-[22px]">
            Method of delivery
          </Label>
          <Input
            size="large"
            placeholder="delivery method"
            status={errors?.subject ? "error" : ""}
            defaultValue={getValues("delivery_method")}
            {...register("delivery_method", {
              required: "This field is required",
            })}
            onChange={(e) => {
              trigger();
              setValue("delivery_method", e.target.value);
            }}
          />
          <small className="text-danger-500">
            {touchedFields.delivery_method && errors?.delivery_method?.message}
          </small>
        </div>
        <div className="mb-4">
          <Label htmlFor="" className="tracking-[0.5px] leading-[22px]">
            Supplier Name
          </Label>
          <Input
            size="large"
            placeholder="supplier nume"
            status={errors?.subject ? "error" : ""}
            defaultValue={getValues("supplier_name")}
            {...register("supplier_name", {
              required: "This field is required",
            })}
            onChange={(e) => {
              trigger();
              setValue("supplier_name", e.target.value);
            }}
          />
          <small className="text-danger-500">
            {touchedFields.supplier_name && errors?.supplier_name?.message}
          </small>
        </div>
        <div className="mb-4">
          <Label htmlFor="" className="tracking-[0.5px] leading-[22px]">
            Supplier Invoice No
          </Label>
          <Input
            size="large"
            placeholder="supplier invoice_no"
            status={errors?.subject ? "error" : ""}
            defaultValue={getValues("supplier_invoice_no")}
            {...register("supplier_invoice_no", {
              required: "This field is required",
            })}
            onChange={(e) => {
              trigger();
              setValue("supplier_invoice_no", e.target.value);
            }}
          />
          <small className="text-danger-500">
            {touchedFields.supplier_invoice_no &&
              errors?.supplier_invoice_no?.message}
          </small>
        </div>
        <div className="mb-4">
          <Label htmlFor="" className="tracking-[0.5px] leading-[22px]">
            Recieved By
          </Label>
          <Select
            allowClear
            showSearch
            placeholder="Select Asset"
            // labelInValue
            size="large"
            optionFilterProp="label"
            options={staffList}
            loading={isLoading}
            {...register(`recieved_by`)}
            className="w-full !m-0   rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
            value={watch(`recieved_by`)}
            onChange={(value) => {
              trigger();
              setValue("recieved_by", value);
            }}
          />
          <small className="text-danger-500">
            {touchedFields.recieved_by && errors?.recieved_by?.message}
          </small>
        </div>
        <div className="mb-4">
          <Label htmlFor="" className="tracking-[0.5px] leading-[22px]">
            Waybill No
          </Label>
          <Input
            size="large"
            type="number"
            min={0}
            placeholder="waybill no"
            status={errors?.subject ? "error" : ""}
            defaultValue={getValues("waybill_no")}
            {...register("waybill_no", {
              required: "This field is required",
            })}
            onChange={(e) => {
              trigger();
              setValue("waybill_no", e.target.value);
            }}
          />
          <small className="text-danger-500">
            {touchedFields.waybill_no && errors?.waybill_no?.message}
          </small>
        </div>
      </main>
    </>
  );
};

export default ItemInformation;
