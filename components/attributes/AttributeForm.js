import React, {useState} from "react";
import Input from "components/common/Input";
import Label from "components/common/Label";
import Textarea from "components/common/Textarea";
import Toggle from "components/common/Toggle";
import {useMutation} from "react-query";
import {useForm} from "react-hook-form";
import {saveAttribute} from "services/attributes";
import Errors from "components/common/errors";
import {attributeSkeleton} from "constants/attribute";

/**
 *
 * @param onSubmit
 * @returns {JSX.Element}
 * @constructor
 */
export default function AttributeForm({onSubmit}) {
    const {register, handleSubmit, control, formState: {errors}} = useForm({
        defaultValues: {...attributeSkeleton},
    });
    const [showArField, setShowArField] = useState(false);
    const mutation = useMutation(saveAttribute)
    const handleForm = async (data) => {
        await mutation.mutateAsync(data)
        onSubmit();
    }
    return (
        <>
            <form onSubmit={handleSubmit(handleForm)} method={`post`} action="">
                <div className={`grid grid-cols-3 gap-x-4`}>
                    <div>
                        <div className={`${showArField ? 'hidden' : ''} mb-4`}>
                            <Label>Name (EN)</Label>
                            <a onClick={() => setShowArField(true)}
                               className={`text-sm text-lightBlue-500 cursor-pointer ml-2`}>AR</a>
                            <Input required register={register} name="name_en"/>
                            <Errors name='name_en' errors={errors}/>
                        </div>
                        <div className={`${!showArField ? 'hidden' : ''} mb-4`}>
                            <Label>Name (AR)</Label>
                            <a onClick={() => setShowArField(false)}
                               className={`text-sm text-lightBlue-500 cursor-pointer ml-2`}>EN</a>
                            <Input required register={register} name="name_ar"/>
                        </div>
                        <div className={`flex flex-col gap-y-2`}>
                            <Toggle control={control}
                                    defaultValue={true}
                                    name="visible_on_product_page"
                                    label="Visible on Product Page"/>

                            <Toggle control={control}
                                    name="use_for_variation"
                                    label="Used for variations"/>
                        </div>
                    </div>
                    <div className={`col-span-2`}>
                        <Label>Value(s)</Label>
                        <span className={`text-blueGray-400 ml-2 text-sm`}>Enter comma (,) seperated values</span>
                        <Textarea name="values" register={register} required/>
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
