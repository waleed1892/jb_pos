import React from "react";

/**
 *
 * @param variant {('success','info')}
 * @param children {JSX.Element}
 * @param onClick
 * @returns {JSX.Element}
 * @constructor
 */
export default function Button(
    {
        variant,
        children,
        onClick
    }
) {
    let variantClass = '';
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
    return <button onClick={onClick}
                   className={`text-white font-bold uppercase text-sm px-4 py-2 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150 ${variantClass}`}>
        {children}
    </button>
}
