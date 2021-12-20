import React, {Suspense, useEffect, useState} from "react";
import Input from "components/common/Input";
import Label from "components/common/Label";
import {useMutation, useQueryClient} from "react-query";
import {set, useForm} from "react-hook-form";
import {saveCategory, updateCategory, deleteCategory} from "services/categories";
import Errors from "components/common/errors";
import {attributeSkeleton} from "constants/attribute";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import Button from "components/common/button";
import Select from "../common/Select";
import {categories} from "../products/utils";
import {updateAttribute} from "../../services/attributes";

const schema = yup.object({
    name: yup.string().required(),
    // slug: yup.string().required(),
    values: yup.array()
}).required()
/**
 *
 * @param onSubmit
 * @param formType {string}
 * @param attribute {object}
 * @returns {JSX.Element}
 * @constructor
 */
export default function AttributeForm({formType = 'add', attribute = {}, category = {}, onSubmit}) {
    const {register, handleSubmit, control, formState: {errors}, setValue} = useForm({
        // defaultValues: {...attributeSkeleton},
        resolver: yupResolver(schema)
    });
    const queryClient = useQueryClient()
    // const [values, setValues] = useState([]);

    const saveMutation = useMutation(saveCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries('categories')
        }
    })

    const updateMutation = useMutation(updateCategory, {
        onSuccess: () => {
            queryClient.invalidateQueries('categories')
        }
    })

    useEffect(() => {
        if (formType === 'edit') {

            Object.keys(category).forEach(field => {
                setValue(field, category[field])
            })
            setValue('_method', 'put')
            // setValue('parent_id', `${category['parent_id']}`)
            setValue('parent_id', `2`)
        }
    }, []);

    const handleForm = async (data) => {
        if (formType === 'add') {
            await saveMutation.mutateAsync(data)
        }
        else if (formType === 'edit') {
            await updateMutation.mutateAsync({id: data.id, data})
        }
        onSubmit();
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleForm)} method={`post`} action="">
                <div className={`grid grid-cols-3 gap-x-4`}>
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
                                name="parent_id"
                                options={categories}
                                valueField="value"
                        />

                    </div>
                </div>

                <div className={`flex items-center  justify-end `}>
                    <Button variant="success">Save</Button>
                </div>
            </form>
        </>
    )
}
