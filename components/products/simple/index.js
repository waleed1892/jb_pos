import FileUpload from "components/common/FileUpload";
import Label from "components/common/Label";
import Input from "components/common/Input";
import Errors from "components/common/errors";
import Toggle from "components/common/Toggle";
import Select from "components/common/Select";
import {generate5Code, generateBarcode, generateEan13, shippingOptions, stockOptions} from "components/products/utils";
import Textarea from "components/common/Textarea";
import {useEffect, useState} from "react";
import {useFormContext} from "react-hook-form";
import {UploadIcon} from "@heroicons/react/outline";
import Modal from "../../common/Modal";
import {StyledDropzone} from "components/Dropzone";
import { baseUrl} from "../../../lib/axios";


export default function Simple({prodcutImages = []}) {
    const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
    const {control, formState: {errors}, register, setValue, getValues, trigger} = useFormContext()
    const [showScheduleFields, setShowScheduleFields] = useState(false);
    const [images, setImages] = useState([]);


    const handleFiveCode = () => {
        const code = generate5Code()
        setValue('simple_product.code_five', code)
    }
    const handleEan13 = () => {
        const code = generateEan13();
        setValue('simple_product.ean_13', code)
        generateBarcode('barcode', code)
    }

    useEffect(() => {
        setValue('images', images)
    }, [images])

    const getImages = async (val) => {
        await setImages(val)
        // await setValue('images', images)
        setIsMediaModalOpen(false)
    }

    const handleManualEan13 = async () => {
        if (!errors?.simple_product?.ean_13) {
            const code = getValues('simple_product.ean_13');
            generateBarcode('barcode', code)
        }
    }

    return (
        <>
            <div className={`grid grid-cols-2 gap-x-4 gap-y-6 mt-6`}>
                <div className={`col-span-2 flex gap-x-8`}>
                    <div className={`w-2/12`}>

                        <label
                            className={`w-48 h-36 flex flex-col items-center px-4 py-8 bg-white cursor-pointer rounded-md text-sm shadow focus:outline-none focus:ring ease-linear transition-all duration-150 group hover:bg-indigo-500`}
                            onClick={() => setIsMediaModalOpen(true)}>
                            <UploadIcon className={`w-8 h-8 text-indigo-500 group-hover:text-white`}/>
                            <span
                                className="mt-2 text-base leading-normal text-indigo-500 uppercase group-hover:text-white">Media Library</span>
                        </label>
                    </div>
                    <div className={`w-6/12`}>
                        <Label forEl="sku">SKU</Label>
                        <Input name="simple_product.sku" register={register}/>
                        <Errors errors={errors} name="simple_product.sku"/>
                    </div>
                    <div className={`w-4/12`}>
                        <div>
                            <Label>EAN-13</Label>
                            <a onClick={handleManualEan13}
                               className={`text-sm text-lightBlue-500 cursor-pointer ml-2 hover:underline`}>generate</a>
                            <a onClick={handleEan13}
                               className={`text-sm text-lightBlue-500 cursor-pointer ml-2 hover:underline`}>auto
                                generate</a>
                            <img className={`mb-2`} id='barcode'/>
                            <Input onChangeCb={() => trigger('simple_product.ean_13')} name="simple_product.ean_13"
                                   register={register}/>
                            <Errors errors={errors} name="simple_product.ean_13"/>
                        </div>
                        <div>
                            <Label>Random Code</Label>
                            <a onClick={handleFiveCode}
                               className={`text-sm text-lightBlue-500 cursor-pointer ml-2 hover:underline`}>generate</a>
                            <Input name="simple_product.code_five" register={register}/>
                            <Errors errors={errors} name="simple_product.code_five"/>
                        </div>
                    </div>
                </div>
                <div
                    className={`col-span-2 flex items-center justify-start border-t border-b border-blueGray-200 py-2 gap-x-6`}>
                    <Toggle control={control}
                            name="simple_product.enabled"
                            label="Enabled"/>
                    <Toggle control={control}
                            name="simple_product.manage_stock"
                            label="Manage Stock?"/>
                </div>
                <div>
                    <Label>Regular Price (AED)</Label>
                    <Input
                        name="simple_product.regular_price"
                        register={register}
                        placeholder="price"/>
                    <Errors errors={errors} name="simple_product.regular_price"/>
                </div>
                <div>
                    <Label>Sale Price (AED)</Label>
                    {
                        showScheduleFields
                            ? <a onClick={() => setShowScheduleFields(false)}
                                 className={`text-sm text-lightBlue-500 cursor-pointer ml-2`}>Cancel
                                Schedule</a>
                            :
                            <a onClick={() => setShowScheduleFields(true)}
                               className={`text-sm text-lightBlue-500 cursor-pointer ml-2`}>Schedule</a>
                    }
                    <Input name="simple_product.sale_price" register={register}/>
                    <Errors errors={errors} name="simple_product.sale_price"/>
                </div>
                {
                    showScheduleFields &&
                    <>
                        <div>
                            <Label>Sale Start Date</Label>
                            <Input name="simple_product.sale_start_date" type="date" register={register}
                                   placeholder="From...YYYY/MMD/DD"/>
                        </div>
                        <div>
                            <Label>Sale End Date</Label>
                            <Input type="date" register={register} name="simple_product.sale_end_date"
                                   placeholder="To...YYYY/MMD/DD"/>
                        </div>
                    </>
                }
                <div className={`col-span-2`}>
                    <Label>Stock Status</Label>
                    <Select control={control}
                            name="simple_product.stock_status"
                            options={stockOptions}
                            valueField="value"/>
                </div>

                <div>
                    <Label>Weight (kg)</Label>
                    <Input name="simple_product.weight" register={register}/>
                    <Errors errors={errors} name="simple_product.weight"/>
                </div>
                <div>
                    <Label>Dimensions (L*W*H) (cm)</Label>
                    <div className={`flex items-center justify-start gap-x-2`}>
                        <div>
                            <Input name="simple_product.length" register={register} placeholder="Length"/>
                            <Errors errors={errors} name="simple_product.length"/>
                        </div>
                        <div>
                            <Input name="simple_product.width" register={register} placeholder="Width"/>
                            <Errors errors={errors} name="simple_product.width"/>
                        </div>
                        <div>
                            <Input name="simple_product.height" register={register} placeholder="Height"/>
                            <Errors errors={errors} name="simple_product.height"/>
                        </div>
                    </div>
                </div>
                <div className={`col-span-2`}>
                    <Label>Shipping Class</Label>
                    <Select control={control}
                            name="simple_product.shipping_class"
                            options={shippingOptions}
                            valueField="value"/>
                </div>
                <div className={`col-span-2`}>
                    <Label>Description</Label>
                    <Textarea name="simple_product.description" register={register}/>
                </div>
            </div>


            <Modal size="lg" title={'Media Library'}
                   isOpen={isMediaModalOpen}
                   close={() => setIsMediaModalOpen(false)}>
                <div className={`grid grid-cols-6  min-h-350 gap-x-4`}>

                    { prodcutImages.length>0 ?( prodcutImages.map(image => {
                        return (
                            <div
                                className={` w-44 h-36 flex flex-col items-center bg-blueGray-100 bg-opacity-50 cursor-pointer rounded-md shadow`}>
                                <img className={`w-full h-full object-contain`} id='image'
                                     src={`${baseUrl}/${image.path}`} alt=""/>
                            </div>
                        )
                    })):(
                        <h1 className={`mt-10 ml-auto`} >No Image Added.</h1>
                    )

                    }

                </div>


                <StyledDropzone name='simple_product.img' getImages={getImages} control={control}/>
            </Modal>
        </>
    )

}
