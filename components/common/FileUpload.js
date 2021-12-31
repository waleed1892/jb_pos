import React, {useState} from "react";
import {UploadIcon} from "@heroicons/react/outline";
import {useController} from "react-hook-form";
import {useFormContext} from "react-hook-form";


/**
 *
 * @param name {string}
 * @param label {string}
 * @param control
 * @param register
 * @returns {JSX.Element}
 * @constructor
 */
export default function FileUpload({label = 'Select a file', control, name,register}) {

    const {
        field: {onChange},
        fieldState: {invalid, isTouched, isDirty},
        formState: {touchedFields, dirtyFields}
    } = useController({
        name,
        control,
    });

    const [showImage, setShowImage] = useState(false);
    const handleChange = (e) => {

        const {files} = e.target;
        const file = files[0]
        const image = document.getElementById('image');
        image.src = URL.createObjectURL(file)
        setShowImage(true)

    }
    return (
        <>
            <label
                className={`${showImage ? 'hidden' : ''} w-48 h-36 flex flex-col items-center px-4 py-8 bg-white cursor-pointer rounded-md text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150 group hover:bg-indigo-500`}>
                <UploadIcon className={`w-8 h-8 text-indigo-500 group-hover:text-white`}/>
                <span
                    className="mt-2 text-base leading-normal text-indigo-500 uppercase group-hover:text-white">{label}</span>
                <input  onChange={handleChange}  type='file' className="hidden"/>
            </label>
            <div
                className={`${showImage ? '' : 'hidden'} w-48 h-36 flex flex-col items-center bg-blueGray-100 bg-opacity-50 cursor-pointer rounded-md shadow`}>
                <img className={`w-full h-full object-contain`} id='image' src="" alt=""/>
            </div>
        </>
    )
}
