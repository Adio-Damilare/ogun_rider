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
import OutflowProductCreation from "./OutflowProductCreation";
import useOutflowStore from "../../../hooks/useOutflow";
import { useCreateOutflow } from "../../../services/API/outflow";

const requiredFields = {
  outflowData: "Product can not be empty",
  requisition_officer: "Requisition officer is required",
  recipient: "Recipient is required",
  counter_officer: "Counter officer is required",
  store_requisition_no: "Store requisition number is required",
  store_voucher_no: "Store voucher number is required",
  store_receipt_voucher_no: "Store receipt voucher number is required",
  store_requisition_no_date: "Store requisition number date is required",
  store_voucher_no_date: "Store voucher number date is required",
  store_receipt_voucher_no_date:
    "Store receipt voucher number date is required",
  department: "Department is required",
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

const CreateOutflowDrawer = ({ openDrawer, handleClose }) => {
  const { mutate, isPending } = useCreateOutflow();
  const [currentTab, setCurrentTab] = useState(null);

  const { data: outflowData, clearData } = useOutflowStore();

  const { userData } = useCurrentUser();

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

  const onSubmit = () => {
    const values = { ...getValues() };

    const formErrors = validateForm({ ...values, outflowData });

    const attachments = values?.uploadedAttachment?.map((item) => {
      return item?.file_url_id;
    });

    const productList = outflowData?.map((item) => {
      return {
        product_id: item?.product_id,
        quantity_required: item?.quantity_required,
        quantity_approved: item?.quantity_approved,
        quantity: item?.quantity,
        unit_of_issue: item?.unit_of_issue,
      };
    });

    const payload = {
      staff_id: userData?.data?.STAFF_ID,
      region_id: userData?.data?.REGION,
      requisition_officer: values?.requisition_officer,
      recipient: values?.recipient,
      counter_officer: values?.counter_officer,
      store_requisition_no: values?.store_requisition_no,
      store_voucher_no: values?.store_voucher_no,
      store_receipt_voucher_no: values?.store_receipt_voucher_no,
      store_requisition_no_date: values?.store_requisition_no_date,
      store_voucher_no_date: values?.store_voucher_no_date,
      store_receipt_voucher_no_date: values?.store_receipt_voucher_no_date,
      department: values?.department,
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
        maxWidth={currentTab === 1 ? 1100 : 780}
      >
        <h1 className="text-xl px-4 py-2">Create Outflow</h1>
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
            {
              title: "Add Product Items",
              component: (
                <OutflowProductCreation
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

export default CreateOutflowDrawer;
