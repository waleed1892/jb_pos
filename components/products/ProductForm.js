import Label from "components/common/Label";
import Input from "components/common/Input";
import React, {useState, lazy, Suspense, useEffect} from "react";
import CardAction from "components/common/Card/CardAction";
import Modal from "components/common/Modal";
import Alert from "components/common/alert";
import {useForm, useFieldArray} from "react-hook-form";
import {useMutation, useQuery} from "react-query";
import {saveProduct, updateProduct} from "services/product";
import {getAllAttributes} from "services/attributes";
import 'lodash.product';
import _ from 'lodash';
import {variationSkeleton} from "constants/variation";
import {PencilIcon, TrashIcon} from "@heroicons/react/solid";
import {useRouter} from "next/router";
import Errors from "components/common/errors";
import {productSkeleton} from "constants/product";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";

const VariationsForm = lazy(() => import('components/variations/VariationsForm'))
const schema = yup.object({
    name_en: yup.string().required(),
    name_ar: yup.string().required(),
    variations: yup.array()
}).required();
/**
 *
 * @param formType {string}
 * @param product {object}
 * @returns {JSX.Element}
 * @constructor
 */
export default function ProductForm({formType = 'add', product = {}}) {
    const router = useRouter()
    const [variationFormOpen, setVariationFormOpen] = useState(false);
    const [currentVariationIndex, setCurrentVariationIndex] = useState(0);
    const [variations, setVariations] = useState([]);
    const [showARName, setShowARName] = useState(false);
    useEffect(() => {
        if (formType === 'edit') {
            Object.keys(product).forEach(fieldKey => {
                setValue(fieldKey, product[fieldKey])
            })
            setValue('_method', 'put')
            const tmpVariations = product.variations.map(variation => {
                variation.title = variation.attributes.map(attribute => attribute.value.name.charAt(0).toUpperCase() + attribute.value.name.slice(1)).join(', ')
                variation.attributes = variation.attributes.map(attribute => ({
                    attribute_id: attribute.id,
                    value_id: attribute.value.id
                }))
                return variation
            })
            setVariations(tmpVariations)
        }
    }, [])
    const {register, handleSubmit, formState, setValue, control} = useForm({
        defaultValues: {
            ...productSkeleton
        },
        resolver: yupResolver(schema)
    })
    const {errors} = formState
    const saveMutation = useMutation(saveProduct)
    const updateMutation = useMutation(updateProduct)

    const {data: attributes} = useQuery('allAttributes', getAllAttributes)
    const onSubmit = async (data) => {
        if (formType === 'edit') {
            await updateMutation.mutateAsync({id: product.id, data})
        } else if (formType === 'add') {
            await saveMutation.mutateAsync(data)
        }

        await router.push('/admin/products')
    }
    const handleVariations = (variation) => {
        console.log(variation)
        const tmpVariations = [...variations];
        tmpVariations.splice(currentVariationIndex, 1, variation)
        setVariations(tmpVariations)
        setValue('variations', tmpVariations)
    }
    const createVariations = () => {
        const attributesWithValues = attributes.data.map(attribute => {
            return attribute.values.map(value => {
                return {...value, attribute_id: attribute.id}
            })
        })
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
        setValue('variations', tmpVariations)
        setVariations(tmpVariations)
    }
    const editVariation = (id) => {
        setCurrentVariationIndex(id);
        setVariationFormOpen(true)
    }
    const deleteVariation = (index) => {
        const tmpVariations = [...variations];
        tmpVariations.splice(index, 1)
        setVariations(tmpVariations)
        setValue('variations', tmpVariations)
    }
    return (
        <>
            <form method={`post`} onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">General</h6>
                    <div className={`w-1/2`}>
                        <div className={`${showARName ? '' : 'hidden'}`}>
                            <Label>Name (AR)</Label>
                            <a onClick={() => setShowARName(false)}
                               className={`text-sm text-lightBlue-500 cursor-pointer ml-2`}>EN</a>
                            <Input name="name_en"
                                   register={register}/>
                        </div>
                        <div className={`${!showARName ? '' : 'hidden'}`}>
                            <Label>Name (EN)</Label>
                            <a onClick={() => setShowARName(true)}
                               className={`text-sm text-lightBlue-500 cursor-pointer ml-2`}>AR</a>
                            <Input name="name_ar" register={register}/>
                        </div>
                        <Errors name='name_en' errors={errors}/>
                        <Errors name='name_ar' errors={errors}/>
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
                        <Alert variant="info">Before you can add a variation you need to add some attributes.</Alert>
                    }
                    {
                        variations.map((variation, index) =>
                            <div key={index}
                                 className={`flex items-center justify-between px-4 py-2 border border-gray-100 bg-white shadow-sm`}>
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
                <div className={`mt-8 text-right`}>
                    <button
                        className={`bg-emerald-500 text-white active:bg-emerald-600 hover:bg-emerald-600 font-bold uppercase text-sm px-4 py-2 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150`}>Save
                    </button>
                </div>
            </form>

            <Modal title="Add Variation" size="lg" isOpen={variationFormOpen} close={() => setVariationFormOpen(false)}>
                <Suspense fallback={<div>loading...</div>}>
                    <VariationsForm onFormSubmit={() => setVariationFormOpen(false)} formType='edit'
                                    variation={variations[currentVariationIndex]}
                                    updateVariation={handleVariations}/>
                </Suspense>
            </Modal>
        </>
    )
}
