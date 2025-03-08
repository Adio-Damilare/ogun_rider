/* eslint-disable react/prop-types */
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
  import { useMemo, useState } from "react";
import { DeleteIcon, EditIcon, EyeIcon } from "../../../component/shared/svg_icons";
import { Button, Input } from "antd";
import { Minus, Plus } from "lucide-react";
 
  
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
      CATEGORY: 'CATEGORY 2',
      DEPARTMENT: "LIBRABRY",
      DATE: "01-01-2025",
      QUANTITY: 32,
      FILES: []
    },
    {
      ITEM: "car",
      ITEM_NO: 212344,
      CATEGORY: 'CATEGORY 3',
      DEPARTMENT: "SERVICOM",
      DATE: "02-02-2025",
      QUANTITY: 12,
      FILES: []
    },
  ]
  
  const InventoryTable = ({ userData, data, getValues, setValue, watch }) => {
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState(null);
    const rowsPerPage = 10;
    const pages = Math.ceil(inventoryData?.length / rowsPerPage);
  
  
    const onCategory = (e, id) => {
      e.preventDefault();
      if (selected === id) return;
      setSelected(id);
    };


    const onQuantity = (signal, inputData) => {
        const value = getValues("quantity")

        if (value && !Number(value)) return;

        if(signal === 'inc'){
         return   setValue("quantity", Number(value) +1);
        }

        if(signal === 'dec' && Number(value) > 1){
           return  setValue("quantity", Number(value) - 1);
        }

        if(signal === 'inp' && (Number(inputData) >= 1  || inputData === '')){
           return  setValue("quantity", inputData );
        }
      };
  

  
    return (
      <div className="bg-white rounded-lg border my-8 ">
        <Table
          aria-label="Example static collection table"
          radius="none"
          isHeaderSticky
          shadow="none"
          className="w-full"
          classNames={{
            td: "!py-2",
            tbody: "!py-2",
            tr: "py-2"
          }}
          align="center"
        >
          <TableHeader>
            <TableColumn className="text-sm opacity-70">PRODUCT NAME</TableColumn>
            <TableColumn className="text-sm opacity-70">CODE</TableColumn>
            <TableColumn className="text-sm opacity-70">QUANTITY</TableColumn>
            <TableColumn className="text-sm opacity-70">COST</TableColumn>
          </TableHeader>
          <TableBody className="" >
            {inventoryData?.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="text-[0.85rem] opacity-65">
                  {item?.ITEM}
                </TableCell>
                <TableCell className="text-[0.85rem] opacity-65">
                  {item?.ITEM_NO}
                </TableCell>
                <TableCell className="text-[0.85rem] opacity-65">
                    <div className="flex items-center w-full p-1 justify-between gap-1 rounded-md  bg-[#f2f6f7]">
                        <Button onClick={()=>onQuantity('inc' )} className="shadow" icon={<Plus className="text-[#343a5c]"/>}></Button>
                        <Input
                      
                        className="!w-2  border-b flex-1 flex items-center justify-center  caret-purple-950  text-black text-lg font-bold text-center"
                            placeholder="2"
                            variant="borderless"
                            // type="number"
                            size="small"
                            defaultValue={getValues("quantity")}
                            value={watch("quantity")}
                            onChange={(e) => {
                                onQuantity("inp", e.target.value);
                            }}

                        
                            onKeyDown={(e) => {
                                if (e.key === "e") {
                                  e.preventDefault();
                                }
                              }}
                        />
                        <Button  onClick={()=>onQuantity('dec' )}  className="shadow" icon={<Minus className="text-[#343a5c]"/>}></Button>

                    </div>
                </TableCell>
                <TableCell className="text-[0.85rem] opacity-65">
                ₦2000
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };
  
  const Action = ({ files }) => {
  
    return (
      <div className="relative flex items-center justify-end gap-2">
        <span
          className="text-lg text-default-400 cursor-pointer active:opacity-50"
          onClick={() => {}}
        >
          <EyeIcon />
        </span>
        
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <EditIcon />
          </span>
  
        {/* <span className="text-lg text-danger cursor-pointer active:opacity-50">
            <DeleteIcon />
          </span> */}
      </div>
    );
  };
  
  export default InventoryTable;
  
  InventoryTable.propTypes = {
    userData: PropTypes.object.isRequired,
    data: PropTypes.array,
  };
  Action.propTypes = {
    files: PropTypes.object.isRequired,
  };
  