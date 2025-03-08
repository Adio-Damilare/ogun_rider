/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ExpandedDrawer from "../drawer/ExpandedDrawer";
import DrawerSideTab from "../drawer/DrawerSideTab";
import { useForm } from "react-hook-form";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { errorToast, successToast } from "../../../utils/toastPopUp";
import AdvanceAttachments from "./AdvanceAttachment";
import InventoryForm from "./InventoryForm";
import ItemInformation from "./ItemInformation";
import InventoryCreationPage from "./InventoryCreationPage";
import useInventoryStore from "../../../hooks/useInventory";
import { useCreateInflow } from "../../../services/API/instock";

const requiredFields = {
  delivery_method: "Delivery method is required",
  lpo_number: "LPO Number is required",
  recieved_by: "Recieved by is required",
  supplier_invoice_no: "Suppplier invoice number is required",
  supplier_name: "Supplier is required",
  waybill_no: "Waybill No is required",
  inventoryData: "Product can not be empty",
};

const validateForm = (values) => {
  const newErrors = {};

  Object.keys(requiredFields).forEach((field) => {
    if (Array.isArray(values?.[field])) {
      // For array fields like job_description and section_two
      if (values?.[field].length === 0) {
        newErrors[field] = requiredFields[field];
      }
    } else {
      // For string fields like report_officer and counter_officer
      if (!values?.[field]) {
        newErrors[field] = requiredFields[field];
      }
    }
  });

  return newErrors;
};

const CreateDrawer = ({ openDrawer, handleClose }) => {
  const { mutate, isPending } = useCreateInflow();
  const [currentTab, setCurrentTab] = useState(null);

  const { data: inventoryData, clearData } = useInventoryStore();

  const { userData } = useCurrentUser();

  // const {
  //   data: { draftMemoData },
  // } = useHandleMemo();

  const {
    register,
    getValues,
    setValue,
    watch,
    control,
    trigger,
    reset,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      quantity: 1,

      attachment: [],
    },
  });

  useEffect(() => {
    trigger();
  }, [trigger]);

  const formatFieldName = (fieldName) => {
    // Replace underscores with spaces and capitalize the first letter
    return fieldName
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter
  };

  // console.log(errors);

  const onSubmit = () => {
    const values = { ...getValues() };

    const formErrors = validateForm({ ...values, inventoryData });

    const attachments = values?.uploadedAttachment?.map((item) => {
      return item?.file_url_id;
    });

    const productList = inventoryData?.map((item) => {
      return {
        asset_id: item?.category,
        description: item?.description,
        unit_price: item?.unitPrice,
        quantity: item?.quantity,
        bin_card_no: item?.binCardNo,
        remarks: item?.remark,
        item_code: item?.code,
        stock_alert: item?.stock_alert,
      };
    });

    const payload = {
      staff_id: userData?.data?.STAFF_ID,
      region_id: userData?.data?.REGION,
      delivery_method: values?.delivery_method,
      received_by: values?.recieved_by, //use ome of our HR get staff APIs
      supplier: values?.supplier_name,
      lpo_number: values?.lpo_number,
      suppier_invoice_number: values?.supplier_invoice_no,
      waybill_no: values?.waybill_no,
      attachments: attachments,
      products: productList,
    };

    if (Object.keys(formErrors).length > 0) {
      const combinedMessage = Object.values(formErrors).join("\n");
      errorToast(combinedMessage);
      return;
    } else {
      // console.log("payload: ", payload);
      mutate(payload, {
        onError: (error) => {
          const errMessage = error?.response?.data?.message || error?.message;

          errorToast(errMessage);
        },
        onSuccess: (response) => {
          const resMsg = response?.data?.message;
          successToast(resMsg);
          clearData();
          reset();
          handleClose();
        },
      });
    }
  };

  return (
    <>
      <ExpandedDrawer
        isOpen={openDrawer}
        onClose={handleClose}
        maxWidth={currentTab === 1 ? 1500 : 780}
      >
        <h1 className="text-xl px-4 py-2">Add Inventory</h1>
        <DrawerSideTab
          setCurrentTab={setCurrentTab}
          tabs={[
            {
              title: "Items Information",
              component: (
                <ItemInformation
                  register={register}
                  getValues={getValues}
                  setValue={setValue}
                  watch={watch}
                  errors={errors}
                  touchedFields={touchedFields}
                  trigger={trigger}
                  control={control}
                />
              ),
            },
            // {
            //   title: "Add Product Items",
            //   component: (
            //     <InventoryForm
            //       register={register}
            //       getValues={getValues}
            //       setValue={setValue}
            //       watch={watch}
            //       errors={errors}
            //       touchedFields={touchedFields}
            //       trigger={trigger}
            //       control={control}
            //       />
            //     ),
            //   },
            {
              title: "Add Product Items",
              component: (
                <InventoryCreationPage
                  register={register}
                  getValues={getValues}
                  setValue={setValue}
                  watch={watch}
                  errors={errors}
                  touchedFields={touchedFields}
                  trigger={trigger}
                  control={control}
                />
              ),
            },
            {
              title: "Add Support Documents",
              component: (
                <AdvanceAttachments
                  watch={watch}
                  setValue={setValue}
                  getValues={getValues}
                  errors={errors}
                  handleSubmit={onSubmit}
                  isPending={isPending}
                />
              ),
            },
          ]}
        >
          <InventoryForm />
        </DrawerSideTab>
      </ExpandedDrawer>
    </>
  );
};

export default CreateDrawer;
