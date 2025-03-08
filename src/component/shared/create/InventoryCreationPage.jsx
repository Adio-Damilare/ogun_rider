import { Button, ConfigProvider, Input, Select } from "antd";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import useInventoryStore from "../../../hooks/useInventory";
import { useEffect } from "react";
import { useGetAsset } from "../../../services/API/getParameters";
import useCurrentUser from "../../../hooks/useCurrentUser";

// Define the default structure for one inventory item
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

const InventoryCreationPage = () => {
  const { data, updateData } = useInventoryStore();
  const { register, control, watch, getValues, setValue, handleSubmit } =
    useForm({
      defaultValues: { inventory: [...data] },
    });

  const { userData } = useCurrentUser();

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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "inventory",
  });

  useEffect(() => {
    return () => {
      updateData(getValues("inventory"));
    };
  }, [getValues, updateData]);

  const onSubmit = (data) => {
    console.log("Inventory Data:", data);
    // Process or send data to your API here
  };

  const onQuantity = (signal, inputData, index) => {
    const value = getValues(`inventory.${index}.quantity`);

    if (value && !Number(value)) return;

    if (signal === "inc") {
      return setValue(`inventory.${index}.quantity`, Number(value) + 1);
    }

    if (signal === "dec" && Number(value) > 1) {
      return setValue(`inventory.${index}.quantity`, Number(value) - 1);
    }

    if (signal === "inp" && (Number(inputData) >= 1 || inputData === "")) {
      return setValue(`inventory.${index}.quantity`, inputData);
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
        const stockAlert = watch(`inventory.${index}.stock_alert`);
        const maxValue = watch(`inventory.${index}.quantity`) - 1 || 0;
        const isOverLimit = stockAlert > maxValue;
        return (
          <div key={field.id} className="border rounded-lg shadow">
            {/* Overall header for each row */}
            <div className="w-full bg-[#5A6ACF] shadow border border-[#5A6ACF] px-4 py-2 rounded-t-lg">
              <h3 className="text-lg font-semibold uppercase text-white">
                Item {index + 1}
              </h3>
            </div>

            {/* Fields container – flex wraps on smaller screens */}
            <div className="p-4 flex flex-wrap gap-4">
              {/* Item Name */}
              {/* <div className="flex flex-col flex-1 min-w-[200px]">
            <label className="px-1 py-0.5 text-xs font-medium uppercase">
              Item Name
            </label>
            <Input
              type="text"
              placeholder="Item Name"
              {...register(`inventory.${index}.itemName`)}
              className="w-full h-8 p-1 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-300 text-[0.85rem]"
            />
          </div> */}

              {/* Description – textarea with large width */}
              <div className="flex flex-col flex-1 min-w-[600px md:min-w-[60%] min-w-[100%]">
                <label className="px-1 py-0.5 text-xs font-medium uppercase">
                  Product Description
                </label>
                <Input.TextArea
                  placeholder="Description"
                  {...register(`inventory.${index}.description`)}
                  className="!w-full !h-8 p-1 border rounded-md text-sm resize-none focus:outline-none focus:ring-1 focus:ring-blue-300 text-[0.85rem]"
                  value={watch(`inventory.${index}.description`)}
                  onChange={(e) =>
                    handleChange(
                      `inventory.${index}.description`,
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="flex flex-col flex-1 min-w-[200px]">
                <label className="px-1 py-0.5 text-xs font-medium uppercase">
                  Assets
                </label>

                <Select
                  allowClear
                  showSearch
                  placeholder="Select Asset"
                  // labelInValue
                  optionFilterProp="label"
                  options={assetList}
                  loading={isLoading}
                  {...register(`inventory.${index}.category`)}
                  className="w-full !h-8 !p-0 !m-0   rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-300 text-[0.85rem]"
                  value={watch(`inventory.${index}.category`)}
                  onChange={(e) =>
                    handleChange(`inventory.${index}.category`, e)
                  }
                />
              </div>

              {/* Code – small width */}
              <div className="flex flex-col min-w-[100px]">
                <label className="px-1 py-0.5 text-xs font-medium uppercase">
                  Code
                </label>
                <Input
                  type="text"
                  placeholder="Code"
                  {...register(`inventory.${index}.code`)}
                  className="w-24 h-8 p-1 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-300 text-[0.85rem]"
                  value={watch(`inventory.${index}.code`)}
                  onChange={(e) =>
                    handleChange(`inventory.${index}.code`, e.target.value)
                  }
                />
              </div>

              {/* Unit Price – small width */}
              <div className="flex flex-col min-w-[100px]">
                <label className="px-1 py-0.5 text-xs font-medium uppercase">
                  Unit Price
                </label>
                <Input
                  type="number"
                  min={0}
                  placeholder="Unit Price"
                  {...register(`inventory.${index}.unitPrice`)}
                  className="w-24 h-8 p-1 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-300 text-[0.85rem]"
                  value={watch(`inventory.${index}.unitPrice`)}
                  onChange={(e) =>
                    handleChange(`inventory.${index}.unitPrice`, e.target.value)
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
                      icon={<Minus className="text-[#404871" />}
                    ></Button>
                  </ConfigProvider>
                  <Input
                    className="w-20 !h-6 p-1 border rounded-md  focus:outline-none focus:ring-1 focus:ring-blue-300 text-[0.85rem]  border-b flex-1 flex items-center justify-center  caret-purple-950  text-gray-700 text-lg font-semibold text-center"
                    placeholder="2"
                    variant="borderless"
                    size="small"
                    defaultValue={getValues(`inventory.${index}.quantity`)}
                    onChange={(e) => {
                      onQuantity("inp", e.target.value, index);
                    }}
                    value={watch(`inventory.${index}.quantity`)}
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
                      className="h-7"
                      icon={<Plus className="text-[#404871 " />}
                    ></Button>
                  </ConfigProvider>
                </div>
              </div>

              {/* LPO No – small width */}
              <div className="flex flex-col min-w-[100px]">
                <label className="px-1 py-0.5 text-xs font-medium uppercase">
                  LPO No
                </label>
                <Input
                  type="number"
                  min={0}
                  placeholder="LPO No"
                  {...register(`inventory.${index}.lpoNo`)}
                  className="w-20 h-8 p-1 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-300 text-[0.85rem]"
                  value={watch(`inventory.${index}.lpoNo`)}
                  onChange={(e) =>
                    handleChange(`inventory.${index}.lpoNo`, e.target.value)
                  }
                />
              </div>

              {/* Bin Card No – small width */}
              <div className="flex flex-col min-w-[100px]">
                <label className="px-1 py-0.5 text-xs font-medium uppercase">
                  Bin Card No
                </label>
                <Input
                  type="number"
                  min={0}
                  placeholder="Bin Card No"
                  {...register(`inventory.${index}.binCardNo`)}
                  className="w-20 h-8 p-1 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-300 text-[0.85rem]"
                  value={watch(`inventory.${index}.binCardNo`)}
                  onChange={(e) =>
                    handleChange(`inventory.${index}.binCardNo`, e.target.value)
                  }
                />
              </div>
              {/* Stock alert – small width */}
              <div className="flex flex-col min-w-[150px]">
                <label className="px-1 py-0.5 text-xs font-medium uppercase">
                  Stock Alert
                </label>
                <Input
                  type="number"
                  min={0}
                  max={maxValue}
                  disabled={!watch(`inventory.${index}.quantity`)}
                  placeholder="Stock Alert"
                  {...register(`inventory.${index}.stock_alert`, {
                    valueAsNumber: true, // Ensures value is treated as a number
                    validate: (value) =>
                      value <= maxValue || "Exceeds max stock",
                  })}
                  // className="w-36 h-8 p-1 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-300 text-[0.85rem]"
                  className={`w-36 h-8 p-1 border rounded-md text-sm focus:outline-none focus:ring-1 ${
                    isOverLimit
                      ? "border-red-500 focus:ring-red-500 text-red-500"
                      : "focus:ring-blue-300"
                  }`}
                  value={watch(`inventory.${index}.stock_alert`)}
                  onChange={(e) => {
                    let value = Number(e.target.value);
                    if (value > maxValue) {
                      value = maxValue; // Force reset to max if exceeded
                    }
                    handleChange(`inventory.${index}.stock_alert`, value);
                  }}
                />
              </div>

              {/* Remark – textarea with large width and same height as input */}
              <div className="flex flex-col flex-1 min-w-[200px] max-w-[700px]">
                <label className="px-1 py-0.5 text-xs font-medium uppercase">
                  Remark
                </label>
                <Input.TextArea
                  placeholder="Remark"
                  {...register(`inventory.${index}.remark`)}
                  className="w-full !h-8 p-1 border rounded-md text-sm resize-none focus:outline-none focus:ring-1 focus:ring-blue-300 text-[0.85rem]"
                  value={watch(`inventory.${index}.remark`)}
                  onChange={(e) =>
                    handleChange(`inventory.${index}.remark`, e.target.value)
                  }
                />
              </div>
            </div>

            {/* Row action buttons */}
            <div className="px-4 pb-4 flex justify-end">
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="px-2 py-1  bg-red-600 text-white  text-sm hover:bg-red-600 transition-colors rounded-xl flex items-center gap-x-2"
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
          className="px-4 py-2 bg-green-800 text-white rounded-md text-sm hover:bg-green-600 transition-colors"
        >
          Submit
        </button> */}
      </div>
    </form>
  );
};

export default InventoryCreationPage;
