/* eslint-disable react/prop-types */
export default function Label({className, label, htmlFor, children, ...rest}){
    return(
        <>
            <label
                htmlFor={htmlFor}
                className={`text-[rgb(39, 44, 51)] font-helvetica uppercase tracking-[2px] text-[12px]  ${className}`}
                {...rest}
              >
                {label ?? children}
              </label>
        </>
    )
}