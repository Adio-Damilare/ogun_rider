// import { createWithEqualityFn } from 'zustand';
import { create } from 'zustand';

const useNotification = create(
  (set) => ({
    data: {
      current: [],
      awaiting_approval: [],
      treated_requests: [],
    },
    updateData: (payload) => set((state) => ({ data: { ...state.data, ...payload } })),
  }),
);

export default useNotification;