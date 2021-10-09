import Label from "../common/Label";
import Input from "../common/Input";
import {VariationSkeleton} from "../../constants/variation";
import {useMemo, useState} from "react";
import Toggle from "../common/Toggle";
import Textarea from "../common/Textarea";
import Select from "../common/Select";
import FileUpload from "../common/FileUpload";

export default function VariationsForm() {
    const [variation, setVariation] = useState({...VariationSkeleton});
    const [showScheduleFields, setShowScheduleFields] = useState(false);
    const handleInputChange = (e, field) => {
        const {value} = e.target;
        setVariation((state) => ({
            ...state,
            [field]: value
        }))
    }
    const handleChange = (field, value) => {
        setVariation((state) => ({
            ...state,
            [field]: value
        }))
    }

    const stockOptions = useMemo(() => [
        {label: 'In Stock', value: 'in_stock'},
        {label: 'Out of Stock', value: 'out_of_stock'},
        {label: 'On Backorder', value: 'on_backorder'},
    ], [])

    const shippingOptions = useMemo(() => [
        {label: 'Same as parent', value: 'same_as_parent'},
    ], [])
    return (
        <form action="">
            <div className={`grid grid-cols-2 gap-x-4 gap-y-6`}>
                <div>
                    <FileUpload label="Upload Image"/>
                </div>
                <div>
                    <Label forEl="sku">SKU</Label>
                    <Input id="sku" name="sku" value={variation.sku} onChange={(e) => handleInputChange(e, 'sku')}/>
                </div>
                <div
                    className={`col-span-2 flex items-center justify-start border-t border-b border-blueGray-200 py-2 gap-x-6`}>
                    <Toggle value={variation.enabled} onChange={(value) => handleChange('enabled', value)}
                            label="Enabled"/>
                    <Toggle value={variation.manage_stock} onChange={(value) => handleChange('manage_stock', value)}
                            label="Manage Stock?"/>
                </div>
                <div>
                    <Label>Regular Price (AED)</Label>
                    <Input value={variation.regular_price} type="number"
                           onChange={(e) => handleInputChange(e, 'regular_price')}
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
                    <Input value={variation.sale_price} onChange={(e) => handleInputChange(e, 'sale_price')}/>
                </div>
                {
                    showScheduleFields &&
                    <>
                        <div>
                            <Label>Sale Start Date</Label>
                            <Input value={variation.sale_start_date} type="date"
                                   onChange={(e) => handleInputChange(e, 'sale_start_date')}
                                   placeholder="From...YYYY/MMD/DD"/>
                        </div>
                        <div>
                            <Label>Sale End Date</Label>
                            <Input value={variation.sale_end_date} type="date"
                                   onChange={(e) => handleInputChange(e, 'sale_end_date')}
                                   placeholder="To...YYYY/MMD/DD"/>
                        </div>
                    </>
                }
                <div className={`col-span-2`}>
                    <Label>Stock Status</Label>
                    <Select value={variation.stock_status} onChange={(value) => handleChange('stock_status', value)}
                            options={stockOptions}
                            valueField="value"/>
                </div>
                <div>
                    <Label>Weight (kg)</Label>
                    <Input onChange={(e) => handleInputChange(e, 'weight')}/>
                </div>
                <div>
                    <Label>Dimensions (L*W*H) (cm)</Label>
                    <div className={`flex items-center justify-start gap-x-2`}>
                        <Input onChange={(e) => handleInputChange(e, 'length')} placeholder="Length"/>
                        <Input onChange={(e) => handleInputChange(e, 'width')} placeholder="Width"/>
                        <Input onChange={(e) => handleInputChange(e, 'height')} placeholder="Height"/>
                    </div>
                </div>
                <div className={`col-span-2`}>
                    <Label>Shipping Class</Label>
                    <Select value={variation.shipping_class} onChange={(value) => handleChange('shipping_class', value)}
                            valueField="value"
                            options={shippingOptions}/>
                </div>
                <div className={`col-span-2`}>
                    <Label>Description</Label>
                    <Textarea onChange={(e) => handleInputChange(e, 'description')}/>
                </div>
            </div>
        </form>
    )
}
