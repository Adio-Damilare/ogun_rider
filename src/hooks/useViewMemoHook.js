import { create } from "zustand";

export const useViewMemoHook=create((set)=>{
    return{
        data: {},
        isOpen: false,

        handleOpenMemo: ({memo, is_approve})=>{
            set(state => ({isOpen: true, data: {...state.data, memo, is_approve} }))
        },
        handleCloseMemo: ()=>set({isOpen: false, data: {}})
    }
})