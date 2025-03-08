/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { shallow } from "zustand/shallow";

const initial = [
  {
    product_id: "",
    quantity_required: "",
    quantity_approved: "",
    quantity: 1,
    unit_of_issue: "",
    // category: "",
    // lpoNo: "",
    // binCardNo: "",
    // remark: "",
  },
];

const useOutflowStore = create(
  (set) => ({
    data: initial,
    updateData: (payload) => set((state) => ({ data: [...payload] })),
    clearData: () => set((state) => ({ data: [...initial] })),
  }),
  shallow
);

export default useOutflowStore;
