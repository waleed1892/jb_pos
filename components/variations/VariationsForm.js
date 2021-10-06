import Label from "../common/Label";
import Input from "../common/Input";
import {VariationSkeleton} from "../../constants/variation";
import {useState} from "react";
import Toggle from "../common/Toggle";

export default function VariationsForm() {
    const [variation, setVariation] = useState(VariationSkeleton);
    const handleChange = (e, field) => {
        const {value} = e.target;
        setVariation((state) => ({
            ...state,
            [field]: value
        }))
    }
    return (
        <form action="">
            <div className={`grid grid-cols-2 gap-x-4 gap-y-6`}>
                <div>
                    <div className={`w-28 h-24`}>
                        <img className={`w-full h-full object-cover`} src="/img/placeholder.svg" alt=""/>
                    </div>
                </div>
                <div className={`text-left`}>
                    <Label>SKU</Label>
                    <Input value={variation.sku} onChange={(e) => setVariation(e, 'sku')}/>
                </div>
                <div className={`col-span-2 flex items-center justify-start border-t border-b border-blueGray-200 py-2 gap-x-6`}>
                    <Toggle label="Enabled"/>
                    <Toggle label="Downloadable"/>
                    <Toggle label="Virtual"/>
                    <Toggle label="Manage Stock?"/>
                </div>
                <div className={`text-left`}>
                    <Label>Regular Price (AED)</Label>
                    <Input placeholder="variation price (required)"/>
                </div>
                <div className={`text-left`}>
                    <Label>Sale Price (AED)</Label>
                    <Input/>
                </div>
            </div>
        </form>
    )
}
