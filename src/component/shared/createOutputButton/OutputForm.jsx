/* eslint-disable no-unused-vars */
import { Button, Checkbox, ConfigProvider, Input, Select } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useCreateFolder } from "../../../services/API/folder";
import { errorToast, successToast } from "../../../utils/toastPopUp";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import Label from "../common/Label";
import { useState } from "react";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { useMemo } from "react";
import { useGetAllDepartment } from "../../../services/get_data";

const category = [
  {
    value: 1,
    label: "bag",
    cat: "c1",
    quantity: 50,
  },
  {
    value: 2,
    label: "shoe",
    cat: "c2",
    quantity: 5,
  },
  {
    value: 3,
    label: "car",
    cat: "c3",
    quantity: 20,
  },
  {
    value: 4,
    label: "pen",
    cat: "c4",
    quantity: 20,
  },
  {
    value: 5,
    label: "table",
    cat: "c5",
    quantity: 55,
  },
  {
    value: 6,
    label: "fertiliser",
    cat: "c6",
    quantity: 18,
  },
  {
    value: 7,
    label: "laptop",
    cat: "c7",
    quantity: 24,
  },
  {
    value: 8,
    label: "fan",
    cat: "c8",
    quantity: 50,
  },
  {
    value: 9,
    label: "bike",
    cat: "c9",
    quantity: 10,
  },
];

const OutputForm = () => {
  const { mutate, isPending } = useCreateFolder();
  const { userData } = useCurrentUser();
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState([]);

  const { data: getDepartments, isLoading: departmentLoading } =
    useGetAllDepartment(userData?.data?.COMPANY_ID);
  const departmentData = getDepartments
  const departments = departmentData?.length
    ? departmentData?.map((item) => {
        return {
          ...item,
          value: item?.DEPARTMENT_ID,
          label: item?.DEPARTMENT_NAME,
        };
      })
    : [];

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    getValues,
    trigger,
    watch,
    control,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      item: "",
    },
  });

  const onSubmit = (data) => {
    const foundItem = category.find((el) => el.value === data.item);

    const value = {
      item: foundItem,
      quantity: data?.quantity,
      department: data?.department,
    };
    setSelected((prev) => [...prev, value]);

    setValue("item", "");
    setValue("quantity", "");
    setValue("department", "");
    trigger("item");
    trigger("quantity");
    trigger("department");
  };

  const onDone = (data) => {
    const json = {
      staff_id: userData?.data?.STAFF_ID,
    };

    mutate(json, {
      onError: (error) => {
        const errMessage = error?.response?.data?.message || error?.message;

        errorToast(errMessage);
      },
      onSuccess: (response) => {
        // console.log(response);
        successToast("Folder created successfuly");
        queryClient.invalidateQueries("list_folder_status");
        //
        reset();
        setValue("folderName", "");
        trigger("folderName");
      },
    });
  };

  const onChange = (value, fieldName) => {
    console.log(value);
    setValue(fieldName, value);
    trigger(fieldName);
  };

  const filterOption = (input, option) => {
    const { label, cat } = option || {};
    const inputLower = input.toLowerCase();
    return (
      label?.toLowerCase().includes(inputLower) ||
      cat?.toLowerCase().includes(inputLower)
    );
  };

  let max = watch("item");

  const maxQuantity = useMemo(() => {
    const val = category.find((el) => el.value === max);
    if (!val) return 0;
    return val.quantity;
  }, [max]);

  const onQuantity = (fieldName, value) => {
    console.log();
    if (value && !Number(value)) return;

    if (value && Number(value) > maxQuantity) return;

    if (value.includes("e")) {
      value = value.replace(/e/g, "");
    }

    setValue(fieldName, value);
    trigger(fieldName);
  };

  const onRemove = (el) => {
    setSelected([...selected.filter((e) => e.item.value !== el)]);
  };

  return (
    <div className="pb-10 pt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <div className="mt-2">
            <Label>Select Item</Label>
            <Controller
              name="item"
              control={control}
              render={({ field }) => (
                <div>
                  <Select
                    size="large"
                    showSearch
                    placeholder="Select item"
                    // optionFilterProp="label"
                    onChange={(value) => onChange(value, "item")}
                    options={category}
                    // value={watch('item')}
                    filterOption={filterOption}
                    optionRender={(option) => (
                      <>
                        <p className="font-medium">
                          {option?.data?.label}|{" "}
                          <span className="font-light">
                            {option?.data?.cat}
                          </span>
                        </p>
                        <div className="flex items-center gap-x-2">
                          <span className="font-light">Qty -</span>
                          <span className="font-light">
                            {option?.data?.quantity}
                          </span>
                        </div>
                      </>
                    )}
                    status={errors?.item ? "error" : ""}
                    className="w-full"
                    {...field}
                  />
                  <span className="text-red-500">{errors?.item?.message}</span>
                </div>
              )}
              rules={{ required: "Item is required" }}
            />
          </div>
          <div className="mt-2">
            <Label>Quantity</Label>
            <Input
              size="large"
              type="number"
              placeholder={maxQuantity}
              max={Number(maxQuantity)}
              status={errors.quantity ? "error" : ""}
              {...register("quantity", {
                required: "This field is required",
              })}
              value={getValues("quantity")}
              onChange={(e) => onQuantity("quantity", e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "e") {
                  e.preventDefault();
                }
              }}
            />
          </div>
          <div className="mt-2">
            <Label>Department</Label>
            <Controller
              name="department"
              control={control}
              render={({ field }) => (
                <div>
                  <Select
                    aria-label="department"
                    size="large"
                    showSearch
                    loading={departmentLoading}
                    placeholder="Select department"
                    optionFilterProp="label"
                    options={departments}
                    status={
                      touchedFields?.department && errors?.department
                        ? "error"
                        : ""
                    }
                    {...field}
                    onChange={(value) => onChange(value, "department")}
                    className="w-full"
                  />
                  <span className="text-red-500">
                    {touchedFields?.department && errors?.department?.message}
                  </span>
                </div>
              )}
              rules={{ required: "This field is required" }}
            />
          </div>
        </div>

        <div className="flex justify-between pb-5">
          {/* <Button
            type="submit"
            className={`bg-[#5A6ACF] rounded text-white font-semibold py-[8px] leading-[19.5px mx-2 my-1 text-[0.7125rem] md:my-0 px-[20px] uppercase ml-auto `}
            loading={isPending}
          >
            Save
          /> */}
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#5A6ACF",
              },
            }}
          >
            <Button
              htmlType="submit"
              type="primary"
              size="small"
              className="ml-auto"
              loading={isPending}
            >
              Add
            </Button>
          </ConfigProvider>
        </div>
      </form>

      <div className="px-4 py-4 border-t flex flex-col gap-y-3 ">
        <Label>Selected Items</Label>
        <div className="flex flex-wrap gap-6 ">
          {selected.map((col, i) => (
            <div
              key={i}
              className="border border-default-200 rounded-2xl px-2 py-1"
            >
              <Checkbox
                onChange={(e) => onRemove(col?.item?.value)}
                checked={col.value === selected}
              >
                <div className="flex  gap-3 ">
                  <span className="text-gray-700">{col?.item?.label}</span>

                  <div className="flex items-center">
                    <MdOutlineProductionQuantityLimits />
                    <span>{col?.quantity}</span>
                  </div>
                </div>
              </Checkbox>
            </div>
          ))}
        </div>
      </div>

      <div className="ml-auto flex">
        {" "}
        {selected.length > 0 && (
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            className="ml-auto"
            loading={isPending}
          >
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};

export default OutputForm;
