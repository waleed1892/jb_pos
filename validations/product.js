import * as yup from "yup";

export const productValidation = yup.object({
    image: yup.object().shape({
        name: yup.string()
    }).nullable(),
    sku: yup.string().ensure().label('sku'),
    regular_price: yup.string().matches(/^\d*$/, {
        message: 'regular price must be a number',
        excludeEmptyString: false
    }).ensure(),
    sale_price: yup.lazy(value => value ? yup.number()
        .when('regular_price', (val, schema) => {
            return val ? schema.lessThan(val) : schema
        })
        .typeError('sale price must be a number').positive().label('sale price') : yup.string().ensure()),
    sale_start_date: '',
    sale_end_date: '',
    stock_status: yup.string(),
    weight: yup.string().matches(/^\d*$/, {message: 'weight must be a number', excludeEmptyString: false}).ensure(),
    length: yup.string().matches(/^\d*$/, {message: 'length must be a number', excludeEmptyString: false}).ensure(),
    width: yup.string().matches(/^\d*$/, {message: 'width must be a number', excludeEmptyString: false}).ensure(),
    height: yup.string().matches(/^\d*$/, {message: 'height must be a number', excludeEmptyString: false}).ensure(),
    shipping_class: yup.string(),
    description: yup.string().ensure(),
    enabled: yup.boolean(),
    manage_stock: yup.boolean(),
    code_five: yup.string().ensure(),
    ean_13: yup.string().ensure()
}).required()
