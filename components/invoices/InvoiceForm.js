import Label from "components/common/Label";
import Input from "components/common/Input";
import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "react-query";
import {saveInvoice, updateInvoice} from "services/invoices";
import {useRouter} from "next/router";
import Errors from "components/common/errors";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import Select from "components/common/Select";
import {storeOptions, currencyOptions} from "components/invoices/utils";
import Button from "components/common/button";

const schema = yup.object({
    name: yup.string().required(),
    store: yup.string().required(),
    currency: yup.string().required(),
    currency_rate: yup.number().typeError('currency rate must be a number').required(),
    date: yup.string().required(),
    product_barcode: yup.number().typeError('product barcode must be a number').required(),
    product_name: yup.string().required(),
    quantity: yup.number().typeError('quantity must be a number').required(),
    price: yup.number().typeError('price must be a number').required(),
    total_price: yup.number().typeError('total price must be a number').required(),
    vat: yup.number().typeError('vat must be a number').required(),
    total: yup.number().typeError('total must be a number').required(),
    customer_name: yup.string().required(),
});
/**
 *
 *  @param onSubmitHandle
 * @param formType {string}
 * @param product {object}
 * @returns {JSX.Element}
 * @constructor
 */
export default function InvoiceForm({formType = 'add', invoice = {}, onSubmitHandle}) {

    const {register, handleSubmit, control, formState: {errors}, setValue} = useForm({
        resolver: yupResolver(schema)
    });

    const router = useRouter()
    const queryClient = useQueryClient();
    // const [storeOption, setStoreOption] = useState('');

    useEffect(() => {
        if (formType === 'edit') {
            Object.keys(invoice).forEach(field => {
                setValue(field, invoice[field])
            })
            setValue('_method', 'put')
            setValue('store', 1)
            setValue('currency', 1)
        }
    }, [])

    const saveMutation = useMutation(saveInvoice, {
        onSuccess: () => {
            queryClient.invalidateQueries('invoices')
        }
    })

    const updateMutation = useMutation(updateInvoice, {
        onSuccess: () => {
            queryClient.invalidateQueries('invoices')
        }
    })

    const onSubmit = async (data) => {
        if (formType === 'edit') {
            await updateMutation.mutateAsync({id: invoice.id, data})
        } else if (formType === 'add') {
            await saveMutation.mutateAsync(data)
        }
        onSubmitHandle();
        await router.push('/admin/invoices')
    }

    return (
        <div className="px-6 py-6">
            <form method={`post`}
                // onSubmit={handleSubmit(onSubmit)}
            >
                <div className="">
                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Header</h6>
                    <div className={`grid grid-cols-3 gap-x-4 gap-y-6`}>
                        <div>
                            <Label>Customer Name</Label>
                            <Input name="customer_name" register={register}/>
                            <Errors name='customer_name' errors={errors}/>
                        </div>
                        <div>
                            <Label>Store</Label>
                            <Select control={control}
                                    name="store"
                                    options={storeOptions}
                            />
                            <Errors name='store' errors={errors}/>
                        </div>

                        <div>
                            <Label>Date</Label>
                            <Input type="date" name="date" register={register}/>
                            <Errors name='date' errors={errors}/>
                        </div>
                        <div>
                            <Label>Currency</Label>
                            <Select control={control}
                                    name="currency"
                                    options={currencyOptions}
                            />
                            <Errors name='currency' errors={errors}/>
                        </div>

                        <div>
                            <Label>Currency Rate</Label>
                            <Input name="currency_rate" register={register}/>
                            <Errors name='currency_rate' errors={errors}/>
                        </div>
                    </div>
                </div>

                <div className="">
                    <h6 className="text-blueGray-400 text-sm mt-8 mb-6 gap-y-6 font-bold uppercase">Body</h6>
                    <div className={`grid grid-cols-3 gap-x-4 gap-y-6`}>
                        <div>
                            <Label>Product Barcode</Label>
                            <Input name="product_barcode" register={register}/>
                            <Errors name='product_barcode' errors={errors}/>
                        </div>
                        <div>
                            <Label>Product Name</Label>
                            <Input name="product_name" register={register}/>
                            <Errors name='product_name' errors={errors}/>
                        </div>
                        <div>
                            <Label>Quantity</Label>
                            <Input name="quantity" register={register}/>
                            <Errors name='quantity' errors={errors}/>
                        </div>
                        <div>
                            <Label>Price</Label>
                            <Input name="price" register={register}/>
                            <Errors name='price' errors={errors}/>
                        </div>
                        <div>
                            <Label>Total Price</Label>
                            <Input name="total_price" register={register}/>
                            <Errors name='total_price' errors={errors}/>
                        </div>
                        <div>
                            <Label>Vat</Label>
                            <Input name="vat" register={register}/>
                            <Errors name='vat' errors={errors}/>
                        </div>
                        <div>
                            <Label>Total</Label>
                            <Input name="total" register={register}/>
                            <Errors name='total' errors={errors}/>
                        </div>
                    </div>
                </div>

                <div>
                    <h6 className="text-blueGray-400 text-sm mt-8 mb-6 font-bold uppercase">Actions</h6>
                    <div className={`grid grid-cols-5 gap-x-4 gap-y-6`}>
                        <div>
                            <Button onClick={handleSubmit(onSubmit)}>Save</Button>
                        </div>
                        <div>
                            <Button>Modify</Button>
                        </div>
                        <div>
                            <Button>Delete</Button>
                        </div>
                        <div>
                            <Button>Close</Button>
                        </div>
                    </div>
                </div>

                <div className="">
                    <h6 className="text-blueGray-400 text-sm mt-8 mb-6 font-bold uppercase">Template</h6>
                    <div className={`grid grid-cols-3 gap-x-4 gap-y-6`}>
                        <div>
                            <Label>Name</Label>
                            <Input name="name" register={register}/>
                            <Errors name='name' errors={errors}/>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
