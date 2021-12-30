import Label from "components/common/Label";
import Input from "components/common/Input";
import React, {useState, useEffect} from "react";
import {useForm, FormProvider} from "react-hook-form";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {saveProduct, updateProduct} from "services/product";
import {getAllAttributes} from "services/attributes";
import {useRouter} from "next/router";
import Errors from "components/common/errors";
import {productSkeleton} from "constants/product";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import Select from "components/common/Select";
import {generateBarcode, productTypes, stockOptions,} from "components/products/utils";
import {productValidation} from "validations/product";
import Button from "components/common/button";
import Simple from "components/products/simple";
import dynamic from "next/dynamic";
import {cloneDeep} from "lodash";
import {getAllCategories} from "../../services/categories";

const Variable = dynamic(() => import("components/products/variable"));
const schema = yup.object({
    name_en: yup.string().required(),
    name_ar: yup.string().required(),
    type: yup.string().required(),
    category_id: yup.string().required(),
    simple_product: yup.object().when('type', (val, schema) => {
        return val === 'simple' ? productValidation : schema
    }),
    variations: yup.array().when('type', (val, schema) => {
        return val === 'variable' ? schema.of(productValidation) : schema
    })
});
/**
 *
 * @param formType {string}
 * @param product {object}
 * @returns {JSX.Element}
 * @constructor
 */
export default function ProductForm({formType = 'add', product = {}}) {
    const {
        data: categories,
        isFetching
    } = useQuery('showCategories', getAllCategories, {
        // keepPreviousData: true,
        placeholderData: {
            data: [],
        }
    });

    const queryClient = useQueryClient()
    const router = useRouter()
    const [productType, setProductType] = useState(productSkeleton.type);
    const [showARName, setShowARName] = useState(false);
    const methods = useForm({
        defaultValues: {
            ...productSkeleton
        },
        resolver: yupResolver(schema),
    })

    const {formState, unregister, handleSubmit, control, setValue, register} = methods;

    const {errors} = formState
    useEffect(() => {
        if (formType === 'edit') {
            Object.keys(product).forEach(fieldKey => {
                setValue(fieldKey, product[fieldKey])
            })
            setValue('_method', 'put')
            setValue('category_id', product['category_id'])
            if (product.type === 'simple') {
                generateBarcode('barcode', product.simple_product.ean_13)
                setProductType(product.type)
            } else if (product.type === 'variable') {
                setProductType(product.type)
                const productVariations = cloneDeep(product.variations)
                const tmpVariations = productVariations.map(variation => {
                    variation.title = variation.attributes.map(attribute => attribute.value.name.charAt(0).toUpperCase() + attribute.value.name.slice(1)).join(', ')
                    variation.attributes = variation.attributes.map(attribute => ({
                        attribute_id: attribute.id,
                        value_id: attribute.value.id
                    }))
                    return variation
                })
                setValue('variations', tmpVariations)
                console.log(tmpVariations)
            }
        }
    }, [categories])

    const saveMutation = useMutation(saveProduct, {
        onSuccess: () => {
            queryClient.invalidateQueries('products')
        }
    })
    const updateMutation = useMutation(updateProduct, {
        onSuccess: () => {
            queryClient.invalidateQueries('products')
        }
    })

    const {data: attributes} = useQuery('allAttributes', getAllAttributes)
    const onSubmit = async (data) => {
        const fd = new FormData();
        console.log(data,'before')
        for (let key in data) {
            if (key === 'simple_product') {
                let simpleProd = JSON.stringify(data.simple_product);
                fd.append('simple_product', simpleProd);
            } else if (key === 'images') {
                for (let key in data.images) {
                     fd.append(`images[]`,  data.images[key] );
                }
            }else if (key === 'locales') {
                    let locales = JSON.stringify(data.locales);
                    fd.append('locales', locales);
            }
            else {
                fd.append(key, data[key]);
            }
        }

        if (formType === 'edit') {
            fd.append('_method', 'PUT');
            await updateMutation.mutateAsync({id: product.id, fd})
        } else if (formType === 'add') {
            fd.append('_method', 'POST');
            await saveMutation.mutateAsync(fd)
        }
        await router.push('/admin/products')
    }
    const handleType = (val) => {
        setProductType(val)
        if (val === 'variable') {
            unregister('simple_product',
                {keepValue: true, keepError: true}
            )
        } else if (val === 'simple') {
            unregister(['variations', 'selectedAttributes', 'selectedAttributesIds'], {
                keepValue: true,
                keepError: true
            })
        }
    }
    return (
        <>
            <FormProvider {...methods}>
                <form method={`post`} onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">General</h6>
                        <div className={`grid grid-cols-2 gap-x-4 gap-y-6`}>
                            <div>
                                <div className={`${showARName ? '' : 'hidden'}`}>
                                    <Label>Name (AR)</Label>
                                    <a onClick={() => setShowARName(false)}
                                       className={`text-sm text-lightBlue-500 cursor-pointer ml-2`}>EN</a>
                                    <Input name="name_ar"
                                           register={register}/>
                                </div>
                                <div className={`${!showARName ? '' : 'hidden'}`}>
                                    <Label>Name (EN)</Label>
                                    <a onClick={() => setShowARName(true)}
                                       className={`text-sm text-lightBlue-500 cursor-pointer ml-2`}>AR</a>
                                    <Input name="name_en" register={register}/>
                                </div>
                                <Errors name='name_en' errors={errors}/>
                                <Errors name='name_ar' errors={errors}/>
                            </div>

                            {
                                formType === 'add' &&
                                <div>
                                    <Label>Product Type</Label>
                                    <Select onSelect={handleType} options={productTypes} control={control}
                                            name='type'/>
                                </div>
                            }

                            {!isFetching && <div className={`col-span-1`}>
                                <Label>Select Category</Label>
                                <Select control={control}
                                        valueField="id"
                                        labelField="name"
                                        name="category_id"
                                        options={categories.data}

                                />
                                <Errors name='category_id' errors={errors}/>
                            </div>
                            }
                        </div>
                    </div>
                    {
                        productType === 'variable' ?
                            <>
                                <hr className="mt-6 border-b-1 border-blueGray-300"/>
                                <Variable attributes={attributes}/>
                            </>
                            : <Simple prodcutImages={product.productImages}/>
                    }
                    <div className={`mt-8 text-right`}>
                        <Button>Save</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}
