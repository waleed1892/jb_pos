import {get, post,put} from "lib/axios";

export const getCategories = async (page) => {
    return (await get(`category?page=${page}`)).data
}

export const saveCategory = (data) => {
    return post(`category`, data)
}

export const updateCategory = async ({id, data}) => {
    return (await post(`category/${id}`, data)).data
}

export const deleteCategory = async (id) => {
    return (await post(`category/${id}`, {
        _method: 'DELETE'
    })).data
}

export const getAllCategories = async () => {
    return (await get(`allCategories`)).data
}

