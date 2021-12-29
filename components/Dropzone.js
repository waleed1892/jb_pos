import React, {useMemo, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {useController, useFormContext} from "react-hook-form";
import Modal from "./common/Modal";

import Button from "./common/button";
import Label from "./common/Label";
import Input from "./common/Input";
import Errors from "./common/errors";
const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

export function StyledDropzone({name,control,getImages}) {
    const { formState: {errors}, register, setValue, getValues, trigger} = useFormContext()

    // const {
    //     field: {onChange},
    //     fieldState: {invalid, isTouched, isDirty},
    //     formState: {touchedFields, dirtyFields}
    // } = useController({
    //     name,
    //     control,
    // });

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
        acceptedFiles
    } = useDropzone();


    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);
    const handleChange=()=>{
        // const {files} = e.target;
        console.log(acceptedFiles,'accpeted')
        getImages(acceptedFiles)

    }


    const [place , setPlace]=useState('');


    const handler=(val)=>{
        setPlace(val);
    }

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <div className="container ">
            <div {...getRootProps({style})} className="h-350-px-px ">
                <input {...getInputProps()} />

                {acceptedFiles.length < 1 ? (
                    <p>Drag 'n' drop some files here, or click to select files</p>
                ):(
                    <p>Drag 'n' drop some files here, or click to select files</p>
                )}

            </div>

            <aside>
                <div className={`flex mt-10 mb-12` }>
                    {acceptedFiles.map(item => {
                        const url = URL.createObjectURL(item)
                        return (
                            <div className={'items-center '} >
                                <img className={`w-24 h-16 object-contain px-3`}
                                     src={url} alt=""/>
                                <p className={'mx-auto'}>{item.name}</p>

                                <div>
                                    <div className={`items-center justify-start w-1/2` } style={{zIndex:133 }} >
                                        <div>
                                            <input
                                                type="text"
                                                size="md"
                                                name="en_alt"
                                                onChange={(val) => item.en=val.target.value}
                                                placeholder='alt_en'
                                                className="appearance-none border-0 px-3 py-3 placeholder-blueGray-400 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            />
                                        </div>

                                        <div className={'mt-2'} >
                                            <input
                                                type="text"
                                                size="md"
                                                name="ar_alt"
                                                onChange={(val) => item.ar=val.target.value}
                                                placeholder='alt_ar'
                                                className="appearance-none border-0 px-3 py-3 placeholder-blueGray-400 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            />
                                        </div>


                                    </div>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </aside>
            <div className={`flex items-center gap-x-4 justify-end mt-3`}>
                <Button onClick={handleChange}  variant="success">Save</Button>
                {/*<Button onClick={() => setIsMediaModalOpen(false)} variant="danger">Cancel</Button>*/}
            </div>
        </div>
    );
}
