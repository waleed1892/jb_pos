import React, { useEffect, useState} from "react";
import Input from "components/common/Input";
import Label from "components/common/Label";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {set, useForm} from "react-hook-form";
import {getAllCategories, saveCategory, updateCategory} from "services/categories";
import Errors from "components/common/errors";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import Button from "components/common/button";
import Select from "../common/Select";
import {RefreshIcon} from "@heroicons/react/solid";

const schema = yup.object({
    name: yup.string().required(),
}).required()
/**
 *
 * @param onSubmit
 * @param formType {string}
 * @param attribute {object}
 * @returns {JSX.Element}
 * @constructor
 */
export default function AttributeForm({formType = 'add', category = {}, onSubmit}) {
    const {register, handleSubmit, control, formState: {errors}, setValue} = useForm({
        // defaultValues: {...attributeSkeleton},
        resolver: yupResolver(schema)
    });
    const queryClient = useQueryClient()
    const [values, setValues] = useState([1]);
    const {
        data: categories,
        isFetching
    } = useQuery('showCategories', getAllCategories, {
        // keepPreviousData: true,
        placeholderData: {
            data: [],
        }
    });

    const saveMutation = useMutation(saveCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries('categories')
            queryClient.invalidateQueries('showCategories')
        }
    })

    const updateMutation = useMutation(updateCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries('categories')
            queryClient.invalidateQueries('showCategories')
        }
    })

    useEffect(() => {
        if (formType === 'edit') {
            Object.keys(category).forEach(field => {
                setValue(field, category[field])
            })
            setValue('_method', 'put')
            setValue('parent_id', category['parent_id'])
        }
    }, []);

    const handleForm = async (data) => {
        if (formType === 'add') {
            await saveMutation.mutateAsync(data)
        } else if (formType === 'edit') {
            await updateMutation.mutateAsync({id: data.id, data})
        }
        onSubmit();
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleForm)} method={`post`} action="">
                <div className={`grid grid-cols-2 h-350-px gap-x-4`}>
                    {isFetching ? (
                        <div
                            className={`absolute inset-0 bg-blueGray-200 bg-opacity-40 flex items-center  mt-16   justify-center`}>
                            <RefreshIcon className={`w-8 h-8 text-indigo-500 text-opacity-80 animate-spin`}/>
                        </div>
                    ) : (
                        <>
                            <div>
                                <div>
                                    <Label>Name</Label>
                                    <Input register={register} name="name"/>
                                    <Errors errors={errors} name="name"/>
                                </div>
                            </div>
                            <div>
                                <Label>Parent Category</Label>
                                <Select control={control}
                                        valueField="id"
                                        labelField="name"
                                        name="parent_id"
                                        options={categories.data}
                                />
                            </div>
                        </>
                    )}
                </div>
                <div className={`flex items-center  justify-end `}>
                    <Button variant="success">Save</Button>
                </div>
            </form>
        </>
    )
}
