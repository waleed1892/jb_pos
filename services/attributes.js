import {get, post} from "lib/axios";

export const getAttributes = async () => {
    return (await get(`attribute`)).data
}

export const saveAttribute = (data) => {
    return post(`attribute`, data)
}

export const getAllAttributes = async () => ((await get('allAttributes')).data)
