import axios from "axios";

const api = axios.create({
    baseURL: `https://postest.cf/api`
    // baseURL: `http://jb_pos_api.test/api`
    // baseURL: `http://pos.test/api`
})

export const post = (url, data) => {
    return api.post(url, data)
}

export const put = (url, data) => {
    return api.put(url, data)
}

export const get = (url) => {
    return api.get(url)
}
