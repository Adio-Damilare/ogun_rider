import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

const initial = {
  isOpen: false,
  step: "",
  data: {},
};

const riderStore = createWithEqualityFn(
  (set) => ({
    data: initial,
    updateData: (payload) =>
      set((state) => ({ data: { ...state.data, ...payload } })),
  }),
  shallow
);

export default riderStore;
