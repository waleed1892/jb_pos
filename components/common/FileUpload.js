import React from "react";
import {UploadIcon} from "@heroicons/react/outline";

/**
 *
 * @param label {string}
 * @returns {JSX.Element}
 * @constructor
 */
export default function FileUpload({label = 'Select a file'}) {
    return (
        <>
            <label
                className={`w-48 flex flex-col items-center px-4 py-8 bg-white cursor-pointer rounded-md bg-white text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150 group hover:bg-indigo-500`}>
                <UploadIcon className={`w-8 h-8 text-indigo-500 group-hover:text-white`}/>
                <span
                    className="mt-2 text-base leading-normal text-indigo-500 uppercase group-hover:text-white">{label}</span>
                <input type='file' className="hidden"/>
            </label>
        </>
    )
}
