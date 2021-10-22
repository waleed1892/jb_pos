import {random} from "lodash";
import jsbarcode from "jsbarcode";

export const productColumns = [
    {
        header: 'Name (EN)',
        accessor: 'name_en'
    },
    {
        header: 'Name (AR)',
        accessor: 'name_ar'
    },
    {
        header: 'Type',
        accessor: 'type',
    },
    {
        header: 'Variations',
        accessor: 'variations',
        cell: (row) => {
            if (row.type === 'variable')
                return row.variations.length
            return ''
        }
    }
]

const rng = (length) => {
    let out = '';
    for (let i = 0; i < length; i++) {
        out += random(0, 9, false).toString()
    }
    return out;
}

export const generateBarcode = (id, data) => {
    jsbarcode(`#${id}`, data, {
        format: 'EAN13'
    })
}

export const generate5Code = () => {
    return rng(5);
}

export const generateEan13 = () => {
    return rng(12);
}

export const stockOptions = [
    {label: 'In Stock', value: 'in_stock'},
    {label: 'Out of Stock', value: 'out_of_stock'},
    {label: 'On Backorder', value: 'on_backorder'},
]

export const shippingOptions = [
    {label: 'Same as parent', value: 'same_as_parent'},
]

export const productTypes = [
    {label: 'Simple', value: 'simple'},
    {label: 'Variable', value: 'variable'}
]

