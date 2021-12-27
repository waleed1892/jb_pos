import React, {useMemo} from 'react';
import {useDropzone} from 'react-dropzone';
import {useController} from "react-hook-form";
import Modal from "./common/Modal";

import Button from "./common/button";
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

    const {
        field: {onChange},
        fieldState: {invalid, isTouched, isDirty},
        formState: {touchedFields, dirtyFields}
    } = useController({
        name,
        control,
    });

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
        getImages(acceptedFiles)

    }

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <div className="container ">
            <div {...getRootProps({style})} className="h-36 ">
                <input {...getInputProps()} />

                {acceptedFiles.length < 1 ? (
                    <p>Drag 'n' drop some files here, or click to select files</p>
                ):(
                    <div className={`flex`}>
                        {acceptedFiles.map(item => {
                           const url = URL.createObjectURL(item)
                            return (
                                <div className={'items-center '} >
                                <img className={`w-24 h-24 object-contain px-3`}
                                     src={url} alt=""/>
                                     <p className={'mx-auto'}>{item.name}</p>
                                </div>
                            )
                        })
                        }
                    </div>
                )}

            </div>
            <div className={`flex items-center gap-x-4 justify-end mt-3`}>
                <Button onClick={handleChange}  variant="success">Save</Button>
                {/*<Button onClick={() => setIsMediaModalOpen(false)} variant="danger">Cancel</Button>*/}
            </div>
        </div>
    );
}
