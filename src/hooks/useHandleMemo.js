import { create } from "zustand";

export const useHandleMemo= create((set)=>{
    return{
        data: {},
        setData: (newData) => set(state => ({...state, data: {...state.data, ...newData} })),
        // Add more methods as needed
    }
})