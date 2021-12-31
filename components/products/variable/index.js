import React, {useState, Suspense, lazy} from "react";

import Label from "components/common/Label";
import Select from "components/common/Select";
import Accordion from "components/common/Accordion";
import Button from "components/common/button";
import CardAction from "components/common/Card/CardAction";
import Alert from "components/common/alert";
import {PencilIcon, TrashIcon} from "@heroicons/react/solid";
import {variationSkeleton} from "constants/variation";
import {useFieldArray} from "react-hook-form";
import 'lodash.product';
import {useFormContext} from "react-hook-form";

const Modal = lazy(() => import("components/common/Modal"))
const VariationsForm = lazy(() => import('components/products/variations/VariationsForm'))

export default function Variable({attributes}) {
    const [currentVariationIndex, setCurrentVariationIndex] = useState(null);
    const [variationFormOpen, setVariationFormOpen] = useState(false);
    const {control, setValue, getValues, formState: {errors}} = useFormContext();
    const {fields, append, remove, update} = useFieldArray({
        name: 'selectedAttributes',
        control,
        keyName: 'field_id'
    });
    const {
        fields: variations,
        remove: removeVariation,
        replace: replaceVariations
    } = useFieldArray({
        name: 'variations',
        control,
    });
    const deleteVariation = (index) => {
        removeVariation(index);
    }
    const createVariations = () => {
        const attributesWithValues = fields.map(attribute => {
            return attribute.values.filter(item => attribute.selectedValues.includes(item.id)).map(value => {
                return {...value, attribute_id: attribute.id}
            })
        })
        if (attributesWithValues.length) {
            const attributeVariations = _.product(...attributesWithValues)
            const tmpVariations = [];
            attributeVariations.forEach(attributeVariation => {
                const tmpObj = {...variationSkeleton};
                tmpObj.title = attributeVariation.map(item => item.name.charAt(0).toUpperCase() + item.name.slice(1)).join(', ')
                tmpObj.attributes = attributeVariation.map(item => {
                    return {
                        attribute_id: item.attribute_id,
                        value_id: item.id
                    }
                })
                tmpVariations.push(tmpObj)
            })
            // setValue('variations', tmpVariations)
            // setVariations(tmpVariations)
            replaceVariations(tmpVariations)
        }
    }
    const editVariation = (id) => {
        setCurrentVariationIndex(id);
        setVariationFormOpen(true)
    }
    const handleAttributeSelection = (value) => {
        const attribute = attributes.data.find(item => item.id === value);
        append({...attribute, selectedValues: []});
    }
    const handleValueSelection = (index, value) => {
        const attribute = _.cloneDeep(fields[index])
        attribute.selectedValues.push(value);
        update(index, attribute)
    }
    const handleValueDeletion = (index, value) => {
        const attribute = _.cloneDeep(fields[index])
        attribute.selectedValues = attribute.selectedValues.filter(item => item !== value);
        update(index, attribute)
    }
    const attributeDeleteHandler = (id) => {
        const attributeIndex = fields.findIndex(field => field.id === id);
        const selectedAttributesIds = getValues('selectedAttributesIds')
        remove(attributeIndex)
        setValue('selectedAttributesIds', selectedAttributesIds.filter(item => item !== id))
    }
    const selectNoneHandler = (e, index) => {
        e.preventDefault()
        const attribute = _.cloneDeep(fields[index])
        attribute.selectedValues = []
        update(index, attribute)
        setValue(`selectedAttributes.${index}.selectedValues`, [])
    }
    const selectAllHandler = (e, index, values) => {
        e.preventDefault()
        const valueIds = values.map(value => value.id)
        const attribute = _.cloneDeep(fields[index])
        attribute.selectedValues = valueIds;
        setValue(`selectedAttributes.${index}.selectedValues`, valueIds)
        update(index, attribute)
    }

    return (
        <>
            <div>
                <div className="flex items-center justify-between">
                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Attributes</h6>
                </div>
                <div className={`grid grid-cols-2 gap-x-4`}>
                    <div>
                        <Label>Select Attribute</Label>
                        <Select onOptionDeleted={(id) => attributeDeleteHandler(id)}
                                multiSelect={true} onSelect={handleAttributeSelection}
                                options={attributes.data}
                                control={control} name='selectedAttributesIds'
                                labelField="name_en" valueField="id"/>
                    </div>
                </div>
                <div className={`mt-6`}>
                    {
                        fields.map((item, index) => {
                            return <Accordion key={item.field_id}
                                              onDelete={() => attributeDeleteHandler(item.id)}
                                              title={item.name_en}>
                                <div className={`grid grid-cols-2 gap-x-8`}>
                                    <div>
                                        <Label>Name:</Label>
                                        <div>{item.name_en}</div>
                                    </div>
                                    <div>
                                        <Label>Options:</Label>
                                        <Select
                                            onOptionDeleted={(value) => handleValueDeletion(index, value)}
                                            onSelect={(value) => handleValueSelection(index, value)}
                                            multiSelect={true}
                                            options={item.values}
                                            name={`selectedAttributes.${index}.selectedValues`}
                                            control={control}
                                            labelField="name" valueField="id"/>
                                        <div className={`flex gap-x-4 mt-4`}>
                                            <Button
                                                size="md"
                                                onClick={(e) => selectAllHandler(e, index, item.values)}
                                                variant="success">Select All</Button>
                                            <Button size="md" onClick={(e) => selectNoneHandler(e, index)}
                                                    variant="info">Select
                                                None</Button>
                                        </div>
                                    </div>
                                </div>
                            </Accordion>
                        })
                    }
                </div>
            </div>
            <hr className="mt-6 border-b-1 border-blueGray-300"/>
            <div>
                <div className="flex items-center justify-between">
                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Variations</h6>
                    {
                        attributes.data.length > 0 &&
                        <div className="flex items-center gap-x-2">
                            <CardAction onClick={createVariations}>Create Variations form all
                                attributes</CardAction>
                        </div>
                    }
                </div>
                {
                    !attributes.data.length &&
                    <Alert variant="info">Before you can add a variation you need to add some
                        attributes.</Alert>
                }
                {
                    variations.length > 0 &&
                    <div className={`flex flex-col gap-y-1`}>
                        {
                            variations.map((variation, index) =>
                                <div key={index}
                                     className={`flex items-center justify-between px-4 py-2 border bg-white shadow-sm ${('variations' in errors && errors.variations[index]) ? 'border-red-500' : 'border-gray-100'}`}>
                                    <div
                                        className={`font-semibold text-sm`}>{variation.title}</div>
                                    <div className={`flex items-center gap-x-2`}>
                                        <PencilIcon onClick={() => editVariation(index)}
                                                    className={`w-5 h-5 text-lightBlue-500 cursor-pointer`}/>
                                        <TrashIcon onClick={() => deleteVariation(index)}
                                                   className={`w-5 h-5 text-red-400 cursor-pointer`}/>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                }
            </div>
            <Suspense fallback={<div>loading...</div>}>
                <Modal title={variations[currentVariationIndex]?.title} size="lg" isOpen={variationFormOpen}
                       close={() => setVariationFormOpen(false)}>
                    <Suspense fallback={<div>loading...</div>}>
                        <VariationsForm index={currentVariationIndex}
                                        onFormSubmit={() => setVariationFormOpen(false)}/>
                    </Suspense>
                </Modal>
            </Suspense>
        </>
    )
}
