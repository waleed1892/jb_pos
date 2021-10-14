import {get, post} from "lib/axios";

export const saveProduct = (data) => {
    return post(`product`, data)
}

export const getProducts = async () => {
    return (await get(`product`)).data
}
