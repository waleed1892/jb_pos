import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import FileUpload from "components/common/FileUpload";
import Toggle from "components/common/Toggle";
import Select from "components/common/Select";
import Textarea from "components/common/Textarea";
import Label from "components/common/Label";
import Input from "components/common/Input";
import {shippingOptions, stockOptions, variationSkeleton} from "constants/variation";
import jsbarcode from "jsbarcode";
import {random} from "lodash";

/**
 *
 * @param updateVariation
 * @param variation
 * @param formType {string}
 * @param onFormSubmit
 * @returns {JSX.Element}
 * @constructor
 */
export default function VariationsForm({updateVariation, variation = {}, formType = 'add', onFormSubmit = undefined}) {
    const [showScheduleFields, setShowScheduleFields] = useState(false);
    const {register, handleSubmit, control, setValue} = useForm({
        defaultValues: {...variationSkeleton}
    });
    const rng = (length) => {
        let out = '';
        for (let i = 0; i < length; i++) {
            out += random(0, 9, false).toString()
        }
        return out;
    }
    useEffect(() => {
        if (formType === 'edit') {
            Object.keys(variation).forEach(field => {
                setValue(field, variation[field])
            })
            if (variation.ean_13) {
                generateBarcode(variation.ean_13)
            }
        }
    }, []);

    const onSubmit = (data) => {
        if (formType === 'edit') {
            updateVariation(data)
        }
        onFormSubmit()
    }
    const generate5Code = () => {
        const number = rng(5);
        setValue('code_five', number)
    }
    const generateEan13 = () => {
        const number = rng(12);
        generateBarcode(number)
        setValue('ean_13', number)
    }

    const generateBarcode = (data) => {
        jsbarcode('#barcode', data, {
            format: 'EAN13'
        })
    }
    return (
        <form encType={`multipart/form-data`} method={`post`} onSubmit={handleSubmit(onSubmit)}>
            <div className={`grid grid-cols-2 gap-x-4 gap-y-6`}>
                <div className={`col-span-2 flex gap-x-8`}>
                    <div className={`w-2/12`}>
                        <FileUpload name='image' control={control} label="Upload Image"/>
                    </div>
                    <div className={`w-6/12`}>
                        <Label forEl="sku">SKU</Label>
                        <Input name="sku" register={register}/>
                    </div>
                    <div className={`w-4/12`}>
                        <div>
                            <Label>EAN-13</Label>
                            <a onClick={generateEan13}
                               className={`text-sm text-lightBlue-500 cursor-pointer ml-2`}>generate</a>
                            <img id='barcode'/>
                            <Input type="hidden" name="ean_13" register={register}/>
                        </div>
                        <div>
                            <Label>Random Code</Label>
                            <a onClick={generate5Code}
                               className={`text-sm text-lightBlue-500 cursor-pointer ml-2`}>generate</a>
                            <Input readOnly={true} name="code_five" register={register}/>
                        </div>
                    </div>
                </div>
                <div
                    className={`col-span-2 flex items-center justify-start border-t border-b border-blueGray-200 py-2 gap-x-6`}>
                    <Toggle control={control}
                            defaultValue={true}
                            name="enabled"
                            label="Enabled"/>
                    <Toggle control={control}
                            name="manage_stock"
                            label="Manage Stock?"/>
                </div>
                <div>
                    <Label>Regular Price (AED)</Label>
                    <Input type="number"
                           name="regular_price"
                           register={register}
                           placeholder="variation price (required)"/>
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
                    <Input name="sale_price" register={register}/>
                </div>
                {
                    showScheduleFields &&
                    <>
                        <div>
                            <Label>Sale Start Date</Label>
                            <Input name="sale_start_date" type="date" register={register}
                                   placeholder="From...YYYY/MMD/DD"/>
                        </div>
                        <div>
                            <Label>Sale End Date</Label>
                            <Input type="date" register={register} name="sale_end_date"
                                   placeholder="To...YYYY/MMD/DD"/>
                        </div>
                    </>
                }
                <div className={`col-span-2`}>
                    <Label>Stock Status</Label>
                    <Select control={control}
                            name="stock_status"
                            defaultValue={'in_stock'}
                            options={stockOptions}
                            valueField="value"/>
                </div>
                <div>
                    <Label>Weight (kg)</Label>
                    <Input name="weight" register={register}/>
                </div>
                <div>
                    <Label>Dimensions (L*W*H) (cm)</Label>
                    <div className={`flex items-center justify-start gap-x-2`}>
                        <Input name="length" register={register} placeholder="Length"/>
                        <Input name="width" register={register} placeholder="Width"/>
                        <Input name="height" register={register} placeholder="Height"/>
                    </div>
                </div>
                <div className={`col-span-2`}>
                    <Label>Shipping Class</Label>
                    <Select control={control}
                            name="shipping_class"
                            defaultValue={'same_as_parent'}
                            options={shippingOptions}
                            valueField="value"/>
                </div>
                <div className={`col-span-2`}>
                    <Label>Description</Label>
                    <Textarea name="description" register={register}/>
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
