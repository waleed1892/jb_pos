import {get, post} from "lib/axios";

export const saveProduct = (data) => {
    return post(`product`, data)
}

export const getProducts = async (page = 1) => {
    return (await get(`product?page=${page}`)).data
}
