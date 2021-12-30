import React, { useState} from 'react';
import {useDropzone} from 'react-dropzone';

import {useForm, useFormContext} from "react-hook-form";

import Button from "./common/button";


export function StyledDropzone({getImages}) {
    const { register, handleSubmit, watch, formState: { errors }}  = useForm();
    // const {control, formState: {errors}, register, setValue, getValues,  trigger} = useFormContext()

    const {
        getRootProps,
        getInputProps,
        acceptedFiles
    } = useDropzone();

    const handleChange=()=>{
        getImages(acceptedFiles)
    }

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <div className="container py-8 items-center">
            <div {...getRootProps()} className=" h-36 bg-gray-200 flex items-center gap-x-4 justify-center ">
                <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
            </div>

            <aside>
                <div className={`flex mt-10 mb-12` }>
                    {acceptedFiles.map((item,key) => {
                        const url = URL.createObjectURL(item)
                        return (
                            <div className={'items-center '} >
                                <img className={`w-24 h-16 object-contain `}
                                     src={url} alt=""/>
                                <p className={'mx-auto pb-2'}>{item.name}</p>

                                <div>
                                    <div className={`items-center justify-start w-1/2` } style={{zIndex:133 }} >
                                        <div>
                                            <input
                                                {...register(`en_${key}_${item.size}`, {
                                                    onChange: (e) => {
                                                        item.en=e.target.value
                                                    },
                                                    required: true
                                                })}
                                                type="text"
                                                size="md"
                                                placeholder='alt_en'
                                                className="appearance-none border-0 px-2 py-1 placeholder-blueGray-400 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            />
                                            {errors[`en_${key}_${item.size}`] && <span>This field is required</span>}
                                        </div>

                                        <div className={'mt-2'} >
                                            <input
                                                {...register(`ar_${key}_${item.size}`, {
                                                    onChange: (e) => {
                                                        item.ar=e.target.value
                                                    },
                                                    required: true
                                                })}
                                                type="text"
                                                size="md"
                                                placeholder='alt_ar'
                                                className="appearance-none border-0 px-2 py-1 placeholder-blueGray-400 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            />
                                            {errors[`ar_${key}_${item.size}`] && <span>This field is required</span>}
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
                <Button onClick= {handleSubmit(handleChange)} variant="success">Save</Button>
            </div>
        </div>
    );
}
