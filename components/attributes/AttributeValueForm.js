import Label from "components/common/Label";
import Input from "components/common/Input";
import {useForm} from "react-hook-form";
import Textarea from "components/common/Textarea";
import Button from "components/common/button";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import Errors from "components/common/errors";

const schema = yup.object({
    name: yup.string().required(),
    description: yup.string()
}).required();
/**
 *
 * @param onSubmit
 * @returns {JSX.Element}
 * @constructor
 */
export default function AttributeValueForm({onSubmit = undefined}) {
    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            name: '',
            description: ''
        },
        resolver: yupResolver(schema)
    })
    const formHandler = (data) => {
        onSubmit(data)
    }

    return (
        <>
            <form onSubmit={handleSubmit(formHandler)}>
                <div>
                    <Label>Name</Label>
                    <Input register={register} name="name"/>
                    <Errors errors={errors} name="name"/>
                </div>
                <div className={`mt-2`}>
                    <Label>Description</Label>
                    <Textarea register={register} name="description"/>
                    <Errors errors={errors} name="description"/>
                </div>
                <div className={`text-right mt-4`}>
                    <Button variant="success">Save</Button>
                </div>
            </form>
        </>
    )
}
