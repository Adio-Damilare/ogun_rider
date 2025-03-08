import toast from "react-hot-toast"

export const errorToast=(errMsg)=>{
    toast.error(errMsg, {
        style: {
          background: 'red',
          color: '#fff',
          border: '2px solid #fff',
        },
        position: 'top-right',
        duration: 5000,
        closeButton: true
      })
}
export const successToast=(successMsg)=>{
    toast.success(successMsg, {
        style: {
          background: 'green',
          color: '#fff',
          border: '2px solid #fff',
        },
        position: 'top-right',
        duration: 5000,
        closeButton: true
      })
}