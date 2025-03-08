/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "react-quill/dist/quill.snow.css";
import { Button, Input, Select } from "antd";

import useCurrentUser from "../../../hooks/useCurrentUser";
import { useListFolder } from "../../../services/API/folder";
import Label from "../common/Label";
import InventoryTable from "./InventoryTable";
import { Plus } from "lucide-react";

const InventoryForm = ({
  register,
  getValues,
  setValue,
  watch,
  errors,
  touchedFields,
  trigger,
}) => {
  const { userData } = useCurrentUser();
  const { data: getFolderList, isLoading: getFolderLoading } = useListFolder(
    userData?.data?.STAFF_ID
  );

  const folderList = getFolderList?.map((folder) => {
    return {
      ...folder,
      value: folder?.NAME,
      label: folder?.NAME,
    };
  });

  return (
    // They type the product description, an input field, type in unit price and enter quantity, start with 1, they can enter, increase or decrease, it also will include remark field, bin card no and product code
    <>
      <main className="px-5 ">
        <div className="mb-4">
          <Label htmlFor="" className="tracking-[0.5px] leading-[22px]">
            Item Name
          </Label>
          <Input
            size="large"
            placeholder="item name"
            status={errors?.item_name ? "error" : ""}
            defaultValue={getValues("item_name")}
            {...register("item_name", {
              required: "This field is required",
            })}
            onChange={(e) => {
              trigger();
              setValue("item_name", e.target.value);
            }}
          />
          <small className="text-danger-500">
            {touchedFields.item_name && errors?.item_name?.message}
          </small>
        </div>
        <div className="mb-4">
          <Label htmlFor="" className="tracking-[0.5px] leading-[22px]">
            Description
          </Label>
          <Input
            size="large"
            placeholder="description"
            status={errors?.description ? "error" : ""}
            defaultValue={getValues("description")}
            {...register("description", {
              required: "This field is required",
            })}
            onChange={(e) => {
              trigger();
              setValue("description", e.target.value);
            }}
          />
          <small className="text-danger-500">
            {touchedFields.description && errors?.description?.message}
          </small>
        </div>
        <div className="mb-4">
          <Label htmlFor="" className="tracking-[0.5px] leading-[22px]">
            Unit PRICE
          </Label>
          <Input
            size="large"
            placeholder="unit"
            status={errors?.unit ? "error" : ""}
            defaultValue={getValues("unit")}
            {...register("unit", {
              required: "This field is required",
            })}
            onChange={(e) => {
              trigger();
              setValue("unit", e.target.value);
            }}
          />
          <small className="text-danger-500">
            {touchedFields.unit && errors?.unit?.message}
          </small>
        </div>
        <div className="mb-4">
          <Label>Quantity</Label>
          <Input
            size="large"
            type="number"
            placeholder="0"
            status={errors.quantity ? "error" : ""}
            {...register("quantity", {
              required: "This field is required",
            })}
            value={getValues("quantity")}
            onChange={(e) => {
              trigger();
              setValue("quantity", e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "e") {
                e.preventDefault();
              }
            }}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="" className="tracking-[0.5px] leading-[22px]">
            Product Code
          </Label>
          <Input
            size="large"
            placeholder="product code"
            status={errors?.product_code ? "error" : ""}
            defaultValue={getValues("product_code")}
            {...register("product_code", {
              required: "This field is required",
            })}
            onChange={(e) => {
              trigger();
              setValue("product_code", e.target.value);
            }}
          />
          <small className="text-danger-500">
            {touchedFields.product_code && errors?.product_code?.message}
          </small>
        </div>
        <div className="mb-4">
          <Label htmlFor="" className="tracking-[0.5px] leading-[22px]">
            Bin card No
          </Label>
          <Input
            size="large"
            placeholder="bin card no"
            status={errors?.bin_no ? "error" : ""}
            defaultValue={getValues("bin_no")}
            {...register("bin_no", {
              required: "This field is required",
            })}
            onChange={(e) => {
              trigger();
              setValue("bin_no", e.target.value);
            }}
          />
          <small className="text-danger-500">
            {touchedFields.bin_no && errors?.bin_no?.message}
          </small>
        </div>
        <div className="mb-4">
          <Label htmlFor="" className="tracking-[0.5px] leading-[22px]">
            Remark
          </Label>
          <Input
            size="large"
            placeholder="remark"
            status={errors?.remark ? "error" : ""}
            defaultValue={getValues("remark")}
            {...register("remark", {
              required: "This field is required",
            })}
            onChange={(e) => {
              trigger();
              setValue("remark", e.target.value);
            }}
          />
          <small className="text-danger-500">
            {touchedFields.remark && errors?.remark?.message}
          </small>
        </div>
        <div className="ml-auto flex justify-end">
          <Button>
            <Plus />
            Add
          </Button>
        </div>
      </main>

      <InventoryTable getValues={getValues} setValue={setValue} watch={watch} />
    </>
  );
};

export default InventoryForm;
