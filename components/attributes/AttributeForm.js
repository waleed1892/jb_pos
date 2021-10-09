import Input from "../common/Input";
import Label from "../common/Label";
import Textarea from "../common/Textarea";
import Toggle from "../common/Toggle";
import {attributeSkeleton} from "../../constants/attribute";
import {useState} from "react";
import {useForm} from "react-hook-form";


export default function AttributeForm() {
    const {register, handleSubmit, control} = useForm();
    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} method={`post`} action="">
                <div className={`grid grid-cols-3 gap-x-4`}>
                    <div>
                        <div className={`mb-4`}>
                            <Label>Name</Label>
                            <Input required register={register} name="name"/>
                        </div>
                        <div className={`flex flex-col gap-y-2`}>
                            <Toggle control={control}
                                    name="visible_on_product_page"
                                    label="Visible on Product Page"/>

                            <Toggle control={control}
                                    name="used_in_variations"
                                    label="Used for variations"/>
                        </div>
                    </div>
                    <div className={`col-span-2`}>
                        <Label>Value(s)</Label>
                        <Textarea name="description" register={register} required/>
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
