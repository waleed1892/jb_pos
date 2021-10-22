import React from "react";

/**
 *
 * @param variant {('success','info')}
 * @param children {JSX.Element}
 * @param size {('sm','md','lg')}
 * @param onClick
 * @returns {JSX.Element}
 * @constructor
 */
export default function Button(
    {
        variant,
        children,
        onClick,
        size
    }
) {
    let variantClass = '';
    let sizeClass = '';
    switch (variant) {
        case 'success':
            variantClass = 'bg-emerald-500 active:bg-emerald-600 hover:bg-emerald-600'
            break;
        case 'info':
            variantClass = 'bg-lightBlue-500 active:bg-lightBlue-600 hover:bg-lightBlue-600'
            break;
        default:
            variantClass = 'bg-indigo-500 active:bg-indigo-600 hover:bg-indigo-600'
    }
    switch (size) {
        case 'sm':
            sizeClass = 'p-1 text-sm'
            break
        case 'md':
            sizeClass = 'px-2 py-1 text-xs'
            break
        default:
            sizeClass = 'px-4 py-2 text-sm'
    }
    return <button onClick={onClick}
                   className={`text-white font-bold uppercase rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150 ${variantClass} ${sizeClass}`}>
        {children}
    </button>
}
