/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { shallow } from "zustand/shallow";

const initial = [
  {
    description: "",
    code: "",
    unitPrice: "",
    quantity: 1,
    category: "",
    lpoNo: "",
    binCardNo: "",
    remark: "",
  },
];

const useInventoryStore = create(
  (set) => ({
    data: initial,
    updateData: (payload) => set((state) => ({ data: [...payload] })),
    clearData: () => set((state) => ({ data: [...initial] })),
  }),
  shallow
);

export default useInventoryStore;
