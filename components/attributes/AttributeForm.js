import Input from "../common/Input";
import Label from "../common/Label";
import Textarea from "../common/Textarea";
import Toggle from "../common/Toggle";
import {attributeSkeleton} from "../../constants/attribute";
import {useState} from "react";

export default function AttributeForm() {
    const [attribute, setAttribute] = useState(attributeSkeleton);
    const handleChange = (e, field) => {
        const {value} = e.target;
        setAttribute((state) => ({
            ...state,
            [field]: value
        }))
    }
    return (
        <>
            <form action="">
                <div className={`grid grid-cols-3 gap-x-4`}>
                    <div>
                        <div className={`mb-4`}>
                            <Label>Name</Label>
                            <Input onChange={(e) => handleChange(e, 'name')} value={attribute.name}/>
                        </div>
                        <div className={`flex flex-col gap-y-2`}>
                            <Toggle enabled={attribute.visible_on_product_page}
                                    onChange={(e) => handleChange(e, 'visible_on_product_page')}
                                    label="Visible on product page"/>
                            <Toggle enabled={attribute.used_in_variations}
                                    onChange={(e) => handleChange(e, 'used_in_variations')}
                                    label="Used for variations"/>
                        </div>
                    </div>
                    <div className={`col-span-2`}>
                        <Label>Value(s)</Label>
                        <Textarea value={attribute.description} onChange={(e) => handleChange(e, 'description')}/>
                    </div>
                </div>
                <div className={`flex items-center justify-end`}>
                    <button
                        className={`bg-emerald-500 text-white active:bg-emerald-600 hover:bg-emerald-600 font-bold uppercase text-sm px-4 py-2 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150`}>Save
                    </button>
                </div>
            </form>
        </>
    )
}
