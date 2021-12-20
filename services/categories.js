import {get, post,put} from "lib/axios";

export const getCategories = async () => {
    return (await get(`category`)).data
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
