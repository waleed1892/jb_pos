import {get, post} from "lib/axios";

export const getAttributes = async (page) => {
    return (await get(`attribute?page=${page}`)).data
}

export const saveAttribute = (data) => {
    return post(`attribute`, data)
}

export const updateAttribute = async ({id, data}) => {
    return (await post(`attribute/${id}`, data)).data
}

export const deleteAttribute = async (id) => {
    return (await post(`attribute/${id}`, {
        _method: 'DELETE'
    })).data
}

export const getAllAttributes = async () => ((await get('allAttributes')).data)
