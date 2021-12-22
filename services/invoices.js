import {get, post} from "lib/axios";

export const getInvoices = async (page) => {
    return (await get(`invoice?page=${page}`)).data
}

export const saveInvoice = (data) => {
    return post(`invoice`, data)
}

export const getInvoice = async (id) => (await get(`invoice/${id}`)).data

export const updateInvoice = async ({id, data}) => {
    return (await post(`invoice/${id}`, data)).data
}

export const deleteInvoice = async (id) => {
    return (await post(`invoice/${id}`, {
        _method: 'DELETE'
    })).data
}


