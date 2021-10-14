import {post} from "lib/axios";

export const saveVariation = (data) => {
    return post(`variation`, data)
}
