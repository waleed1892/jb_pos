import {get, post , put} from "lib/axios";

export const getProduct = async (id) => (await get(`product/${id}`)).data

export const saveProduct = (data) => {
    return post(`product`, data)
}

export const updateProduct = async ({id, fd}) => (await post(`product/${id}`, fd)).data


export const getProducts = async (page = 1) => {
    return (await get(`product?page=${page}`)).data
}

export const deleteProduct = async (id) => (await post(`product/${id}`, {
    _method: 'delete'
})).data
