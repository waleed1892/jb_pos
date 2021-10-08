import Label from "../common/Label";
import Input from "../common/Input";
import {VariationSkeleton} from "../../constants/variation";
import {useMemo, useState} from "react";
import Toggle from "../common/Toggle";
import Textarea from "../common/Textarea";
import Select from "../common/Select";

export default function VariationsForm() {
    const [variation, setVariation] = useState({...VariationSkeleton});
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
        {label: 'In Stock', value: 1},
        {label: 'Out of Stock', value: 2}
    ], [])

    const shippingOptions = useMemo(() => [
        {label: 'Same as parent', value: 1},
        {label: 'Original', value: 2}
    ], [])
    return (
        <form action="">
            <div className={`grid grid-cols-2 gap-x-4 gap-y-6`}>
                <div>
                    <div className={`w-28 h-24`}>
                        <img className={`w-full h-full object-cover`} src="/img/placeholder.svg" alt=""/>
                    </div>
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
                    <Input value={variation.sale_price} onChange={(e) => handleInputChange(e, 'sale_price')}/>
                </div>
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
                    <Select value={variation.shipping_class} onChange={(value) => handleChange('shipping_class', value)} valueField="value"
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
