import React, {Suspense, useEffect, useState} from "react";
import Input from "components/common/Input";
import Label from "components/common/Label";
import Toggle from "components/common/Toggle";
import {useMutation, useQueryClient} from "react-query";
import {useForm} from "react-hook-form";
import {saveAttribute, updateAttribute} from "services/attributes";
import Errors from "components/common/errors";
import {attributeSkeleton} from "constants/attribute";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import CardAction from "components/common/Card/CardAction";
import Table from "components/common/table";
import {valueColumns} from "components/attributes/utils";
import Modal from "components/common/Modal";
import AttributeValueForm from "components/attributes/AttributeValueForm";
import {PencilIcon, TrashIcon} from "@heroicons/react/solid";

const schema = yup.object({
    name_en: yup.string().required(),
    name_ar: yup.string().required(),
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
export default function AttributeForm({formType = 'add', attribute = {}, onSubmit}) {
    const {register, handleSubmit, control, formState: {errors}, setValue} = useForm({
        defaultValues: {...attributeSkeleton},
        resolver: yupResolver(schema)
    });
    const queryClient = useQueryClient()
    const [showArField, setShowArField] = useState(false);
    const [values, setValues] = useState([]);
    const [editableValueIndex, setEditableValueIndex] = useState(null);
    const [openAttributeValueForm, setOpenAttributeValueForm] = useState(false);
    const saveMutation = useMutation(saveAttribute, {
        onSuccess: () => {
            queryClient.invalidateQueries('attributes')
        }
    })
    const updateMutation = useMutation(updateAttribute, {
        onSuccess: () => {
            queryClient.invalidateQueries('attributes')
        }
    })
    useEffect(() => {
        if (formType === 'edit') {
            Object.keys(attribute).forEach(field => {
                setValue(field, attribute[field])
            })
            setValue('_method', 'put')
            setValues(attribute.values)
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
    const handleValueFormSubmission = (data) => {
        const tmpValues = [...values];
        tmpValues.push(data);
        setValues(tmpValues)
        setValue('values', tmpValues)
        setOpenAttributeValueForm(false)
    }

    const editValue = (index) => {
        setEditableValueIndex(index)
    }

    const deleteValue = (index) => {
        const tmpValues = [...values]
        tmpValues.splice(index, 1)
        setValue('values', tmpValues)
        setValues(tmpValues)
    }

    const valueTableActions = (index) =>
        <div className={`flex items-center gap-x-2`}>
            <PencilIcon onClick={() => editValue(index)}
                        className={`w-5 h-5 text-lightBlue-500 cursor-pointer`}/>
            <TrashIcon onClick={() => deleteValue(index)}
                       className={`w-5 h-5 text-red-400 cursor-pointer`}/>
        </div>

    return (
        <>
            <form onSubmit={handleSubmit(handleForm)} method={`post`} action="">
                <div className={`grid grid-cols-3 gap-x-4`}>
                    <div>
                        <div className={`mb-4`}>
                            <div className={`${showArField ? 'hidden' : ''} mb-2`}>
                                <Label>Name (EN)</Label>
                                <a onClick={() => setShowArField(true)}
                                   className={`text-sm text-lightBlue-500 cursor-pointer ml-2`}>AR</a>
                                <Input required register={register} name="name_en"/>
                            </div>
                            <div className={`${!showArField ? 'hidden' : ''} mb-2`}>
                                <Label>Name (AR)</Label>
                                <a onClick={() => setShowArField(false)}
                                   className={`text-sm text-lightBlue-500 cursor-pointer ml-2`}>EN</a>
                                <Input required register={register} name="name_ar"/>
                            </div>
                            <Errors name='name_en' errors={errors}/>
                            <Errors name='name_ar' errors={errors}/>
                        </div>
                        <div className={`flex flex-col gap-y-2`}>
                            <Toggle control={control}
                                    name="visible_on_product_page"
                                    label="Visible on Product Page"/>

                            <Toggle control={control}
                                    name="use_for_variation"
                                    label="Used for variations"/>
                        </div>
                    </div>
                    <div className={`col-span-2`}>
                        <div className={`flex items-center justify-between`}>
                            <Label>Value(s)</Label>
                            <CardAction onClick={() => setOpenAttributeValueForm(true)}>Add New</CardAction>
                        </div>
                        <Table columns={valueColumns} data={values} actions={valueTableActions}/>
                    </div>
                </div>
                <div className={`flex items-center justify-end`}>
                    <button
                        className={`bg-emerald-500 text-white active:bg-emerald-600 hover:bg-emerald-600 font-bold uppercase text-sm px-4 py-2 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150`}>Save
                    </button>
                </div>
            </form>
            <Modal size="md" title="Add Value" isOpen={openAttributeValueForm}
                   close={() => setOpenAttributeValueForm(false)}>
                <Suspense fallback={<div>loading...</div>}>
                    <AttributeValueForm onSubmit={handleValueFormSubmission}/>
                </Suspense>
            </Modal>
        </>
    )
}
