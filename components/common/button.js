import React from "react";

/**
 *
 * @param variant {('success')}
 * @returns {JSX.Element}
 * @constructor
 */
export default function Button({variant}) {
    let variantClass = '';
    switch (variant) {
        case 'success':
            variantClass = 'bg-emerald-500 active:bg-emerald-600 hover:bg-emerald-600'
            break;
        default:
            variantClass = 'bg-indigo-500 active:bg-indigo-600 hover:bg-indigo-600'
    }
    return <button
        className={`text-white font-bold uppercase text-sm px-4 py-2 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150 ${variantClass}`}>Save
    </button>
}
