import {useEffect, useState} from "react";
import FileUpload from "components/common/FileUpload";
import Toggle from "components/common/Toggle";
import Select from "components/common/Select";
import Textarea from "components/common/Textarea";
import Label from "components/common/Label";
import Input from "components/common/Input";
import Errors from "components/common/errors";
import {generate5Code, generateBarcode, generateEan13, shippingOptions, stockOptions} from "components/products/utils";
import {useForm, useFormContext} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {productValidation} from "validations/product";

/**
 *
 * @param index
 * @param onFormSubmit
 * @returns {JSX.Element}
 * @constructor
 */

export default function VariationsForm({index, onFormSubmit}) {
    const [showScheduleFields, setShowScheduleFields] = useState(false);
    const {
        getValues,
        setValue: setVariation,
        formState: {errors: parentErrors},
        trigger: triggerParent
    } = useFormContext()
    const {
        control,
        register,
        setValue,
        trigger,
        formState: {errors},
        getValues: getCurrentFormValues,
        setError
    } = useForm({
        defaultValues: {...getValues(`variations.${index}`)},
        resolver: yupResolver(productValidation),
        mode: "onChange",
    })
    useEffect(() => {
        const ean_13 = getValues(`variations.${index}.ean_13`)
        if (ean_13) {
            generateBarcode('barcode', ean_13)
        }
        if (parentErrors?.variations?.[index]) {
            const variationErrors = parentErrors.variations[index]
            Object.keys(variationErrors).forEach(errorKey => {
                setError(errorKey, variationErrors[errorKey])
            })
        }
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        const result = await trigger();
        if (result) {
            setVariation(`variations.${index}`, getCurrentFormValues())
            await triggerParent(`variations.${index}`)
            if (onFormSubmit) {
                onFormSubmit()
            }
        }
    }
    const handleFiveCode = async () => {
        const code = generate5Code()
        setValue(`code_five`, code)
        await trigger('code_five')
    }
    const handleEan13 = async () => {
        const code = generateEan13();
        setValue(`ean_13`, code)
        generateBarcode('barcode', code)
        await trigger(`ean_13`)
    }
    const handleManualEan13 = async () => {
        if (!errors.ean_13) {
            const code = getValues(`ean_13`);
            generateBarcode('barcode', code)
        } else {
            await trigger(`ean_13`)
        }
    }
    return (
        <form encType={`multipart/form-data`} method={`post`} onSubmit={onSubmit}>
            <div className={`grid grid-cols-2 gap-x-4 gap-y-6`}>
                <div className={`col-span-2 flex gap-x-8`}>
                    <div className={`w-2/12`}>
                        <FileUpload name={`img`} control={control} label="Upload Image"/>
                    </div>
                    <div className={`w-6/12`}>
                        <Label forEl="sku">SKU</Label>
                        <Input name={`sku`} register={register}/>
                        <Errors errors={errors} name={`sku`}/>
                    </div>
                    <div className={`w-4/12`}>
                        <div>
                            <Label>EAN-13</Label>
                            <a onClick={handleManualEan13}
                               className={`text-sm text-lightBlue-500 cursor-pointer ml-2 hover:underline`}>generate</a>
                            <a onClick={handleEan13}
                               className={`text-sm text-lightBlue-500 cursor-pointer ml-2 hover:underline`}>auto
                                generate</a>
                            <img id='barcode'/>
                            <Input name={`ean_13`} register={register}/>
                            <Errors name={`ean_13`} errors={errors}/>
                        </div>
                        <div>
                            <Label>Random Code</Label>
                            <a onClick={handleFiveCode}
                               className={`text-sm text-lightBlue-500 cursor-pointer ml-2 hover:underline`}>generate</a>
                            <Input name={`code_five`} register={register}/>
                            <Errors name={`code_five`} errors={errors}/>
                        </div>
                    </div>
                </div>
                <div
                    className={`col-span-2 flex items-center justify-start border-t border-b border-blueGray-200 py-2 gap-x-6`}>
                    <Toggle control={control}
                            name={`enabled`}
                            label="Enabled"/>
                    <Toggle control={control}
                            name={`manage_stock`}
                            label="Manage Stock?"/>
                </div>
                <div>
                    <Label>Regular Price (AED)</Label>
                    <Input
                        name={`regular_price`}
                        register={register}
                        placeholder="variation price"/>
                    <Errors errors={errors} name={`regular_price`}/>
                </div>
                <div>
                    <Label>Sale Price (AED)</Label>
                    {
                        showScheduleFields
                            ? <a onClick={() => setShowScheduleFields(false)}
                                 className={`text-sm text-lightBlue-500 cursor-pointer ml-2`}>Cancel Schedule</a>
                            :
                            <a onClick={() => setShowScheduleFields(true)}
                               className={`text-sm text-lightBlue-500 cursor-pointer ml-2`}>Schedule</a>
                    }
                    <Input name={`sale_price`} register={register}/>
                    <Errors errors={errors} name={`sale_price`}/>
                </div>
                {
                    showScheduleFields &&
                    <>
                        <div>
                            <Label>Sale Start Date</Label>
                            <Input name={`sale_start_date`} type="date" register={register}
                                   placeholder="From...YYYY/MMD/DD"/>
                        </div>
                        <div>
                            <Label>Sale End Date</Label>
                            <Input type="date" register={register} name={`sale_end_date`}
                                   placeholder="To...YYYY/MMD/DD"/>
                        </div>
                    </>
                }
                <div className={`col-span-2`}>
                    <Label>Stock Status</Label>
                    <Select control={control}
                            name={`stock_status`}
                            options={stockOptions}
                            valueField="value"/>
                </div>
                <div>
                    <Label>Weight (kg)</Label>
                    <Input name={`weight`} register={register}/>
                    <Errors errors={errors} name={`weight`}/>
                </div>
                <div>
                    <Label>Dimensions (L*W*H) (cm)</Label>
                    <div className={`flex items-center justify-start gap-x-2`}>
                        <div>
                            <Input name={`length`} register={register} placeholder="Length"/>
                            <Errors errors={errors} name={`length`}/>
                        </div>
                        <div>
                            <Input name={`width`} register={register} placeholder="Width"/>
                            <Errors errors={errors} name={`width`}/>
                        </div>
                        <div>
                            <Input name={`height`} register={register} placeholder="Height"/>
                            <Errors errors={errors} name={`height`}/>
                        </div>
                    </div>
                </div>
                <div className={`col-span-2`}>
                    <Label>Shipping Class</Label>
                    <Select control={control}
                            name={`shipping_class`}
                            options={shippingOptions}
                            valueField="value"/>
                </div>
                <div className={`col-span-2`}>
                    <Label>Description</Label>
                    <Textarea name={`description`} register={register}/>
                </div>
            </div>
            <div className={`mt-4 text-right`}>
                <button
                    className={`bg-emerald-500 text-white active:bg-emerald-600 hover:bg-emerald-600 font-bold uppercase text-sm px-4 py-2 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150`}>Save
                </button>
            </div>
        </form>
    )
}
