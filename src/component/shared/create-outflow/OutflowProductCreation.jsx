import { Button, ConfigProvider, Input, Select } from "antd";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import { useGetProducts } from "../../../services/API/getParameters";
import useCurrentUser from "../../../hooks/useCurrentUser";
import useOutflowStore from "../../../hooks/useOutflow";

// Define the default structure for one outflow item
const defaultRow = {
  description: "",
  code: "",
  unitPrice: "",
  quantity: 1,
  category: "",
  lpoNo: "",
  binCardNo: "",
  remark: "",
};

const OutflowProductCreation = () => {
  const { data, updateData } = useOutflowStore();
  const { register, control, watch, getValues, setValue, handleSubmit } =
    useForm({
      defaultValues: { outflow: [...data] },
    });

  const { userData } = useCurrentUser();

  const { data: getProducts, isLoading: productsLoading } = useGetProducts({
    region_id: userData?.data?.REGION,
  });

  const productList = getProducts?.map((product) => {
    return {
      ...product,
      label: product?.PRODUCT_DESCRIPTION,
      value: product?.ID,
    };
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "outflow",
  });

  useEffect(() => {
    return () => {
      updateData(getValues("outflow"));
    };
  }, [getValues, updateData]);

  const onSubmit = (data) => {
    console.log("outflow Data:", data);
    // Process or send data to your API here
  };

  const onQuantity = (signal, inputData, index) => {
    const value = getValues(`outflow.${index}.quantity`);

    if (value && !Number(value)) return;

    if (signal === "inc") {
      return setValue(`outflow.${index}.quantity`, Number(value) + 1);
    }

    if (signal === "dec" && Number(value) > 1) {
      return setValue(`outflow.${index}.quantity`, Number(value) - 1);
    }

    if (signal === "inp" && (Number(inputData) >= 1 || inputData === "")) {
      return setValue(`outflow.${index}.quantity`, inputData);
    }
  };

  const handleChange = (fieldName, value) => {
    setValue(fieldName, value);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-7xl mx-auto p-4 space-y-6"
    >
      {/* <h2 className="text-xl font-semibold text-center">Inventory</h2> */}

      {fields.map((field, index) => {
        return (
          <div key={field.id} className="border rounded-lg shadow">
            {/* Overall header for each row */}
            <div className="w-full bg-[#5A6ACF] shadow border border-[#5A6ACF] px-4 py-2 rounded-t-lg">
              <h3 className="text-lg font-semibold uppercase text-white">
                Product {index + 1}
              </h3>
            </div>

            {/* Fields container – flex wraps on smaller screens */}
            <div className="p-4 flex flex-wrap gap-4">
              <div className="flex flex-col flex-1 min-w-[200px] md:min-w-[150px]">
                <label className="px-1 py-0.5 text-xs font-medium uppercase">
                  Product
                </label>
                <Select
                  allowClear
                  showSearch
                  placeholder="Select Product"
                  // labelInValue
                  optionFilterProp="label"
                  options={productList}
                  loading={productsLoading}
                  {...register(`outflow.${index}.product_id`)}
                  className="w-full !h-8 !p-0 !m-0   rounded-md text-[0.85rem] focus:outline-none focus:ring-1 focus:ring-blue-300"
                  value={watch(`outflow.${index}.product_id`)}
                  onChange={(e) =>
                    handleChange(`outflow.${index}.product_id`, e)
                  }
                />
              </div>
              {watch(`outflow.${index}.product_id`) && (
                <div className="flex flex-col min-w-[100px]">
                  <label className="px-1 py-0.5 text-xs font-medium uppercase">
                    Balance
                  </label>
                  <Input
                    type="number"
                    placeholder="Balance"
                    {...register(`outflow.${index}.quantity_required`)}
                    className="w-20 h-8 p-1 border rounded-md text-[0.85rem] focus:outline-none focus:ring-1 focus:ring-blue-300"
                    value={
                      productList?.find(
                        (el) => el.ID === watch(`outflow.${index}.product_id`)
                      )?.BALANCE
                    }
                    disabled
                  />
                </div>
              )}
              <div className="flex flex-col min-w-[100px]">
                <label className="px-1 py-0.5 text-xs font-medium uppercase">
                  Unit of issue
                </label>
                <Input
                  type="text"
                  placeholder="Unit of issue"
                  {...register(`outflow.${index}.unit_of_issue`)}
                  className="w-44 h-8 p-1 border rounded-md text-[0.85rem] focus:outline-none focus:ring-1 focus:ring-blue-300"
                  value={watch(`outflow.${index}.unit_of_issue`)}
                  onChange={(e) =>
                    handleChange(
                      `outflow.${index}.unit_of_issue`,
                      e.target.value
                    )
                  }
                />
              </div>
              <div className="flex flex-col min-w-[100px]">
                <label className="px-1 py-0.5 text-xs font-medium uppercase">
                  Quantity required
                </label>
                <Input
                  type="number"
                  placeholder="Quantity required"
                  {...register(`outflow.${index}.quantity_required`)}
                  className="w-44 h-8 p-1 border rounded-md text-[0.85rem] focus:outline-none focus:ring-1 focus:ring-blue-300"
                  value={watch(`outflow.${index}.quantity_required`)}
                  onChange={(e) =>
                    handleChange(
                      `outflow.${index}.quantity_required`,
                      e.target.value
                    )
                  }
                />
              </div>

              {/* Unit Price – small width */}
              <div className="flex flex-col min-w-[100px]">
                <label className="px-1 py-0.5 text-xs font-medium uppercase">
                  Quantity Approved
                </label>
                <Input
                  type="number"
                  min={0}
                  placeholder="Quantity approved"
                  {...register(`outflow.${index}.quantity_approved`)}
                  className="w-44 h-8 p-1 border rounded-md text-[0.85rem] focus:outline-none focus:ring-1 focus:ring-blue-300"
                  value={watch(`outflow.${index}.quantity_approved`)}
                  onChange={(e) =>
                    handleChange(
                      `outflow.${index}.quantity_approved`,
                      e.target.value
                    )
                  }
                />
              </div>

              {/* Quantity – small width */}
              <div className="flex flex-col min-w-[100px] max-w-[130px]">
                <label className="px-1 py-0.5 text-xs font-medium uppercase">
                  Quantity
                </label>
                <div className="flex items-center w-full p-1 justify-between gap-1 rounded-md">
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: "#5A6ACF",
                        colorText: "#FFF",
                      },
                    }}
                  >
                    <Button
                      type="primary"
                      onClick={() => onQuantity("dec", null, index)}
                      className="h-7"
                      icon={<Minus className="text-[#5A6ACF" />}
                    ></Button>
                  </ConfigProvider>
                  <Input
                    className="w-20 !h-6 p-1 border rounded-md  focus:outline-none focus:ring-1 focus:ring-blue-300  border-b flex-1 flex items-center justify-center  caret-purple-950  text-gray-700 text-lg font-semibold text-center"
                    placeholder="2"
                    variant="borderless"
                    size="small"
                    defaultValue={getValues(`outflow.${index}.quantity`)}
                    onChange={(e) => {
                      onQuantity("inp", e.target.value, index);
                    }}
                    value={watch(`outflow.${index}.quantity`)}
                    onKeyDown={(e) => {
                      if (e.key === "e") {
                        e.preventDefault();
                      }
                    }}
                  />
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: "#5A6ACF",
                        colorText: "#FFF",
                      },
                    }}
                  >
                    <Button
                      type="primary"
                      onClick={() => onQuantity("inc", null, index)}
                      disabled={
                        productList?.find(
                          (el) => el.ID === watch(`outflow.${index}.product_id`)
                        )?.BALANCE <= watch(`outflow.${index}.quantity`)
                      }
                      className="h-7"
                      icon={<Plus className="text-[#404871" />}
                    ></Button>
                  </ConfigProvider>
                </div>
              </div>
            </div>

            {/* Row action buttons */}
            <div className="px-4 pb-4 flex justify-end">
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="px-2 py-1  bg-red-600 text-white  text-[0.85rem] hover:bg-red-600 transition-colors rounded-xl flex items-center gap-x-2"
                >
                  <Trash2 size={15} />
                </button>
              )}
            </div>
          </div>
        );
      })}

      {/* Controls to add new items and submit */}
      <div className="flex items-center gap-4 justify-between">
        <button
          type="button"
          onClick={() => append(defaultRow)}
          className="px-1.5 py-1.5 bg-[#5A6ACF] text-white rounded-md text-[0.85rem] hover:bg-[#5A6ACF]/90 transition-colors flex items-center gap-x-1"
        >
          <Plus size={16} /> More Item
        </button>
        {/* <button
          type="submit"
          className="px-4 py-2 bg-green-800 text-white rounded-md text-[0.85rem] hover:bg-green-600 transition-colors"
        >
          Submit
        </button> */}
      </div>
    </form>
  );
};

export default OutflowProductCreation;
