/* eslint-disable no-unused-vars */
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useCurrentUser = create(
  persist(
    (set) => ({
      userData: null,
      setCurrentUser: (data = {}) => set({ userData: data }),
      removeCurrentUser: () => set({ userData: null }),
    }),
    {
      name: 'og-auth-session',
      storage: createJSONStorage(() => localStorage), 
    },
  ),
)

export default useCurrentUser