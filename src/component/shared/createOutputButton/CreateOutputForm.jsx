import { Button, Input, Select } from 'antd';
import {  Minus, Plus, Trash2,  } from 'lucide-react';
import { useForm, useFieldArray } from 'react-hook-form';

// Define the default structure for one inventory item
const defaultRow = {
  description: '',
  stock_balance: '',
  ledger_no: '',
  unit_of_issue: '',
  quantity_required: '',
  quantity_approved: 1,
  quantity_issued: '',
};

const products = [
    {
      value: 1,
      label: "product 1",
    },
    {
      value: 2,
      label: "product 2",
    },
    {
      value: 3,
      label: "product 3",
    },
  ];

const CreateOutputForm = () => {
  const { register, control, watch, getValues, setValue, handleSubmit } = useForm({
    defaultValues: { inventory: [defaultRow] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'inventory',
  });  

  const onSubmit = (data) => {
    console.log('Inventory Data:', data);
    // Process or send data to your API here
  };


  const onQuantity = (signal, inputData, index) => {
    const value = getValues(`inventory.${index}.quantity_approved`)

    if (value && !Number(value)) return;

    if(signal === 'inc'){
     return   setValue(`inventory.${index}.quantity_approved`, Number(value) +1);
    }

    if(signal === 'dec' && Number(value) > 1){
       return  setValue(`inventory.${index}.quantity_approved`, Number(value) - 1);
    }

    if(signal === 'inp' && (Number(inputData) >= 1  || inputData === '')){
       return  setValue(`inventory.${index}.quantity_approved`, inputData );
    }
  };


  const handleChange = (fieldName, value) => {
    setValue(fieldName, value )
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-7xl mx-auto p-4 space-y-6">
      {/* <h2 className="text-xl font-semibold text-center">Inventory</h2> */}

      {fields.map((field, index) => (
        <div key={field.id} className="border rounded-lg shadow">
          {/* Overall header for each row */}
          <div className="w-full bg-gray-300 px-4 py-2 rounded-t-lg">
            <h3 className="text-lg font-semibold uppercase">Item {index + 1}</h3>
          </div>

          {/* Fields container – flex wraps on smaller screens */}
          <div className="p-4 flex flex-wrap gap-4">
            <div className="flex flex-col flex-1 max-w-[250px] ">
              <label className="bg-gray-50 px-1 py-0.5 text-xs font-medium uppercase">
                Select Product
              </label>
              
              <Select
                allowClear
                showSearch
                placeholder="Select category"
                // labelInValue
                optionFilterProp="label"
                options={products}
                {...register(`inventory.${index}.description`)}
                className="w-full !h-8 !p-0 !m-0   rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
                value={watch(`inventory.${index}.description`)}
                onChange={(e)=>handleChange(`inventory.${index}.description`, e)}
              />
            </div>
            {/* Code – small width */}
            <div className="flex flex-col min-w-[100px]">
              <label className="bg-gray-50 px-1 py-0.5 text-xs font-medium uppercase">
                Stock Balance
              </label>
              <Input
                type="text"
                placeholder="stock balance"
                {...register(`inventory.${index}.stock_balance`)}
                className="w-full h-8 p-1 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
                value={watch(`inventory.${index}.stock_balance`)}
                onChange={(e)=>handleChange(`inventory.${index}.stock_balance`, e.target.value)}
              />
            </div>

            {/* Unit Price – small width */}
            <div className="flex flex-col min-w-[150px]">
              <label className="bg-gray-50 px-1 py-0.5 text-xs font-medium uppercase">
                Ledger Number
              </label>
              <Input
                type="number"
                placeholder="Ledger Number"
                {...register(`inventory.${index}.ledger_no`)}
                className="w-full h-8 p-1 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
                value={watch(`inventory.${index}.ledger_no`)}
                onChange={(e)=>handleChange(`inventory.${index}.ledger_no`, e.target.value)}
              />
            </div>
            {/* Quantity – small width */}
            <div className="flex flex-col min-w-[150px]">
              <label className="bg-gray-50 px-1 py-0.5 text-xs font-medium uppercase">
                Quantity Required
              </label>
              <Input
                type="number"
                placeholder="Quantity Required"
                {...register(`inventory.${index}.quantity_required`)}
                className="w-full h-8 p-1 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
                value={watch(`inventory.${index}.quantity_required`)}
                onChange={(e)=>handleChange(`inventory.${index}.quantity_required`, e.target.value)}
              />
            </div>
          

            {/* Quantity – small width */}
            <div className="flex flex-col min-w-[100px] max-w-[150px]">
              <label className="bg-gray-50 px-1 py-0.5 text-xs font-medium uppercase">
                Quantity Approved
              </label>
               <div className="flex items-center w-full p-1 justify-between gap-1 rounded-md  bg-[#f2f6f7]">
                        <Button  onClick={()=>onQuantity('inc', null, index)} className="h-7" icon={<Plus className="text-[#404871] "/>}></Button>
                        <Input
                      
                        className="w-20 !h-6 p-1 border rounded-md  focus:outline-none focus:ring-1 focus:ring-blue-300  border-b flex-1 flex items-center justify-center  caret-purple-950  text-gray-700 text-lg font-semibold text-center"
                            placeholder="2"
                            variant="borderless"
                            size="small"
                            defaultValue={getValues(`inventory.${index}.quantity_approved`)}
                            onChange={(e) => {
                                onQuantity("inp", e.target.value, index);
                            }}
                            value={watch(`inventory.${index}.quantity_approved`)}                      
                            onKeyDown={(e) => {
                                if (e.key === "e") {
                                  e.preventDefault();
                                }
                              }}
                        />
                        <Button  onClick={()=>onQuantity('dec', null, index )}  className="h-7" icon={<Minus className="text-[#404871]"/>}></Button>

                    </div>
            </div>

              {/* Quantity – small width */}
              <div className="flex flex-col min-w-[100px]">
              <label className="bg-gray-50 px-1 py-0.5 text-xs font-medium uppercase">
                Quantity Issued
              </label>
              <Input
                type="number"
                placeholder="Quantity Issued"
                {...register(`inventory.${index}.quantity_issued`)}
                className="w-full h-8 p-1 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
                value={watch(`inventory.${index}.quantity_issued`)}
                onChange={(e)=>handleChange(`inventory.${index}.quantity_issued`, e.target.value)}
              />
            </div>
              {/* Quantity – small width */}
              <div className="flex flex-col min-w-[100px]">
              <label className="bg-gray-50 px-1 py-0.5 text-xs font-medium uppercase">
                Unit of Issued
              </label>
              <Input
                type="number"
                placeholder="Unit of Issued"
                {...register(`inventory.${index}.unit_of_issue`)}
                className="w-full h-8 p-1 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
                value={watch(`inventory.${index}.unit_of_issue`)}
                onChange={(e)=>handleChange(`inventory.${index}.unit_of_issue`, e.target.value)}
              />
            </div>
           
          </div>

          {/* Row action buttons */}
          <div className="px-4 pb-4 flex justify-end">
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="px-2 py-1  bg-gray-600 text-white  text-sm hover:bg-red-600 transition-colors rounded-xl flex items-center gap-x-2"
              >
                <Trash2 size={15}/>
              </button>
            )}
          </div>
        </div>
      ))}

      {/* Controls to add new items and submit */}
      <div className="flex items-center gap-4 justify-between">
        <button
          type="button"
          onClick={() => append(defaultRow)}
          className="px-2 py-2 bg-gray-600 text-white rounded-md text-sm hover:bg-stone-600 transition-colors flex items-center gap-x-1"
        >
          <Plus size={16}/> Item
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-800 text-white rounded-md text-sm hover:bg-green-600 transition-colors"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default CreateOutputForm;
