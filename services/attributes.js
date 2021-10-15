import {get, post} from "lib/axios";

export const getAttributes = async (page) => {
    return (await get(`attribute?page=${page}`)).data
}

export const saveAttribute = (data) => {
    return post(`attribute`, data)
}

export const getAllAttributes = async () => ((await get('allAttributes')).data)
